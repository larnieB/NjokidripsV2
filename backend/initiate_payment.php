<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow React to access this API



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

// Load the .env file from the root directory
loadEnv(__DIR__ . '/../.env.local');

$callbackUrl = 'https://humblingly-widowly-joni.ngrok-free.dev/NjokidripsV2/backend/callback.php';

// Retrieve credentials securely
$consumerKey = $_ENV['MPESA_CONSUMER_KEY'] ?? ''; 
$consumerSecret = $_ENV['MPESA_CONSUMER_SECRET'] ?? '';
$BusinessShortCode = $_ENV['MPESA_BUSINESS_SHORTCODE'] ?? '';
$Passkey = $_ENV['MPESA_PASSKEY'] ?? '';


$input = json_decode(file_get_contents('php://input'), true);
$amount = $input['amount'] ?? 20;
$phone = "254791353785";
// 3. Generate Access Token
$headers = ['Content-Type: application/json; charset=utf8'];
$url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_HEADER, FALSE);
curl_setopt($curl, CURLOPT_USERPWD, $consumerKey . ':' . $consumerSecret);
$result = json_decode(curl_exec($curl));
$accessToken = $result->access_token;

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
$response = json_decode(curl_exec($curl));

// 5. Respond to Frontend and Save to DB
if (isset($response->ResponseCode) && $response->ResponseCode == "0") {
    // Database connection details
    $host = "localhost";
    $user = "root";
    $pass = "";
    $db   = "njoki_drips_db";
    $conn = new mysqli($host, $user, $pass, $db);

    // Capture unique IDs from the Safaricom response
    $checkoutRequestID = $response->CheckoutRequestID;
    $merchantRequestID = $response->MerchantRequestID;

    // INSERT the initial record so callback.php has a row to UPDATE later
    $sql = "INSERT INTO payments (checkout_request_id, merchant_request_id, amount, phone, status) 
            VALUES ('$checkoutRequestID', '$merchantRequestID', '$amount', '$phone', 'PENDING')";
    
    $conn->query($sql);
    $conn->close();

    echo json_encode(["status" => "success", "message" => "Check your phone for the M-Pesa prompt."]);
} else {
    echo json_encode(["status" => "error", "message" => "Could not initiate payment."]);
}