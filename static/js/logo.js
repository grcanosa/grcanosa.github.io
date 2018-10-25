
SVG.on(document, 'DOMContentLoaded', function() {
    var draw = SVG('drawing').size(300,300)
    draw = draw.nested().x(10).y(10)
    var color1 = "#BA0B0B"
    var l1 = 50
    var h = 50
    var l2 = 150
    var rect = draw.rect(l1+l2, h).fill("none").stroke(color1)
    var rect2 = draw.rect(l1, h).fill(color1).stroke(color1)
    var initial = draw.plain("g").fill("white").cx(1).cy(1).size(h)
  })