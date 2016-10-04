var blinder = new Blinder({
  anonymousImgSrc: 'https://static.licdn.com/scds/common/u/img/icon/icon_no_photo_no_border_30x30_v2.png',
})

// Blinds a profile page (e.g., https://www.linkedin.com/in/jasonc)
blinder.blind('#body', function () {
  document.title = "LinkedIn" // remove candidate name from tab title

  this.blindElements('.profile-card', function () {
    this.blindName('.full-name');
    this.blindPic('.profile-picture img');
  })

  this.blindElement('.connections-map-viewee', function () {
    var containers = this.element.querySelectorAll('.new-miniprofile-container');
    this.blindElement(containers[0], function () {
      this.blindPic('img');
    })
    this.blindElement(containers[1], function () {
      this.blindName('strong');
    })
  })

  // TODO:
  // Replace candidate name and image in various other places throughout the page
})

// TODO: Other page types, such as search results
