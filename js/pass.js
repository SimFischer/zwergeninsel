/* Zwergeninsel – Spielstand und Zwergenpass
   Der ganze Spielstand eines Kindes passt in einen 10-stelligen Code.
   So kann jedes Kind auf jedem Koffer-iPad weiterspielen, ganz ohne Server.

   Aufbau (50 Bit):
   id 15 | zwerg 4 | kern 3x3 | tief 3x3 | bonus 3x2 | kapitel offen 2 | prüfsumme 5 */

(function () {
  const ZI = window.ZI || (window.ZI = {});
  const ALPHA = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // ohne 0, 1, I, O
  const MASK = 0x2A5F3C91B7n; // verwürfelt den Code, damit er zufällig aussieht

  class Stand {
    constructor(o = {}) {
      this.id = o.id ?? Math.floor(Math.random() * 32768);
      this.zwerg = o.zwerg ?? 1;            // 1–12
      this.kern = o.kern ?? [0, 0, 0];      // je Kapitel Bitmaske der 3 Stationen
      this.tief = o.tief ?? [0, 0, 0];      // je Kapitel Bitmaske der 3 Tiefen Stollen
      this.bonus = o.bonus ?? [0, 0, 0];    // je Kapitel beste Sterne im Bonusspiel (0–3)
      this.offen = o.offen ?? 0;            // höchstes freigeschaltetes Kapitel (0 = Kapitel 1)
    }
    static bits(m) { let n = 0; for (let i = 0; i < 3; i++) if (m & (1 << i)) n++; return n; }
    coreCount(k) { return Stand.bits(this.kern[k]); }
    deepCount(k) { return Stand.bits(this.tief[k]); }
    deepTotal() { return this.tief.reduce((a, m) => a + Stand.bits(m), 0); }
    bonusMax() { return Math.max(...this.bonus); }
    gems() { return this.deepTotal() * (ZI.GEMS_PRO_STOLLEN || 5) + this.bonus.reduce((a, b) => a + b, 0); }
    hatKern(k, i) { return !!(this.kern[k] & (1 << i)); }
    hatTief(k, i) { return !!(this.tief[k] & (1 << i)); }
    setzeKern(k, i) { this.kern[k] |= (1 << i); }
    setzeTief(k, i) { this.tief[k] |= (1 << i); }
    zwergFrei(nr) {
      const z = ZI.ZWERGE.find((d) => d.nr === nr);
      return !!z && (z.start || (z.unlock && z.unlock(this)));
    }
    freieZwerge() { return ZI.ZWERGE.filter((z) => this.zwergFrei(z.nr)).map((z) => z.nr); }

    toBig() {
      let v = BigInt(this.id & 0x7fff);
      v = (v << 4n) | BigInt((this.zwerg - 1) & 15);
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.kern[k] & 7);
      for (let k = 0; k < 3; k++) v = (v << 3n) | BigInt(this.tief[k] & 7);
      for (let k = 0; k < 3; k++) v = (v << 2n) | BigInt(this.bonus[k] & 3);
      v = (v << 2n) | BigInt(this.offen & 3);
      return v; // 45 Bit
    }
    static pruef(v) {
      let h = 7n;
      let x = v;
      for (let i = 0; i < 9; i++) { h = (h * 31n + (x & 31n)) % 32749n; x >>= 5n; }
      return h & 31n;
    }
    /* verteilt die id über den ganzen Code (umkehrbar: zweimal anwenden = Original) */
    static misch(all) {
      const LOW = (1n << 35n) - 1n;
      const id = all >> 35n;
      const h = (id * 2654435761n + 12345n) & LOW;
      return (id << 35n) | ((all & LOW) ^ h);
    }
    code() {
      const v = this.toBig();
      let all = (v << 5n) | Stand.pruef(v);
      all = Stand.misch(all) ^ MASK;
      let s = '';
      for (let i = 0; i < 10; i++) { s = ALPHA[Number(all & 31n)] + s; all >>= 5n; }
      return s.slice(0, 5) + '-' + s.slice(5);
    }
    static ausCode(text) {
      const clean = String(text || '').toUpperCase().replace(/[^0-9A-Z]/g, '');
      if (clean.length !== 10) return null;
      let all = 0n;
      for (const ch of clean) {
        const n = ALPHA.indexOf(ch);
        if (n < 0) return null;
        all = (all << 5n) | BigInt(n);
      }
      all = Stand.misch(all ^ MASK);
      const p = all & 31n;
      let v = all >> 5n;
      if (Stand.pruef(v) !== p) return null;
      const s = new Stand();
      s.offen = Number(v & 3n); v >>= 2n;
      for (let k = 2; k >= 0; k--) { s.bonus[k] = Number(v & 3n); v >>= 2n; }
      for (let k = 2; k >= 0; k--) { s.tief[k] = Number(v & 7n); v >>= 3n; }
      for (let k = 2; k >= 0; k--) { s.kern[k] = Number(v & 7n); v >>= 3n; }
      s.zwerg = Number(v & 15n) + 1; v >>= 4n;
      s.id = Number(v & 0x7fffn);
      if (s.zwerg < 1 || s.zwerg > 12) return null;
      return s;
    }
  }

  ZI.Stand = Stand;
  ZI.QR_PREFIX = 'ZWERGENINSEL:';
})();
