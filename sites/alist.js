var blinder = new Blinder({anonymousImgSrc: 'https://angel.co/images/shared/nopic.png'});

// Blinds the search results on alist.co
blinder.blind('.js-candidates', function () {
  this.blindElements('.candidateProfileRow', function () {
    this.blindName('.candidateProfileRow-name');
    this.blindPic('img.candidateProfileRow-profileImage');
  })
})
