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

  this.blindElements('.scorecard-section', function () {
    this.blindElements('.question-answers p,.notes-content p', function () {
      this.blindNameInText(this.element, name);
      this.blindGender(this.element);
    })
  })

  this.blindElement('.candidate-controls', function () {
    this.blindElements('.alert', function () {
      this.blindNameInText(this.element, name);
    })

    this.blindElements('button', function () {
      this.blindNameInText(this.element, name);
    })

    this.blindElements('.note-text', function () {
      this.blindNameInText(this.element, name);
      this.blindGender(this.element);
    })
  })
});
