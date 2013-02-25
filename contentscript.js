var HOVER_DELAY = 200;

var isAudioFile = function (url) {
  if (!url) {
    return false;
  }
  // Only true if ends with specific audio extension or from awd.io
  if (url.search("awd.io") >= 0 && url.search(/[0-9a-zA-Z]{5}\./) >= 0) {
    return true;
  }
  // Checks to see if extension is last part of url
  if (url.search(/\.mp3$|\.wav$|\.ogg$/) > 0) {
    return true;
  }
  return false;
}

var isNewAudio = function(url) {
  var current = $('#hover-audio');
  if (current.length == 0 || (current[0].currentTime == current[0].duration)) {
    return true;
  }
  return current.attr('src') != url
}

var removeHover = function () {
  var obj = $(this);
  obj.removeClass('hover-active');
}

var hoverListener = function () {
  var srcElement = $(this);
  srcElement.addClass('hover-active')
  srcElement.on("click", function() {
    $(this).removeClass('hover-active');
    if ($('#hover-audio').length > 0) {
      $('#hover-audio')[0].pause();
    }
  });
  var url = srcElement.attr('href');
  setTimeout(function() {
    if (srcElement.hasClass('hover-active') && isAudioFile(url) && isNewAudio(url) && !srcElement.hasClass("broken-audio-link")) {
      if (!$('#hover-audio').is(":visible")) {
        $('#hover-audio').show();
        srcElement.effect("transfer", {to: $('#hover-audio')}, 500);
      }
      $('#hover-audio').attr('src', url);
      $('#hover-audio').off("error");
      $('#hover-audio').on("error", function(e) {
        srcElement.addClass('broken-audio-link');
        $(this).hide();
      });
      chrome.extension.sendMessage({show: true});
    }
  }, HOVER_DELAY);
}

var keyListener = function (e) {
  var $player = $('#hover-audio')
  switch (e.which) {
    case 32:
      if (!$player.is(':visible')) {
        break;
      }
      var player = $player[0]
      var target = $(e.target)
      if (!(target.is("textarea") || target.is("input"))) {
        if (player.paused) {
          player.play();
        } else {
          player.pause();
        }
        e.preventDefault();
      }
      break;
    case 27:
      $player[0].pause();
      $player.removeAttr('src');
      $player.hide();
      break;
  }
}

var hoverPlay = function() {
  $('a').live('mouseenter', hoverListener);
  $('a').live('mouseleave', removeHover);
  $(document).on('keydown', keyListener);
  if (location.href.search("facebook.com") >= 0) {
    $('#hover-audio-div').attr("id", "hover-audio-div-left");
  } 
}


var disableHoverPlay = function() {
  $('a').die('mouseenter', hoverListener);
  $('a').die('mouseleave', removeHover);
  $(document).off('keydown', keyListener);
  $('#hover-audio').hide();
}

$(function() {
  var d = $("<div id='hover-audio-div'>");
  // d.append("<div id='hover-audio-loading' style='display: none;'>Loading...</div>");
  var audio = $("<audio id='hover-audio' controls autoplay style='display: none;'></audio>");
  audio.on("stalled", function() {
    this.play();
  })
  audio.on('waiting', function(e) {
    this.load();
  });
  d.append(audio);
  $(document.body).append(d);
  var needHoverPlay = false;
  $('a').each(function (){
    if (isAudioFile($(this).attr('href'))) {
      needHoverPlay = true;
      return false;
    }
  });
  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      disableHoverPlay();
      if (request.disabled == "true") {
        return;
      }
      hoverPlay();
    }
  );

  chrome.extension.sendMessage({show: needHoverPlay}, function(response) {
    if (response.disabled == "true") {
      return;
    }
    HOVER_DELAY = response.hoverDelay || 200;
    hoverPlay();
  });
});