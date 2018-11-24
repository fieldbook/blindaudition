var blinder = new Blinder();

var names = {};

function getPersonId() {
  var match = window.location.href.match(/app\.greenhouse\.io\/people\/(\d+)/);
  return match && match[1];
}

function getPersonName() {
  var id = getPersonId();
  if (!id) return undefined;

  var name = names[id];
  if (!name) {
    var el = document.querySelector('.person-name');
    name = names[id] = el.textContent;
  }

  return name;
}

// Blinds the listings on greenhouse.com
blinder.blind('body', function () {
  var name = getPersonName();

  document.title = "Greenhouse"; // remove candidate name from tab title
  this.blindName('.person-name');
  this.blindEmail('.contact-item .email-candidate-icon');

  this.blindElement('.scorecard-section', function () {
    this.blindElements('.question-answers p', function () {
      if (name) this.blindNameInText(this.element, name);
      this.blindGender(this.element);
    })
  })
});
