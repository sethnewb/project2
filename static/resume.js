(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict






// age graph function

function buildAgeGraph(gender) {
  d3.json(`/age/${gender}`).then(response => {
    var trace = [];
    var data= [];
    var layout = {
        title: `Age of ${gender} Olympians through the Years`,
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
}

// connected scatter plot function- NEED to complete
function buildConnectedScatter(build) {}

// function for when the gender for the age graph is changed
function genderChanged(gender) {
  buildAgeGraph(gender);
}

// function for when the build options are changed on drop down menu for althetic build over time
function buildChanged(build) {
  buildConnectedScatter(build);
}



// init function is called when the page is loaded. 
// add necessary functions to it for your graphs

function init() {
  var selectedGender = d3.select("#selGender").node().value;
  buildAgeGraph(selectedGender)

  var selectedBuild = d3.select("#selBuild").node().value;
  buildConnectedScatter(selectedBuild)
}


init();