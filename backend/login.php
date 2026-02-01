<?php
// backend/login.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
require_once 'auth_helper.php';

// Database connection logic from
$conn = new mysqli("localhost", "root", "", "njoki_drips_db");

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'];
$password = $input['password'];

// In a real app, use password_verify() with hashed passwords
$sql = "SELECT id FROM users WHERE email = '$email' AND password = '$password' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $token = generate_jwt($user['id']);
    echo json_encode(["status" => "success", "token" => $token]);
} else {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}
?>