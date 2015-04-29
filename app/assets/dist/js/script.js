/**
 * Created by abid on 29/04/2015.
 */
var Obj = {
    color: {
        standby: "#333333",
        progress: '#f7ca18',
        ok: "#2bb38a",
        ko: "#e34b51"
    }
};
/**
 * @author Anis ABID
 * Created by abid on 27/04/2015.
 */


var width = 70,
    height = 70,
    outerRadius = Math.min(width, height) * .5,
    innerRadius = outerRadius * .85;

var n = 4;


var arc = d3.svg.arc();

var pie = d3.layout.pie()
    .sort(null);

d3.selectAll(".circle").each(function (d, i) {

    var color = [],
        data = [],
        obj = {},
        json = JSON.parse(d3.select(this).attr('data-json'));

    for (var k in json) {
        color.push(Obj.color[json[k]["status"]]);
        data.push(json[k]["val"]);
        obj[json[k]["status"]] = json[k]["val"];
    }

    var svg = d3.select(this).append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("text")
        .attr("x", "52%")
        .attr("y", "60%")
        .attr("text-anchor", "middle")
        .text((obj["ok"]*100)+"%");


    svg.selectAll(".arc")
        //.data(arcs(data))
        .data(arcs(data))
        .enter().append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .append("path")
        .attr("fill", function (d, i) {
            return color[i];
        })
        .attr("d", arc);

});


//transition();

function arcs(data) {
    var arcs = pie(data),
        i = -1,
        arc;
    while (++i < n) {
        arc = arcs[i];
        arc.innerRadius = innerRadius;
        arc.outerRadius = outerRadius;
    }
    return arcs;
}