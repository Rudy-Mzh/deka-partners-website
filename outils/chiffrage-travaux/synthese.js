/* ============================================================
   MOTEUR DE SYNTHÈSE DE LA BASE DE PRIX (notes d'amélioration d'Alexandre, 20/10/2026)
   1. Regroupement des lignes similaires  -> un poste générique avec prix minimum, médiane, nb de lignes sources
   2. Structure par corps de métier
   3. Un poste = un seul corps de métier (table de règles regles_postes.csv, modifiable sans toucher au code)
   4. Exclusion des devis de plus de 2 ans (filtre glissant, devis conservés avec le statut « hors période »)
   Fonctions pures : aucune dépendance au DOM (testable sous Node).

   regles_postes.csv (modifiable sans toucher au code) — première règle qui correspond = poste générique + corps de métier :
     motifs   : alternatives séparées par « | » ; dans une alternative, « & » = tous les mots ; « =mot » = mot entier ; accents/majuscules ignorés
     exclure  : mêmes motifs, écartent la ligne de la règle
     unite    : u (u ou forfait) | m2 | ml | m3 | h | jour | tonne | paire | an — une ligne dans une autre unité n'est pas mélangée (sous-groupe « — au m² »)
     nb_regex : (option) expression dont le 1er groupe capture un nombre de pièces : le prix du lot est ramené au prix unitaire
     affichage: principal | isole (lots / forfaits de projet, rangés dans « Lignes isolées »)
   corrections_postes.csv : une ligne = une correction manuelle (designation + source -> poste_generique + corps_metier ; poste vide = ligne isolée)
   Date d'émission d'un devis : colonne optionnelle date_devis (AAAA-MM-JJ, AAAA-MM ou AAAA) de base_prix.csv, sinon déduite de la référence
   (ex. DEV-202606-…, I-26-06-…, 130226, année seule). Date illisible -> « à vérifier » (ni retenu ni exclu en silence).
   ============================================================ */
(function(root){
'use strict';

var ORDRE_CORPS = [
  'Démolition & dépose','Maçonnerie & gros œuvre','Terrassement & VRD','Charpente & couverture','Façade & échafaudage',
  'Plâtrerie & isolation','Menuiseries extérieures','Menuiseries intérieures','Électricité','Plomberie & sanitaire',
  'Chauffage ventilation & ECS','Sols & revêtements','Peinture','Cuisine','Serrurerie & métallerie','Aménagements extérieurs',
  'Déchets & évacuation','Raccordements & compteurs','Architecte','Géomètre','Diagnostics immobiliers','Huissier / constats',
  'Syndic / copropriété','Études techniques (sol / ANC / électricité)','Divers'
];

/* Corps de métier de secours (catégorie d'origine du devis) quand aucune règle ne s'applique */
var CATEGORIE_VERS_CORPS = {
  'electricite':'Électricité','maconnerie':'Maçonnerie & gros œuvre','geometre':'Géomètre','huissier':'Huissier / constats',
  'diagnostiqueur':'Diagnostics immobiliers','peinture':'Peinture','chauffage':'Chauffage ventilation & ECS','etancheite':'Sols & revêtements',
  'recyclage':'Déchets & évacuation','dechets':'Déchets & évacuation','architecture':'Architecte','couvreur':'Charpente & couverture',
  'sanitaire':'Plomberie & sanitaire','plomberie':'Plomberie & sanitaire','plaquiste':'Plâtrerie & isolation','isolation':'Plâtrerie & isolation',
  'syndic':'Syndic / copropriété','etudesol':'Études techniques (sol / ANC / électricité)','volets':'Menuiseries extérieures','menuiserie':'Menuiseries intérieures',
  'demolition':'Démolition & dépose','terrassement':'Terrassement & VRD','facade':'Façade & échafaudage','assainissement':'Terrassement & VRD',
  'eau':'Raccordements & compteurs','carrelage':'Sols & revêtements','serrurerie':'Serrurerie & métallerie','ventilation':'Chauffage ventilation & ECS',
  'domotique':'Aménagements extérieurs','paysagiste':'Aménagements extérieurs','revetements':'Sols & revêtements','energies':'Chauffage ventilation & ECS',
  'escalier':'Menuiseries intérieures','cuisine':'Cuisine','exterieur':'Aménagements extérieurs','divers':'Divers'
};

function norm(s){
  return ' ' + String(s==null?'':s).toLowerCase().replace(/œ/g,'oe').normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/[^a-z0-9]+/g,' ').trim() + ' ';
}

/* ---------- Unités ---------- */
function unitClass(u){
  u = String(u||'').toLowerCase().trim();
  if(u==='u'||u==='forfait'||u==='unite'||u==='') return 'u';
  if(u==='pair'||u==='paire') return 'paire';
  if(u==='h'||u==='heure') return 'h';
  if(u==='t'||u==='tonne') return 'tonne';
  if(u==='annee'||u==='an') return 'an';
  return u;
}
function unitLabel(cls){ return cls==='tonne' ? 't' : cls==='m2' ? 'm²' : cls==='m3' ? 'm³' : cls; }
function rawUnitLabel(u){ u = String(u||'u').trim(); return u==='m2' ? 'm²' : u==='m3' ? 'm³' : u==='pair' ? 'paire' : u; }

/* ---------- Source -> artisan / référence ---------- */
function parseSource(src){
  var s = String(src||'').trim();
  var parts = s.split(/\s+/);
  var art = [], ref = [];
  var inRef = false;
  parts.forEach(function(p){
    if(!inRef && /\d/.test(p)) inRef = true;
    (inRef ? ref : art).push(p);
  });
  var refStr = ref.filter(function(p){ return !/^20\d\d(-20\d\d)?(H\d)?$/.test(p); }).join(' ');
  return {artisan: art.join(' ').replace(/[_]+/g,' ') || s, ref: refStr};
}

/* ---------- Dates d'émission ---------- */
function mkDate(y,m,d){ return new Date(Date.UTC(y,m-1,d)); }
function endOfMonth(y,m){ return new Date(Date.UTC(y,m,0)); }
function fmtDate(d){ return d.toISOString().slice(0,10); }

/* Retourne {min,max,precision,origine,label} ou null si aucune date lisible */
function inferDate(row){
  var explicit = String(row.date_devis==null?'':row.date_devis).trim();
  var m;
  if(explicit){
    if((m = explicit.match(/^(20\d\d)-(\d\d)-(\d\d)$/))) return {min:mkDate(+m[1],+m[2],+m[3]),max:mkDate(+m[1],+m[2],+m[3]),precision:'jour',origine:'saisie',label:m[3]+'/'+m[2]+'/'+m[1]};
    if((m = explicit.match(/^(20\d\d)-(\d\d)$/))) return {min:mkDate(+m[1],+m[2],1),max:endOfMonth(+m[1],+m[2]),precision:'mois',origine:'saisie',label:m[2]+'/'+m[1]};
    if((m = explicit.match(/^(20\d\d)$/))) return {min:mkDate(+m[1],1,1),max:mkDate(+m[1],12,31),precision:'annee',origine:'saisie',label:m[1]};
  }
  var src = String(row.source||'');
  if((m = src.match(/\b(\d\d)-(\d\d)-(20\d\d)\b/)) && +m[2]>=1 && +m[2]<=12 && +m[1]>=1 && +m[1]<=31)
    return {min:mkDate(+m[3],+m[2],+m[1]),max:mkDate(+m[3],+m[2],+m[1]),precision:'jour',origine:'déduite',label:m[1]+'/'+m[2]+'/'+m[3]};
  if((m = src.match(/DEV-?(20\d\d)(0[1-9]|1[0-2])-/i)))
    return monthInfo(+m[1],+m[2]);
  if((m = src.match(/\bI-(\d\d)-(0[1-9]|1[0-2])-/)))
    return monthInfo(2000+(+m[1]),+m[2]);
  if((m = src.match(/\bD(20\d\d)(0[1-9]|1[0-2])\d+/)))
    return monthInfo(+m[1],+m[2]);
  if((m = src.match(/\bD-?(2[3-9])(0[1-9]|1[0-2])\d{2,}\b/)))
    return monthInfo(2000+(+m[1]),+m[2]);
  if((m = src.match(/\b(\d\d)(\d\d)(2[3-9])\b/)) && +m[1]>=1 && +m[1]<=31 && +m[2]>=1 && +m[2]<=12)
    return {min:mkDate(2000+(+m[3]),+m[2],+m[1]),max:mkDate(2000+(+m[3]),+m[2],+m[1]),precision:'jour',origine:'déduite',label:m[1]+'/'+m[2]+'/20'+m[3]};
  if((m = src.match(/\b(20\d\d)\s*-\s*(20\d\d)\b/)))
    return {min:mkDate(+m[1],1,1),max:mkDate(+m[2],12,31),precision:'annee',origine:'déduite',label:m[1]+'-'+m[2]};
  var years = src.match(/\b20\d\d/g);
  if(years && years.length){
    var y = +years[years.length-1];
    return {min:mkDate(y,1,1),max:mkDate(y,12,31),precision:'annee',origine:'déduite',label:String(y)};
  }
  return null;
}
function monthInfo(y,mo){
  return {min:mkDate(y,mo,1),max:endOfMonth(y,mo),precision:'mois',origine:'déduite',label:(mo<10?'0':'')+mo+'/'+y};
}

function isEstimation(row){
  var src = String(row.source||''), notes = String(row.notes||'');
  if(/^devis reel/i.test(src)) return false;
  if(/estimation|extrapol/i.test(src)) return true;
  if(/\.(com|fr)\b/i.test(src)) return true;
  if(!/\d/.test(src)) return true;
  return false;
}

/* Statut vis-à-vis de la règle des 2 ans */
function statutPeriode(dateInfo, estEstimation, today){
  if(estEstimation) return 'estimation';
  if(!dateInfo) return 'a_verifier';
  var cutoff = new Date(Date.UTC(today.getUTCFullYear()-2, today.getUTCMonth(), today.getUTCDate()));
  if(dateInfo.max < cutoff) return 'hors_periode';
  if(dateInfo.min >= cutoff) return 'recent';
  return 'a_confirmer';
}

/* ---------- Règles ---------- */
function compileTerms(spec){
  return String(spec||'').split('|').map(function(alt){ return alt.trim(); }).filter(Boolean).map(function(alt){
    return alt.split('&').map(function(t){
      t = t.trim();
      if(t.charAt(0)==='=') return ' ' + norm(t.slice(1)).trim() + ' ';
      return norm(t).trim();
    }).filter(Boolean);
  });
}
function matchTerms(text, dnf){
  for(var i=0;i<dnf.length;i++){
    var ok = true;
    for(var j=0;j<dnf[i].length;j++){ if(text.indexOf(dnf[i][j])===-1){ ok=false; break; } }
    if(ok) return true;
  }
  return false;
}
function compileRules(rows){
  return rows.filter(function(r){ return r && r.poste_generique && r.motifs; }).map(function(r, i){
    var nb = null;
    if(r.nb_regex){ try{ nb = new RegExp(String(r.nb_regex).trim()); }catch(e){} }
    return {
      ordre:i, corps:String(r.corps_metier||'').trim(), poste:String(r.poste_generique).trim(), unite:unitClass(r.unite||'u'),
      motifs:compileTerms(r.motifs), exclure:compileTerms(r.exclure), nb:nb,
      affichage:(String(r.affichage||'principal').trim()||'principal')
    };
  });
}

/* ---------- Similarité automatique (lignes sans règle) ---------- */
var STOP = {de:1,du:1,des:1,la:1,le:1,les:1,et:1,en:1,a:1,au:1,aux:1,avec:1,sur:1,pour:1,par:1,un:1,une:1,d:1,l:1,compris:1,fourniture:1,pose:1,forfait:1,hors:1,sans:1,existant:1,existante:1,complet:1,complete:1};
function tokens(designation){
  var out = {};
  norm(designation).trim().split(' ').forEach(function(t){
    if(!t || STOP[t] || /^\d+([.,]\d+)?[a-z]*$/.test(t) || t.length<2) return;
    if(t.length>4 && t.charAt(t.length-1)==='s') t = t.slice(0,-1);
    out[t]=1;
  });
  return Object.keys(out);
}
function jaccard(a,b){
  if(!a.length || !b.length) return 0;
  var sb = {}; b.forEach(function(t){ sb[t]=1; });
  var inter = 0; a.forEach(function(t){ if(sb[t]) inter++; });
  return inter / (a.length + b.length - inter);
}

function median(arr){
  var a = arr.slice().sort(function(x,y){ return x-y; });
  var n = a.length; if(!n) return 0;
  return n%2 ? a[(n-1)/2] : (a[n/2-1]+a[n/2])/2;
}
function round2(x){ return Math.round(x*100)/100; }

function corpsDeSecours(row){
  var k = norm(row.categorie).trim().replace(/ /g,'');
  return CATEGORIE_VERS_CORPS[k] || 'Divers';
}

/* ---------- Construction de la synthèse ---------- */
/* rows : lignes brutes de base_prix.csv ; rules : lignes de regles_postes.csv ; corrections : lignes de corrections_postes.csv */
function buildSynthese(rows, ruleRows, corrections, opts){
  opts = opts || {};
  var today = opts.today || new Date();
  today = new Date(Date.UTC(today.getFullYear?today.getFullYear():today.getUTCFullYear(), today.getMonth?today.getMonth():today.getUTCMonth(), today.getDate?today.getDate():today.getUTCDate()));
  var rules = compileRules(ruleRows||[]);
  var corrMap = {};
  (corrections||[]).forEach(function(c){
    if(c && c.designation) corrMap[norm(c.designation)+'|'+norm(c.source||'')] = c;
  });

  var lignes = rows.map(function(r, idx){
    var est = isEstimation(r);
    var di = est ? null : inferDate(r);
    var ps = parseSource(r.source);
    return {
      idx:idx, row:r, text:norm(r.designation), uc:unitClass(r.unite), estimation:est, date:di,
      statut:statutPeriode(di, est, today), artisan:ps.artisan, ref:ps.ref, rule:null, corps:null, poste:null, div:1, forceIsole:false, manuel:false
    };
  });

  // 1) affectation par correction manuelle puis par règle (1 poste = 1 seul corps de métier)
  lignes.forEach(function(L){
    L.variante = !!(L.row.groupe_variante && String(L.row.groupe_variante).trim());
    var cor = corrMap[norm(L.row.designation)+'|'+norm(L.row.source||'')];
    if(cor){
      L.manuel = true;
      if(cor.poste_generique){ L.corps = cor.corps_metier || corpsDeSecours(L.row); L.poste = cor.poste_generique; L.ruleUc = L.uc; }
      else { L.forceIsole = true; L.corps = (cor.corps_metier || corpsDeSecours(L.row)); }
      return;
    }
    for(var i=0;i<rules.length;i++){
      var R = rules[i];
      if(!matchTerms(L.text, R.motifs)) continue;
      if(R.exclure.length && matchTerms(L.text, R.exclure)) continue;
      L.rule = R; L.corps = R.corps; L.poste = R.poste; L.ruleUc = R.unite;
      if(L.variante){ L.poste = String(L.row.designation).trim(); L.ruleUc = L.uc; }
      if(R.nb && !L.variante){
        var m = L.text.trim().match(R.nb);
        if(m && m[1] && +m[1] > 1) L.div = +m[1];
      }
      break;
    }
  });

  // 2) regroupement automatique des lignes sans règle (même libellé, puis libellés quasi identiques)
  var libres = lignes.filter(function(L){ return !L.poste && !L.forceIsole; });
  var buckets = {};
  libres.forEach(function(L){
    L.corps = corpsDeSecours(L.row);
    var k = L.corps+'||'+L.uc;
    (buckets[k] = buckets[k]||[]).push(L);
  });
  Object.keys(buckets).forEach(function(k){
    var list = buckets[k];
    list.forEach(function(L){ L.tok = tokens(L.row.designation); L.parent = L; });
    function find(x){ while(x.parent!==x){ x.parent = x.parent.parent; x = x.parent; } return x; }
    for(var i=0;i<list.length;i++) for(var j=i+1;j<list.length;j++){
      var a = list[i], b = list[j];
      if(a.text===b.text || jaccard(a.tok,b.tok) >= 0.6){
        var ra = find(a), rb = find(b); if(ra!==rb) rb.parent = ra;
      }
    }
    var comps = {};
    list.forEach(function(L){ var r = find(L); (comps[r.idx] = comps[r.idx]||[]).push(L); });
    Object.keys(comps).forEach(function(ci){
      var members = comps[ci];
      var label = members.map(function(L){ return String(L.row.designation).trim(); }).sort(function(x,y){ return x.length-y.length; })[0];
      members.forEach(function(L){ L.poste = label; L.ruleUc = L.uc; L.auto = true; });
    });
  });
  lignes.forEach(function(L){ if(L.forceIsole){ L.poste = String(L.row.designation).trim(); L.ruleUc = L.uc; L.isoleManuel = true; } });

  // 3) constitution des groupes (poste générique + unité)
  var groupes = {};
  var ordre = [];
  lignes.forEach(function(L){
    var mismatch = L.uc !== L.ruleUc;
    var uc = mismatch ? L.uc : L.ruleUc;
    var key = L.corps+'||'+L.poste+'||'+uc+((L.isoleManuel||L.variante)?'||#'+L.idx:'');
    var g = groupes[key];
    if(!g){
      g = groupes[key] = {
        id:key, corps:L.corps, label:L.poste + (mismatch ? ' — au '+unitLabel(uc) : ''), poste:L.poste, uc:uc, unite:unitLabel(uc),
        affichage:(L.rule ? L.rule.affichage : 'auto'), regle:!!L.rule || (L.manuel && !L.forceIsole), variante:!!L.variante, lignes:[]
      };
      ordre.push(g);
    }
    g.lignes.push(L);
    L.group = g;
  });

  // 4) statistiques (devis récents uniquement) + statut d'affichage
  ordre.forEach(function(g){
    var inclus = g.lignes.filter(function(L){ return L.statut==='recent' || L.statut==='a_confirmer'; });
    var estims = g.lignes.filter(function(L){ return L.statut==='estimation'; });
    var rawUnits = {}; g.lignes.forEach(function(L){ rawUnits[String(L.row.unite||'u').trim().toLowerCase()] = 1; });
    var ru = Object.keys(rawUnits);
    if(ru.length===1) g.unite = rawUnitLabel(ru[0]);
    g.nbSources = inclus.length;
    g.nbHors = g.lignes.filter(function(L){ return L.statut==='hors_periode'; }).length;
    g.nbVerif = g.lignes.filter(function(L){ return L.statut==='a_verifier'; }).length;
    g.nbAConfirmer = g.lignes.filter(function(L){ return L.statut==='a_confirmer'; }).length;
    g.nbEstim = estims.length;
    function vals(list, f){ return list.map(function(L){ return (Number(L.row[f])||0) / L.div; }).filter(function(v){ return v>0; }); }
    function agg(list){
      var b = vals(list,'prix_bas'), m = vals(list,'prix_moyen'), h = vals(list,'prix_haut');
      if(!m.length) return null;
      return {min:round2(Math.min.apply(null,b.length?b:m)), med:round2(median(m)), max:round2(Math.max.apply(null,h.length?h:m))};
    }
    g.statsDevis = agg(inclus);
    g.statsEstim = agg(estims);
    if(g.statsDevis){ g.stats = g.statsDevis; g.baseCalcul = 'devis'; }
    else if(g.statsEstim){ g.stats = g.statsEstim; g.baseCalcul = 'estimation'; }
    else { g.stats = null; g.baseCalcul = g.nbVerif ? 'a_verifier' : 'hors_periode'; }
    var principal;
    if(g.affichage==='isole') principal = false;
    else if(g.lignes.length===1 && g.lignes[0].isoleManuel) principal = false;
    else if(g.regle) principal = true;
    else principal = (g.nbSources>=2 || g.nbEstim>=1);
    g.principal = principal;
  });

  // 5) arborescence par corps de métier
  var parCorps = {};
  ordre.forEach(function(g){ (parCorps[g.corps] = parCorps[g.corps]||[]).push(g); });
  var corpsList = Object.keys(parCorps).sort(function(a,b){
    var ia = ORDRE_CORPS.indexOf(a), ib = ORDRE_CORPS.indexOf(b);
    if(ia<0) ia = 999; if(ib<0) ib = 999;
    return ia-ib || a.localeCompare(b,'fr');
  }).map(function(name){
    var gs = parCorps[name].slice().sort(function(a,b){ return a.label.localeCompare(b.label,'fr'); });
    return {name:name, principaux:gs.filter(function(g){ return g.principal; }), isoles:gs.filter(function(g){ return !g.principal; })};
  });

  return {today:today, lignes:lignes, groupes:ordre, corps:corpsList};
}

/* Poste du catalogue (même forme que les lignes de base_prix.csv) pour un groupe */
function itemOfGroup(g){
  var s = g.stats || {min:0,med:0,max:0};
  var txt = g.baseCalcul==='devis' ? ('Synthèse de '+g.nbSources+' devis récent'+(g.nbSources>1?'s':'')+' — minimum retenu, médiane '+Math.round(s.med)+' €')
          : g.baseCalcul==='estimation' ? 'Estimation de marché (aucun devis récent)' : 'Aucun devis récent exploitable';
  var v = g.variante ? g.lignes[0].row : null;
  return {categorie:g.corps, designation:g.label, unite:g.unite, prix_bas:s.min, prix_moyen:s.med, prix_haut:s.max,
          source:g.baseCalcul==='devis' ? 'Devis reel' : 'Estimation marche', notes:(v && v.notes) ? v.notes : txt,
          groupe_variante:v ? v.groupe_variante : null, est_defaut:v ? !!v.est_defaut : false, _groupId:g.id};
}

var API = {
  ORDRE_CORPS:ORDRE_CORPS, norm:norm, unitClass:unitClass, unitLabel:unitLabel, parseSource:parseSource, inferDate:inferDate,
  isEstimation:isEstimation, statutPeriode:statutPeriode, buildSynthese:buildSynthese, itemOfGroup:itemOfGroup, fmtDate:fmtDate
};
if(typeof module!=='undefined' && module.exports) module.exports = API;
root.DEKA_SYNTHESE = API;
})(typeof window!=='undefined' ? window : globalThis);
