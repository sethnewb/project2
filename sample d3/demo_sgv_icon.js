
// Version #1: group of SVG objects drawn like a person and grouped as SVG group
// Resize all SVG widths by changing size of figure with change in percentage of body change
var svg = d3.select("body").append("svg")
            .attr("width", 200)
            .attr("height", 200);

var personGroup = svg.append("g");

personGroup.append("ellipse")
    .attr("cx", 50)
    .attr("cy", 30)
    .attr("rx", 25)
    .attr("ry", 25)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "red")
    .attr("opacity", 0.75);

personGroup.append("rect")
    .attr("x", 20)
    .attr("y", 55)
    .attr("width", 60)
    .attr("height", 65)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "red")
    .attr("opacity", 0.75);

personGroup.append("rect")
    .attr("x", 35)
    .attr("y", 120)
    .attr("width", 10)
    .attr("height", 40)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "red")
    .attr("opacity", 0.75);

personGroup.append("rect")
    .attr("x", 55)
    .attr("y", 120)
    .attr("width", 10)
    .attr("height", 40)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "red")
    .attr("opacity", 0.75);

// Will ultimately need a trigger here to activate when a dropdown menu or slider is changed; something like:
// d3.select("#reset").on("click", function() {
// 	rectangle
// 		.transition()
// 		.attr("x", 50)
// 		.attr("y", 50);
// }); http://duspviz.mit.edu/d3-workshop/transitions-animation/

// ?? How to change all of the widths at once? Or have one function for each?
// personGroup.selectAll("ellipse")
//     .transition()
//       .attr("rx", 12.5)
//     .selectAll("rect")
//       .transition()
//     .attr("width", 30)
//     .attr("height", 32.5);
// personGroup.attr("transform", "translate(80,0)");

// Option #2: start with shape representing the average and when dropdown represents increase, draw an outside in same color to thicken
//  to increase or draw outline to white to decrease to match change.  More complicated?
var svg = d3.select("body").append("svg")
            .attr("width", 200)
            .attr("height", 200);

personGroup.append("ellipse")
    .attr("cx", 50)
    .attr("cy", 30)
    .attr("rx", 25)
    .attr("ry", 25)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "red")
    .attr("opacity", 0.75);

personGroup.append("rect")
    .attr("x", 20)
    .attr("y", 55)
    .attr("width", 60)
    .attr("height", 65)
    .attr("stroke", "black")
    .attr("stroke-width", 3)
    .attr("fill", "red")
    .attr("opacity", 0.75);