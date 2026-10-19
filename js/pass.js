/* Zwergeninsel – Spielstand und Zwergenpass
   Der ganze Spielstand eines Kindes passt in einen 12-stelligen Code (XXXX-XXXX-XXXX).
   So kann jedes Kind auf jedem Koffer-iPad weiterspielen, ganz ohne Server.

   Aufbau (60 Bit):
   id 15 | zwerg 4 | kern 3x3 | tief 3x3 | bonus 3x2 | kapitel offen 2 | kronen 3x3 | prüfsumme 5 | 1 frei
   Ältere 10-stellige Codes (ohne Kronen) werden weiterhin gelesen. */

(function () {
  const ZI = window.ZI || (window.ZI = {});
  const ALPHA = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // ohne 0, 1, I, O
  const MASK10 = 0x2A5F3C91B7n;                // alter 10-stelliger Code
  const MASK12 = 0x9D3A5F3C91B7E4n;            // neuer 12-stelliger Code

  class Stand {
    constructor(o = {}) {
      this.id = o.id ?? Math.floor(Math.random() * 32768);
      this.zwerg = o.zwerg ?? 1;            // 1–12
      this.kern = o.kern ?? [0, 0, 0];      // je Kapitel Bitmaske der 3 Stationen
      this.tief = o.tief ?? [0, 0, 0];      // je Kapitel erreichte Tiefe 0–5 („Noch tiefer graben“)
      this.bonus = o.bonus ?? [0, 0, 0];    // je Kapitel beste Sterne im Bonusspiel (0–3)
      this.offen = o.offen ?? 0;            // höchstes freigeschaltetes Kapitel (0 = Kapitel 1)
      this.kronen = o.kronen ?? [0, 0, 0];  // je Kapitel: Hauptstollen-Stationen fehlerfrei geschafft
      this.bau = o.bau ?? 0;                // Bitmaske der geschafften Gebäude-Übungen (10 Bit)
    }
    static bits(m) { let n = 0; for (let i = 0; i < 3; i++) if (m & (1 << i)) n++; return n; }
    coreCount(k) { return Stand.bits(this.kern[k]); }
    tiefe(k) { return Math.min(5, this.tief[k] || 0); }
    deepCount(k) { return this.tiefe(k); }
    deepTotal() { return [0, 1, 2].reduce((a, k) => a + this.tiefe(k), 0); }
    coreTotal() { return this.kern.reduce((a, m) => a + Stand.bits(m), 0); }
    kronenTotal() { return this.kronen.reduce((a, m) => a + Stand.bits(m), 0); }
    bonusMax() { return Math.max(...this.bonus); }
    bonusTotal() { return this.bonus.reduce((a, b) => a + b, 0); }
    gems() { return this.deepTotal() * (ZI.GEMS_PRO_STOLLEN || 5) + this.bonusTotal(); }
    hatKern(k, i) { return !!(this.kern[k] & (1 << i)); }
    // i = einer der bisherigen Tiefen Stollen; er ist geschafft, wenn seine Tiefe erreicht ist
    hatTief(k, i) { return this.tiefe(k) >= ZI.tiefeVon(k, i); }
    hatKrone(k, i) { return !!(this.kronen[k] & (1 << i)); }
    setzeKern(k, i) { this.kern[k] |= (1 << i); }
    setzeTief(k, i) { this.setzeTiefe(k, ZI.tiefeVon(k, i)); }
    setzeTiefe(k, n) { this.tief[k] = Math.max(this.tiefe(k), Math.min(5, n)); }
    setzeKrone(k, i) { this.kronen[k] |= (1 << i); }
    hatBau(bit) { return !!(this.bau & (1 << bit)); }
    setzeBau(bit) { this.bau |= (1 << bit); }
    bauTotal() { let n = 0; for (let i = 0; i < 11; i++) if (this.bau & (1 << i)) n++; return n; }
    zwergFrei(nr) {
      const z = ZI.ZWERGE.find((d) => d.nr === nr);
      return !!z && (z.start || (z.unlock && z.unlock(this)));
    }
    freieZwerge() { return ZI.ZWERGE.filter((z) => this.zwergFrei(z.nr)).map((z) => z.nr); }

    /* die 45 Bit des alten Codes */
    kernBits() {
      let v = BigInt(this.id & 0x7fff);
      v = (v << 4n) | BigInt((this.zwerg - 1) & 15);
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.kern[k] & 7);
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.tief[k] & 7);
      for (let k = 0; k < 3; k++) v = (v << 2n) | BigInt(this.bonus[k] & 3);
      v = (v << 2n) | BigInt(this.offen & 3);
      return v;
    }
    static ausKernBits(v, s) {
      s.offen = Number(v & 3n); v >>= 2n;
      for (let k = 2; k >= 0; k--) { s.bonus[k] = Number(v & 3n); v >>= 2n; }
      for (let k = 2; k >= 0; k--) { s.tief[k] = Number(v & 7n); v >>= 3n; }
      for (let k = 2; k >= 0; k--) { s.kern[k] = Number(v & 7n); v >>= 3n; }
      s.zwerg = Number(v & 15n) + 1; v >>= 4n;
      s.id = Number(v & 0x7fffn);
      return s;
    }
    static pruef(v) {
      let h = 7n;
      let x = v;
      for (let i = 0; i < 11; i++) { h = (h * 31n + (x & 31n)) % 32749n; x >>= 5n; }
      return h & 31n;
    }
    /* verteilt die id über den ganzen Code (umkehrbar: zweimal anwenden = Original) */
    static misch(all, breite) {
      const unten = BigInt(breite - 15);
      const LOW = (1n << unten) - 1n;
      const id = all >> unten;
      const h = (id * 2654435761n + 12345n) & LOW;
      return (id << unten) | ((all & LOW) ^ h);
    }
    code() {
      if (this.id >= 1 && this.id <= 32) return this.codeV2();
      let v = this.kernBits();
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.kronen[k] & 7);   // 54 Bit
      let all = (v << 5n) | Stand.pruef(v);                                      // 59 Bit
      all = Stand.misch(all, 59) ^ MASK12;
      let s = '';
      for (let i = 0; i < 12; i++) { s = ALPHA[Number(all & 31n)] + s; all >>= 5n; }
      return s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8);
    }
    /* Version 2 (oberstes Bit = 1): Kartennummer statt Zufalls-id, dafür Platz für 11 Gebäude-Bits.
       karte 5 | zwerg 4 | kern 3x3 | tief 3x3 | bonus 3x2 | offen 2 | kronen 3x3 | bau 11 | prüfsumme 4 */
    datenV2() {
      let v = BigInt((this.id - 1) & 31);
      v = (v << 4n) | BigInt((this.zwerg - 1) & 15);
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.kern[k] & 7);
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.tief[k] & 7);
      for (let k = 0; k < 3; k++) v = (v << 2n) | BigInt(this.bonus[k] & 3);
      v = (v << 2n) | BigInt(this.offen & 3);
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.kronen[k] & 7);
      v = (v << 11n) | BigInt(this.bau & 0x7ff);
      return v; // 55 Bit
    }
    static pruefV2(v) {
      let h = 11n; let x = v;
      for (let i = 0; i < 14; i++) { h = (h * 37n + (x & 15n)) % 32719n; x >>= 4n; }
      return h & 15n;
    }
    codeV2() {
      const d = this.datenV2();
      const all59 = (d << 4n) | Stand.pruefV2(d);
      const x = Stand.verschluesseln(all59);
      let all = (1n << 59n) | x;
      let s = '';
      for (let i = 0; i < 12; i++) { s = ALPHA[Number(all & 31n)] + s; all >>= 5n; }
      return s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8);
    }
    /* einfache umkehrbare 59-Bit-Verwürfelung: Multiplikation mit ungerader Zahl, XOR, Rotation */
    static verschluesseln(v) {
      const M = (1n << 59n) - 1n;
      v = (v * 0x5DEECE66Dn) & M;
      v ^= 0x2A5F3C91B7E4D1n & M;
      v = ((v << 17n) | (v >> 42n)) & M;
      v = (v * 0x9E3779B1n) & M;
      return v;
    }
    static entschluesseln(v) {
      const M = (1n << 59n) - 1n;
      v = (v * Stand.inverse(0x9E3779B1n)) & M;
      v = ((v >> 17n) | (v << 42n)) & M;
      v ^= 0x2A5F3C91B7E4D1n & M;
      v = (v * Stand.inverse(0x5DEECE66Dn)) & M;
      return v;
    }
    static inverse(a) { // Inverses von a modulo 2^59 (Newton)
      const M = (1n << 59n) - 1n;
      let x = a;
      for (let i = 0; i < 7; i++) x = (x * (2n - a * x)) & M;
      return x;
    }
    static ausV2(all, s) {
      const x = Stand.entschluesseln(all & ((1n << 59n) - 1n));
      const p = x & 15n; let v = x >> 4n;
      if (Stand.pruefV2(v) !== p) return null;
      s.bau = Number(v & 0x7ffn); v >>= 11n;
      for (let k = 2; k >= 0; k--) { s.kronen[k] = Number(v & 7n); v >>= 3n; }
      s.offen = Number(v & 3n); v >>= 2n;
      for (let k = 2; k >= 0; k--) { s.bonus[k] = Number(v & 3n); v >>= 2n; }
      for (let k = 2; k >= 0; k--) { s.tief[k] = Number(v & 7n); v >>= 3n; }
      for (let k = 2; k >= 0; k--) { s.kern[k] = Number(v & 7n); v >>= 3n; }
      s.zwerg = Number(v & 15n) + 1; v >>= 4n;
      s.id = Number(v & 31n) + 1;
      if (s.offen > 2) return null;
      return s;
    }
    static ausCode(text) {
      const clean = String(text || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
      if (clean.length !== 10 && clean.length !== 12) return null;
      let all = 0n;
      for (const ch of clean) {
        const n = ALPHA.indexOf(ch);
        if (n < 0) return null;
        all = (all << 5n) | BigInt(n);
      }
      const s = new Stand();
      if (clean.length === 10) {                       // alter Code ohne Kronen
        all = Stand.misch(all ^ MASK10, 50);
        const p = all & 31n; const v = all >> 5n;
        if (Stand.pruefAlt(v) !== p) return null;
        Stand.ausKernBits(v, s);
      } else {
        if (all >> 59n) { if (!Stand.ausV2(all, s)) return null; }   // Version 2
        else {
        all = Stand.misch(all ^ MASK12, 59);
        const p = all & 31n; let v = all >> 5n;
        if (Stand.pruef(v) !== p) return null;
        for (let k = 2; k >= 0; k--) { s.kronen[k] = Number(v & 7n); v >>= 3n; }
        Stand.ausKernBits(v, s);
        }
      }
      if (s.zwerg < 1 || s.zwerg > 12) return null;
      return s;
    }
    static pruefAlt(v) {
      let h = 7n;
      let x = v;
      for (let i = 0; i < 9; i++) { h = (h * 31n + (x & 31n)) % 32749n; x >>= 5n; }
      return h & 31n;
    }
  }

  /* =========================================================
     LIEFERSCHEIN – 4 Zeichen, die die Lehrkraft am Board eintippt.
     Er trägt nur, was die Insel braucht (20 Bit):
     karte 5 | zwerg 4 | kapitel 2 | kern 3 | tief 3 | bonus 2 | prüfbit 1
     Die Bits werden gemischt, damit ein Tippfehler fast immer auffällt
     (ungültiger Zwerg, ungültiges Kapitel oder falsches Prüfbit).
     ========================================================= */
  const RUNDEN = [0x2B7, 0x1C3, 0x3A9, 0x0F5];
  const rundenF = (x, k) => (((x * 0x2F) ^ k) + (x >> 3)) & 0x3FF;
  function mischVor(v) {
    let l = v >> 10; let r = v & 0x3FF;
    for (const k of RUNDEN) { const t = r; r = l ^ rundenF(r, k); l = t; }
    return (l << 10) | r;
  }
  function mischZurueck(v) {
    let l = v >> 10; let r = v & 0x3FF;
    for (let i = RUNDEN.length - 1; i >= 0; i--) { const t = l; l = r ^ rundenF(l, RUNDEN[i]); r = t; }
    return (l << 10) | r;
  }
  const paritaet = (v) => { let p = 0; while (v) { p ^= v & 1; v >>= 1; } return p; };

  Object.defineProperty(Stand.prototype, 'karte', {
    get() { return this.id >= 1 && this.id <= 32 ? this.id : null; },
  });
  /* Lieferschein für das Kapitel k (Standard: das höchste offene Kapitel) */
  Stand.prototype.lieferCode = function (k) {
    if (!this.karte) return null;
    if (k === undefined) k = this.offen;
    let v = this.karte - 1;
    v = (v << 4) | ((this.zwerg - 1) & 15);
    v = (v << 2) | (k & 3);
    v = (v << 3) | (this.kern[k] & 7);
    v = (v << 3) | (this.tief[k] & 7);
    v = (v << 2) | (this.bonus[k] & 3);
    v = (v << 1) | paritaet(v);
    v = mischVor(v);
    let t = '';
    for (let i = 0; i < 4; i++) { t = ALPHA[v & 31] + t; v >>= 5; }
    return t;
  };
  Stand.ausLieferCode = function (text) {
    const clean = String(text || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
    if (clean.length !== 4) return null;
    let v = 0;
    for (const ch of clean) { const n = ALPHA.indexOf(ch); if (n < 0) return null; v = (v << 5) | n; }
    v = mischZurueck(v);
    const p = v & 1; v >>= 1;
    if (paritaet(v) !== p) return null;
    const bonus = v & 3; v >>= 2;
    const tief = v & 7; v >>= 3;
    const kern = v & 7; v >>= 3;
    const kapitel = v & 3; v >>= 2;
    const zwerg = (v & 15) + 1; v >>= 4;
    const karte = (v & 31) + 1;
    if (zwerg > 12 || kapitel > 2) return null;
    return { karte, zwerg, kapitel, kern, tief, bonus };
  };

  /* =========================================================
     INSELBOTSCHAFT – drei Silben, die das Board zeigt (z. B. „BOKAMI“).
     Sie sagt der Schmiede, welches Kapitel offen ist und welche Gebäude stehen.
     kapitel 2 | gebäude 10 | prüfbits 3  = 15 Bit = 3 Silben à 5 Bit
     ========================================================= */
  const SILBEN = ['BA', 'BE', 'BI', 'BO', 'BU', 'DA', 'DE', 'DI', 'DO', 'DU', 'FA', 'FE', 'FI', 'FO', 'FU', 'GA',
    'GO', 'GU', 'KA', 'KE', 'KI', 'KO', 'KU', 'LA', 'LE', 'LI', 'LO', 'LU', 'MA', 'MI', 'MO', 'MU'];
  const B_MUL = 0x5A3B; const B_INV = (() => { let x = B_MUL; for (let i = 0; i < 5; i++) x = (x * (2 - B_MUL * x)) & 0x7fff; return x & 0x7fff; })();
  const bPruef = (d) => ((d & 7) * 3 + ((d >> 3) & 7) * 5 + ((d >> 6) & 7) * 7 + ((d >> 9) & 7) + 5) & 7;
  ZI.botschaft = {
    kodiere(kapitel, bau) {
      const d = ((kapitel & 3) << 10) | (bau & 0x3ff);
      let v = ((d << 3) | bPruef(d)) & 0x7fff;
      v = Math.imul(v ^ 0x2D4B, B_MUL) & 0x7fff;
      return SILBEN[(v >> 10) & 31] + SILBEN[(v >> 5) & 31] + SILBEN[v & 31];
    },
    lese(text) {
      const t = String(text || '').toUpperCase().replace(/[^A-Z]/g, '');
      if (t.length !== 6) return null;
      let v = 0;
      for (let i = 0; i < 6; i += 2) { const n = SILBEN.indexOf(t.slice(i, i + 2)); if (n < 0) return null; v = (v << 5) | n; }
      v = (Math.imul(v, B_INV) & 0x7fff) ^ 0x2D4B;
      const d = v >> 3;
      if (bPruef(d) !== (v & 7)) return null;
      const kapitel = d >> 10;
      if (kapitel > 2) return null;
      return { kapitel, bau: d & 0x3ff };
    },
  };

  /* STAMMESCODE – drei Silben: Klassengröße 5 | Mischung 3 | Thema 3 | Prüfung 4 */
  const sPruef = (d) => ((d & 15) * 7 + ((d >> 4) & 15) * 11 + ((d >> 8) & 7) * 13 + 9) & 15;
  ZI.stammescode = {
    kodiere(n, seed, thema) {
      const d = (((n - 1) & 31) << 6) | ((seed & 7) << 3) | (thema & 7);
      let v = ((d << 4) | sPruef(d)) & 0x7fff;
      v = Math.imul(v ^ 0x1A77, B_MUL) & 0x7fff;
      return SILBEN[(v >> 10) & 31] + SILBEN[(v >> 5) & 31] + SILBEN[v & 31];
    },
    lese(text) {
      const t = String(text || '').toUpperCase().replace(/[^A-Z]/g, '');
      if (t.length !== 6) return null;
      let v = 0;
      for (let i = 0; i < 6; i += 2) { const n = SILBEN.indexOf(t.slice(i, i + 2)); if (n < 0) return null; v = (v << 5) | n; }
      v = (Math.imul(v, B_INV) & 0x7fff) ^ 0x1A77;
      const d = v >> 4;
      if (sPruef(d) !== (v & 15)) return null;
      const n = (d >> 6) + 1;
      if (n < 2) return null;
      return { n, seed: (d >> 3) & 7, thema: d & 7 };
    },
  };

  /* Eingabefeld formatieren: 10 Zeichen als XXXXX-XXXXX, sonst XXXX-XXXX-XXXX */
  ZI.formatiereCode = function (roh) {
    const v = String(roh || '').toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 12);
    return v.replace(/(.{4})(?=.)/g, '$1-');
  };

  ZI.Stand = Stand;
  })();
