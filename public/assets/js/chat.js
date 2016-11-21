$(function() {
  var message = "";
  var domain = "http://localhost:3000";
  var chatId = window.frameElement.getAttribute('id');

  $('.bar-id').text(chatId);
  $('.chat-text').attr('id', chatId);

  // Determine element height for auto scroll down
  var out = document.getElementById(chatId);
  var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop;

  // Send request to parent to remove this chat box
  $('.remove').on('click', function() {
    parent.postMessage('remove', domain);
  });

  // Save typed message
  $('.typing-area').on('keyup', function (e) {
    message = $(this).val();
  });

  function sendMessage(form) {
    if (message !== "") {
      var sentMessage = '<li class="self"><div class="user-id"><div class="id">'+ chatId +'</div></div><div class="user-message"><p>' + message +'</p></div></li>';
      $('.chat-text').append(sentMessage);
      form.children('.typing-area').val('');
      parent.postMessage(message, domain);
      out.scrollTop = out.scrollHeight - out.clientHeight;
    }
  }

  // On submit, insert new chat message
  $('form').submit(function(e) {
    var thisForm = $(this);
    e.preventDefault();
    sendMessage(thisForm);
  });

  // On click send, insert new chat message
  $('#send').on('click', function() {
    var thisForm = $(this).parent('form');
    sendMessage(thisForm);
  });

  // Listen for other iframe messages from parent
  window.addEventListener('message', function(event) {
    if(event.origin !== domain) {
      return
    };

    var newMessage = event.data.message;
    var senderId = event.data.sourceId;
    var updateMessage = '<li class="other"><div class="user-id"><div class="id">'+ senderId +'</div></div><div class="user-message"><p>' + newMessage +'</p></div></li>';

    $('.chat-text').append(updateMessage);

    // Automatically scroll down to newest message
    out.scrollTop = out.scrollHeight - out.clientHeight;
  });
});
