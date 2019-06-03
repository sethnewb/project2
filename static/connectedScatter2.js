// scatter plot function for athletic build all sports
function buildConnectedScatter(build) {
    console.log(`/buildAll/${build}`);
    var athleteBuild = `/buildAll/${build}`;
    d3.selectAll("svg > *").remove();
    d3.json(athleteBuild).then(function(bodyData) {
      // set the dimensions and margins of the graph
      console.log("bodyData") 
      console.log(bodyData) 
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
      //   // create empty dictionary
      // var dataReorg = {}
      // bodyData.forEach(function(d){
      //   // if the sport isn't already in the dataReord dictionary
      //   if(! (d.Sport in dataReorg))
      //     // then add an empty array named after that sport
      //     dataReorg[d.Sport] = [];
      //     // and push all the data from bodyData for that sport into that array
      //     dataReorg[d.Sport].push(d);
      // })
      // // make a list of the keys (sport names) represented in that dictionary
      // for (i=0; i< Object.keys(dataReorg).length; i++);
      
      // Reorganize the json object so data is grouped by sport; dictionary of sports with array within each sport
        // create empty dictionary and array
      
      var dataReorg = [],
      newbuildData = [];
      
      bodyData.forEach(function(value, index, array) {
          // if the sport isn't already in the dataReorg dictionary; passes 1st only
          if( bodyData.indexOf(value.Sport) === -1) {
            // and push all the data from bodyData for that sport into that array
            bodyData.push(value.Sport);
          }
        });
        
      dataReorg.forEach(function (value, index, array) {
          // pass records 2 to n and reorganize based on type
          bodyData.forEach(function (val, i, a) {
              if (val.Sport === value) {
                newbuildData.push({"Build" : val.Build,
                                  "Year" : val.Year,
                                  "date" : val.date
                  });
              }
          });
          array[index] = {
            "Sport" : value,
            "newbuildData" : newbuildData
          };
          newbuildData = [];
      return {
        "bodyData" : dataReorg 
      };  
      });
      
      // for(i=0; i < Object.keys(dataReorg).length; i ++)
      //   console.log(Object.keys(dataReorg)[i]);
      console.log("Reorganized data: ")
      console.log(dataReorg);
      console.log(dataReorg.Build);
  
        // make a list of the keys (sport names) represented in that dictionary
      //   for (i=0; i< Object.keys(dataReorg).length; i++);
      // console.log("Reorganized dictionary keys: ")
      // console.log(Object.keys(dataReorg)[i]);
      
      // Add X axis --> year
      var parseTime = d3.timeParse("%Y");
      bodyData.forEach(function(d) {
          d.date = parseTime(d.Year);
          // console.log(d.date);
      });
      var x = d3.scaleTime()
        .domain([bodyData[0].date, bodyData[bodyData.length-1].date])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
              .tickFormat(d3.timeFormat("%Y")));
      // Add Y axis
      var minHeight =100000;
      var maxHeight = -1;
      bodyData.forEach(function(d) {
        if (d.avg_height > maxHeight) {
          maxHeight = d.avg_height;
        }
        if (d.avg_height < minHeight) {
          minHeight = d.avg_height;
        }
      });
  
      var y = d3.scaleLinear()
        .domain([minHeight-0.1*minHeight, maxHeight+0.1*maxHeight])
        .range([ height, 0 ]);
        svg.append("g")
        .call(d3.axisLeft(y));
        console.log("minHeight, maxHeight: ");
        console.log([minHeight, maxHeight]);
  
      // Add the line
      var line = d3.svg.line().x(function(d, i) {
          return x(d.x);
      }).y(function(d) {
          return y(d.y);
      });
      // old line code; cut??
      // svg.append("path")
      //   .data(bodyData)
      //   .attr("fill", "none")
      //   .attr("stroke", "#9eb6c1")
      //   .attr("stroke-width", 30)
      //   .attr("d", d3.line()
      //       .x(function(d) { return x(d.date) })
      //       .y(function(d) { return y(d.Build) })
      //       );
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
      // Add the points
      svg
        .append("g")
        .selectAll("dot")
        .data(bodyData)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.date) } )
            .attr("cy", function(d) { return y(d.Build) } )
            .attr("r", 2)
            .attr("fill", "#9eb6c1")
    })
  }
  
  
  // function for when the athletic build drop down menu changes
  function buildChanged(build) {
    buildConnectedScatter(build);
  }
  
  
  
  // init function is called when the page is loaded. 
  // add necessary functions to it for your graphs
  
  function init() {
    // build scatter plot with  drop down menu change
    // will it autopopulate with the first choice automatically or do I need another function for that?
    var selectedBuild = d3.select("#selBuild").node().value;
    buildConnectedScatter(selectedBuild)
  }
  
  
  init();