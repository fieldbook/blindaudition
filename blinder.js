///////////////////////////////////////////////////////////////////////////////////////////////////
// Blinder is an object to assist in navigating a DOM structure and anonymizing, or “blinding”,
// certain elements by replacing text and images.
//
// Example usage:
//
// var blinder = new Blinder(options);
// blinder.blind('#search-results', function () {
//   this.blindElements('.person-card', function () {
//     this.blindName('.full-name');
//     this.blindPic('.profile-picture img');
//   })
// })
//
// A Blinder object has a certain DOM element as its context (initialized to `document`, but this
// can be overridden.) All operations take place in that context. Certain functions (such as
// blindElement) invoke the function passed to them with a `this` argument set to a new Blinder
// having a narrowed context. This allows for concise code to walk a DOM tree, as shown above.
///////////////////////////////////////////////////////////////////////////////////////////////////

function Blinder(options) {
  this.setOptions(options);
  this.element = document;
}

Blinder.params = [
  'anonymousName',        // Placeholder text to blind candidate names with
  'anonymousNameForText', // Placeholder text for replacing a candidate name in a paragraph of text
  'anonymousEmail',       // Placeholder text to blind candidate emails with
  'anonymousLocation',    // Placeholder text to blind candidate location with
  'anonymousWebsite',     // Placeholder text to blind candidate location with
  'anonymousImgSrc',      // Source URL of a placeholder image. This is typically a per-site setting
];

Blinder.defaults = {
  anonymousName: 'A Candidate',
  anonymousNameForText: 'Candidate',
  anonymousEmail: 'hidden@example.com',
  anonymousLocation: 'Anytown, Earth',
  anonymousWebsite: 'https://www.google.com',
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Utility functions

// Sets options defined in Blinder.params, using Blinder.defaults if options are not supplied.
Blinder.prototype.setOptions = function (options) {
  options = options || {};
  var newOptions = {};
  Blinder.params.forEach(function (param) {
    newOptions[param] = options[param] || Blinder.defaults[param];
  })
  this.options = newOptions;
}

// Takes a selector string or a DOM element, and returns a DOM element.
Blinder.prototype.lookupElementIfNeeded = function (selectorOrElement) {
  if (typeof selectorOrElement === 'string') {
    return this.element.querySelector(selectorOrElement);
  }
  return selectorOrElement;
}

// Takes a selector string or a DOM element list, and returns a DOM element list.
Blinder.prototype.lookupElementsIfNeeded = function (selectorOrElements) {
  if (typeof selectorOrElements === 'string') {
    return this.element.querySelectorAll(selectorOrElements);
  }
  return selectorOrElements;
}

// Takes a string and replaces gender-specific pronouns with neutral ones, using an external API.
Blinder.prototype.substituteNeutralGender = function (text, callback) {
  let request = new XMLHttpRequest();
  request.open('POST', 'https://neutralizer-api.herokuapp.com/neutralize');
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      callback(this.responseText);
    } else {
      console.error('error response', this.status, this.statusText);
    }
  }
  request.onerror = function () {
    console.error('request error');
  }
  request.send(text);
}

// taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Takes a block of text and a name, and replaces the name, or any whole-word prefix of it, with
// an anonymized string. E.g., for the name "Mary Jane Watson", will replace "Mary Jane Watson",
// "Mary Jane", or just "Mary" with "Candidate" (or the configured `anonymousNameForText`).
Blinder.prototype.replaceNameInText = function (text, fullName) {
  var nameWords = fullName.split(' ');
  for (var i = nameWords.length; i > 0; i--) {
    var namePrefix = nameWords.slice(0, i).join(' ');
    var pattern = new RegExp(escapeRegExp(namePrefix), 'g');
    text = text.replace(pattern, this.options.anonymousNameForText);
  }
  return text;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Blinder methods
//
// These methods operate on DOM elements to iterate through a structure and find elements to
// anonymize.
//
// The blind, blindElement, and blindElements methods are used to iterate through the structure.
// They are to be used in nested fashion. Each one takes a selector and drills one level into the
// DOM tree, invoking the given function in the next context.
//
// The blindName and blindPic methods simply replace the given text or image elements with
// appropriate anonymized versions.
///////////////////////////////////////////////////////////////////////////////////////////////////

// Invokes the given function on the given element to “blind” it--immediately, and also anytime a
// DOM node is inserted in the element. This is intended to be invoked once per page load on an
// outer, container element that does not get replaced, like the body element.
Blinder.prototype.blind = function (selectorOrElement, fn) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (!element) return;

  var self = this;
  var blinding = false;
  element.addEventListener('DOMNodeInserted', function () {
    if (blinding) return; // prevent the blinding code from triggering this in a nested way
    blinding = true;
    self.blindElement(element, fn);
    blinding = false;
  });
  self.blindElement(element, fn);
}

// Invokes the given function on the given element (or the element matching the given selector).
// Used to drill one level into the DOM tree.
Blinder.prototype.blindElement = function (selectorOrElement, fn) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (!element) return;

  var blinder = new Blinder(this.options);
  blinder.element = element;
  fn.apply(blinder);
  return blinder;
}

// Invokes the given function on all the given elements (or all the elements matching the given
// selector). Used to iterate through a list of similarly structured elements, such as search
// result cards.
Blinder.prototype.blindElements = function (selectorOrElements, fn) {
  var self = this;
  var elements = this.lookupElementsIfNeeded(selectorOrElements);
  Array.prototype.forEach.call(elements, function (element) {
    self.blindElement(element, fn);
  })
}

// Replaces the text of the given element with the configured anonymous name.
Blinder.prototype.blindName = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (element) element.textContent = this.options.anonymousName;
}

// Replaces the text of the given element with the configured anonymous email.
Blinder.prototype.blindEmail = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (element) element.textContent = this.options.anonymousEmail;
}

// Replaces the text of the given element with the configured anonymous location.
Blinder.prototype.blindLocation = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (element) element.textContent = this.options.anonymousLocation;
}

// Replaces the text of the given element with the configured anonymous Website.
Blinder.prototype.blindWebsite = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (element) element.textContent = this.options.anonymousWebsite;
}

// Replaces the src property of the given image element with the configured anonymous image src
// property. The element must be an IMG element.
Blinder.prototype.blindPic = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (element) element.setAttribute('src', this.options.anonymousImgSrc);
}

// Replaced gendered pronouns (he, she, his, hers, etc.) with gender-neutral “they” equivalents.
// Uses substituteNeutralGender, which calls out to an external API to do this transformation.
Blinder.prototype.blindGender = function (selectorOrElement) {
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (!element) return;
  if (element.getAttribute('blindGender')) return;
  element.setAttribute('blindGender', true);
  this.substituteNeutralGender(element.textContent, function (neutralizedText) {
    element.innerHTML = neutralizedText.replace(/\n/g, '\n<br>');
  })
}

Blinder.prototype.blindNameInText = function (selectorOrElement, fullName) {
  if (!fullName) return;
  var element = this.lookupElementIfNeeded(selectorOrElement);
  if (!element) return;
  var blindedText = this.replaceNameInText(element.textContent, fullName);
  element.innerHTML = blindedText.replace(/\n/g, '\n<br>');
}
