/**
 * Created by karthik on 7/14/17.
 */
var myapp = angular.module('app',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});


myapp.controller('homeController',function($scope,$http){

  const reim = "Reimbursement";
  const numScrip = "Prescriptions";
  const getAmount = "$Total Amount Reimbursed";
  const getScrip = "$Number of Prescriptions";
  const prescrip = 'http://127.0.0.1:8081/prescrip';
  const prescripToggle = 'http://127.0.0.1:8081/prescripTog';

    $scope.getParam = getAmount;
    $scope.prescripURL = prescrip;
    $scope.saveState = "";

  $scope.selectState = reim;

    $scope.toggleData=function(){
      if($scope.selectState===reim){
        $scope.selectState = numScrip;
        $scope.getParam=getScrip;
        $scope.prescripURL=prescripToggle;
      }
      else{
        $scope.selectState = reim;
        $scope.getParam=getAmount;
        $scope.prescripURL=prescrip
      }

      $scope.getData();
      $scope.updateDonut($scope.saveState);

    }

    $scope.getData=function(){

        var params = {params:[{
          $group:{_id:"$State",total:{$sum:$scope.getParam}}
        }]};

        var req = $http.get('http://127.0.0.1:8081/get',params);
        req.success(function(data, status, headers, config) {
            //$scope.bookList = data;
            console.log(data);
            colorStates(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
        $scope.reimburseByMed();
    };

    $scope.getList=function(){
      var req = $http.get('http://127.0.0.1:8081/list');
      req.success(function(data, status, headers, config) {
        //$scope.bookList = data;
        console.log(data);
        //$scope.;
      });
      req.error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
    }

    $scope.scriptsUS=function(){
      var req = $http.get('http://127.0.0.1:8081/scipts');
      req.success(function(data, status, headers, config) {
        //$scope.bookList = data;
        console.log(data);
        //$scope.;
      });
      req.error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
    }

    $scope.updateDonut=function(state){
      $scope.saveState = state;
      var params = {params:{ usState:state }};
      var req = $http.get('http://127.0.0.1:8081/prescrip',params);
      req.success(function(data, status, headers, config) {
        loadDonut(data);
        //console.log(data);
        //$scope.;
      });
      req.error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
  }

    $scope.reimburseByMed=function(){
      var req = $http.get('http://127.0.0.1:8081/prescrip');
      req.success(function(data, status, headers, config) {
        loadDonut(data);
        console.log(data);
        //$scope.;
      });
      req.error(function(data, status, headers, config) {
        alert( "failure message: " + JSON.stringify({data: data}));
      });
    }

    $scope.delete = function(id,callback){

        $http.get('http://127.0.0.1:8081/delete/'+id)
            .success(function(data){
                console.log("Successfully deleted");
                $scope.getData();
            });
    };


    $scope.update = function(book,callback){

        $http.get('http://127.0.0.1:8081/update/'+book._id,{params:book})
            .success(function(data){
                console.log("Successfully updated");
                $scope.getData();
            });
    }


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

    $scope.updateDonut(d.id);

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

  // function makeDonut(donutData) {
  var svg = d3.select("body")
    .append("svg")
    .append("g");

  svg.append("g")
    .attr("class", "slices");
  svg.append("g")
    .attr("class", "labels");
  svg.append("g")
    .attr("class", "lines");

  var width = 960,
    height = 450,
    radius = Math.min(width, height) / 2;

  var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    });

  var arc = d3.svg.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.4);

  var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var key = function (d) {
    return d.data.label;
  };

  var color = d3.scale.ordinal()
    .domain(["5-ARI Medications", "AAB Antibiotic Medications", "ACE Inhibitor/ARB Medications",
      "ADHD Medications", "All Other Antibiotics by NCQA Drug Class Medications",
      "Antibiotics of Concern by NCQA Drug Class Medications", "Antidepressant Medications",
      "Antipsychotic Combination Medications", "Antipsychotic Medications",
      "Asthma Controller Medications", "Asthma Exclusions Medications", "Asthma Reliever Medication",
      "Beta-Blocker Medications", "Bronchodilator Medications", "Contraceptive Medications",
      "Corticosteroid Medications", "Cox-2 Selective NSAIDs and Nonaspirin NSAIDs Medications",
      "CWP Antibiotic Medications", "Dementia Medications", "Diabetes Medications",
      "Diuretic Medications", "DMARD Medications", "Estrogen Agonists Medications",
      "High and Moderate-Intensity Statin Medications", "High and Moderate-Intensity Statin Medications",
      "High-Risk Medications with Days Supply Criteria Medications", "Long-Acting Injections 14 Days Supply Medications",
      "Long-Acting Injections 28 Days Supply Medications", "Low-Intensity Statin Medications",
      "Medication Treatment for Alcohol Abuse or Dependence Medications", "Medication Treatment for Opioid Abuse or Dependence Medications",
      "Opioid Medications", "Oral Antipsychotic Medications", "Osteoporosis Medications",
      "Potentially Harmful Drugs—Rate 1 and Rate 2 Medications", "Potentially Harmful Drugs—Rate 1 Medications",
      "Potentially Harmful Drugs—Rate 2 Medications", "Retinoid Medications",
      "SSD Antipsychotic Medications", "Systemic Corticosteroid Medications",
      "UOD Opioid Medications"])
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00",
      "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00",
      "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00",
      "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00",
      "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c"]);

  function chartData(data) {
    var labels = color.domain();
    return labels.map(function (label) {

      var value = 1;
      //var max = 0;
      data.forEach(function (D) {
        if (D._id.substr(0, 7) === label.substr(0, 7))
          value = D.total_pres;
        //if (value > max) max=value;
      });

      return {label: label, value: value};
    });
  }
/*
  d3.select(".toggle")
    .
    });
*/

  function loadDonut(data){
    change(chartData(data));
  }

  function change(data) {

    /* ------- PIE SLICES -------*/
    var slice = svg.select(".slices").selectAll("path.slice")
      .data(pie(data), key);

    slice.enter()
      .insert("path")
      .style("fill", function (d) {
        return color(d.data.label);
      })
      .attr("class", "slice");

    slice
      .transition().duration(1000)
      .attrTween("d", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          return arc(interpolate(t));
        };
      });

    slice.exit()
      .remove();

    /* ------- TEXT LABELS -------*/

    var text = svg.select(".labels").selectAll("text")
      .data(pie(data), key);

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .attr("class", "chart-text")
      .text(function (d) {
        return d.data.label;
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

    text.transition().duration(1000)
      .attrTween("transform", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        };
      })
      .styleTween("text-anchor", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start" : "end";
        };
      });

    text.exit()
      .remove();

    /* ------- SLICE TO TEXT POLYLINES -------*/

    var polyline = svg.select(".lines").selectAll("polyline")
      .data(pie(data), key);

    polyline.enter()
      .append("polyline");

    polyline.transition().duration(1000)
      .attrTween("points", function (d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function (t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline.exit()
      .remove();
  }
// }


});

