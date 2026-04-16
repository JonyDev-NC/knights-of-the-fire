// Knights of the Fire — Google Sheets API Module
// Replace KOTF_SHEETS_URL with your Google Apps Script Web App URL after deploying
// See GOOGLE_APPS_SCRIPT.js in the project root for setup instructions

var KOTF_SHEETS_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

window.KOTF = window.KOTF || {};
window.KOTF.sheets = {

  _ready: function () {
    return !KOTF_SHEETS_URL.includes('YOUR_DEPLOYMENT_ID');
  },

  submitRSVP: async function (meetingDate, name) {
    if (!this._ready()) { console.warn('Sheets URL not configured'); return { success: true }; }
    try {
      await fetch(KOTF_SHEETS_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'rsvp', meetingDate: meetingDate, name: name })
      });
      return { success: true };
    } catch (e) { console.error('RSVP error', e); return { success: false }; }
  },

  submitComment: async function (page, name, content) {
    if (!this._ready()) { console.warn('Sheets URL not configured'); return { success: true }; }
    try {
      await fetch(KOTF_SHEETS_URL, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'comment', page: page, name: name, content: content })
      });
      return { success: true };
    } catch (e) { console.error('Comment error', e); return { success: false }; }
  },

  loadPool: async function () {
    if (!this._ready()) return null;
    try {
      var res = await fetch(KOTF_SHEETS_URL + '?action=pool');
      return await res.json();
    } catch (e) { console.error('Pool load error', e); return null; }
  },

  loadComments: async function (page) {
    if (!this._ready()) return [];
    try {
      var res = await fetch(KOTF_SHEETS_URL + '?action=comments&page=' + encodeURIComponent(page));
      var data = await res.json();
      return data.comments || [];
    } catch (e) { console.error('Comments load error', e); return []; }
  },

  renderComments: function (comments, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var icons = ['shield', 'swords', 'fort', 'local_fire_department', 'pentagon', 'shield'];
    if (!comments || comments.length === 0) {
      container.innerHTML = '<p class="text-xs font-label uppercase tracking-widest text-outline text-center py-4">' + window.KOTF.t('be_first') + '</p>';
      return;
    }
    container.innerHTML = comments.map(function (c, i) {
      return '<div class="flex gap-6">' +
        '<div class="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">' +
        '<span class="material-symbols-outlined text-primary" style="font-variation-settings:\'FILL\' 1">' + icons[i % icons.length] + '</span>' +
        '</div>' +
        '<div class="flex-grow">' +
        '<div class="flex items-center gap-3 mb-2">' +
        '<span class="text-sm font-label font-bold text-on-surface">' + _esc(c.name) + '</span>' +
        '<span class="text-[10px] font-label text-outline uppercase tracking-tighter">' + _fmtDate(c.date) + '</span>' +
        '</div>' +
        '<p class="text-on-surface-variant font-body text-sm leading-relaxed">' + _esc(c.content) + '</p>' +
        '</div></div>';
    }).join('');
  }
};

function _esc(str) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode(str || ''));
  return d.innerHTML;
}

function _fmtDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString(
      window.KOTF.lang() === 'es' ? 'es-ES' : 'en-GB',
      { day: 'numeric', month: 'short', year: 'numeric' }
    );
  } catch (e) { return ''; }
}
