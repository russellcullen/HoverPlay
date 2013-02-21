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
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var isHoverMode = localStorage["isHoverMode"];
  console.log(isHoverMode);
  if (isHoverMode == "true") {
    document.getElementById("replace").checked = false;
    document.getElementById("hover").checked = true;
  } else {
    document.getElementById("hover").checked = false;
    document.getElementById("replace").checked = true;
  }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);