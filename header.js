fetch('/header.html')
  .then(function(r) { return r.text(); })
  .then(function(html) {
    var el = document.getElementById('header-placeholder');
    if (el) el.innerHTML = html;
  });

var s = document.createElement('script');
s.src = '/back-nav.js';
document.head.appendChild(s);
