// js/main.js

// Fonction pour charger les types de données depuis la base et générer les cases à cocher
async function loadDataTypes() {
    const response = await fetch('../backend/getTypes.php');
    const types = await response.json();
    
    const checkboxesDiv = document.getElementById('type-checkboxes');
    // types.forEach(type => {
    //     const label = document.createElement('label');
    //     label.innerHTML = `<input type="checkbox" value="${type}" class="type-checkbox"> ${type}`;
    //     checkboxesDiv.appendChild(label);
    // });
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
async function populateTable(data) {
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

// Fonction pour convertir le tableau en CSV
function tableToCSV() {
    let csv_data = [];
    let rows = document.querySelectorAll('#table tr');
    
    // Get headers
    let headers = Array.from(rows[0].querySelectorAll('th')).map(th => th.textContent);
    csv_data.push(headers.join(','));

    // Get rows data
    for (let i = 1; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll('td');
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].textContent);
        }
        csv_data.push(csvrow.join(","));
    }
    return csv_data.join('\n');
}

// Fonction pour télécharger le fichier CSV
function downloadCSVFile(csv_data) {
    const CSVFile = new Blob([csv_data], { type: "text/csv" });
    const temp_link = document.createElement('a');
    temp_link.download = "data.csv";
    const url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}

// Fonction pour exporter les données en CSV
function exportCSV() {
    const csv_data = tableToCSV();
    downloadCSVFile(csv_data);
}
