<?php
// backend/getTypes.php
require_once '../db/dbConfig.php';

try {
    $stmt = $pdo->query("SELECT colum_name FROM information_schema.columns WHERE table_name = \'Data\' or table_name = \'Sensor\'");
    $types = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode($types);
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur lors de la récupération des types de données']);
}
?>
