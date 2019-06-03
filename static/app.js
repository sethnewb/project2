//////////////////////////////////////////////
// Scatter Plot - Medals by Country by Year //
//////////////////////////////////////////////

d3.json("/medals").then( data => {
  
  // Console log the data to see what it looks like
  // console.log(data);

  // Creating a lookup table, sorting by year and country
  var lookup = {};
  function getData(year, Country) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }

	 // If a container for the year and country doesn't exist, create one
    if (!(trace = byYear[Country])) {
      trace = byYear[Country] = {
        locations: [],
        z: [],
        text: []
      };
    }
    return trace;
  }

  // Loop through the data and append data to each trace
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.Year, datum.Country);
    trace.locations.push(datum.Country);
    trace.z.push(datum.Medal);
    trace.text.push(datum.Year);
  }

  // Getting unique number of years
  var years = Object.keys(lookup);

  // Countries repeat every year, whether or not they have data...can grab first use as representative list of country names
  var firstYear = lookup[years[0]];
  var countries = Object.keys(firstYear);

  // Creating a trace for each country
  var traces = [];
  for (i = 0; i < countries.length; i++) {
    var data = firstYear[countries[i]];

	 // Creating a single trace here to which the frames will pass data for ecah year. Slice the arrays to ensure we never write any new data into our lookup table
    traces.push({
      name: countries[i],
      locations: data.locations.slice(),
      z: data.z.slice(),
      text: `Year: ${data.text.slice()}`,
      // Instead of using country code ('ISO-3'), we will use 'country names'
      locationmode: "country names",
      // Identify the type of the viz
      type: 'choropleth',
      autocolorscale: 1,
      // Setting colorbar scale
      zmin: 0,
      zmax: 5000,
      zauto: false,
      // Adjusting the colorbar on the right of the viz
      colorbar: {
        lenmode: 'fraction',
        len: 0.75,
        title: "Medal Count",
        fontsize: 10,
        titlefont: {
          size: 10
        }
      }
    });
  }

  // Create a frame for each year
  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: countries.map(function (country) {
        return getData(years[i], country);
      })
    })
  }

  // Test what the frames look like
  // console.log(frames);

  // Create sliders - one for each frame
  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 0.5},
        frame: {duration: 0.5, redraw: false},
      }]
    });
  }

  // Define our layout properties
  var layout = {
    title: 'Olympic Medals By Country By Year (1896-2016)',
    width: 1000,
    height: 600,
    padding: {
      l:0,
      r:0,
      b:0,
      t:0
    },
    geo:{
       countrycolor: 'rgb(255, 255, 255)',
       showland: true,
       landcolor: 'rgb(217, 217, 217)',
       showlakes: true,
       lakecolor: 'rgb(255, 255, 255)',
       subunitcolor: 'rgb(255, 255, 255)',
       lonaxis: {},
       lataxis: {}
    },
    hovermode: 'closest',
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 150},
          frame: {duration: 250, redraw: true}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: true}
        }],
        label: 'Pause'
      }]
    }],
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]

  };

  // Create the plot:
  Plotly.plot('choropleth', {
    data: traces,
    layout: layout,
    frames: frames,
    // Trying to remove the Plotly Display Bar...doesn't seem to be working
    displayModeBar: false
  });
});