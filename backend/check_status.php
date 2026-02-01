<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "njoki_drips_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$checkoutID = $_GET['id'] ?? '';

if (empty($checkoutID)) {
    echo json_encode(["status" => "error", "message" => "No ID provided"]);
    exit;
}

// Query the payment status based on the CheckoutRequestID
$sql = "SELECT status FROM payments WHERE checkout_request_id = '$checkoutID' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["status" => "NOT_FOUND"]);
}

$conn->close();
?>