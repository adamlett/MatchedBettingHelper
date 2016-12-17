var odds = 0;

window.addEventListener('mousedown',  function(e) {
        var rightclick;
        if (!e) var e = window.event;
        if (e.which) rightclick = (e.which == 3);
        else if (e.button) rightclick = (e.button == 2);
        if(rightclick){
          console.log("Right click detected");
          getElementOnClick(e);
        }
    });

var port = chrome.runtime.connect({name:"mycontentscript"});
port.onMessage.addListener(function(message,sender){
  if(message.greeting === "hello"){
    console.log("Success!");
  }
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.odds === "back"){
      // Save it using the Chrome extension storage API.
  		chrome.storage.sync.set({'backOdds': odds}, function() {
  			console.log('Settings saved');
  		});
    }
    else if(request.odds === "lay"){
      // Save it using the Chrome extension storage API.
      chrome.storage.sync.set({'layOdds': odds}, function() {
        console.log('Settings saved');
      });
    }
  });

// Get the current element
function getElementOnClick(e) {
  var target = $(document.elementFromPoint(e.clientX, e.clientY));
  if (target && target.attr('css') !== 'slug') {
    target = nearestNonInline(target);
    var targetElement = target.get(0).innerHTML;
    console.log(targetElement);
    odds = targetElement;
  }
}

/*
    Travels up the hierarchy looking for a non-inline parent and returns it.
    If none are found, return the original element.
*/
function nearestNonInline(element) {
    if (element.css('display') !== 'inline') {
        return element;
    }

    var originalElement = element;
    var parent;
    // ignore the body
    while ((parent = element.parent(':not(body)')).length > 0) {
        if (parent.css('display') !== 'inline') {
            return parent;
        } else {
            element = parent;
        }
    }

    return element;
}
