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
      .on("click", clicked);

    g.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("id", "state-borders")
      .attr("d", path);
  });



function clicked(d) {
    var x, y, k, id, abbr, state;
  id = d.id;

  d3.json("states.json", function(data) {
    state = (data[id]);
    abbr = state.abbr;
    console.log(abbr);
  });

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

  totals.forEach(function (D) {
    d3.selectAll("path#" + D._id)
      .style("fill", function (d) {
        var result = 0;
        var color = "#aaa";

        if (D._id === d.id) {
          result = D.total;
        }

        if (result <= 10^7){
          color = "#0F0";
        }else if (result <= 10^8){
          color = "#dcff00";
        }else if (result <= 10^8 * 5){
          color = "#ffb700";
        }else if (result <= 10^9){
          color = "#ff9300";
        }else if (result <= 10^9*5){
          color = "#ff1a00";
        }


        return color;
      })
  })
}
