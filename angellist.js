var candidatesContentId = 'candidates_content';

var anonymousName = 'A Candidate';
var anonymousImgSrc = 'https://angel.co/images/shared/nopic.png';

function anonymize() {
  blind('.candidate-row', '.candidate-name a', '.pic img');
}

var candidatesContent = document.getElementById(candidatesContentId);
if (candidatesContent) {
  candidatesContent.addEventListener('DOMNodeInserted', anonymize);
}
