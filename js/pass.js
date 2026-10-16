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
      this.tief = o.tief ?? [0, 0, 0];      // je Kapitel Bitmaske der 3 Tiefen Stollen
      this.bonus = o.bonus ?? [0, 0, 0];    // je Kapitel beste Sterne im Bonusspiel (0–3)
      this.offen = o.offen ?? 0;            // höchstes freigeschaltetes Kapitel (0 = Kapitel 1)
      this.kronen = o.kronen ?? [0, 0, 0];  // je Kapitel: Hauptstollen-Stationen fehlerfrei geschafft
    }
    static bits(m) { let n = 0; for (let i = 0; i < 3; i++) if (m & (1 << i)) n++; return n; }
    coreCount(k) { return Stand.bits(this.kern[k]); }
    deepCount(k) { return Stand.bits(this.tief[k]); }
    deepTotal() { return this.tief.reduce((a, m) => a + Stand.bits(m), 0); }
    coreTotal() { return this.kern.reduce((a, m) => a + Stand.bits(m), 0); }
    kronenTotal() { return this.kronen.reduce((a, m) => a + Stand.bits(m), 0); }
    bonusMax() { return Math.max(...this.bonus); }
    bonusTotal() { return this.bonus.reduce((a, b) => a + b, 0); }
    gems() { return this.deepTotal() * (ZI.GEMS_PRO_STOLLEN || 5) + this.bonusTotal(); }
    hatKern(k, i) { return !!(this.kern[k] & (1 << i)); }
    hatTief(k, i) { return !!(this.tief[k] & (1 << i)); }
    hatKrone(k, i) { return !!(this.kronen[k] & (1 << i)); }
    setzeKern(k, i) { this.kern[k] |= (1 << i); }
    setzeTief(k, i) { this.tief[k] |= (1 << i); }
    setzeKrone(k, i) { this.kronen[k] |= (1 << i); }
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
      let v = this.kernBits();
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.kronen[k] & 7);   // 54 Bit
      let all = (v << 5n) | Stand.pruef(v);                                      // 59 Bit
      all = Stand.misch(all, 59) ^ MASK12;
      let s = '';
      for (let i = 0; i < 12; i++) { s = ALPHA[Number(all & 31n)] + s; all >>= 5n; }
      return s.slice(0, 4) + '-' + s.slice(4, 8) + '-' + s.slice(8);
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
        if (all >> 59n) return null;                   // das freie oberste Bit muss 0 sein
        all = Stand.misch(all ^ MASK12, 59);
        const p = all & 31n; let v = all >> 5n;
        if (Stand.pruef(v) !== p) return null;
        for (let k = 2; k >= 0; k--) { s.kronen[k] = Number(v & 7n); v >>= 3n; }
        Stand.ausKernBits(v, s);
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

  /* Eingabefeld formatieren: 10 Zeichen als XXXXX-XXXXX, sonst XXXX-XXXX-XXXX */
  ZI.formatiereCode = function (roh) {
    const v = String(roh || '').toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 12);
    return v.replace(/(.{4})(?=.)/g, '$1-');
  };

  ZI.Stand = Stand;
  ZI.QR_PREFIX = 'ZWERGENINSEL:';
})();
