<?php
// db/dbConfig.php

$host = '127.0.0.1';
$dbname = 'bddLoRaV2';
$user = 'postgres';
$password = 'admin';

try {
    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Erreur de connexion : ' . $e->getMessage();
}
?>
