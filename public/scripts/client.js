/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$( document ).ready(function() {
  $("#showing-error").hide()
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    let $tweet = $(`
    <section>
        <article>
          <tweet-header>
            <div class="group1">
              <div class="picture"><i ${data.user.avatars}></i></div>
              <div class="nickname">${escape(data.user.name)}</div>
            </div>
            <div class="blur-name" >${escape(data.user.handle)}</div>
          </tweet-header>
          <p>${escape(data.content.text)}</p>
          <tweet-footer>
            <div id="date">${timeago.format(data.created_at)}</div>
            <div style="font-size: 0.8rem;" class="icon"><i id="pic1" class="fa-solid fa-flag fa-xs"></i><i id="pic2" class="fa-solid fa-comment-dots fa-xs"></i><i id="pic3" class="fa-solid fa-heart fa-xs"></i></div>
          </tweet-footer>
        </article>
      </section>
    `)
    return $tweet;
  }

  const renderTweets = (tweets) => {
    let result;
    for (let i of tweets) {
      result = createTweetElement(i);
      $('.tweets-container').prepend(result);
    }
  }

$( "#tweet-form" ).submit(function(event) {
  event.preventDefault();
  const textValue = $('#tweet-text').val()
  const seri_data = $("#tweet-form").serialize();
  
  
  if(textValue.length === 0) {
    $("#showing-error")
    .html("⚠️ Please input something! ⚠️")
    .slideDown();
    
  } else if (textValue.length > 140) {
    $("#showing-error")
    .html("⚠️ Over 140 character!!! ⚠️")
    .slideDown()
  } else {
    $("#showing-error").hide()
    $.post("/tweets",seri_data,function() { 
    $("#tweet-text").val("")  
    $(".counter").text("140")
    loadTweets()
    })
  }
});  

const loadTweets = () => {
    $.ajax({
        url: "/tweets",
        type: 'GET',
        success: function(res) {
          $(".tweets-container article").remove()
          renderTweets(res)
        },
        error: function(error) {
          console.log(error)
        }
      })
}

})

