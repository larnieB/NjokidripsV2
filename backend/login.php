<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Added OPTIONS
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Added Authorization

// Handle the preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/auth_helper.php';

// Database connection logic from
$conn = new mysqli("localhost", "root", "", "njoki_drips_db");

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'];
$password = $input['password'];

// Fetch the user by email only
$sql = "SELECT id, password FROM users WHERE email = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    // Verify the submitted password against the hash in the DB
    if (password_verify($password, $user['password'])) {
        $token = generate_jwt($user['id']); // Generate your JWT
        echo json_encode(["status" => "success", "token" => $token]);
    } else {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

$conn->close();
?>