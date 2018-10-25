
SVG.on(document, 'DOMContentLoaded', function() {
    var draw = SVG('drawing').size(1000,400)
    draw = draw.nested().x(10).y(50)
    var color1 = "#BA0B0B"
    var l1 = 50
    var h = 50
    var l2 = 150
    var rect = draw.rect(l1+l2, h).fill("none").stroke(color1)
    //var rect2 = draw.rect(l1, h).fill(color1).stroke(color1)
    var initial = draw.plain("g").fill("white")
            .cx(l1/2).cy(h/2).size(h)
            .attr({
              "text-anchor":"middle"
              , "dominant-baseline":"central"
              , "font-family": "'Open Sans', sans-serif"
              , "font-weight": 700
            })
    var bbox = initial.bbox()
    
    var name = draw.plain("grcanosa").fill("black").x(bbox.w).y(0).size(h).dy(1)
                          .attr({
                            "text-anchor":"start"
                            , "dominant-baseline":"central"
                            , "font-family": "'Open Sans', sans-serif"
                            , "font-weight": 700
                          })
    var rect2 = draw.rect(bbox.w, bbox.h).fill(color1).stroke(color1).x(bbox.x).y(bbox.y).back()
  })