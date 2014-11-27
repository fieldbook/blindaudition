function blind(containerSelector, nameSelector, picSelector) {
  var containers = document.querySelectorAll(containerSelector);
  Array.prototype.forEach.call(containers, function (row) {
    var name = row.querySelector(nameSelector);
    var pic = row.querySelector(picSelector);
    if (name) name.textContent = anonymousName;
    if (pic) pic.setAttribute('src', anonymousImgSrc);
  })
}
