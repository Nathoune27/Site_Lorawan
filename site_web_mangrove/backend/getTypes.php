<?php
// backend/getTypes.php
require_once '../db/dbConfig.php';

try {
    $query = 'SELECT DISTINCT type FROM "Data"';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $types = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode($types);
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur lors de la récupération des types de données']);
}
?>