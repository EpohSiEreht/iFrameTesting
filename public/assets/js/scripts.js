window.onload = function() {
  var idCounter = 1;
  var domain = 'http://localhost:3000';

  document.getElementById('addiFrame').addEventListener("click", function() {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('class', 'drag');
    iframe.src = "assets/chat.html";
    iframe.width = 250;
    iframe.height = 300;
    iframe.scrolling = "no";
    iframe.id = idCounter;
    iframe.style = "border:1px solid lightgrey;"
    idCounter++;
    document.querySelector('.list').appendChild(iframe);
  });

  window.addEventListener('message',function(event) {
    if(event.origin !== domain) {
      return
    };

    var sourceFrame = null; // Source of received iframe postMessage
    var myFrames = document.getElementsByTagName("IFRAME");
    var eventSource = event.source; // Event raised by postMessage
    var eventOrigin = event.origin; // Origin domain, e.g. http://localhost:3000

    // Detect the source for IFRAMEs with same-origin URL
    for (var i=0; i<myFrames.length; i++) {
        var f = myFrames[i];
        if (f.contentWindow == eventSource || // for absolute URLs
            f.contentWindow == eventSource.parent) { // for relative URLs
            sourceFrame = f;
            break;
        }
    }

    // If postMessage says remove, remove the source chat box element
    if (event.data === "remove") {
      var source = document.getElementById(sourceFrame.id);
      source.parentNode.removeChild(source);
      return;
    }

    // Send message from sourceFrame to all other frames
    for (var i=0; i<myFrames.length; i++) {
      if (myFrames[i].id !== sourceFrame.id) {
        myFrames[i].contentWindow.postMessage({message: event.data, sourceId: sourceFrame.id}, domain)
      }
    }
  }, false);

};
