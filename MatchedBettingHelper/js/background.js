function setBackBetOdds() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {odds: "back"}, function(response) {});
  });
}

function setLayBetOdds() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {odds: "lay"}, function(response) {});
  });
};

function popOut() {
  chrome.windows.create({'url': 'src/browser_action/browser_action.html', 'type': 'popup', 'height': 292, 'width': 445, 'top': (screen.height-344), 'left': (screen.width-453)}, function(window) {
   });
}

chrome.contextMenus.create({
title: "Set as Back Bet odds",
contexts:["page"],  // ContextType
onclick: setBackBetOdds // A callback function
});

chrome.contextMenus.create({
title: "Set as Lay Bet odds",
contexts:["page"],  // ContextType
onclick: setLayBetOdds // A callback function
});

chrome.contextMenus.create({
title: "Popout calculator window",
contexts:["all"],  // ContextType
onclick: popOut // A callback function
});
