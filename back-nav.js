var PARENT_MAP = {
  'bernhard.html':           'musiker.html',
  'jan.html':                'musiker.html',
  'monika.html':             'musiker.html',
  'nefti.html':              'musiker.html',
  'markus.html':             'musiker.html',
  'bilder.html':             'index.html',
  'bilder-auftritte.html':   'bilder.html',
  'bilder-fans.html':        'bilder.html',
  'bilder-feste.html':       'bilder.html',
  'bilder-gast.html':        'bilder.html',
  'bilder-archiv.html':      'bilder.html',
  'bilder-simpl.html':       'bilder-fans.html',
  'bilder-fans2.html':       'bilder-fans.html',
  'bilder-auftritte1.html':  'bilder-auftritte.html',
  'bilder-auftritte2.html':  'bilder-auftritte.html',
  'bilder-trike.html':       'bilder-auftritte.html',
  'bilder-teningen.html':    'bilder-auftritte.html',
  'bilder-thun.html':        'bilder-auftritte.html',
  'bilder-weisweil.html':    'bilder-auftritte.html',
  'bilder-angler01.html':    'bilder-auftritte.html',
  'bilder-fest-doerte.html': 'bilder-feste.html',
  'bilder-fest-inge.html':   'bilder-feste.html',
  'bilder-fest-marta50.html':'bilder-feste.html',
  'bilder-karcher.html':     'bilder-feste.html',
  'musiker.html':            'index.html',
  'links.html':              'index.html',
  'visitenkarten.html':      'index.html',
  'downloads.html':          'index.html',
  'musik.html':              'index.html',
  'termine.html':            'index.html',
  'cd.html':                 'index.html',
  'impressum.html':          'index.html',
  'hinweise.html':           'index.html',
  'vertrag.html':            'cd.html',
  'titel.html':              'cd.html'
};

if (window.__backNavDone) return;
window.__backNavDone = true;

function initBackNav() {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  var parent = PARENT_MAP[page];
  if (!parent) return;

  var btn = document.createElement('a');
  btn.href = parent;
  btn.className = 'scroll-nav-back';
  btn.title = 'Zurück';
  btn.innerHTML = '&#8678;';

  var nav = document.querySelector('.scroll-nav');
  if (nav) {
    nav.insertBefore(btn, nav.firstChild);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBackNav);
} else {
  initBackNav();
}
