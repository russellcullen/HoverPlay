function save_options() {
  localStorage.setItem('hover-delay', $('#delay').val());
  // TODO: save disabled sites.
  $('#status').fadeIn()
  setTimeout(function() {
    $('#status').fadeOut()
  }, 750);
}

function restore_options() {
  for (var key in localStorage) {
    if (key.search("disabled-") == 0 && localStorage[key] == 'true') {
      var div = $("<div class='disabled-site'>");
      div.append(key.replace("disabled-", ""));
      $('#sites').append(div);
    }
    if (key == "hover-delay"){
      $('#delay').val(localStorage[key]);
    }
  }
}

$(function() {
  restore_options();
  $('#save').click(save_options);
  $('#delay').change(save_options);
})