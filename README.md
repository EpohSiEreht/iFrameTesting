# iFrame communication demo
A simple iFrame chat demo using .postMessage.

### How to start server:

1. npm install
2. npm start 
3. localhost:3000 should automagically open and voila

### How to use:

1. Click on the "+" button. This will add an iFrame chat box with an ID.
2. Click on the "+" button again. This will create another iFrame chat box with another ID.
3. Type text into one of the chat boxes and you'll be able to chat with the other iFrame chat boxes.

### How it works:

- These iFrame chat boxes communicate with the parent and the parent relays the child element's messages to all of the other children. 

- window.postMessage methods safely enables cross-origin communication. As long as the parent allows the child iFrame to communicate with it, it can safely send and receive data across domains and child iFrame elements.

```javascript
// Listen for iFrame message from child
window.addEventListener('message', function(event) {
    if(event.origin !== domain) {
      return
    };
    // do something with the message
}

// Send message to parent
$('some-element').on('some-action', function() {
	// Use .postMessage to send data to a specific domain
	parent.postMessage('some-data', domain);
});
```

### Difference between postMessage and AJAX:

- postMessage allows you to send data from one browser window to another, but the data isn't communicated through a server.

- AJAX allows you to send data from the browser to the server and processed using a back-end language, which sends a response back to the browser.

### Extra cross-domain example 
1. [domain1](https://macmillantwin1.herokuapp.com/)
2. [domain2](https://macmillantwin2.herokuapp.com/)

- Click on domain2 and open your browser console. You'll notice that the parent (domain2) asks the child (domain1) to see if it can hear the parent. The child then responds and tells the parent element to get taller. The parent receives the message and decides to increase the child elements height. This reoccurs every few seconds so the child element's height will continue to increase in height.