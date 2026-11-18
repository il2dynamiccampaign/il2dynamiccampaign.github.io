// A figure with several images becomes one slot with left and right arrows.
(function () {
  document.querySelectorAll('figure').forEach(function (figure) {
    var images = Array.prototype.slice.call(figure.querySelectorAll(':scope > img'));
    if (images.length < 2) return;
    var index = 0;
    figure.classList.add('slides');

    var count = document.createElement('span');
    count.className = 'slides-count';
    var prev = button('slides-prev', 'Previous image', '‹');
    var next = button('slides-next', 'Next image', '›');
    figure.appendChild(prev);
    figure.appendChild(next);
    figure.appendChild(count);

    function button(cls, label, text) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'slides-arrow ' + cls;
      b.setAttribute('aria-label', label);
      b.textContent = text;
      return b;
    }
    function show(i) {
      index = (i + images.length) % images.length;
      images.forEach(function (img, n) {
        img.classList.toggle('current', n === index);
        img.setAttribute('aria-hidden', n === index ? 'false' : 'true');
        img.tabIndex = n === index ? 0 : -1;
      });
      count.textContent = (index + 1) + ' / ' + images.length;
    }
    prev.addEventListener('click', function () { show(index - 1); });
    next.addEventListener('click', function () { show(index + 1); });
    figure.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(index - 1);
      else if (e.key === 'ArrowRight') show(index + 1);
    });
    show(0);
  });
})();
