<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow React to access this API

// Database connection details
$host = "localhost";
$user = "root";
$pass = "";
$db   = "njoki_drips_db";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$today = date('Y-m-d');

// 1. Check if a quest is already assigned for today
$sql = "SELECT q.title, q.description, q.points 
        FROM daily_quest_log d 
        JOIN quests q ON d.quest_id = q.id 
        WHERE d.active_date = '$today'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Return today's existing quest
    echo json_encode($result->fetch_assoc());
} else {
    // 2. No quest found for today, pick a random one
    $pick_sql = "SELECT id, title, description, points FROM quests ORDER BY RAND() LIMIT 1";
    $pick_result = $conn->query($pick_sql);
    
    if ($pick_result->num_rows > 0) {
        $new_quest = $pick_result->fetch_assoc();
        $quest_id = $new_quest['id'];
        
        // 3. Log this as today's quest so it stays consistent for all users
        $conn->query("INSERT INTO daily_quest_log (quest_id, active_date) VALUES ($quest_id, '$today')");
        
        // Return the new quest (excluding the ID)
        unset($new_quest['id']);
        echo json_encode($new_quest);
    } else {
        echo json_encode([
            "title" => "Stay Tuned",
            "description" => "No quests available today. Check back later!",
            "points" => 0
        ]);
    }
}

$conn->close();
?>