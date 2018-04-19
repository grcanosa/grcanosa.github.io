---
layout: page
title: About me
subtitle: Why you'd want to go on a date with me
---

My name is Inigo Montoya. I have the following qualities:

- I rock a great mustache
- I'm extremely loyal to my family

What else do you need?

### my history

To be honest, I'm having some trouble remembering right now, so why don't you just watch [my movie](http://en.wikipedia.org/wiki/The_Princess_Bride_%28film%29) and it will answer **all** your questions.

### My Travels

I have been to {{site.data.travel.countries | size }} different countries.

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
<script src="/static/js/datamaps/datamaps.world.min.js"></script>
<div id="container" style="position: relative; width: 100%; height: 425px;"></div>
<script>
   // var map = new Datamap({element: document.getElementById('container')});
    var basic_choropleth = new Datamap({
  element: document.getElementById("container"),
  geographyConfig: {
            popupTemplate: function(geo, data) {
                return ['<div class="hoverinfo"><strong>',
                        geo.properties.name + ' ('+geo.id+')',
                        '</strong></div>'].join('');
            }
        },
 projection: 'mercator',
  fills: {
    defaultFill: "#ABABAB",
    authorHasTraveledTo: "#44AC53"
  },
  data: {
  {% for country in site.data.travel.countries %}
    {{country.id}} : { fillKey: "authorHasTraveledTo" },
  {% endfor %}
  }
});
</script>