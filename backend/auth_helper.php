<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "a_very_long_and_secure_secret_key_32_chars_plus";
// Helper to load env (Reuse your existing logic or use a library)
function get_jwt_secret() {
    // In production, use real environment variables
    return $_ENV['JWT_SECRET'] ?? 'default_fallback_change_this_in_production';
}

function generate_jwt($user_id) {
    $payload = [
        'iss' => 'njoki_drips',
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24),
        'data' => ['userId' => $user_id]
    ];
    return JWT::encode($payload, get_jwt_secret(), 'HS256');
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