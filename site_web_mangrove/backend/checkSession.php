<?php
// checkSession.php
session_start();
header('Content-Type: application/json');

$response = ['authenticated' => false, 'account_type' => ''];

if (isset($_SESSION['username'])) {
    $response['authenticated'] = true;
    $response['account_type'] = $_SESSION['account_type']; // Assurez-vous que cette variable est définie lors de la connexion
}

echo json_encode($response);
?>