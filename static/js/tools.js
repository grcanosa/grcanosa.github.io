function changeInTools(){
    console.log("lalala")
    $(".tool_item").hide()
    var sel = $("#tools_select").val()
    if(sel == "All"){
        $(".tool_item").show()
    }
    else{
        $("."+sel).show()
    }
}