<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

// backend/auth_helper.php

function get_jwt_secret() {
    // Ensure this matches what you use in login.php
    return "a_very_long_and_secure_secret_key_32_chars_plus"; 
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
    try {
        // Use the function to get the secret consistently
        $decoded = JWT::decode($jwt, new Key(get_jwt_secret(), 'HS256'));
        return (array) $decoded->data;
    } catch (Exception $e) {
        return false;
    }
}
?>