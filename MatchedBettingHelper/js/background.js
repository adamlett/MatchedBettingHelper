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
