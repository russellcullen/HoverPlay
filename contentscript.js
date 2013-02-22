
var isAudioFile = function (url) {
  // Only true if ends with specific audio extension or from awd.io
  if (url.search("awd.io") >= 0 && url.search(/[0-9a-zA-Z]{5}\./) >= 0) {
    return true;
  }
  if (url.search(/\.mp3|\.wav|\.odd/) == url.length - 4) {
    return true;
  }
  return false;
}

var hoverListener = function () {
  var srcElement = $(this);
  var url = srcElement.attr('href');
  if (isAudioFile(url) && ($('#hover-audio').length == 0) && !srcElement.hasClass("broken-audio-link")) {
    var audio = $("<audio id='hover-audio' controls autoplay src='"+url+"' style='display: none;'></audio>")
    audio.on("error", function() {
      srcElement.addClass('broken-audio-link');
      $(this).remove();
    });
    audio.on("ended", function() {
      $(this).remove();
    });
    $(document.body).append(audio);
  }
}

var hoverPlay = function() {
  $('a').live('mouseenter', hoverListener)
}


var disableHoverPlay = function() {
  $('a').die('mouseenter', hoverListener);
}

var replaceLink = function() {
  var list = $('a').filter(function (i) {
    var a = $(this)
    return isAudioFile(a.attr('href'));
  });
  list.after(function() {
    var audio = $('<div class="audiomatic-div">');
    var player = $("<audio controls src='"+$(this).attr('href')+"'></audio>")
    audio.append(player);
    return audio;
  })

}

var disableReplaceLink = function() {
  $('.audiomatic-div').remove()
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    disableReplaceLink();
    disableHoverPlay();
    if (request.disabled == "true") {
      return;
    }
    if (request.isHoverMode == "true") {
      hoverPlay();
    } else {
      replaceLink();
    }
  }
);

chrome.extension.sendMessage({info: "mode"}, function(response) {
  if (response.disabled == "true") {
    return;
  }
  if (response.isHoverMode == "true") {
    hoverPlay();
  } else {
    replaceLink();
  }
});