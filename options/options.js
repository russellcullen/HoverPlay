function save_options(closeWhenDone) {
  localStorage.setItem('hover-delay', $('#delay').val());
  // TODO: save disabled sites.
  $('#status').text("Options Saved");
  setTimeout(function() {
    $('#status').text("");
    if (closeWhenDone) {
      window.close();
    }
  }, 750);
}

function restore_options() {
  for (var key in localStorage) {
    if (key.search("disabled-") == 0) {
      var div = $("<div class='disabled-site'>");
      var box = $("<input type='checkbox'>");
      if (localStorage[key] == 'true') {
        box.attr("checked", "checked");
      }
      div.append(key.replace("disabled-", ""));
      div.append(box);
      $('#sites').append(div);
    }
    if (key == "hover-delay"){
      $('#delay').val(localStorage[key]);
    }
  }
}

$(function() {
  restore_options();
  $('#save').click(function() {
    save_options(true);
  });
  $('#delay').change(function() {
    save_options(false);
  });
})