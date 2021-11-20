$(document).ready(function() {

    $("#tweet-text").keydown(function() {
      
      let result = $(this).val().length + 1
      if(result > 140) {
        result = 140 - result
      }
      // console.log(result)
      $(this).parentsUntil(".new-tweet").find(".counter").text(result)
      
      if (result < 0) {
        $(".counter").attr("id", "negative"); 
      } else {
        $(".counter").removeAttr("id", "negative"); 
      }
      
})
  });
   