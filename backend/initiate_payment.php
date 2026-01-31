<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow React to access this API


// 1. Configuration (Get these from Safaricom Developer Portal)
$consumerKey = 'YOUR_CONSUMER_KEY'; 
$consumerSecret = 'YOUR_CONSUMER_SECRET';
$BusinessShortCode = '174379'; // Test Paybill
$Passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
$callbackUrl = 'https://humblingly-widowly-joni.ngrok-free.dev /backend/callback.php'; // Must be a live HTTPS URL

// 2. Get data from Dashboard.tsx
$input = json_decode(file_get_contents('php://input'), true);
$amount = $input['amount'] ?? 20;
$phone = "2547XXXXXXXX"; // In production, get this from user profile/input

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

// 5. Respond to Frontend
if (isset($response->ResponseCode) && $response->ResponseCode == "0") {
    echo json_encode(["status" => "success", "message" => "Check your phone for the M-Pesa prompt."]);
} else {
    echo json_encode(["status" => "error", "message" => "Could not initiate payment."]);
}
?>