// Choropleth World Olympic Medal Map using Plotly

console.log("Outside d3 function")

d3.json('/medals').then( rows => {

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
    height: 600,
    width: 1000,
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
    Plotly.addFrames(choropleth, frames);
  });
});

// Test route
// d3.json('/medals').then( response => {
//   console.log(response);
// })