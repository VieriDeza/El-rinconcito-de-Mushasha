/* Tulipanes dibujados en SVG, con los tonos del rinconcito.
   Devuelven texto SVG; las animaciones viven en estilos.css (.tl-tallo, .tl-flor). */
(function (root) {
  'use strict';

  var TEMAS = {
    claro:  { tallo: '#8A6A4F', hoja: '#A58867', trazo: 'rgba(47,32,25,.30)',    suelo: '#D9C3A3', cinta: '#A9764B', semilla: '#D9C3A3' },
    oscuro: { tallo: '#B89B7A', hoja: '#8F7357', trazo: 'rgba(251,245,234,.38)', suelo: '#6B4630', cinta: '#D9C3A3', semilla: '#6B4630' }
  };

  /* f = pétalo exterior, d = pétalo del frente */
  var COLORES = [
    { f: '#D9C3A3', d: '#BFA27B' },  /* arena */
    { f: '#A9764B', d: '#8A5C37' },  /* caramelo */
    { f: '#D4A995', d: '#B98873' },  /* rosa té */
    { f: '#EFE2CD', d: '#D9C3A3' }   /* beige */
  ];

  function n(v) { return Math.round(v * 10) / 10; }

  function tulipan(o) {
    var h = o.alto, t = o.tema, c = o.color;
    var s = '<g class="tl' + (o.estatico ? ' estatico' : '') + '" style="--k:' + (o.k || 0) +
      '" transform="translate(' + n(o.x) + ' ' + n(o.y) + ') rotate(' + (o.rot || 0) + ') scale(' + (o.esc || 1) + ')">';

    s += '<g class="tl-tallo">';
    s += '<path d="M0 0C2 ' + n(-h * 0.33) + ' -2 ' + n(-h * 0.66) + ' 0 ' + n(-h) +
      '" fill="none" stroke="' + t.tallo + '" stroke-width="3" stroke-linecap="round"/>';
    if (o.hojas) {
      s += '<path d="M0 -2C-16 -8 -24 ' + n(-h * 0.28) + ' -20 ' + n(-h * 0.5) + 'C-9 ' + n(-h * 0.36) + ' -2 ' + n(-h * 0.16) + ' 0 -2Z" fill="' + t.hoja + '"/>';
      s += '<path d="M0 -2C14 -6 20 ' + n(-h * 0.22) + ' 17 ' + n(-h * 0.42) + 'C8 ' + n(-h * 0.3) + ' 2 ' + n(-h * 0.12) + ' 0 -2Z" fill="' + t.hoja + '" opacity=".85"/>';
    }
    s += '</g>';

    s += '<g transform="translate(0 ' + n(-h) + ')"><g class="tl-flor">';
    s += '<path d="M-15 0C-18 -17 -10 -33 0 -38C10 -33 18 -17 15 0C9 7 -9 7 -15 0Z" fill="' + c.f + '" stroke="' + t.trazo + '" stroke-width="1.2" stroke-linejoin="round"/>';
    s += '<path d="M-6 5C-11 -10 -5 -28 0 -38C5 -28 11 -10 6 5Z" fill="' + c.d + '" opacity=".75"/>';
    s += '<path d="M-15 0C-12 -14 -6 -26 0 -38" fill="none" stroke="' + t.trazo + '" stroke-width="1" stroke-linecap="round"/>';
    s += '</g></g>';

    return s + '</g>';
  }

  function abrirSvg(vb, extra) {
    return '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="' + (extra || '') + '">';
  }

  /* Ramo de 7 tulipanes que florecen del centro hacia afuera. */
  function ramo(tema, opciones) {
    var t = TEMAS[tema] || TEMAS.claro;
    var estatico = !!(opciones && opciones.estatico);
    var lista = [
      { rot: -34, alto: 122, c: 2, k: 5, hojas: true },
      { rot:  34, alto: 118, c: 0, k: 6, hojas: true },
      { rot: -20, alto: 144, c: 1, k: 3, hojas: true },
      { rot:  22, alto: 140, c: 3, k: 4, hojas: true },
      { rot:  -7, alto: 162, c: 0, k: 1 },
      { rot:   9, alto: 156, c: 2, k: 2 },
      { rot:   0, alto: 176, c: 1, k: 0 }
    ];
    var s = abrirSvg('0 0 300 280', '--b:.3s');
    lista.forEach(function (it) {
      s += tulipan({ x: 150, y: 262, alto: it.alto, rot: it.rot, esc: 1, color: COLORES[it.c],
        k: it.k, hojas: it.hojas, tema: t, estatico: estatico });
    });
    s += '<rect x="124" y="228" width="52" height="12" rx="6" fill="' + t.cinta + '"/>';
    return s + '</svg>';
  }

  /* Jardincito de 8 espacios: crece un tulipán por día. n = cuántos hay hoy. */
  function jardin(cantidad, tema) {
    var t = TEMAS[tema] || TEMAS.claro;
    var alturas = [58, 80, 66, 88, 62, 84, 70, 92];
    var giros = [-3, 2, -2, 3, -3, 2, -2, 3];
    var s = abrirSvg('0 0 320 170', '--b:.2s');
    s += '<path d="M8 150H312" stroke="' + t.suelo + '" stroke-width="2" stroke-linecap="round"/>';
    for (var k = 0; k < 8; k++) {
      var x = 28 + k * 37.5;
      if (k < cantidad) {
        s += tulipan({ x: x, y: 150, alto: alturas[k], rot: giros[k], esc: 0.95, color: COLORES[k % 4],
          k: 0, hojas: k % 2 === 0, tema: t, estatico: k < cantidad - 1 });
      } else {
        s += '<circle cx="' + n(x) + '" cy="150" r="3.5" fill="' + t.semilla + '"/>';
      }
    }
    return s + '</svg>';
  }

  root.Tulipanes = { ramo: ramo, jardin: jardin };
  if (typeof module !== 'undefined' && module.exports) { module.exports = root.Tulipanes; }
})(typeof window !== 'undefined' ? window : this);
