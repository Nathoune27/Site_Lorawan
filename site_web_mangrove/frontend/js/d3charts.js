// js/d3charts.js

function updateD3(data) {
    const d3Div = document.getElementById('d3Graph');
    d3Div.innerHTML = '';  // Vider le graphique existant

    const svg = d3.select("#d3Graph").append("svg")
                  .attr("width", "100%")
                  .attr("height", 400);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = d3Div.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const g = svg.append("g")
                 .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parsing des données
    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S");

    data.forEach(d => {
        d.time = parseTime(d.time);
        d.data = +d.data;
    });

    x.domain(d3.extent(data, d => d.time));
    y.domain([0, d3.max(data, d => d.data)]);

    g.append("g")
     .attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x));

    g.append("g")
     .call(d3.axisLeft(y));

    g.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "steelblue")
     .attr("stroke-width", 1.5)
     .attr("d", d3.line()
                   .x(d => x(d.time))
                   .y(d => y(d.data))
          );
}
