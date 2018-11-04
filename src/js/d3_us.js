var temp = [{_id:""},{_id:"1"}];

//buildMap(temp);

//function buildMap(input){

//  d3.selectAll("svg").remove;

var width = 960,
    height = 500,
    centered;

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);


  //var totals = input;

  //if (!input) totals = "0";

  d3.json("us.json", function(error, us) {
    if (error) throw error;

    g.append("g")
      .attr("id", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("id", function(d) {return d.id;})
      /*.attr("value", function(d){
        var result = 0;

        totals.forEach(function(D){
          if (D._id === d.id){
            result = D.total;
          }
        })
        return result;
      })*/
      .attr("d", path)
      .on("click", clicked)
      .on("mouseover", function(d) {          //move the tooltip div and set the values when mousing over a bubble
        div.transition()
          .duration(200)
          .style("opacity", .9);
        div.html(d.id + "<br/>" + "$" + parseFloat(this.getAttribute("value")).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}))
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {           //hide the tooltip on mouseout
        div.transition()
          .duration(500)
          .style("opacity", 0);
      });

    g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path);
  });



function clicked(d) {
    var x, y, k;

  if (d && centered !== d) {
        var centroid = path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        centered = d;
    } else {
        x = width / 2;
        y = height / 2;
        k = 1;
        centered = null;
    }

    g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
}

function colorStates(totals) {

  var result = 0;

  totals.forEach(function (D) {
    d3.selectAll("path#" + D._id)
      .style("fill", function (d) {
        var color = "#aaa";

        if (D._id === d.id) {
          result = D.total;
        }

        if (result <= Math.pow(10,7)){
          color = "#0F0";
        }else if (result <= Math.pow(10,8)){
          color = "#dcff00";
        }else if (result <= Math.pow(10,8) * 5){
          color = "#ffb700";
        }else if (result <= Math.pow(10,9)){
          color = "#ff9300";
        }else if (result <= Math.pow(10,9)*5){
          color = "#ff1a00";
        }


        return color;
      })
      .attr("value",result);
  })
}
