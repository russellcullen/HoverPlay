chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT, active: true}, function(tabs) {
      var tab = tabs[0]
      var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
      if (request.show || localStorage.getItem("disabled-"+domain)) {
        chrome.pageAction.show(tab.id)
      }
      sendResponse({
        disabled: localStorage.getItem("disabled-"+domain),
        hoverDelay: localStorage.getItem("hover-delay")
      });
    });
    return true;
  }
);