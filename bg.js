chrome.tabs.getSelected(null, function(tab) {
  var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.info == "mode") {
        sendResponse({
          isHoverMode: localStorage["isHoverMode"],
          disabled: localStorage["audiomatic-"+domain]
        });
      }
    }
  );
});
