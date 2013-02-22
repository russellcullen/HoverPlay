chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.info == "mode") {
      chrome.tabs.getSelected(null, function(tab) {
        sendResponse({
          disabled: localStorage["audiomatic-"+tab.url],
          isHoverMode: localStorage["isHoverMode"]
        });
      });
    }
  }
);
