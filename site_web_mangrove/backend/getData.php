<?php
// backend/getData.php
require_once '../db/dbConfig.php';

$types = explode(',', $_GET['types'] ?? '');
$startDate = $_GET['start'] ?? null;
$endDate = $_GET['end'] ?? null;

try {
    $query = 'SELECT * FROM "Data" WHERE 1=1';

    // if (!empty($types)) {
    //     $placeholders = implode(',', array_fill(0, count($types), '?'));
    //     $query .= " AND type IN ($placeholders)";
    // }
    if ($startDate) {
        $query .= " AND time >= :start";
    }
    if ($endDate) {
        $query .= " AND time <= :end";
    }

    $stmt = $pdo->prepare($query);

    // foreach ($types as $index => $type) {
    //     $stmt->bindValue($index + 1, $type);
    // }
    if ($startDate) {
        $stmt->bindParam(':start', $startDate);
    }
    if ($endDate) {
        $stmt->bindParam(':end', $endDate);
    }

    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);
} catch (Exception $e) {
    echo json_encode(['error' => 'Erreur lors de la récupération des données']);
}
?>
