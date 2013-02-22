chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT, active: true}, function(tabs) {
      var tab = tabs[0]
      if (request.show) {
        chrome.pageAction.show(tab.id)
      }
      var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
      sendResponse({
        disabled: localStorage.getItem("audiomatic-"+domain)
      });
    });
    return true;
  }
);