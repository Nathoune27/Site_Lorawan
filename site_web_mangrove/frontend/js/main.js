// js/main.js

// Fonction pour charger les types de données depuis la base et générer les cases à cocher
async function loadDataTypes() {
    const response = await fetch('../backend/getTypes.php');
    const types = await response.json();
    
    const checkboxesDiv = document.getElementById('type-checkboxes');
    types.forEach(type => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${type}" class="type-checkbox"> ${type}`;
        checkboxesDiv.appendChild(label);
    });
}

// Appeler loadDataTypes() lors du chargement de la page
document.addEventListener("DOMContentLoaded", loadDataTypes);

// Fonction pour appliquer les filtres
async function applyFilters() {
    const types = Array.from(document.querySelectorAll('.type-checkbox:checked')).map(cb => cb.value);
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;

    const typeQuery = types.join(',');
    const response = await fetch(`../backend/getData.php?types=${typeQuery}&start=${start}&end=${end}`);
    const data = await response.json();
    populateTable(data);
    updateGrafana(typeQuery, start, end);
    updateD3(data);
}


// Fonction pour remplir le tableau avec les données
function populateTable(data) {
    const tbody = document.getElementById('table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.devEUI}</td>
            <td>${row.time}</td>
            <td>${row.type}</td>
            <td>${row.data}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Fonction pour exporter les données en CSV
function exportCSV() {
    const type = document.getElementById('type').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    window.location.href = `../backend/exportData.php?type=${type}&start=${start}&end=${end}`;
}
