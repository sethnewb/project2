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

