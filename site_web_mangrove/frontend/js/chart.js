// js/chart.js

let chart; // Déclarez une variable globale pour le graphique

function updateChartJS(data) {
    const ctx = document.getElementById('chartJSGraph').getContext('2d');

    // Détruisez le graphique existant s'il existe
    if (chart) {
        chart.destroy();
    }

    // Groupez les données par type
    const groupedData = data.reduce((acc, d) => {
        if (!acc[d.type]) {
            acc[d.type] = [];
        }
        acc[d.type].push({ x: d.time, y: d.data });
        return acc;
    }, {});

    // Créez un dataset pour chaque type
    const datasets = Object.keys(groupedData).map(type => ({
        label: type,
        data: groupedData[type],
        borderColor: getRandomColor(),
        borderWidth: 1,
        fill: false
    }));

    // Créez le nouveau graphique
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day', // Ajustez l'unité de temps pour gérer les grandes plages de dates
                        tooltipFormat: 'PPpp', // Format de date et heure
                        displayFormats: {
                            minute: 'MMM d, h:mm a',
                            hour: 'MMM d, h:mm a',
                            day: 'MMM d, yyyy'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Date et Heure'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valeur'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.raw.y;
                            const time = new Date(context.raw.x).toLocaleString('fr-FR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                second: 'numeric'
                            });
                            return `${label}: ${value} (${time})`;
                        }
                    }
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
