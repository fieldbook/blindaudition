var blinder = new Blinder({
  anonymousImgSrc: 'https://static.licdn.com/scds/common/u/img/icon/icon_no_photo_no_border_30x30_v2.png',
})

console.log('linkedin');

// Blinds a profile page (e.g., https://www.linkedin.com/in/jasonc)
blinder.blind('body', function () {
  // Profile page
  document.title = "LinkedIn" // remove candidate name from tab title
  this.blindName('.pv-top-card-section__name');
  this.blindPic('.pv-top-card-section__image');

  // TODO:
  // Replace candidate name in various other places throughout the page

  // Search results
  this.blindElements('.search-result--person', function () {
    this.blindName('.name');
    this.blindPic('.search-result__image img');
  })
})
