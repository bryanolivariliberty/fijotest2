// ═══════════════════════════════════════════════════════════════════════════
// ENTRY SCREEN — "WELCOME, SALES REP"
//
// Ported from the mobile Sales Tool so the two entries match, per Bryan A.
// Olivari's e-mail "RE: Fixed Sales Tool Changes" (2026-09-08), point 3:
// "se modificará la entrada y se igualará con la de móvil… un drop-down donde si
// el agente escoge la opción de Door to Door se modifique lo que pueda ver en la
// herramienta sin cambiar de enlace."
//
// index.html stays the password gate. This is the second step: it collects who
// the rep is, and the Group they belong to drives what the shell renders. Same
// URL throughout — the shell rebuilds, it does not navigate.
//
// What it is NOT: a control. It lives in sessionStorage and a rep can clear it.
// Use it for prefill and for tailoring the view, never to enforce who may quote
// what. See GROUP_VIEWS in js/data.js.
// ═══════════════════════════════════════════════════════════════════════════

const ENTRY_KEY  = 'lb_rep';
const NOTICE_KEY = 'lb_notice_seen';

let repInfo = null;      // {name, title, email, phone, group, proposalType}
let entryOpen = false;
let entryDraft = null;
let entryError = '';

// ── Storage ────────────────────────────────────────────────────────────────
function entryLoad(){
  try {
    const raw = sessionStorage.getItem(ENTRY_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    return (o && o.name && o.group) ? o : null;
  } catch(e){ return null; }
}
function entrySave(o){
  try { sessionStorage.setItem(ENTRY_KEY, JSON.stringify(o)); } catch(e){}
}

// ── Lookups ────────────────────────────────────────────────────────────────
function repGroup(){ return repInfo ? repInfo.group : null; }

function repGroupLabel(id, l){
  const g = REP_GROUPS.find(x=>x.id===(id || repGroup()));
  if (!g) return '';
  return (l || lang) === 'es' ? g.es : g.en;
}

// Name used to prefill "Vendedor" in step 7 of the quote.
function repDefaultName(){ return repInfo && repInfo.name ? repInfo.name : ''; }

// Tabs this rep's group does not see. 'guide' and 'proposal' are never hidden:
// a rep with no Guide cannot learn the tool and a rep with no Proposal cannot do
// the job, so a bad config can annoy but cannot lock anyone out.
function groupHiddenTabs(){
  const v = GROUP_VIEWS[repGroup()];
  if (!v || !Array.isArray(v.hideTabs)) return [];
  return v.hideTabs.filter(id => id !== 'guide' && id !== 'proposal');
}

// ── Validation ─────────────────────────────────────────────────────────────
function entryValid(d){
  if (!d) return false;
  return !!(d.name && d.name.trim() && d.title && d.title.trim() &&
            d.email && d.email.trim() && d.phone && d.phone.trim() &&
            d.group && d.proposalType);
}
function entryEmailOk(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((e||'').trim()); }

// ── Render ─────────────────────────────────────────────────────────────────
function entryRender(){
  const root = document.getElementById('entry-root');
  if (!root) return;
  if (!entryOpen){ root.innerHTML = ''; root.classList.remove('on'); return; }

  const d = entryDraft;
  const isEs = lang === 'es';

  root.classList.add('on');
  root.innerHTML = `
    <div class="entry-scrim"></div>
    <div class="entry-modal" role="dialog" aria-modal="true" aria-labelledby="entry-h">
      <div class="entry-lang">
        <button class="entry-lang-btn ${lang==='en'?'on':''}" data-entry-lang="en">EN</button>
        <button class="entry-lang-btn ${lang==='es'?'on':''}" data-entry-lang="es">ES</button>
      </div>

      <div class="entry-head">
        <img src="assets/liberty-logo.png" alt="Liberty Business" class="entry-logo">
        <div>
          <h2 id="entry-h" class="entry-title">${t('entry.title')}</h2>
          <p class="entry-sub">${t('entry.sub')}</p>
        </div>
      </div>

      <div class="entry-grid">
        <label class="entry-field full">
          <span class="entry-lbl">${t('entry.name')} <i>*</i></span>
          <input class="entry-inp" id="e-name" type="text" autocomplete="name"
                 placeholder="${t('entry.name.ph')}" value="${escAttr(d.name)}">
        </label>

        <label class="entry-field">
          <span class="entry-lbl">${t('entry.role')} <i>*</i></span>
          <input class="entry-inp" id="e-title" type="text" autocomplete="organization-title"
                 placeholder="${t('entry.role.ph')}" value="${escAttr(d.title)}">
        </label>

        <label class="entry-field">
          <span class="entry-lbl">${t('entry.email')} <i>*</i></span>
          <input class="entry-inp" id="e-email" type="email" autocomplete="email"
                 placeholder="${t('entry.email.ph')}" value="${escAttr(d.email)}">
        </label>

        <label class="entry-field">
          <span class="entry-lbl">${t('entry.phone')} <i>*</i></span>
          <input class="entry-inp" id="e-phone" type="tel" autocomplete="tel"
                 placeholder="${t('entry.phone.ph')}" value="${escAttr(d.phone)}">
        </label>

        <label class="entry-field">
          <span class="entry-lbl">${t('entry.group')} <i>*</i></span>
          <select class="entry-inp entry-sel" id="e-group">
            <option value="" ${!d.group?'selected':''} disabled>${t('entry.group.ph')}</option>
            ${REP_GROUPS.map(g=>`
              <option value="${g.id}" ${d.group===g.id?'selected':''}>${isEs?g.es:g.en}</option>
            `).join('')}
          </select>
        </label>
      </div>

      <div class="entry-field full" style="margin-top:14px">
        <span class="entry-lbl">${t('entry.ptype')} <i>*</i></span>
        <div class="entry-seg">
          <button type="button" class="entry-seg-btn ${d.proposalType==='existing'?'on':''}" data-ptype="existing">
            ${icon('user')}<span>${t('entry.ptype.existing')}</span>
          </button>
          <button type="button" class="entry-seg-btn ${d.proposalType==='new'?'on':''}" data-ptype="new">
            ${icon('package')}<span>${t('entry.ptype.new')}</span>
          </button>
        </div>
      </div>

      ${entryError ? `<div class="entry-error">${icon('warn')}<span>${entryError}</span></div>` : ''}

      <button class="entry-cta" id="e-go">${t('entry.cta')} ${icon('arrow')}</button>
    </div>
  `;

  // Bind — read into the draft on input so a re-render never loses typing.
  const bind = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', e=>{ entryDraft[key] = e.target.value; });
  };
  bind('e-name','name'); bind('e-title','title');
  bind('e-email','email'); bind('e-phone','phone');

  const sel = document.getElementById('e-group');
  if (sel) sel.addEventListener('change', e=>{ entryDraft.group = e.target.value; });

  root.querySelectorAll('[data-ptype]').forEach(b=>{
    b.addEventListener('click', ()=>{ entryDraft.proposalType = b.dataset.ptype; entryRender(); });
  });

  root.querySelectorAll('[data-entry-lang]').forEach(b=>{
    b.addEventListener('click', ()=>setLang(b.dataset.entryLang));
  });

  const go = document.getElementById('e-go');
  if (go) go.addEventListener('click', entrySubmit);

  root.querySelector('.entry-modal').addEventListener('keydown', e=>{
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') { e.preventDefault(); entrySubmit(); }
  });

  const first = document.getElementById('e-name');
  if (first && !d.name) first.focus();
}

function escAttr(v){
  return String(v == null ? '' : v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
}

// ── Submit ─────────────────────────────────────────────────────────────────
function entrySubmit(){
  if (!entryValid(entryDraft)) { entryError = t('entry.err'); entryRender(); return; }
  if (!entryEmailOk(entryDraft.email)) { entryError = t('entry.err.email'); entryRender(); return; }

  entryError = '';
  repInfo = {
    name:  entryDraft.name.trim(),
    title: entryDraft.title.trim(),
    email: entryDraft.email.trim(),
    phone: entryDraft.phone.trim(),
    group: entryDraft.group,
    proposalType: entryDraft.proposalType
  };
  entrySave(repInfo);
  entryOpen = false;

  // The group can change which tabs exist, so rebuild the shell, not just close.
  buildShell();
  renderAll();
  renderRepChip();
  entryRender();

  // Prefill "Vendedor" on a quote that was already started this session.
  if (state.prop && state.prop.customer && !state.prop.customer.rep) {
    state.prop.customer.rep = repInfo.name;
  }

  noticeMaybeOpen();
}

// ── Open / reopen ──────────────────────────────────────────────────────────
function entryShow(){
  entryDraft = repInfo
    ? Object.assign({}, repInfo)
    : {name:'', title:'', email:'', phone:'', group:'', proposalType:''};
  entryError = '';
  entryOpen = true;
  entryRender();
}

// ── Header chip — who is signed in, and the way back to change the Group ───
function renderRepChip(){
  const el = document.getElementById('rep-chip');
  if (!el) return;
  if (!repInfo){ el.innerHTML = ''; return; }
  el.innerHTML = `
    <span class="rep-chip-name">${escAttr(repInfo.name)}</span>
    <span class="rep-chip-sep"></span>
    <span class="rep-chip-group">${repGroupLabel()}</span>
    <button class="rep-chip-edit" id="rep-chip-edit">${t('entry.change')}</button>
  `;
  const b = document.getElementById('rep-chip-edit');
  if (b) b.addEventListener('click', entryShow);
}

// ═══════════════════════════════════════════════════════════════════════════
// INFO POP-WINDOW — "el pop-window de información" from the same e-mail.
// Shown once per session after the entry form. Copy is ENTRY_NOTICE in data.js.
// ═══════════════════════════════════════════════════════════════════════════
function noticeMaybeOpen(){
  if (!ENTRY_NOTICE || !ENTRY_NOTICE.id) return;
  // The notice announces the Beat-the-Competitor offer and nothing else, so it
  // goes only to the group authorised to use it.
  if (typeof btcAvailable === 'function' && !btcAvailable()) return;
  let seen = null;
  try { seen = sessionStorage.getItem(NOTICE_KEY); } catch(e){}
  if (seen === ENTRY_NOTICE.id) return;
  noticeRender(true);
}

function noticeRender(show){
  const root = document.getElementById('notice-root');
  if (!root) return;
  if (!show){ root.innerHTML = ''; root.classList.remove('on'); return; }

  const c = ENTRY_NOTICE[lang] || ENTRY_NOTICE.es;
  root.classList.add('on');
  root.innerHTML = `
    <div class="entry-scrim"></div>
    <div class="notice-modal" role="dialog" aria-modal="true">
      <div class="notice-head">
        <div class="notice-ic">${icon('info')}</div>
        <div>
          <h3 class="notice-title">${c.title}</h3>
          <p class="notice-lead">${c.lead}</p>
        </div>
      </div>
      <ul class="notice-list">
        ${c.bullets.map(b=>`<li>${icon('check')}<span>${b}</span></li>`).join('')}
      </ul>
      <button class="entry-cta" id="notice-ok">${c.cta}</button>
    </div>
  `;
  const ok = document.getElementById('notice-ok');
  if (ok) ok.addEventListener('click', ()=>{
    try { sessionStorage.setItem(NOTICE_KEY, ENTRY_NOTICE.id); } catch(e){}
    noticeRender(false);
  });
}

// ── Language change while a modal is open ──────────────────────────────────
function entryOnLangChange(){
  renderRepChip();
  if (entryOpen) entryRender();
  const nr = document.getElementById('notice-root');
  if (nr && nr.classList.contains('on')) noticeRender(true);
}

// ── Boot — called at the end of app.js init ────────────────────────────────
function entryBoot(){
  repInfo = entryLoad();
  renderRepChip();
  if (!repInfo) { entryShow(); return; }
  noticeMaybeOpen();
}
