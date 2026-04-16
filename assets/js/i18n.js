// Knights of the Fire — i18n Module
// Applies translations, handles language toggle, dispatches 'kotf:langchange' events
(function () {
  'use strict';
  window.KOTF = window.KOTF || {};
  let currentLang = localStorage.getItem('kotf-lang') || 'en';

  // Public: get a translated string
  window.KOTF.t = function (key) {
    const tr = KOTF_TRANSLATIONS[currentLang];
    return (tr && tr[key] !== undefined) ? tr[key] : (KOTF_TRANSLATIONS['en'][key] || key);
  };

  // Public: current language code
  window.KOTF.lang = function () { return currentLang; };

  // Public: apply all translations to the DOM
  window.KOTF.applyTranslations = function () {
    // Text content replacements
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = window.KOTF.t(el.getAttribute('data-i18n'));
    });
    // innerHTML replacements (for elements containing HTML tags like <br> or <a>)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = window.KOTF.t(el.getAttribute('data-i18n-html'));
    });
    // Placeholder replacements
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = window.KOTF.t(el.getAttribute('data-i18n-ph'));
    });
    // Update toggle button label: show the OTHER language (the one you'd switch TO)
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = currentLang === 'en' ? 'ES' : 'EN';
    // Notify page-specific code
    document.dispatchEvent(new Event('kotf:langchange'));
  };

  // Public: toggle between EN and ES
  window.KOTF.toggleLanguage = function () {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('kotf-lang', currentLang);
    window.KOTF.applyTranslations();
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.KOTF.applyTranslations();
  });
}());
