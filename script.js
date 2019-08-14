var recognition;
var textbox = $('#textbox');
var instructions = $('#instructions');
var ua = $('#user-agent');
var content = '';

ua.text('testing on : ' + navigator.userAgent);

var SpeechRecognition = window.webkitSpeechRecognition;
window.SpeechRecognition;

recognition = new window.SpeechRecognition();
if (!('webkitSpeechRecognition' in window)) {
  instructions.text('Speech recognition may not be supported by this browser.');
} else {

  // continuous speech expected as input
  recognition.continuous = true;

  // ensure the entire text is displayed and new recognitions 
  // displayed word by word
  recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    content += transcript;
    textbox.val(content);
  };
  
  recognition.onstart = function() { 
    instructions.text('Listening...');
  }

  recognition.onspeechend = function() {
    instructions.text('Press Record to start.');
  }

  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      instructions.text('Please try again.');  
    }
  }

  $('#stop-btn').on('click', function(e) {  
    instructions.text('Press Record to start.');  
    recognition.abort();
  });

  $('#start-btn').on('click', function(e) {
    instructions.text('Listening...'); 
    if (content.length) {
      content += ' ';
    }
    recognition.start();
  });
}
textbox.on('input', function() {
  content = $(this).val();
})
