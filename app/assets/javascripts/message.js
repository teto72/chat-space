$(function(){
      function buildHTML(message){
        if (message.image) {
          var html =
          `<div class="main-chat__message" data-message-id=${message.id}>
            <div class="main-chat__message-info">
              ${message.user_nickname}
            </div>
            <div class="main-chat__message-data">
              ${message.created_at}
            </div>
            <div class="main-chat__message-text">
              ${message.text}
            </div>
              <img class="main-chat__image" src=${message.image}>
          </div>`
        return html;
        } else {
          var html =
            `<div class="main-chat__message" data-message-id=${message.id}>
              <div class="main-chat__message-info">
                ${message.user_nickname}
              </div>
              <div class="main-chat__message-data">
                ${message.created_at}
              </div>
              <div class="main-chat__message-text">
                ${message.text}
              </div>
            </div>`
          return html;
        };
      }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__messages').append(html);
      $('.main-chat__messages').animate({scrollTop: $('.main-chat__messages')[0].scrollHeight});
      $('input').prop('disabled',false);
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信失敗！！");
    });
  })
  var reloadMessages  = function(){
    var last_message_id = $('.main-chat__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !==0 ){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main-chat__messages').append(insertHTML);
        $('.main-chat__messages').animate({scrollTop: $('.main-chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages,7000);
  } 
});