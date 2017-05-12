var blinder = new Blinder();

// Blinds the listings on underdog.io
blinder.blind('#candidate-listing', function () {
  this.blindElements('.row', function () {
    this.blindName('.candidate-preview-name span');
  })
})
