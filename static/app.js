// box plot javascript code


d3.json("/age").then(response => {
    var trace = [];
    var data= [];
    var layout = {
        title: 'Age of Male Olympians through the Years',
        showlegend: false
      };
    response.forEach(el => {
        Object.entries(el).forEach(([key, value]) => {
            trace[el] = {
                y: value,
                type: "box",
                name: key,
                marker: {
                    color: "rgb(8,81,156)",
                    outliercolor: "rgba(219, 64, 82, 0.6)",
                    line: {
                        outliercolor: "rgba(219, 64, 82, 1.0)",
                        outlierwidth: 2
                    }
                },
                boxpoints: "suspectedoutliers"
            };
            data.push(trace[el]);
        })
    })
    return Plotly.newPlot('graph', data, layout, {displayModeBar: false});
})



// connected scatterplot javascript code

d3.json("/buildAll").then(response => {
    // set the dimensions and margins of the graph
     var margin = {top: 10, right: 30, bottom: 30, left: 60},
         width = 460 - margin.left - margin.right,
         height = 400 - margin.top - margin.bottom;
     // append the svg object to the body of the page
     var svg = d3.select("#connected_scatter")
         .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
         .append("g")
             .attr("transform",
                 "translate(" + margin.left + "," + margin.top + ")");
     //Read the data
     response.forEach(el => {
         Object.entries(el).forEach(([key, value]) => {
             trace[el] = {
                 // START HERE
             
     // Now I can use this dataset:
     function(data {
     // Add X axis --> it is a date format
     var x = d3.scaleTime()
     .domain(d3.extent(data, function(d) { return d.date; }))
     .range([ 0, width ]);
     svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));
     // Add Y axis
     var y = d3.scaleLinear()
     .domain( [8000, 9200])
     .range([ height, 0 ]);
     svg.append("g")
     .call(d3.axisLeft(y));
     // Add the line
     svg.append("path")
     .datum(data)
     .attr("fill", "none")
     .attr("stroke", "#69b3a2")
     .attr("stroke-width", 1.5)
     .attr("d", d3.line()
         .x(function(d) { return x(d.date) })
         .y(function(d) { return y(d.value) })
         )
     // Add the points
     svg
     .append("g")
     .selectAll("dot")
     .data(data)
     .enter()
     .append("circle")
         .attr("cx", function(d) { return x(d.date) } )
         .attr("cy", function(d) { return y(d.value) } )
         .attr("r", 5)
         .attr("fill", "#69b3a2")
     }); 
     });
 })