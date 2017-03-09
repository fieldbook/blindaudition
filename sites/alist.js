var blinder = new Blinder({anonymousImgSrc: 'https://angel.co/images/shared/nopic.png'});

// Blinds the search results on alist.co
blinder.blind('body', function () {
  this.blindElements('.candidateProfileRow', function () {
    this.blindName('.candidateProfileRowHeader-name');
    this.blindPic('img.candidateProfileRowHeader-image');
  })
})
