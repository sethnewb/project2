// box plot javascript code

console.log("Hello!");

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

 
 // Choropleth World Olympic Medal Map using Plotly

 Plotly.d3.json('/medals'), function(err, rows){
  console.log("Hello!");
  function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; })
  }

  var frames = []
  var z = unpack(rows, 'Medal')
  var locations = unpack(rows, 'NOC')

  // Number of unique years
  var n = 35;
  // Number of unique countries
  var j = 143;
  // Counter
  var k = 0;
  // First year
  var num = 1895

  for (var i = 0; i < n; i++) {
    k++
    num++
    j = 143
    j = j*k
    frames[i] = {data: [{z: [], locations: []}], name: num}
    frames[i].data[0].z = z.slice(0, j);
    frames[i].data[0].locations = locations.slice(0, j);
  }

var data = [{
      type: 'choropleth',
      locationmode: 'ISO-3',
      locations: frames[0].data[0].locations,
      z: frames[0].data[0].z,
      text: frames[0].data[0].locations,
      zauto: false,
      zmin: 0,
      zmax: 5000
}];

var layout = {
    title: 'Incremental Olympic Medals Won by Country (1896-2016) (7 Steps)',
    geo:{
      //  scope: 'usa',
       countrycolor: 'rgb(255, 255, 255)',
       showland: true,
       landcolor: 'rgb(217, 217, 217)',
       showlakes: true,
       lakecolor: 'rgb(255, 255, 255)',
       subunitcolor: 'rgb(255, 255, 255)',
       lonaxis: {},
       lataxis: {}
    },
    updatemenus: [{
      x: 0.1,
      y: 0,
      yanchor: "top",
      xanchor: "right",
      showactive: false,
      direction: "left",
      type: "buttons",
      pad: {"t": 87, "r": 10},
      buttons: [{
        method: "animate",
        args: [null, {
          fromcurrent: true,
          transition: {
            duration: 200,
          },
          frame: {
            duration: 500,
            redraw: false
          }
        }],
        label: "Play"
      }, {
        method: "animate",
        args: [
          [null],
          {
            mode: "immediate",
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        ],
        label: "Pause"
      }]
    }],
    sliders: [{
      active: 0,
      steps: [{
        label: "1896",
        method: "animate",
        args: [["1896"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": false}
          }
        ]
      },{
        label: "1924",
        method: "animate",
        args: [["1924"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": false}
          }
        ]
      }, {
        label: "1952",
        method: "animate",
        args: [["1952"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": false}
          }
        ]
      }, {
        label: "1976",
        method: "animate",
        args: [["1976"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": false}
          }
        ]
      }, {
        label: "2000",
        method: "animate",
        args: [["2000"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": false}
          }
        ]
      }, {
        label: "2008",
        method: "animate",
        args: [["2008"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": false}
          }
        ]
      }, {
        label: "2016",
        method: "animate",
        args: [["2016"], {
            mode: "immediate",
            transition: {duration: 300},
            frame: {duration: 300, "redraw": false}
          }
        ]
      }],
      x: 0.1,
      len: 0.9,
      xanchor: "left",
      y: 0,
      yanchor: "top",
      pad: {t: 50, b: 10},
      currentvalue: {
        visible: true,
        prefix: "Year:",
        xanchor: "right",
        font: {
          size: 20,
          color: "#666"
        }
      },
      transition: {
        duration: 300,
        easing: "cubic-in-out"
      }
    }]
};

Plotly.plot(choropleth, data, layout, {displayModeBar: false}).then(function() {
    Plotly.addFrames('choropleth', frames);
  });
};