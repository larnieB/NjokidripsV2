<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// 1. Database connection
$host = "localhost";
$user = "root";
$pass = "";
$db   = "njoki_drips_db";

$conn = new mysqli($host, $user, $pass, $db);

// 2. Capture the raw JSON data sent by Safaricom
$callbackJSONData = file_get_contents('php://input');

// Log the response for debugging purposes
$logFile = "stkPushPaymentResponse.json";
$log = fopen($logFile, "a");
fwrite($log, $callbackJSONData . PHP_EOL);
fclose($log);

$data = json_decode($callbackJSONData);

// 3. Extract key identifiers
$resultCode = $data->Body->stkCallback->ResultCode;
$checkoutRequestID = $data->Body->stkCallback->CheckoutRequestID;

if ($resultCode == 0) {
    // Payment was successful (ResultCode 0)
    $metadata = $data->Body->stkCallback->CallbackMetadata->Item;
    $mpesaReceiptNumber = "";
    
    foreach($metadata as $item) {
        if($item->Name === "MpesaReceiptNumber") {
            $mpesaReceiptNumber = $item->Value;
            break;
        }
    }

    // Update status to SUCCESS and record the receipt number
    $sql = "UPDATE payments SET status = 'SUCCESS', mpesa_receipt = '$mpesaReceiptNumber' 
            WHERE checkout_request_id = '$checkoutRequestID'";
    $conn->query($sql);
} else {
    // Payment failed or was cancelled (e.g., ResultCode 1032)
    $sql = "UPDATE payments SET status = 'FAILED' WHERE checkout_request_id = '$checkoutRequestID'";
    $conn->query($sql);
}

$conn->close();
?>