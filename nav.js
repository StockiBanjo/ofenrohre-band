document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href="#unten"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  });
});

var _base = document.location.href.replace(/[^/]*(\?.*)?$/, '');
fetch(_base + 'nav.html')
  .then(function(r) { return r.text(); })
  .then(function(html) {
    var placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;
    placeholder.innerHTML = html;

    // Aktives Menü-Item anhand der aktuellen URL setzen
    var path = window.location.pathname;
    // Wurzel → index.html
    if (path === '/' || path === '') path = '/index.html';

    placeholder.querySelectorAll('a').forEach(function(a) {
      var href = a.getAttribute('href');
      if (href && (path === href || path.endsWith(href.replace(/^\//, '')))) {
        a.classList.add('stone-active');
      }
    });
  });
