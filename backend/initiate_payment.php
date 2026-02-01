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

$callbackUrl = 'https://humblingly-widowly-joni.ngrok-free.dev/NjokidripsV2/backend/callback.php';

$consumerKey = $_ENV['MPESA_CONSUMER_KEY'] ?? ''; 
$consumerSecret = $_ENV['MPESA_CONSUMER_SECRET'] ?? '';
$BusinessShortCode = $_ENV['MPESA_BUSINESS_SHORTCODE'] ?? '';
$Passkey = $_ENV['MPESA_PASSKEY'] ?? '';

$input = json_decode(file_get_contents('php://input'), true);
$amount = $input['amount'] ?? 1;
$phone = "254791353785";

// 3. Generate Access Token
$headers = ['Content-Type: application/json; charset=utf8'];
$url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_HEADER, FALSE);
curl_setopt($curl, CURLOPT_USERPWD, $consumerKey . ':' . $consumerSecret);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
$curl_result = curl_exec($curl);

if ($curl_result === false) {
    $error = curl_error($curl);
    echo json_encode(["status" => "error", "message" => "cURL Error: " . $error]);
    curl_close($curl);
    exit;
}
$result = json_decode($curl_result);
curl_close($curl);

if (isset($result->access_token)) {
    $accessToken = $result->access_token;
} else {
    echo json_encode(["status" => "error", "message" => "Failed to generate access token."]);
    exit;
}

// 4. Initiate STK Push
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

// FIX: Execute the request ONLY ONCE
$stk_curl_result = curl_exec($curl);
$response = json_decode($stk_curl_result);
curl_close($curl); 

// Detailed Logging for Debugging
$logFile = "stkPushInitiationLog.json"; // Different from the callback log
$log = fopen($logFile, "a");
fwrite($log, date('Y-m-d H:i:s') . " - Response: " . $stk_curl_result . PHP_EOL);
fclose($log);

if (isset($response->ResponseCode) && $response->ResponseCode == "0") {
    $conn = new mysqli("localhost", "root", "", "njoki_drips_db");
    
    $checkoutRequestID = $response->CheckoutRequestID;
    $merchantRequestID = $response->MerchantRequestID;

    // Create the initial PENDING record
    $stmt = $conn->prepare("INSERT INTO payments (checkout_request_id, merchant_request_id, amount, phone, status) VALUES (?, ?, ?, ?, 'PENDING')");
    $stmt->bind_param("ssis", $checkoutRequestID, $merchantRequestID, $amount, $phone);
    $stmt->execute();
    
    echo json_encode([
        "status" => "success", 
        "checkout_id" => $checkoutRequestID, 
        "message" => "Check your phone for the M-Pesa prompt."
    ]);
    
    $stmt->close();
    $conn->close();
} else {

       // Refine error reporting to capture specific Safaricom messages
    $errorMessage = "Unknown error";
    
    if (isset($response->errorMessage)) {
        $errorMessage = $response->errorMessage; // Common for auth or validation errors
    } elseif (isset($response->ResponseDescription)) {
        $errorMessage = $response->ResponseDescription; // Common for processing errors
    }

    echo json_encode([
        "status" => "error", 
        "message" => "Safaricom initiation failed: " . ($response->ResponseDescription ?? 'Unknown error')
    ]);
}
?>