var hoverPlay = function() {
  document.addEventListener('mousemove', function (e) {
    var srcElement = e.srcElement;
    if (srcElement.nodeName == "A") {
      var url = srcElement.href
      if (isAudioFile(url) && !document.getElementById('hover-audio') && !srcElement.classList.contains("broken-audio-link")) {
        srcElement.classList.add("audio-tmp-class")
        var audio = document.createElement("audio");
        audio.setAttribute("autoplay", "autoplay");
        audio.setAttribute("style", "display: none;");
        audio.setAttribute("src", url);
        audio.setAttribute("id", 'hover-audio')
        audio.setAttribute("onerror", "var l = document.getElementsByClassName('audio-tmp-class')[0].classList;\
                                      l.remove('audio-tmp-class'); l.add('broken-audio-link'); \
                                      document.getElementById('hover-audio').remove();")
        audio.setAttribute("onended", "var l = document.getElementsByClassName('audio-tmp-class')[0].classList;\
                                      l.remove('audio-tmp-class'); \
                                      document.getElementById('hover-audio').remove();")
        document.body.appendChild(audio);
      }
    }
  }, false);
}

var replaceLink = function() {
  var list = document.getElementsByTagName("a")
  for(i = 0; i <list.length; i++) {
    var url = list[i].href;
    if (isAudioFile(url)) {
      var audio = document.createElement("div");
      var player = document.createElement("audio")
      player.setAttribute("controls", "controls");
      player.setAttribute("src", url);
      audio.appendChild(player);
      if (list[i].nextSibling) {
        list[i].parentNode.insertBefore(audio, list[i].nextSibling);
      } else {
        list[i].parentNode.appendChild(audio);
      }
    }
  }
}

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

chrome.extension.sendMessage({info: "mode"}, function(response) {
  if (response.isHoverMode == "true") {
    hoverPlay();
  } else {
    replaceLink();
  }
});