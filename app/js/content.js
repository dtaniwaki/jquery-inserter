var loadJavascript = function(src, callback) {
  var script = document.createElement("SCRIPT");
  script.src = src;
  script.type = 'text/javascript';
  script.async = false;
  script.onload = callback;
  script.onreadystatechange = function() {
    if (this.readyState == 'complete') {
      callback();
    }
  }
  document.getElementsByTagName("head")[0].appendChild(script);
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.from === "popup") {
    if (request.subject === "insertJquery") {
      var path = '//ajax.googleapis.com/ajax/libs/jquery/' + request.params.version + '/jquery.min.js';
      loadJavascript(path, function(){
        var script = document.createElement("SCRIPT");
        script.type = 'text/javascript';
        script.innerHTML = 'window.' + request.params.namespace + ' = jQuery.noConflict(true);'
        document.getElementsByTagName("head")[0].appendChild(script);

        sendResponse({message: 'success'});
      });
    } else if (request.subject === "detectJquery") {
      // TODO: Implement
    }
  }
});
