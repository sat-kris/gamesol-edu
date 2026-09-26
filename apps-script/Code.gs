/**
 * Gamesol Edu – results backend (Google Apps Script)
 *
 * 1. Change TEACHER_KEY below to your own secret password.
 * 2. Deploy → New deployment → Web app
 *      Execute as: Me   ·   Who has access: Anyone
 * 3. Paste the Web app URL into edu-kids-config.json → "leaderboard": { "scriptUrl": "…" }
 */
const TEACHER_KEY = 'change-this-password';
const SHEET_NAME = 'Attempts';
const HEAD = ['timestamp', 'name', 'section', 'class', 'subject', 'chapter', 'level',
  'score', 'total', 'percent', 'seconds', 'topics', 'attemptId'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEAD);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Keeps text safe for Sheets (no formulas) and short.
function clean_(s, max) {
  return String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').replace(/^[=+\-@\s]+/, '').trim().slice(0, max);
}

function rows_() {
  const values = sheet_().getDataRange().getValues();
  values.shift();
  return values.map(r => {
    const o = {};
    HEAD.forEach((h, i) => { o[h] = r[i]; });
    o.timestamp = o.timestamp instanceof Date ? o.timestamp.toISOString() : String(o.timestamp);
    ['score', 'total', 'percent', 'seconds'].forEach(k => { o[k] = Number(o[k]); });
    o['class'] = String(o['class']); o.subject = String(o.subject);
    try { o.topics = JSON.parse(o.topics || '{}'); } catch (e) { o.topics = {}; }
    return o;
  });
}

const who_ = r => String(r.name).toLowerCase() + '|' + String(r.section).toLowerCase();
function better_(a, b) {
  if (a.percent !== b.percent) return a.percent > b.percent;
  if (a.total !== b.total) return a.total > b.total;
  return a.seconds < b.seconds;
}

// Best attempt per student (name + section) for one class + subject + level, ranked.
function leaderboard_(cls, subject, level, name, section) {
  const best = {};
  rows_().filter(r => r['class'] === String(cls) && r.subject === String(subject) && r.level === level).forEach(r => {
    const k = who_(r);
    if (!best[k] || better_(r, best[k])) best[k] = r;
  });
  const list = Object.values(best).sort((a, b) => better_(a, b) ? -1 : better_(b, a) ? 1 : 0);
  const me = String(name || '').toLowerCase() + '|' + String(section || '').toLowerCase();
  const idx = list.findIndex(r => who_(r) === me);
  return {
    ok: true, level: level, players: list.length,
    top: list.slice(0, 10).map((r, i) => ({ rank: i + 1, name: r.name, section: r.section, percent: r.percent, score: r.score, total: r.total, seconds: r.seconds })),
    me: idx >= 0 ? { rank: idx + 1, percent: list[idx].percent, score: list[idx].score, total: list[idx].total } : null
  };
}

// Accepted quiz levels; anything else is stored as 'easy'.
function level_(x) { return ['easy', 'hard', 'advanced'].indexOf(x) !== -1 ? x : 'easy'; }

function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad_json' }); }
  const level = level_(d.level);
  const name = clean_(d.name, 40);
  const section = clean_(d.section, 12).toUpperCase();
  const cls = clean_(d.cls, 12);
  const subject = clean_(d.subject, 30);
  const chapter = clean_(d.chapter, 30);
  const total = Math.max(1, Math.min(50, Math.round(Number(d.total) || 0)));
  const score = Math.max(0, Math.min(total, Math.round(Number(d.score) || 0)));
  const seconds = Math.max(0, Math.min(36000, Math.round(Number(d.seconds) || 0)));
  if (!name) return json_({ ok: false, error: 'name_required' });
  if (!cls || !subject) return json_({ ok: false, error: 'class_subject_required' });
  const topics = {};
  Object.keys(d.topics || {}).slice(0, 20).forEach(k => {
    const v = d.topics[k] || {};
    topics[clean_(k, 60)] = Math.round(Number(v.ok) || 0) + '/' + Math.round(Number(v.n) || 0);
  });
  const attemptId = clean_(d.attemptId, 40);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_();
    if (attemptId && sh.getLastRow() > 1) {
      const ids = sh.getRange(2, HEAD.length, sh.getLastRow() - 1, 1).getValues().flat();
      if (ids.indexOf(attemptId) !== -1) return json_(leaderboard_(cls, subject, level, name, section));
    }
    sh.appendRow([new Date(), name, section, cls, subject, chapter, level, score, total,
      Math.round(1000 * score / total) / 10, seconds, JSON.stringify(topics), attemptId]);
  } finally {
    lock.releaseLock();
  }
  return json_(leaderboard_(cls, subject, level, name, section));
}

function doGet(e) {
  const p = e.parameter || {};
  if (p.action === 'leaderboard') {
    return json_(leaderboard_(p.cls, p.subject, level_(p.level), p.name, p.section));
  }
  if (p.action === 'stats') {
    if (p.key !== TEACHER_KEY) return json_({ ok: false, error: 'wrong_key' });
    return json_({ ok: true, rows: rows_() });
  }
  return json_({ ok: true, message: 'Gamesol Edu backend is running.' });
}
