function save_options() {

}

function restore_options() {
  for (var key in localStorage) {
    if (key != "disabled") {
      var div = $("<div>");
      var box = $("<input type='checkbox'>");
      if (localStorage[key] == 'true') {
        box.attr("checked", "checked");
      }
      div.append(key.replace("hoverzoom-", ""));
      div.append(box);
      $(document.body).append(div);
    }
  }
}

$(function() {
  restore_options();
})