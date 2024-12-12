<?php
// backend/import.php
require_once '../db/dbConfig.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['csvFile'])) {
    $file = $_FILES['csvFile']['tmp_name'];

    if (($handle = fopen($file, 'r')) !== false) {
        // Lire les en-têtes du fichier CSV
        $headers = fgetcsv($handle, 1000, ',');

        // Échapper les noms de colonnes
        $escapedHeaders = array_map(function($header) {
            return '"' . $header . '"';
        }, $headers);

        // Préparer la requête d'insertion
        $query = "INSERT INTO \"Data\" (" . implode(',', $escapedHeaders) . ") VALUES (:" . implode(',:', $headers) . ")";
        $stmt = $pdo->prepare($query);

        // Lire les lignes du fichier CSV et insérer les données
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
            $params = array_combine($headers, $data);
            $stmt->execute($params);
        }

        fclose($handle);
        // Redirection vers main.html avec un paramètre de confirmation
        header('Location: ../frontend/main.html?import=success');
        exit();
    } else {
        echo 'Erreur lors de l\'ouverture du fichier CSV.';
    }
} else {
    echo 'Aucun fichier CSV téléchargé.';
}
?>