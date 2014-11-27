var candidatesContentId = 'candidate-search-interface';

var anonymousName = 'A Candidate';
var anonymousImgSrc = 'http://cdn-careers.sstatic.net/careers/Img/default-user-gravatar-large.png';

function anonymize() {
  blind('.search-result', '.name', 'img');
  blind('.profile-full', '#section-personal h1', '.personal-block img');
}

var candidatesContent = document.getElementById(candidatesContentId);
if (candidatesContent) {
  candidatesContent.addEventListener('DOMNodeInserted', anonymize);
}

anonymize();
