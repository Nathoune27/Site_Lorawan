<?php
require_once '../db/dbConfig.php';

$columns = explode(',', $_GET['columns'] ?? '');
$types = explode(',', $_GET['types'] ?? '');
$sensors = explode(',', $_GET['sensors'] ?? '');
$startDate = $_GET['start'] ?? null;
$endDate = $_GET['end'] ?? null;

try {
    // Construire la liste des colonnes à sélectionner
    $columnsList = '*';
    if (!empty($columns) && $columns[0] !== '') {
        $columnsList = implode(',', array_map(function($col) {
            return '"' . $col . '"';
        }, $columns));
    }

    $query = "SELECT $columnsList FROM \"Data\" WHERE 1=1";

    if (!empty($types) && $types[0] !== '') {
        $placeholders = implode(',', array_map(function($index) {
            return ":type$index";
        }, array_keys($types)));
        $query .= " AND type IN ($placeholders)";
    }
    if (!empty($sensors) && $sensors[0] !== '') {
        $placeholders = implode(',', array_map(function($index) {
            return ":sensor$index";
        }, array_keys($sensors)));
        $query .= " AND \"devEUI\" IN ($placeholders)";
    }
    if ($startDate) {
        $query .= " AND time >= :start";
    }
    if ($endDate) {
        $query .= " AND time <= :end";
    }

    $query .= " ORDER BY time ASC";
    
    $stmt = $pdo->prepare($query);

    if (!empty($types) && $types[0] !== '') {
        foreach ($types as $index => $type) {
            $stmt->bindValue(":type$index", $type);
        }
    }
    if (!empty($sensors) && $sensors[0] !== '') {
        foreach ($sensors as $index => $sensor) {
            $stmt->bindValue(":sensor$index", $sensor);
        }
    }
    if ($startDate) {
        $stmt->bindParam(':start', $startDate);
    }
    if ($endDate) {
        $stmt->bindParam(':end', $endDate);
    }

    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Ensure time is in ISO 8601 format
    foreach ($results as &$row) {
        $row['time'] = (new DateTime($row['time']))->format(DateTime::ATOM);
    }

    echo json_encode($results);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>