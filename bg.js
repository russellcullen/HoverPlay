chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.info == "mode") {
      chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT, active: true}, function(tabs) {
        var tab = tabs[0]
        var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
        sendResponse({
          isHoverMode: localStorage.getItem("isHoverMode"),
          disabled: localStorage.getItem("audiomatic-"+domain),
        });
      });
      return true;
    }
  }
);