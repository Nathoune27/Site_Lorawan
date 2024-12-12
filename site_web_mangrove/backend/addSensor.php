<?php
// backend/addSensor.php
session_start();
require_once '../db/dbConfig.php';

if (!isset($_SESSION['username']) || $_SESSION['account_type'] !== 'admin') {
    header('Location: ../frontend/login.html');
    exit();
}

$devEUI = $_POST['devEUI'] ?? '';
$sensorName = $_POST['sensorName'] ?? '';

if ($devEUI && $sensorName) {
    try {
        // Utilisez des guillemets doubles pour les noms de colonnes
        $query = 'INSERT INTO "Sensor" ("devEUI", "deviceName") VALUES (:devEUI, :deviceName)';
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':devEUI', $devEUI);
        $stmt->bindParam(':deviceName', $sensorName);
        $stmt->execute();

        // Redirection vers main.html avec un paramètre de confirmation
        header('Location: ../frontend/main.html?sensor=success');
        exit();
    } catch (PDOException $e) {
        echo 'Erreur lors de l\'ajout du capteur : ' . $e->getMessage();
    }
} else {
    echo 'Veuillez remplir tous les champs.';
}
?>