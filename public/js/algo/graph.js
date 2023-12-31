function InsertNode() {
  var t = Number(textBox.value || getRandomInt(0, 1e3));
  bst.InsertVal(t),
    (textBox.value = ""),
    (msg.innerHTML = ""),
    textBox.focus(),
    drawTree();
}
function DeleteNode() {
  if ("" != textBox.value) {
    var t = Number(textBox.value);
    bst.DeleteVal(t), (textBox.value = ""), drawTree();
  }
  (msg.innerHTML = ""), textBox.focus();
}
function SearchNode() {
  var t, e;
  "" != textBox.value &&
    ((t = Number(textBox.value)),
    (e = bst.Search(t)),
    -1 == e ? (msg.innerHTML = "not found") : (msg.innerHTML = "found")),
    (textBox.value = ""),
    textBox.focus();
}
function Print(t) {
  var e = t.call(bst);
  (msg.innerHTML = e.join(", ")), textBox.focus();
}
function handleKeyPress(t) {
  var e = t.keyCode || t.which;
  (msg.innerHTML = ""), 13 == e && InsertNode();
}
function getRandomInt(t, e) {
  return Math.floor(Math.random() * (e - t)) + t;
}
function drawTree() {
  var t, e, n, r, a, o, d, s, i, l;
  d3.select("svg").remove(),
    bst.root &&
      ((t = bst.root.json),
      (e = { top: 40, right: 90, bottom: 50, left: 90 }),
      (n = window.innerWidth - 10 - e.left - e.right),
      (r = window.innerHeight - 250 - e.top - e.bottom),
      (a = d3.tree().size([n, r])),
      (o = d3.hierarchy(t)),
      (o = a(o)),
      (d = d3
        .select("body")
        .append("svg")
        .attr("width", n + e.left + e.right)
        .attr("height", r + e.top + e.bottom)),
      (s = d
        .append("g")
        .attr("transform", "translate(" + e.left + "," + e.top + ")")),
      (i = s
        .selectAll(".link")
        .data(o.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", function (t) {
          return (
            t.parent &&
              1 == t.parent.children.length &&
              ("right" == t.data.direction
                ? t.parent.parent
                  ? (t.x += Math.abs(t.parent.x - t.parent.parent.x) / 2)
                  : (t.x += n / 4)
                : t.parent.parent
                ? (t.x -= Math.abs(t.parent.x - t.parent.parent.x) / 2)
                : (t.x -= n / 4)),
            "M" +
              t.x +
              "," +
              t.y +
              "C" +
              (t.x + t.parent.x) / 2 +
              "," +
              (t.y + t.parent.y) / 2 +
              " " +
              (t.x + t.parent.x) / 2 +
              "," +
              (t.y + t.parent.y) / 2 +
              " " +
              t.parent.x +
              "," +
              t.parent.y
          );
        })),
      (l = s
        .selectAll(".node")
        .data(o.descendants())
        .enter()
        .append("g")
        .attr("class", function (t) {
          return "node" + (t.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (t) {
          return "translate(" + t.x + "," + t.y + ")";
        })),
      l.append("circle").attr("r", 30),
      l
        .append("text")
        .attr("dy", ".35em")
        .attr("y", function () {
          return 0;
        })
        .style("text-anchor", "middle")
        .text(function (t) {
          return t.data.name;
        }));
}
var textBox = document.getElementById("value"),
  msg = document.getElementById("msg");
