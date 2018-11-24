var blinder = new Blinder();

// Blinds the listings on greenhouse.com
blinder.blind('body', function () {
  document.title = "Greenhouse"; // remove candidate name from tab title
  this.blindName('.person-name');
  this.blindEmail('.contact-item .email-candidate-icon');
});