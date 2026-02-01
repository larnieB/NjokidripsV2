<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Function to manually parse .env file
function loadEnv($path) {
    if (!file_exists($path)) return;
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

loadEnv(__DIR__ . '/../.env.local');

// Database connection
$conn = new mysqli("localhost", "root", "", "njoki_drips_db");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

$input = json_decode(file_get_contents('php://input'), true);
$amount = $input['amount'] ?? 1;
$phone = "254791353785"; // Your hardcoded testing phone

/**
 * PREVENTION OF DUPLICATE TRANSACTIONS
 * Check if there is already a PENDING request for this phone number created in the last 60 seconds.
 */
$checkSql = "SELECT checkout_request_id FROM payments WHERE phone = ? AND status = 'PENDING' AND created_at > NOW() - INTERVAL 1 MINUTE";
$stmt = $conn->prepare($checkSql);
$stmt->bind_param("s", $phone);
$stmt->execute();
$checkResult = $stmt->get_result();

if ($checkResult->num_rows > 0) {
    $existing = $checkResult->fetch_assoc();
    echo json_encode([
        "status" => "success", 
        "checkout_id" => $existing['checkout_request_id'], 
        "message" => "A request is already on your phone. Please enter your PIN."
    ]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// M-Pesa Credentials
$consumerKey = $_ENV['MPESA_CONSUMER_KEY'] ?? ''; 
$consumerSecret = $_ENV['MPESA_CONSUMER_SECRET'] ?? '';
$BusinessShortCode = $_ENV['MPESA_BUSINESS_SHORTCODE'] ?? '';
$Passkey = $_ENV['MPESA_PASSKEY'] ?? '';
$callbackUrl = 'https://humblingly-widowly-joni.ngrok-free.dev/NjokidripsV2/backend/callback.php';

// 1. Generate Access Token
$headers = ['Content-Type: application/json; charset=utf8'];
$url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_HEADER, FALSE);
curl_setopt($curl, CURLOPT_USERPWD, $consumerKey . ':' . $consumerSecret);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
$curl_result = curl_exec($curl);
$token_result = json_decode($curl_result);
curl_close($curl);

if (!isset($token_result->access_token)) {
    echo json_encode(["status" => "error", "message" => "Failed to generate access token."]);
    exit;
}
$accessToken = $token_result->access_token;

// 2. Initiate STK Push
$timestamp = date('YmdHis');
$password = base64_encode($BusinessShortCode . $Passkey . $timestamp);

$stkUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
$curl_post_data = [
    'BusinessShortCode' => $BusinessShortCode,
    'Password' => $password,
    'Timestamp' => $timestamp,
    'TransactionType' => 'CustomerPayBillOnline',
    'Amount' => $amount,
    'PartyA' => $phone,
    'PartyB' => $BusinessShortCode,
    'PhoneNumber' => $phone,
    'CallBackURL' => $callbackUrl,
    'AccountReference' => 'NjokiDripsArena',
    'TransactionDesc' => 'Daily Quest Fee'
];

$curl = curl_init($stkUrl);
curl_setopt($curl, CURLOPT_HTTPHEADER, ['Authorization: Bearer ' . $accessToken, 'Content-Type: application/json']);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($curl_post_data));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$stk_result_raw = curl_exec($curl);
$response = json_decode($stk_result_raw);
curl_close($curl);

// 3. Log and Respond
if (isset($response->ResponseCode) && $response->ResponseCode == "0") {
    $checkoutRequestID = $response->CheckoutRequestID;
    $merchantRequestID = $response->MerchantRequestID;

    $stmt = $conn->prepare("INSERT INTO payments (checkout_request_id, merchant_request_id, amount, phone, status) VALUES (?, ?, ?, ?, 'PENDING')");
    $stmt->bind_param("ssis", $checkoutRequestID, $merchantRequestID, $amount, $phone);
    $stmt->execute();
    
    echo json_encode([
        "status" => "success", 
        "checkout_id" => $checkoutRequestID, 
        "message" => "Check your phone for the M-Pesa prompt."
    ]);
    $stmt->close();
} else {
    echo json_encode([
        "status" => "error", 
        "message" => "Safaricom failed: " . ($response->errorMessage ?? $response->ResponseDescription ?? 'Unknown Error')
    ]);
}

$conn->close();
?>