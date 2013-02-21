
// Mouse listener for any move event on the current document.
var hoverPlay = function() {
  document.addEventListener('mousemove', function (e) {
    var srcElement = e.srcElement;
    if (srcElement.nodeName == "A") {
      var url = srcElement.href
      if (isAudioFile(url) && !document.getElementById('hover-audio')) {
        var audio = document.createElement("audio");
        audio.setAttribute("autoplay", "autoplay");
        audio.setAttribute("style", "display: none;");
        audio.setAttribute("src", url);
        audio.setAttribute("id", 'hover-audio')
        audio.setAttribute("onerror", "document.getElementById('hover-audio').remove();")
        audio.setAttribute("onended", "document.getElementById('hover-audio').remove();")
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
      var audio = document.createElement("audio");
      audio.setAttribute("controls", "controls");
      audio.setAttribute("src", url);
      list[i].parentNode.replaceChild(audio, list[i])
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

hoverPlay();
// replaceLink();

