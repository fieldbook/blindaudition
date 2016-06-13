function Blinder(options) {
  this.setOptions(options);
  this.element = document;
}

Blinder.params = ['anonymousName', 'anonymousImgSrc'];

Blinder.defaults = {
  anonymousName: 'A Candidate',
}

Blinder.prototype.setOptions = function (options) {
  var newOptions = {};
  Blinder.params.forEach(function (param) {
    newOptions[param] = options[param] || Blinder.defaults[param];
  })
  this.options = newOptions;
}

Blinder.prototype.lookupElementIfNeeded = function (selectorOrElement) {
  if (typeof selectorOrElement === 'string') {
    return this.element.querySelector(selectorOrElement);
  }
  return selectorOrElement;
}

Blinder.prototype.lookupElementsIfNeeded = function (selectorOrElements) {
  if (typeof selectorOrElements === 'string') {
    return this.element.querySelectorAll(selectorOrElements);
  }
  return selectorOrElements;
}

Blinder.prototype.blind = function (selectorOrElement, fn) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (!element) return;

  var self = this;
  element.addEventListener('DOMNodeInserted', function () {
    self.blindElement(element, fn);
  });
  self.blindElement(element, fn);
}

Blinder.prototype.blindElement = function (selectorOrElement, fn) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (!element) return;

  var blinder = new Blinder(this.options);
  blinder.element = element;
  fn.apply(blinder);
  return blinder;
}

Blinder.prototype.blindElements = function (selectorOrElements, fn) {
  var self = this;
  var elements = this.lookupElementsIfNeeded(selectorOrElements);
  Array.prototype.forEach.call(elements, function (element) {
    self.blindElement(element, fn);
  })
}

Blinder.prototype.blindName = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (element) element.textContent = this.options.anonymousName;
}

Blinder.prototype.blindPic = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (element) element.setAttribute('src', this.options.anonymousImgSrc);
}
