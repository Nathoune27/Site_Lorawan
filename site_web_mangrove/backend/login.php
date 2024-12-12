<?php
session_start();
require_once '../db/dbConfig.php';

// Récupération des données du formulaire
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

try {
    // Requête SQL pour vérifier les identifiants
    $query = "SELECT * FROM logins WHERE username = :username AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Définir une variable de session pour l'utilisateur authentifié
        $_SESSION['username'] = $username;
        // Redirection vers main.html en cas de succès
        header('Location: ../frontend/main.html');
        exit();
    } else {
        echo 'Nom d\'utilisateur ou mot de passe incorrect. Veuillez réessayer.';
    }
} catch (PDOException $e) {
    echo 'Erreur lors de la connexion à la base de données : ' . $e->getMessage();
}
?>