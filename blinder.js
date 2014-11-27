function Blinder(options) {
  if (options.profile && !options.profiles) {
    options.profiles = [options.profile];
  }

  var self = this;
  Blinder.params.forEach(function (param) {
    self[param] = options[param] || Blinder.defaults[param];
  })
}

Blinder.params = ['container', 'profiles', 'anonymousName', 'anonymousImgSrc'];

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
  this.profiles.forEach(function (profile) {
    self.anonymizeProfileType(profile);
  })
}

Blinder.prototype.anonymizeProfileType = function (profile) {
  var self = this;
  var elements = document.querySelectorAll(profile.element);
  Array.prototype.forEach.call(elements, function (element) {
    self.anonymizeOneProfile(element, profile);
  })
}

Blinder.prototype.anonymizeOneProfile = function (element, profile) {
  var name = element.querySelector(profile.name);
  var pic = element.querySelector(profile.pic);
  if (name) name.textContent = this.anonymousName;
  if (pic) pic.setAttribute('src', this.anonymousImgSrc);
}

function blind(options) {
  var blinder = new Blinder(options);
  blinder.start();
}
