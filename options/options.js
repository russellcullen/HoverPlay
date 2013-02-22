function valid_url(url) {
  return (url && url.replace(/\s+/, "") != "")
}

function add_site(key) {
  if ($('.disabled-site').length == 0) {
    $('#sites').empty();
  }
  var div = $("<div class='disabled-site'>");
  var button = $("<button class='right'>").text("Enable");
  button.on('click', function() {
    enable_site(div, key);
  });
  div.text(key.replace("disabled-", ""));
  div.append(button);
  $('#sites').append(div);
}

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

function disable_site() {
  var url = $('#add-site-input').val();
  if (valid_url(url) && localStorage.getItem("disabled-"+url) !=  'true') {
    add_site("disabled-"+url);
    localStorage.setItem("disabled-"+url, 'true');
    show_save();
  }
  $('#add-site-input').val("");
}

function restore_options() {
  for (var key in localStorage) {
    if (key.search("disabled-") == 0 && localStorage[key] == 'true') {
      add_site(key);
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
  $('#add-site-input').on('keypress', function (e) {
    if (e.which == 13) {
      e.preventDefault();
      disable_site();
    }
  });
  $('#add-site-btn').on('click', disable_site);
});