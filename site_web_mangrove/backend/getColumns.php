<?php
// backend/getColumns.php
require_once '../db/dbConfig.php';

try {
    $query = "SELECT column_name FROM information_schema.columns WHERE table_name = 'Data'";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode($columns);
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur lors de la récupération des colonnes']);
}
?>