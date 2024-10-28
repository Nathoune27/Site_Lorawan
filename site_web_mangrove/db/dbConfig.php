<?php
// db/dbConfig.php

$host = '127.0.0.1';
$dbname = 'bddLoRaV2';
$user = 'postgres';
$password = 'admin';

try {
    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo 'Connexion réussie';
} catch (PDOException $e) {
    echo 'Erreur de connexion : ' . $e->getMessage();
}

$req = $pdo->query("SELECT * FROM 'Data'");
while ($row = $req->fetch()) {
    echo $row['devEUI'] . ' ' . $row['type'] . ' ' . $row['data'] . '<br>';
}
?>
