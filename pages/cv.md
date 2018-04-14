---
layout: page
title: CV
subtitle: 
---


# Professional Experience

{% for section in site.data.cv.experience %}

## {{ section.name }}

{% for work in section.list %}



### `{{ work.years }}` {{ work.position }}

<i class="fa fa-building fa-lg"></i> {{ work.company }} 
<i class="fa fa-globe fa-lg"></i>   {{ work.city }}

{{ work.description }}

{% if work.skills %}
> Skills: {{ work.skills }}
{% endif %}

{% if work.projects %}
> Projects: {{ work.projects }}
{% endif %}

{% endfor %}
{% endfor %}

---
# Technical Skills


---
# Education

{% for education in site.data.cv.education  %}
### `{{ education.years }}` {{education.degree}} 

<i class="fa fa-university fa-lg"></i> {{ education.university }} 
<i class="fa fa-globe fa-lg"></i>   {{ education.city }}


{% endfor%}

---
## Contact

[gonzalo@granosa.com](mailto:gonzalo@grcanosa.com)

[grcanosa@gmail.com](mailto:grcanosa@gmail.com)
