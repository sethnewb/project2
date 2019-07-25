// scatter plot function for athletic build all sports
var connectedScatterInitialized = false;
var svg; 

function buildConnectedScatter(build) {
  if (!connectedScatterInitialized)
    svg = initSVG(); 
  
  var margin = {top: 30, right: 30, bottom: 30, left: 30},
  width = 925 - margin.left - margin.right,
  height = 550 - margin.top - margin.bottom;

  svg.remove();
  svg = d3.select("#connected_scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  svg.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



  console.log(`/buildAll/${build}`);
  var athleteBuild = `/buildAll/${build}`;
  d3.json(athleteBuild).then(function(bodyData) {

    // set the dimensions and margins of the graph
    console.log("bodyData") 
    console.log(bodyData) 
  
     // append the svg object to the body of the page
     
    //Reformat the json object so that the data is clustered by sport
    var dataReorg = {};
    bodyData.forEach(function(d){
    // if the sport isn't already in the dataReord dictionary
    if(! (d.Sport in dataReorg))
      // then add an empty array named after that sport
      dataReorg[d.Sport] = [];
      // and push all the data from bodyData for that sport into that array
      dataReorg[d.Sport].push(d);
  })
  // make a list of the keys (sport names) represented in that dictionary
  for (i=0; i< Object.keys(dataReorg).length; i++);
  // console.log("dataReorg!!")
  // console.log(dataReorg)
    
    // Add X axis --> year
    var pad = 30
    var parseTime = d3.timeParse("%Y");
    bodyData.forEach(function(d) {
        d.date = parseTime(d.Year);
            });
    var x = d3.scaleTime()
    x.domain([bodyData[0].date, bodyData[bodyData.length-1].date]);
    x.range([200, width - pad]);
      console.log("bodyData.date");
      console.log(bodyData[bodyData.length-1].date);
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%Y")));

  

    // Add Y axis
    var minBuild =100000;
    var maxBuild = -1;
    bodyData.forEach(function(d) {
      if (d.Build > maxBuild) {
        maxBuild = d.Build;
      }
      if (d.Build < minBuild) {
        minBuild = d.Build;
      }
    });

    // Setting y Axis
    var y = d3.scaleLinear()
      .domain([minBuild-0.1*minBuild, maxBuild+0.1*maxBuild])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y))
      .attr("class", "axis")
      .attr("transform", "translate(" + pad + ", 0)")
      console.log("minBuild, maxBuild: ")
      console.log([minBuild, maxBuild]);

    // Add the data points as path line (take 1, all points are connected as line)
    var line = d3.line()
      .x( function(d) { return x(d.date) } )
      .y( function(d) { return y(d.Build) } )
    svg.append("path")
      .datum(bodyData)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "#9eb6c1")
      .on("mouseover", function(d) {   
        d3.select(this).attr("r", 5)
            .style("stroke", "#63031a")  
        })                  
    .on("mouseout", function(d) {       
        d3.select(this).attr("r", 2)
            .style("stroke", "#9eb6c1")
        // div.transition()        
        //     .duration(200)      
        //     .style("opacity", 0);   
      });

  // Add the data points as path line (take 2, try to get distinct lines)
  // var line = d3.svg.line()
  //     .x( function(d,i) { 
  //       return x(d.date);
  //       })
  //     .y( function(d) { 
  //       return y(d.Build); 
  //       });
  // var sportType = {};
  // d3.text(***)
  // svg.append("path")
  //   .datum(bodyData)
  //   .attr("class", "line")
  //   .attr("d", line)
  //   .attr("fill", "none")
  //   .attr("stroke", "#9eb6c1")
  //   .on("mouseover", function(d) {   
  //     d3.select(this).attr("r", 5)
  //         .style("stroke", "#63031a")  
  //     })                  
  // .on("mouseout", function(d) {       
  //     d3.select(this).attr("r", 2)
  //         .style("stroke", "#9eb6c1")
  //     // div.transition()        
  //     //     .duration(200)      
  //     //     .style("opacity", 0);   
  //   });

// Add the data points as circles
  svg.append("g")
    .selectAll("dot")
    .data(bodyData)
    .enter()
    .append("circle")
        .attr("cx", function(d) { return x(d.date) } )
        .attr("cy", function(d) { return y(d.Build) } )
        .attr("r", 2)
        .attr("fill", "#9eb6c1")
    // tried mouseover here to see if it works and it does, but it only selects one circle
    // when the path is working, move this to modify and light up the path
    .on("mouseover", function(d) {   
          d3.select(this).attr("r", 5)
              .style("fill", "#63031a");   
          })                  
      .on("mouseout", function(d) {       
          d3.select(this).attr("r", 2)
              .style("fill", "#9eb6c1");
          // div.transition()        
          //     .duration(200)      
          //     .style("opacity", 0);   
      });

      svg
      .append("g")
      .selectAll("dot")
      .data(bodyData)
      .enter()
      .append("circle")
          
          .attr("cx", function(d) { if (d.Sport === "gymnastics") {
            
          return x(d.date) }} )
          .attr("cy", function(d) { if (d.Sport === "gymnastics") {
            return y(d.Build) }} )
          .attr("r", 5)
          .attr("fill", "#63031a");

    // Add the path line (still not working)
      // console.log("dataReorg[d.Sport][i][1]");
      console.log(dataReorg);
    
      svg.append("svg:path")
        .data(bodyData)
        .attr("fill", "none")
        .attr("stroke", "#9eb6c1")
        .attr("stroke-width", 30)
        .attr("d", d3.line()
            .x("x", function(d) { return x(d.date) })
            .y("y", function(d) { return y(d.Build) })
            );
        // eventual code for mouse over effect to darker line
        // still need to work in "Sport" name as a pop up box label during mouse over
        // .on("mouseover", function(d) {   
        //     d3.select(this).attr("stroke-width", 30)
        //         .style("stroke", "#63031a");
        //     div.transition()        
        //         .duration(70)      
        //         .style("opacity", .7);      
        //     div .html(formatTime(d.date) + "<br/>"  + d.close)  
        //         .style("left", (d3.event.pageX) + "px")     
        //         .style("top", (d3.event.pageY - 28) + "px");    
        //     })                  
        // .on("mouseout", function(d) {       
        //     d3.select(this).attr("stroke-width", 1.5)
        //         .style("stroke", "#9eb6c1");
        //     div.transition()        
        //         .duration(200)      
        //         .style("opacity", 0);   
        // });

  })
}

// function for when the athletic build drop down menu changes
function buildChanged(build) {
  buildConnectedScatter(build);
}



// init function is called when the page is loaded. 

function init() {
  // build scatter plot with  drop down menu change  
  var selectedBuild = d3.select("#selBuild").node().value;
  buildConnectedScatter(selectedBuild)
}

function initSVG() {
  var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 925 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;
  var svg = d3.select("#connected_scatter")
         .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom);

  connectedScatterInitialized = true;
  return svg;
}


init();
