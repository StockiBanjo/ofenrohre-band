var _base = document.location.href.replace(/[^/]*(\?.*)?$/, '');
fetch(_base + 'header.html')
  .then(function(r) { return r.text(); })
  .then(function(html) {
    var el = document.getElementById('header-placeholder');
    if (el) el.innerHTML = html;
  });

var s = document.createElement('script');
s.src = _base + 'back-nav.js';
document.head.appendChild(s);
