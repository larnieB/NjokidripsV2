<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// 1. Handle Preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'auth_helper.php';

// 2. Auth Header Extraction
$authHeader = null;
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
} elseif (isset($_SERVER['Authorization'])) {
    $authHeader = $_SERVER['Authorization'];
} elseif (function_exists('apache_request_headers')) {
    $headers = apache_request_headers();
    $authHeader = $headers['Authorization'] ?? null;
}

// 3. Token Validation
if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $userData = validate_jwt($matches[1]);
    if (!$userData) {
        http_response_code(401);
        echo json_encode(["error" => "Unauthorized: Invalid Token"]);
        exit;
    }
} else {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized: Token missing"]);
    exit;
}

// 4. Database connection
$host = "localhost";
$user = "root";
$pass = "";
$db   = "njoki_drips_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$today = date('Y-m-d');

/** * 5. Retrieve or Assign Today's Quest
 * Updated to include task_type and simulation_data columns.
 */
$sql = "SELECT q.title, q.description, q.points, q.task_type, q.simulation_data 
        FROM daily_quest_log d 
        JOIN quests q ON d.quest_id = q.id 
        WHERE d.active_date = '$today'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Return today's existing quest
    $quest = $result->fetch_assoc();
} else {
    // No quest found for today, pick a random one
    $pick_sql = "SELECT id, title, description, points, task_type, simulation_data 
                 FROM quests ORDER BY RAND() LIMIT 1";
    $pick_result = $conn->query($pick_sql);
    
    if ($pick_result->num_rows > 0) {
        $quest = $pick_result->fetch_assoc();
        $quest_id = $quest['id'];
        
        // Log this as today's quest for consistency
        $conn->query("INSERT INTO daily_quest_log (quest_id, active_date) VALUES ($quest_id, '$today')");
        unset($quest['id']); // Hide internal ID from response
    } else {
        $quest = [
            "title" => "Stay Tuned",
            "description" => "No quests available today. Check back later!",
            "points" => 0,
            "task_type" => "quiz",
            "simulation_data" => null
        ];
    }
}

// 6. Handle Simulation Logic (Game Design)
// If simulation_data is empty for a simulation task, provide a default high-stakes scenario.
if (isset($quest['task_type']) && $quest['task_type'] === 'simulation' && empty($quest['simulation_data'])) {
    $quest['simulation_data'] = json_encode([
        "starting_capital" => 100000,
        "target_roi" => 15, // 15% growth required for victory
        "market_condition" => "Volatile",
        "sectors" => [
            ["name" => "Tech", "risk" => "High", "reward" => "30%"],
            ["name" => "Fashion", "risk" => "Medium", "reward" => "15%"],
            ["name" => "Healthcare", "risk" => "Low", "reward" => "5%"]
        ]
    ]);
}

// 7. Final Response Output
// Parse simulation_data JSON before sending to frontend.
echo json_encode([
    "title" => $quest['title'],
    "description" => $quest['description'],
    "points" => $quest['points'],
    "type" => $quest['task_type'] ?? 'quiz',
    "simulation" => isset($quest['simulation_data']) ? json_decode($quest['simulation_data']) : null
]);

$conn->close();
?>