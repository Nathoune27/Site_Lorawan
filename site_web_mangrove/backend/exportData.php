<?php
// backend/exportData.php
require_once '../db/dbConfig.php';

$type = $_GET['type'] ?? null;
$startDate = $_GET['start'] ?? null;
$endDate = $_GET['end'] ?? null;

try {
    $query = "SELECT * FROM Data WHERE 1=1";

    if ($type) {
        $query .= " AND type = :type";
    }
    if ($startDate) {
        $query .= " AND time >= :start";
    }
    if ($endDate) {
        $query .= " AND time <= :end";
    }

    $stmt = $pdo->prepare($query);

    if ($type) {
        $stmt->bindParam(':type', $type);
    }
    if ($startDate) {
        $stmt->bindParam(':start', $startDate);
    }
    if ($endDate) {
        $stmt->bindParam(':end', $endDate);
    }

    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment;filename="export_data.csv"');

    $output = fopen('php://output', 'w');
    fputcsv($output, array('devEUI', 'time', 'type', 'data'));  // En-tête

    foreach ($results as $row) {
        fputcsv($output, $row);
    }

    fclose($output);
} catch (Exception $e) {
    echo 'Erreur lors de l’exportation des données';
}
?>
