function show_save() {
  $('#status').slideDown().delay(750).fadeOut();
}

function update_delay() {
  localStorage.setItem('hover-delay', $('#delay').val());
  show_save();
}

function enable_site(div, key) {
  div.remove();
  if ($('.disabled-site').length == 0) {
    $('#sites').append("None");
  }
  localStorage.setItem(key, 'false');
  show_save();
}

function restore_options() {
  for (var key in localStorage) {
    if (key.search("disabled-") == 0 && localStorage[key] == 'true') {
      var div = $("<div class='disabled-site'>");
      var button = $("<button class='right'>").text("Enable");
      var url = key;
      button.on('click', function() {
        enable_site(div, url);
      });
      div.append(url.replace("disabled-", ""));
      div.append(button);
      $('#sites').append(div);
    }
    if (key == "hover-delay"){
      $('#delay').val(localStorage[key]);
    }
  }
  if ($('.disabled-site').length == 0) {
    $('#sites').append("None");
  }
}

$(function() {
  restore_options();
  $('#delay').on('change', update_delay);
})