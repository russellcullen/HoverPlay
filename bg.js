chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.info == "mode") {
      chrome.tabs.getSelected(null, function(tab) {
        var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
        sendResponse({
          disabled: localStorage["audiomatic-"+domain],
          isHoverMode: localStorage["isHoverMode"]
        });
      });
    }
  }
);
