// Save this script as `options.js`

// Saves options to localStorage.
function save_options() {
  var isHoverMode = document.getElementById("hover").checked;
  localStorage["isHoverMode"] = isHoverMode;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Mode Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
  chrome.tabs.getSelected(null, function(tab) {
    var disabled = document.getElementById("disabled").checked;
    var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
    localStorage["audiomatic-"+domain] = disabled;
    chrome.tabs.sendMessage(tab.id, {
      disabled: localStorage["audiomatic-"+domain], 
      isHoverMode: localStorage["isHoverMode"]
    });
  });
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var isHoverMode = localStorage["isHoverMode"];
  if (isHoverMode == "true") {
    document.getElementById("replace").checked = false;
    document.getElementById("hover").checked = true;
  } else {
    document.getElementById("hover").checked = false;
    document.getElementById("replace").checked = true;
  }
  chrome.tabs.getSelected(null, function(tab) {
    var domain = tab.url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1];
    var disabled = localStorage["audiomatic-"+domain]
    if (disabled == "true") {
      document.getElementById("disabled").checked = true;
    } else {
      document.getElementById("disabled").checked = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);