// Click any image inside a figure to view it larger, on the same page.
(function () {
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Image viewer');
  box.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close">&times;</button><div class="lightbox-scroll"><img alt=""></div>';
  document.body.appendChild(box);
  var scroller = box.querySelector('.lightbox-scroll');
  var big = box.querySelector('img');
  var closeButton = box.querySelector('.lightbox-close');
  var opener = null;

  function open(img) {
    opener = img;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    big.classList.remove('actual');
    scroller.scrollTo(0, 0);
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }
  function close() {
    box.hidden = true;
    big.removeAttribute('src');
    document.body.classList.remove('lightbox-open');
    if (opener) opener.focus();
  }

  document.querySelectorAll('figure img').forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });

  // Click on the picture toggles full size, anywhere else closes.
  big.addEventListener('click', function (e) {
    e.stopPropagation();
    big.classList.toggle('actual');
  });
  box.addEventListener('click', close);
  closeButton.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (!box.hidden && e.key === 'Escape') close();
  });
})();
