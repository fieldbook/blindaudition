var blinder = new Blinder({anonymousImgSrc: 'https://angel.co/images/shared/nopic.png'});

// Blinds the search results on, e.g., https://angel.co/candidates
blinder.blind('#candidates_content', function () {
  this.blindElements('.card-content-container', function () {
    this.blindName('.js-browse-table-row-name a');
    this.blindPic('.candidate-picture img');
  })
})

// TODO: Profile pages (e.g., https://angel.co/jasoncrawford)
