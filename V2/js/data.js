// ═══════════════════════════════════════════════════════════════════════════
// LIBERTY BUSINESS — DATA
// Last updated: 2026-08-28 — sub-500 Mbps tiers retired (business decision).
// Previous: LTO 3P prices +$2.00 (Lead & FMC) · 500/30 & 500/500 added
// ═══════════════════════════════════════════════════════════════════════════
const COAX = [
  /* ── REMOVED 2026-08-28 — Business decision (Astrid M. Fuentes):
     only 500 Mbps and above are offered going forward.
     Rows kept commented for reference / revert. ──────────────────
  { tier:'Retention', speed:'50/5',   fmc:null,    tech:'COAX', voip:1,
    list:{p1:61.99,  p2:66.99,  p3b:85.49, p3e:null,   p3u:null  },
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }},
  { tier:'Retention', speed:'150/30', fmc:'300/30',tech:'COAX', voip:3,
    list:{p1:91.99,  p2:96.99,  p3b:null,  p3e:123.49, p3u:171.49},
    promo:{p1:71.99, p2:76.99,  p3b:null,  p3e:101.49, p3u:149.49}},
  ─────────────────────────────────────────────────────────────── */
  // 350/30 — NOT offered standalone (below 500). Kept only as the base row
  // that feeds the 700/30 FMC offer, which sells at 700 Mbps. fmcOnly hides it.
  { tier:'Retention', speed:'350/30', fmc:'700/30',tech:'COAX', voip:4, fmcOnly:true,
    list:{p1:128.99, p2:136.99, p3b:null,  p3e:163.49, p3u:211.49},
    promo:{p1:108.99,p2:116.99, p3b:null,  p3e:141.49, p3u:189.49}},
  /* ── REMOVED 2026-08-28 — Business decision (Astrid M. Fuentes):
     only 500 Mbps and above are offered going forward.
     Rows kept commented for reference / revert. ──────────────────
  { tier:'Retention', speed:'400/30', fmc:null,    tech:'COAX', voip:4,
    list:{p1:178.99, p2:186.99, p3b:null,  p3e:213.49, p3u:261.49},
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }},
  ─────────────────────────────────────────────────────────────── */
  // ── 500/30 — LTO tier (added) ──────────────────────────────────────────
  { tier:'Retention', speed:'500/30', fmc:null,    tech:'COAX', voip:4,
    list:{p1:null,   p2:296.99, p3b:null,  p3e:323.49, p3u:371.49},
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }},
  // ───────────────────────────────────────────────────────────────────────
  { tier:'Retention', speed:'600/30', fmc:'1G/30', tech:'COAX', voip:4,
    list:{p1:276.99, p2:286.99, p3b:null,  p3e:313.49, p3u:361.49},
    promo:{p1:160.99,p2:170.99, p3b:null,  p3e:197.49, p3u:245.49}},
  { tier:'Docsis3.1', speed:'1G/30',  fmc:null,    tech:'D3.1', voip:4,
    list:{p1:356.99, p2:366.99, p3b:null,  p3e:393.49, p3u:441.49},
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }}
];

const FTTX = [
  /* ── REMOVED 2026-08-28 — Business decision (Astrid M. Fuentes):
     only 500 Mbps and above are offered going forward.
     Rows kept commented for reference / revert. ──────────────────
  { tier:'Retention', speed:'50/50',     fmc:null,      tech:'FTTx',   voip:1,
    list:{p1:61.99,  p2:66.99,  p3b:85.49, p3e:null,   p3u:null  },
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }},
  { tier:'Retention', speed:'150/150',   fmc:'300/300', tech:'FTTx',   voip:2,
    list:{p1:91.99,  p2:96.99,  p3b:null,  p3e:123.49, p3u:171.49},
    promo:{p1:71.99, p2:76.99,  p3b:null,  p3e:101.49, p3u:149.49}},
  ─────────────────────────────────────────────────────────────── */
  // 350/350 — NOT offered standalone (below 500). Base row for the 700/700 FMC
  // offer only. fmcOnly hides it from the Plans, Specials and quote-builder lists.
  { tier:'Retention', speed:'350/350',   fmc:'700/700', tech:'FTTx',   voip:2, fmcOnly:true,
    list:{p1:128.99, p2:136.99, p3b:null,  p3e:163.49, p3u:211.49},
    promo:{p1:108.99,p2:116.99, p3b:null,  p3e:141.49, p3u:189.49}},
  /* ── REMOVED 2026-08-28 — Business decision (Astrid M. Fuentes):
     only 500 Mbps and above are offered going forward.
     Rows kept commented for reference / revert. ──────────────────
  { tier:'Retention', speed:'400/400',   fmc:null,      tech:'FTTx',   voip:2,
    list:{p1:178.99, p2:186.99, p3b:null,  p3e:213.49, p3u:261.49},
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }},
  ─────────────────────────────────────────────────────────────── */
  // ── 500/500 — LTO tier (added) ─────────────────────────────────────────
  { tier:'Retention', speed:'500/500',   fmc:null,      tech:'FTTx',   voip:2,
    list:{p1:null,   p2:296.99, p3b:null,  p3e:323.49, p3u:371.49},
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }},
  // ───────────────────────────────────────────────────────────────────────
  { tier:'Retention', speed:'600/600',   fmc:'1G/1G',   tech:'FTTx',   voip:2,
    list:{p1:276.99, p2:286.99, p3b:null,  p3e:313.49, p3u:361.49},
    promo:{p1:160.99,p2:170.99, p3b:null,  p3e:197.49, p3u:245.49}},
  { tier:'Retention', speed:'1G/1G',     fmc:null,      tech:'FTTx',   voip:2,
    list:{p1:356.99, p2:366.99, p3b:null,  p3e:393.49, p3u:441.49},
    promo:{p1:null,  p2:null,   p3b:null,  p3e:null,   p3u:null  }},
  { tier:'Retention', speed:'1.5G/1.5G', fmc:null,      tech:'FTTx15', voip:2,
    list:{p1:401.99, p2:431.99, p3b:null,  p3e:438.99, p3u:499.99},
    promo:null}
];

const FMC_PLANS = [
  ...COAX.filter(p=>p.fmc).map(p=>({...p,displaySpeed:p.fmc,baseSpeed:p.speed,tech:'FMC',sourceTech:p.tech==='D3.1'?'COAX D3.1':'COAX'})),
  ...FTTX.filter(p=>p.fmc).map(p=>({...p,displaySpeed:p.fmc,baseSpeed:p.speed,tech:'FMC',sourceTech:'FTTx'}))
];

// ── OFFERABLE PLANS ─────────────────────────────────────────────────────────
// Everything the rep can actually sell. Excludes rows flagged fmcOnly, which
// exist only to feed FMC_PLANS (2026-08-28: 350/30 and 350/350, whose FMC
// offers are 700/30 and 700/700 — above the 500 Mbps floor).
// Use these, not COAX / FTTX, anywhere a plan list is shown to a rep.
const COAX_OFFER = COAX.filter(p=>!p.fmcOnly);
const FTTX_OFFER = FTTX.filter(p=>!p.fmcOnly);

// ── LTO PRICING ─────────────────────────────────────────────────────────────
// Change log: ld3p and f3p (3P Lead Offer & FMC) +$2.00 on 500/30 and 1G tiers
// ─────────────────────────────────────────────────────────────────────────────
const COAX_LTO = [
  /* ── REMOVED 2026-08-28 — Business decision (Astrid M. Fuentes):
     only 500 Mbps and above are offered going forward.
     Rows kept commented for reference / revert. ──────────────────
  {speed:'100/10', tech:'',         voip:1, l2p:138.99,l3p:null,  ld2p:57.99,ld3p:null, f2p:52.99,f3p:null },
  {speed:'300/30', tech:'',         voip:4, l2p:183.99,l3p:null,  ld2p:82.99,ld3p:null, f2p:57.99,f3p:null },
  ─────────────────────────────────────────────────────────────── */
  // 3P: ld3p 74.49→76.49 · f3p 74.49→76.49 (+$2.00)
  {speed:'500/30', tech:'',         voip:4, l2p:296.99,l3p:151.49,ld2p:67.99,ld3p:76.49,f2p:60.99,f3p:76.49},
  // 3P: ld3p 79.49→81.49 · f3p 79.49→81.49 (+$2.00)
  {speed:'1G/30',  tech:'Docsis3.1',voip:4, l2p:366.99,l3p:391.49,ld2p:84.99,ld3p:81.49,f2p:62.99,f3p:81.49}
];

const FTTX_LTO = [
  /* ── REMOVED 2026-08-28 — Business decision (Astrid M. Fuentes):
     only 500 Mbps and above are offered going forward.
     Rows kept commented for reference / revert. ──────────────────
  {speed:'100/100',voip:1, l2p:138.99,l3p:null,  ld2p:57.99,ld3p:null, f2p:52.99,f3p:null },
  {speed:'300/300',voip:2, l2p:183.99,l3p:null,  ld2p:82.99,ld3p:null, f2p:57.99,f3p:null },
  ─────────────────────────────────────────────────────────────── */
  // 3P: ld3p 74.49→76.49 · f3p 74.49→76.49 (+$2.00)
  {speed:'500/500',voip:2, l2p:296.99,l3p:151.49,ld2p:67.99,ld3p:76.49,f2p:60.99,f3p:76.49},
  // 3P: ld3p 79.49→81.49 · f3p 79.49→81.49 (+$2.00)
  {speed:'1G/1G',  voip:2, l2p:366.99,l3p:391.49,ld2p:84.99,ld3p:81.49,f2p:62.99,f3p:81.49}
];

const ADDONS = [
  {id:'ao1',name:'Liberty Business Ongoing',sub:'Any HSD Plan',price:20.00,lto:9.99 },
  {id:'ao2',name:'Hunting',                 sub:'Any VoIP Plan',price:9.99, oneTime:25.00, lto:null},
  {id:'ao3',name:'IP Estático (Add-on)',      sub:'Any HSD Plan', price:40.00,lto:null},
  {id:'ao4',name:'Antivirus',               sub:'Any Bundle',   price:9.99, lto:null},
  {id:'ao5',name:'Nube (Storage)',          sub:'Any Bundle',   price:15.99,lto:null},
  {id:'ao6',name:'Tienda Online',           sub:'Any Bundle',   price:15.99,lto:null},
  {id:'ao7',name:'Voicemail',               sub:'Any VoIP Plan',price:4.99, lto:null}
];

// VIDEO_2P_PLANS — shown in Plans tab as bundles p2e / p2u
// Fixed speed: COAX 10/1 · FTTx 10/10 · Fixed price regardless of speed
const VIDEO_2P_PLANS = [
  {id:'v2pe', name:'Español De Primera', bundleId:'p2e', coaxSpeed:'10/1', fttxSpeed:'10/10', price:67.49},
  {id:'v2pu', name:'Ultimate',           bundleId:'p2u', coaxSpeed:'10/1', fttxSpeed:'10/10', price:111.49}
];

// Fox Deportes — conditional add-on for 2P-E, 2P-U, 3P-E, 3P-U
const FOX_DEPORTES = {id:'fox1', name:'Fox Deportes', price:25.00, compat:['p2e','p2u','p3e','p3u']};

const ULT_ADDONS = [
  {id:'u1',name:'Ultimate News & Education',price:3.99},
  {id:'u2',name:'Ultimate Spanish',         price:4.99},
  {id:'u3',name:'Ultimate Kids',            price:2.99},
  {id:'u4',name:'Ultimate Sports',          price:4.99},
  {id:'u5',name:'Ultimate Movies',          price:4.99},
  {id:'u6',name:'Ultimate Plus',            price:14.99}
];

const HARDWARE = [
  {id:'hw1',name:'Forti Wifi30G', sub:'Seguridad WiFi / WiFi Security', price:28.25},
  {id:'hw2',name:'FEX-101F',      sub:'Switch / Network Extension',     price:11.75},
  {id:'hw3',name:'Managed WAN',   sub:'Managed WAN Service',            price:45.00},
  {id:'hw4',name:'Managed MSS',   sub:'Managed Security Service',       price:22.00},
  {id:'hw5',name:'IP Estático (HW)',sub:'Any HSD Plan',                  price:20.00}
];

// ═══════════════════════════════════════════════════════════════════════════
// REP GROUPS — entry screen (Bryan A. Olivari, "RE: Fixed Sales Tool Changes",
// 2026-09-08, point 3). Order and wording are verbatim from the e-mail; do not
// reword them without telling Bryan, because the same seven values have to exist
// on the mobile tool for the two to report against the same list.
// ═══════════════════════════════════════════════════════════════════════════
const REP_GROUPS = [
  {id:'sme',       es:'Small/Medium Enterprise', en:'Small/Medium Enterprise'},
  {id:'ccs',       es:'Contact Center & Support',en:'Contact Center & Support'},
  {id:'retail',    es:'Retail',                  en:'Retail'},
  {id:'d2d',       es:'Door to Door',            en:'Door to Door'},
  {id:'ae-pr',     es:'Account Executives PR',   en:'Account Executives PR'},
  {id:'ae-usvi',   es:'Account Executives USVI', en:'Account Executives USVI'},
  {id:'wholesale', es:'Wholesale',               en:'Wholesale'}
];

// What each group is allowed to see. This is the "sin cambiar de enlace" hook:
// the group is chosen on the entry screen and the shell rebuilds around it, so
// every group uses the same URL.
//
// A group with no entry here sees everything, which is today's behaviour for all
// seven. Valid tab ids: guide · planes · lto · especiales · addons · promos ·
// btc · proposal. 'guide' and 'proposal' are never hidden (see groupHiddenTabs).
//
// What changes for Door to Door is handled by BTC_GROUPS below, not here: the
// Beat-the-Competitor offer is authorised for Door to Door only (business
// feedback, 2026-09-10). GROUP_VIEWS stays for the OTHER six groups, whose rules
// are not defined yet — an entry here hides tabs from that group.
//
// Note this is a view filter, not a control: it lives in the browser and a rep
// can pick any group from the drop-down. It keeps the offer out of the way of
// people who should not be using it; it does not stop someone determined. Do not
// use it to enforce pricing authority.
const GROUP_VIEWS = {
  // 'wholesale': { hideTabs:['lto'] },   // ← shape of a future rule
};

// ═══════════════════════════════════════════════════════════════════════════
// BEAT-THE-COMPETITOR OFFER
// Bryan A. Olivari, same e-mail, point 3: "por si el cliente tiene una oferta de
// la competencia, podamos ofrecerle únicamente el 2 Pack de 500 Megas por $37.49".
//
// This price is NOT derived from COAX / FTTX or from the LTO table. Today the
// cheapest 500 Mbps 2P we sell is LTO FMC at $60.99, so $37.49 cannot be reached
// by any existing column — it is its own price type, loaded here.
//
// EVERYTHING flagged TODO below is a business answer, not a code problem. All of
// it is read from this one object: the Plans toggle, the Beat-the-Competitor tab,
// step 4 of the quote, the proposal PDF and the SOHO contract.
// ═══════════════════════════════════════════════════════════════════════════
const BTC_OFFER = {
  active:  true,
  price:   37.49,
  bundle:  'p2',                     // 2 Pack only, per the e-mail
  speeds:  ['500/30','500/500'],     // TODO confirm: COAX only, or both technologies?
  starts:  null,                     // TODO 'YYYY-MM-DD'
  ends:    null,                     // TODO 'YYYY-MM-DD' — after this the tab hides itself
  term:    null,                     // TODO 'none' | '12m' | '24m' | '36m'
  activationFee: null,               // TODO which of the two fees in CONTRACT_TERMS applies
  revertPrice: 296.99,               // TODO confirm — 2P list price for 500 Mbps today
  includesVoip: true,                // 2P in this tool is HSD + VoIP
  stacksWithPenalty: null            // TODO does it stack with "Pago de Penalidad — Competidores"?
};

// ── WHO IS AUTHORISED ──────────────────────────────────────────────────────
// Business feedback 2026-09-10: the Beat-the-Competitor offer is authorised for
// Door to Door ONLY. Before this it was visible to every group, which was the
// reason the first release was rolled back.
//
// Add a group id here to authorise it. Ids come from REP_GROUPS above.
const BTC_GROUPS = ['d2d'];

function btcGroupAllowed(){
  // repGroup() lives in js/entry.js and is only called at run time, so load order
  // does not matter. No group yet (entry screen unanswered) means not authorised,
  // which is the safe default.
  var g = (typeof repGroup === 'function') ? repGroup() : null;
  return !!g && BTC_GROUPS.indexOf(g) >= 0;
}

// THE choke point for everything the rep can SEE. Tab, Plans toggle, plan grid
// and the step-4 price card all ask this one function, so the offer cannot leak
// through a surface someone forgot to guard.
//
// Deliberately NOT used by btcEligible() / btcPrice(): a quote already built at
// $37.49 keeps its price if the rep switches group mid-quote. Hiding the offer
// is the requirement; silently blanking a quote in progress is not.
function btcAvailable(){
  return btcWindowOpen() && btcGroupAllowed();
}

// ── THE APPROVAL CHAIN ─────────────────────────────────────────────────────
// Victor A. Figueroa (Manager B2B Retail Sales), same e-mail thread, 2026-09-10
// 3:09 PM, to Bryan and Roy; Roy Perez agreed on the thread a minute later. His
// words: "El proceso de este precio es un email con aprobación de Roy y tiene
// que tener factura del proveedor o una propuesta. Esta aprobación se sube en
// salesforce luego. En el caso de elevadores no requiere la documentación de
// propuesta o factura, pero específicamente es para los casos de elevadores."
//
// This is the first time the process behind the price was written down, which is
// what Bryan asked for in his reply. The price was never the hard part; the
// paperwork is.
const BTC_APPROVAL = {
  approver:   'Roy Perez',
  needsDocs:  true,
  salesforce: true,
  // The only case that skips the evidence. Victor was explicit that it does not
  // extend to anything else, so keep this list at one item unless he says so.
  docExempt:  ['elevators'],
  source:     'Victor A. Figueroa · Manager B2B Retail Sales · 2026-09-10'
};

// ── THE OTHER ROUTE ────────────────────────────────────────────────────────
// From the same e-mail: "el plan de 500 megas a $67.99 es una aprobación sin los
// documentos requeridos. Pero requiere una aprobación del equipo de producto."
//
// $67.99 is NOT a new number. It is the LTO Lead Offer 2P price already sitting
// in COAX_LTO / FTTX_LTO as `ld2p` for 500/30 and 500/500 (verified 2026-09-10).
// So the tool quotes it through the existing 'lto-lead' price type rather than
// inventing a second flat price — one number, one place, no drift.
//
// This route is NOT Door to Door only: the Lead Offer is on the LTO tab for
// everyone. It appears here because a rep who cannot get the competitor's
// paperwork needs to know what to fall back on.
const BTC_ALT_PATH = {
  price:     67.99,
  priceType: 'lto-lead',
  needsDocs: false,
  approver:  'product',
  // TODO Victor: does the Product-team approval apply to EVERY Lead Offer sale,
  // or only to competitive situations like this one? If it is every sale, the LTO
  // tab has to say so too. Set to 'competitive' or 'always' once confirmed.
  scope:     null
};

// True when the offer window is open. `starts` / `ends` null means "no limit".
function btcWindowOpen(today){
  if (!BTC_OFFER.active) return false;
  const d = today || new Date().toISOString().slice(0,10);
  if (BTC_OFFER.starts && d < BTC_OFFER.starts) return false;
  if (BTC_OFFER.ends   && d > BTC_OFFER.ends)   return false;
  return true;
}

// Is this plan + bundle the one thing the Beat-the-Competitor offer covers?
// FMC rows are excluded on purpose: an FMC row sells at its doubled speed and is
// a different offer, so it is not "the 2 Pack of 500 Megas".
function btcEligible(plan, bundle){
  if (!plan || !btcWindowOpen()) return false;
  if (bundle !== BTC_OFFER.bundle) return false;
  if (plan.tech === 'FMC' || plan._voz1p || plan._vid2p) return false;
  return BTC_OFFER.speeds.includes(plan.speed);
}

// The offer price, or null when it does not apply. Single source of truth.
function btcPrice(plan, bundle){
  return btcEligible(plan, bundle) ? BTC_OFFER.price : null;
}

// The rep-facing plans the offer covers, in the order the Plans tab shows them.
function btcPlans(){
  return [...COAX_OFFER, ...FTTX_OFFER].filter(p=>btcEligible(p, BTC_OFFER.bundle));
}

// ── ENTRY NOTICE — the "pop-window de información" shown once per session right
// after the entry form. Copy lives here so it can be swapped without touching
// code. Bump `id` to show it again to everyone who already dismissed it.
const ENTRY_NOTICE = {
  id: '2026-09-btc',
  es: {
    title: 'Nuevo: Beat-the-Competitor Offer',
    lead:  'Se añadió una pestaña nueva a la herramienta.',
    bullets: [
      'Autorizada <strong>solo para Door to Door</strong>. Si el cliente presenta una oferta de la competencia, puedes ofrecerle <strong>únicamente el 2 Pack de 500 Megas por $37.49</strong>.',
      'Las reglas completas están en la pestaña <strong>Beat-the-Competitor Offer</strong>.',
      'En <strong>Planes</strong> tienes un toggle para ver ese precio y cotizarlo sin salir de la herramienta.',
      'Recuerda: desde el 28 de agosto solo se ofrecen paquetes de <strong>500 Megas en adelante</strong>.'
    ],
    cta: 'Entendido'
  },
  en: {
    title: 'New: Beat-the-Competitor Offer',
    lead:  'A new tab was added to the tool.',
    bullets: [
      'Authorised <strong>for Door to Door only</strong>. If the customer brings a competitor offer, you may offer <strong>only the 2 Pack of 500 Mbps at $37.49</strong>.',
      'The full rules live in the <strong>Beat-the-Competitor Offer</strong> tab.',
      'On <strong>Plans</strong> there is a toggle to see that price and quote it without leaving the tool.',
      'Reminder: since August 28 only <strong>500 Mbps and above</strong> is offered.'
    ],
    cta: 'Got it'
  }
};
