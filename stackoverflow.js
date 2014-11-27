var candidatesContentId = 'candidate-search-interface';
var candidateRowSelector = '.search-result';
var nameSelector = '.name';
var picSelector = 'img';

var anonymousName = 'A Candidate';
var anonymousImgSrc = 'http://cdn-careers.sstatic.net/careers/Img/default-user-gravatar-large.png';

function anonymizeOneType(containerSelector, nameSelector, picSelector) {
  var containers = document.querySelectorAll(containerSelector);
  Array.prototype.forEach.call(containers, function (row) {
    var name = row.querySelector(nameSelector);
    var pic = row.querySelector(picSelector);
    if (name) name.textContent = anonymousName;
    if (pic) pic.setAttribute('src', anonymousImgSrc);
  })
}

function anonymize() {
  anonymizeOneType(candidateRowSelector, nameSelector, picSelector);
  anonymizeOneType('.profile-full', '#section-personal h1', '.personal-block img');
}

var candidatesContent = document.getElementById(candidatesContentId);
if (candidatesContent) {
  candidatesContent.addEventListener('DOMNodeInserted', anonymize);
}

anonymize();
