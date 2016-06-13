var blinder = new Blinder({
  anonymousImgSrc: 'https://static.licdn.com/scds/common/u/img/icon/icon_no_photo_no_border_30x30_v2.png',
})

blinder.blind('#body', function () {
  this.blindElements('.profile-card', function () {
    this.blindName('.full-name');
    this.blindPic('.profile-picture img');
  })
})
