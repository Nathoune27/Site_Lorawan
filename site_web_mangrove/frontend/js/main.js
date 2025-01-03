// js/main.js

// Fonction pour charger les types de données depuis la base et générer les cases à cocher
async function loadDataTypes() {
    try {
        const response = await fetch('../backend/getTypes.php');
        const types = await response.json();
        
        const checkboxesDiv = document.getElementById('type-checkboxes');
        types.forEach(type => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" value="${type}" class="type-checkbox"> ${type}`;
            checkboxesDiv.appendChild(label);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des types de données:', error);
    }
}

// js/main.js

// Fonction pour charger les noms des colonnes depuis la base et générer les cases à cocher
async function loadColumnNames() {
    try {
        const response = await fetch('../backend/getColumns.php');
        const columns = await response.json();
        
        const checkboxesDiv = document.getElementById('column-checkboxes');
        columns.forEach(column => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" value="${column}" class="column-checkbox" checked> ${column}`;
            checkboxesDiv.appendChild(label);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des noms des colonnes:', error);
    }
}

// Fonction pour charger les sondes depuis la base et générer les cases à cocher
async function loadSensors() {
    try {
        const response = await fetch('../backend/getSensors.php');
        const sensors = await response.json();
        
        const checkboxesDiv = document.getElementById('sensor-checkboxes');
        sensors.forEach(sensor => {
            const label = document.createElement('label');
            label.innerHTML = `<input type="checkbox" value="${sensor.devEUI}" class="sensor-checkbox"> ${sensor.devEUI}`;
            checkboxesDiv.appendChild(label);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des sondes:', error);
    }
}

// Appeler loadSensors() lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    loadDataTypes();
    loadColumnNames();
    loadSensors();
});

// Modifier la fonction applyFilters pour inclure les sondes sélectionnées
async function applyFilters() {
    try {
        const types = Array.from(document.querySelectorAll('.type-checkbox:checked')).map(cb => cb.value);
        const columns = Array.from(document.querySelectorAll('.column-checkbox:checked')).map(cb => cb.value);
        const sensors = Array.from(document.querySelectorAll('.sensor-checkbox:checked')).map(cb => cb.value);
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;

        const typeQuery = types.join(',');
        const columnQuery = columns.join(',');
        const sensorQuery = sensors.join(',');
        const response = await fetch(`../backend/getData.php?types=${typeQuery}&columns=${columnQuery}&sensors=${sensorQuery}&start=${start}&end=${end}`);
        const data = await response.json();

        const parsedData = parseTimeData(data);

        populateTable(parsedData, columns);
        updateD3(parsedData);
        updateChartJS(parsedData);
    } catch (error) {
        console.error('Erreur lors de l\'application des filtres:', error);
    }
}

// Function to parse and format time data
function parseTimeData(data) {
    return data.map(d => {
        d.time = new Date(d.time);
        return d;
    });
}

// Fonction pour remplir le tableau avec les données
async function populateTable(data, columns) {
    const table = document.getElementById('table');
    const thead = table.getElementsByTagName('thead')[0];
    const tbody = table.getElementsByTagName('tbody')[0];
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Ordre des colonnes souhaité
    const headersOrder = ['devEUI', 'time', 'type', 'data'];
    

    // Filtrer les colonnes sélectionnées dans l'ordre souhaité
    const selectedHeaders = headersOrder.filter(header => columns.includes(header));

    // Ajouter les en-têtes dynamiquement
    const tr = document.createElement('tr');
    selectedHeaders.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    // Ajouter les données du tableau
    data.forEach(row => {
        const tr = document.createElement('tr');
        selectedHeaders.forEach(header => {
            const td = document.createElement('td');
            if (header === 'time') {
                td.textContent = new Date(row[header]).toLocaleDateString('fr-FR');
            } else {
                td.textContent = row[header];
            }
            tr.appendChild(td);
        });
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