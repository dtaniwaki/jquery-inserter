window.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var versions = ["2.1.0", "2.0.3", "2.0.2", "2.0.1", "2.0.0", "1.11.0", "1.10.2", "1.10.1", "1.10.0", "1.9.1", "1.9.0", "1.8.3", "1.8.2", "1.8.1", "1.8.0", "1.7.2", "1.7.1", "1.7.0", "1.6.4", "1.6.3", "1.6.2", "1.6.1", "1.6.0", "1.5.2", "1.5.1", "1.5.0", "1.4.4", "1.4.3", "1.4.2", "1.4.1", "1.4.0", "1.3.2", "1.3.1", "1.3.0", "1.2.6", "1.2.3"];
    $.each(versions, function(idx) {
      $('#jquery_version').append('<option value=' + this + '>' + this + '</option>');
    });
  });
});

$(function(){
  var insert = function(e) {
    e.preventDefault();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "popup", subject: "insertJquery",
        params: {version: $('#jquery_version').val(), namespace: $('#jquery_namespace').val()}
      }, function(response) {
        console.log(response)
        if (response && response.message === 'success') {
          $('#message').text('Inserted!');
        } else {
          $('#message').text('Failed!');
        }
      });
    });
  }
  $('#insert_button').on('click', insert);
  var close = function(e) {
    e.preventDefault();
    window.close();
  }
  $('#close_button').on('click', close);
});
