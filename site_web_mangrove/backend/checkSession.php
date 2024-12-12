<?php
// checkSession.php
session_start();
header('Content-Type: application/json');

$response = ['authenticated' => false];

if (isset($_SESSION['username'])) {
    $response['authenticated'] = true;
}

echo json_encode($response);
?>