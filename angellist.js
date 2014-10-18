var candidatesContentId = 'candidates_content';
var candidateRowSelector = '.candidate-row';
var nameSelector = '.candidate-name a';
var picSelector = '.pic img';

var anonymousName = 'A Candidate';
var anonymousImgSrc = 'https://angel.co/images/shared/nopic.png';

var candidatesContent = document.getElementById(candidatesContentId);

if (candidatesContent) {
  candidatesContent.addEventListener('DOMNodeInserted', function (event) {
    var candidateRows = document.querySelectorAll(candidateRowSelector);
    Array.prototype.forEach.call(candidateRows, function (row) {
      var name = row.querySelector(nameSelector);
      var pic = row.querySelector(picSelector);
      name.textContent = anonymousName;
      pic.setAttribute('src', anonymousImgSrc);
    })
  })
}
