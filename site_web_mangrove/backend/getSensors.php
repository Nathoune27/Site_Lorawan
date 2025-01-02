<?php
require_once '../db/dbConfig.php';

try {
    $query = 'SELECT DISTINCT "devEUI" FROM "Data"';
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $sensors = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sensors);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>