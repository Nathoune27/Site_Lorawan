// js/grafana.js

function updateGrafana(type, start, end) {
    const grafanaDiv = document.getElementById('grafanaGraph');
    const grafanaURL = `https://your-grafana-instance/d-solo/your-dashboard-id?orgId=1&panelId=2&from=${new Date(start).getTime()}&to=${new Date(end).getTime()}&var-type=${type}`;
    grafanaDiv.innerHTML = `<iframe src="${grafanaURL}" width="100%" height="100%" frameborder="0"></iframe>`;
}
