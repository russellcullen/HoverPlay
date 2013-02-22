// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT, active: true}, function(tabs) {
    var tab = tabs[0];
    var disabled = document.getElementById("disabled").checked;
    var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
    localStorage.setItem("hoverzoom-"+domain, disabled);
    chrome.tabs.sendMessage(tab.id, {
      disabled: localStorage.getItem("hoverzoom-"+domain),
    });
    window.close();
  });
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT, active: true}, function(tabs) {
    var tab = tabs[0];
    var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
    var disabled = localStorage.getItem("hoverzoom-"+domain);
    var box = document.getElementById("disabled");
    if (disabled == "true") {
      box.checked = true;
    } else {
      box.checked = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);