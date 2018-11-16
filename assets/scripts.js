$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function random_color_masthead()
{
  
  colors = ["#007bff","#6610f2"
  ,"#6f42c1"
  ,"#e83e8c"
  ,"#dc3545"
  ,"#fd7e14"
  ,"#ffc107"
  ,"#28a745"
  ,"#0085A1"
  ,"#17a2b8"]
  random_color_indx = Math.floor(Math.random() * colors.length)
  if($(".masthead-no-img").length > 0){
    
    $(".masthead-no-img").css("background-color",colors[random_color_indx])
    $(".nav-item a").css("color",colors[random_color_indx])
  }
}
random_color_masthead()
