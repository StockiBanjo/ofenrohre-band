document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href="#unten"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  });

  // Aktives Menü-Item anhand der aktuellen URL setzen
  var placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    var path = window.location.pathname;
    if (path === '/' || path === '') path = '/index.html';
    placeholder.querySelectorAll('a').forEach(function(a) {
      var href = a.getAttribute('href');
      if (href && (path === href || path.endsWith(href.replace(/^\//, '')))) {
        a.classList.add('stone-active');
      }
    });
  }
});
