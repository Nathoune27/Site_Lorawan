# Site_Lorawan

Pour lancer le site web, j'ai d'bord installer XAMPP sur ma machine. Une fois XAMPP lancé, je lance le serveur Apache et le serveur Mysql.

Ensuite, il faut lancer la base de données postgresql.

Ensuite je mets le fichier site_web_mangrove dans C:\xampp\htdocs

Enfin on peut accèder au site via http://127.0.0.1/site_web_mangrove/frontend/index.html

Il reste tout de même des problèmes :
- L'affichage des données est partiel, on peut les voir données en cliquant directement sur le bouton "Appliquer les filtres"
- Le filtrage des dates fontionne mais on ne peut pas sélectionner les types de données voulus
- L'export des données en csv ne fontionne pas
- Les graphes n'affiche rien

Table login 
```
CREATE TABLE logins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_type VARCHAR(10) NOT NULL CHECK (account_type IN ('utilisateur', 'admin'))
);

INSERT INTO logins (username, password, account_type) VALUES
('utilisateur', '1234', 'utilisateur'),
('admin', '1234', 'admin');
```