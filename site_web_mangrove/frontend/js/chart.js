// js/chart.js

async function updateChartJS(data) {
    console.log('ChartJS data:', data); // Log the data received by ChartJS

    // Ensure time data is in Date format
    data.forEach(d => {
        d.time = new Date(d.time);
    });

    // Obtenir le contexte du canvas Chart.js
    const ctx = document.getElementById('chartJSGraph').getContext('2d');

    // Grouper les données par type
    const groupedData = d3.groups(data, d => d.type);

    // Préparer les datasets pour chaque type de donnée
    const datasets = groupedData.map(([type, values]) => {
        return {
            label: type,
            data: values.map(d => ({ x: d.time, y: d.data })), // Chart.js comprend {x, y}
            borderColor: getRandomColor(),
            fill: false
        };
    });

    // Créer le graphique
    new Chart(ctx, {
        type: 'line',
        data: {
            datasets
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: { unit: 'hour' }, // Affichage des heures
                    adapters: {
                        date: {
                            locale: window.dateFnsLocaleFr
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return new Date(value).toLocaleDateString('fr-FR');
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Fonction pour générer une couleur aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
