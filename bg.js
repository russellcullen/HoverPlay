chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.info == "mode")
      sendResponse({isHoverMode: localStorage["isHoverMode"]});
  }
);
