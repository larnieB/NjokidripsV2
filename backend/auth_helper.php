<?php
require_once __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "YOUR_SUPER_SECRET_KEY"; // Change this and keep it safe

function generate_jwt($user_id) {
    global $secret_key;
    $payload = [
        'iss' => 'njoki_drips',
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24), // Token expires in 24 hours
        'data' => ['userId' => $user_id]
    ];
    return JWT::encode($payload, $secret_key, 'HS256');
}

function validate_jwt($jwt) {
    global $secret_key;
    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        return (array) $decoded->data;
    } catch (Exception $e) {
        return false;
    }
}
?>