function Blinder(options) {
  var self = this;
  Blinder.params.forEach(function (param) {
    self[param] = options[param] || Blinder.defaults[param];
  })
}

Blinder.params = ['container', 'displayTypes', 'anonymousName', 'anonymousImgSrc'];

Blinder.defaults = {
  anonymousName: 'A Candidate',
}

Blinder.prototype.start = function () {
  var container = document.querySelector(this.container);
  if (container) container.addEventListener('DOMNodeInserted', this.anonymize.bind(this));
  this.anonymize();
}

Blinder.prototype.anonymize = function () {
  var self = this;
  this.displayTypes.forEach(function (type) {
    self.anonymizeDisplayType(type);
  })
}

Blinder.prototype.anonymizeDisplayType = function (type) {
  var self = this;
  var elements = document.querySelectorAll(type.element);
  Array.prototype.forEach.call(elements, function (element) {
    self.anonymizeDisplay(element, type);
  })
}

Blinder.prototype.anonymizeDisplay = function (element, type) {
  var name = element.querySelector(type.name);
  var pic = element.querySelector(type.pic);
  if (name) name.textContent = this.anonymousName;
  if (pic) pic.setAttribute('src', this.anonymousImgSrc);
}

function blind(options) {
  var blinder = new Blinder(options);
  blinder.start();
}
