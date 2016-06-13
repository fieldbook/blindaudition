var blinder = new Blinder({
  anonymousImgSrc: 'http://cdn-careers.sstatic.net/careers/Img/default-user-gravatar-large.png',
})

blinder.blind('#candidate-search-interface', function () {
  this.blindElements('.search-result', function () {
    this.blindName('.name');
    this.blindPic('img');
  })

  this.blindElements('.profile-full', function () {
    this.blindName('#section-personal h1');
    this.blindPic('.personal-block img');
  })
})
