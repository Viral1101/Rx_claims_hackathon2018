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

  function loadDonut(data){
    change(chartData(data));
  }
=======
  function chartData() {
    var labels = color.domain();
    return labels.map(function (label) {
      return {label: label, value: Math.random()}
    });
  }

  change(chartData());
>>>>>>> c9b4a16eb58910016cfd87b78fe4745c73881ca9

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
