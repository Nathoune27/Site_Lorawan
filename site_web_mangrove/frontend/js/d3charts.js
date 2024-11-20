function updateD3(data) {
    console.log('D3 data:', data); // Log the data received by D3

    const d3Div = document.getElementById('d3Graph');
    d3Div.innerHTML = ''; // Réinitialiser le graphique

    const svg = d3.select("#d3Graph").append("svg")
                  .attr("width", "100%")
                  .attr("height", 400);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = d3Div.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Grouper les données par type
    const series = d3.groups(data, d => d.type).map(([type, values]) => ({
        type,
        values
    }));

    // Configurer les échelles
    const x = d3.scaleTime()
                .domain(d3.extent(data, d => d.time))
                .range([0, width]);

    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.data)])
                .range([height, 0]);

    // Ajouter les axes
    g.append("g")
     .attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d/%m/%Y")));

    g.append("g")
     .call(d3.axisLeft(y));

    // Couleurs pour chaque série
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Tracer les lignes pour chaque série
    series.forEach(s => {
        console.log(s.values); // Vérifiez que les données sont correctes
        g.append("path")
         .datum(s.values)
         .attr("fill", "none")
         .attr("stroke", color(s.type))
         .attr("stroke-width", 1.5)
         .attr("d", d3.line()
                       .x(d => x(d.time))
                       .y(d => y(d.data))
          );
    });

    // Ajouter une légende
    const legend = g.selectAll(".legend")
                    .data(series)
                    .enter().append("g")
                    .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", d => color(d.type));

    legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(d => d.type);
}
