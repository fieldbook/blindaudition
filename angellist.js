var blinder = new Blinder({anonymousImgSrc: 'https://angel.co/images/shared/nopic.png'});

blinder.blind('#candidates_content', function () {
  this.blindElements('.card-content-container', function () {
    this.blindName('.js-browse-table-row-name a');
    this.blindPic('.candidate-picture img');
  })
})
