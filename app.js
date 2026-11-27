/* El rinconcito de Mushasha: comportamiento de la página.
   Usa localStorage para recordar la primera visita, la frase del día
   y si ya entró hoy. Si el navegador no permite guardar, funciona igual.

   Vista previa: abrir index.html?fecha=2026-11-27 simula esa fecha
   (sin guardar nada), útil para ver el cumpleaños antes de tiempo. */
(function () {
  'use strict';

  var L = window.Logica;
  var T = window.Tulipanes;
  var FRASES = window.FRASES || [];
  var FRASES_CUMPLE = window.FRASES_CUMPLE || [];

  /* Cumpleaños: 27 de noviembre (mes 0-11), se repite cada año. */
  var CUMPLE_MES = 10;
  var CUMPLE_DIA = 27;
  var PRIMER_ANIO = 2026;

  var KEY_PRIMERA = 'mushasha:primeraVisita';
  var KEY_FRASE = 'mushasha:fraseDelDia';

  /* ---------- Vista previa de fecha ---------- */
  var simulada = null;
  try {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(new URLSearchParams(window.location.search).get('fecha') || '');
    if (m) { simulada = { y: +m[1], mo: +m[2] - 1, d: +m[3] }; }
  } catch (e) { simulada = null; }

  function ahora() {
    var r = new Date();
    if (!simulada) { return r; }
    return new Date(simulada.y, simulada.mo, simulada.d, r.getHours(), r.getMinutes(), r.getSeconds());
  }

  /* ---------- Almacenamiento seguro ---------- */
  var memoria = {};
  var store = {
    get: function (k) {
      if (simulada) { return memoria[k] || null; }
      try { var v = window.localStorage.getItem(k); return v === null ? (memoria[k] || null) : v; }
      catch (e) { return memoria[k] || null; }
    },
    set: function (k, v) {
      memoria[k] = v;
      if (simulada) { return; }
      try { window.localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ }
    }
  };

  function leerJSON(k) {
    try { return JSON.parse(store.get(k)); } catch (e) { return null; }
  }

  /* ---------- Elementos ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var html = document.documentElement;
  var bienvenida = $('bienvenida');
  var btnEntrar = $('btn-entrar');
  var saludo = $('saludo');
  var subsaludo = $('subsaludo');
  var contador = $('contador');
  var pildoraCumple = $('cumple-pildora');
  var fraseTexto = $('frase-texto');
  var fraseFecha = $('frase-fecha');
  var despedidaHora = $('despedida-hora');
  var btnCopiar = $('btn-copiar');
  var copiado = $('copiado');

  var fraseActual = '';
  var diaMostrado = '';

  /* ---------- Frase del día ---------- */
  function fraseDeHoy(fecha, cumple) {
    var hoy = L.ymd(fecha);
    var lista = cumple ? FRASES_CUMPLE : FRASES;
    var guardada = leerJSON(KEY_FRASE);

    /* La frase se mantiene todo el día aunque se actualice la página. */
    if (guardada && guardada.fecha === hoy && !!guardada.cumple === cumple &&
        typeof lista[guardada.indice] === 'string') {
      return lista[guardada.indice];
    }
    var indice = cumple
      ? ((L.birthdayInfo(fecha, CUMPLE_MES, CUMPLE_DIA, PRIMER_ANIO).indiceAnio % lista.length) + lista.length) % lista.length
      : L.phraseIndexForDay(L.dayNumber(fecha), lista.length);
    store.set(KEY_FRASE, JSON.stringify({ fecha: hoy, indice: indice, cumple: cumple }));
    return lista[indice];
  }

  function pintarFrase(texto) {
    var palabras = texto.split(' ');
    fraseTexto.textContent = '';
    palabras.forEach(function (p, i) {
      var span = document.createElement('span');
      span.className = 'palabra';
      span.style.setProperty('--i', i);
      span.textContent = p;
      fraseTexto.appendChild(span);
      if (i < palabras.length - 1) { fraseTexto.appendChild(document.createTextNode(' ')); }
    });
  }

  function capitalizar(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- Cumpleaños ---------- */
  function pintarCumple(info) {
    var seccion = $('cumple');
    var titulo = $('cumple-titulo');
    var sub = $('cumple-sub');
    var dibujo = $('cumple-dibujo');
    var zona = $('cumple-zona');
    var btnTexto = $('btn-carta-cumple-texto');

    pildoraCumple.hidden = true;

    if (info.modo === 'ninguno') { seccion.hidden = true; return; }
    seccion.hidden = false;

    if (info.modo === 'cuenta') {
      var texto = info.faltan === 1 ? 'Mañana es tu cumpleaños' : 'Faltan ' + info.faltan + ' días para tu cumpleaños';
      titulo.textContent = texto;
      sub.textContent = 'Cada día crece un tulipán. El último se abre el 27 de noviembre.';
      dibujo.className = 'cumple-dibujo jardin';
      dibujo.innerHTML = T.jardin(9 - info.faltan, 'claro');
      dibujo.setAttribute('aria-label', 'Un jardín donde crece un tulipán cada día hasta tu cumpleaños');
      zona.hidden = true;
      pildoraCumple.textContent = texto;
      pildoraCumple.hidden = false;
      return;
    }

    dibujo.className = 'cumple-dibujo ramo';
    dibujo.innerHTML = T.ramo('claro', { estatico: true });
    dibujo.setAttribute('aria-label', 'Un ramo de tulipanes');
    zona.hidden = false;

    if (info.modo === 'cumple') {
      titulo.textContent = 'Hoy es tu día';
      sub.textContent = 'Feliz cumpleaños, Mushasha. Estos tulipanes son para ti.';
      btnTexto.textContent = 'Abrir mi carta de cumpleaños';
    } else {
      titulo.textContent = 'Tu ramo de tulipanes';
      sub.textContent = 'Un recuerdo de tu cumpleaños, para cuando quieras volver a verlo.';
      btnTexto.textContent = 'Releer mi carta de cumpleaños';
    }
  }

  /* Bienvenida especial el día del cumpleaños. */
  function prepararBienvenida(info) {
    if (info.modo !== 'cumple') { return; }
    $('bv-taza').setAttribute('hidden', ''); /* un SVG no tiene la propiedad .hidden */
    var ramo = $('bv-ramo');
    ramo.innerHTML = T.ramo('oscuro');
    ramo.hidden = false;
    $('bv-titulo').textContent = 'Feliz cumpleaños, Mushasha ♡';
    $('bv-p1').textContent = 'Hoy es tu día, y este rinconcito también quiso celebrarlo.';
    $('bv-p2').textContent = 'Te dejé unos tulipanes, porque una vez me contaste que te gustan.';
    $('bv-p3').textContent = 'Que hoy encuentres muchos motivos para sonreír.';
  }

  /* ---------- Pintar todo según la fecha y hora locales ---------- */
  function actualizar() {
    var fecha = ahora();
    var hoy = L.ymd(fecha);
    var info = L.birthdayInfo(fecha, CUMPLE_MES, CUMPLE_DIA, PRIMER_ANIO);
    var esCumple = info.modo === 'cumple';

    /* Primera visita (solo se guarda la primera vez). */
    if (!store.get(KEY_PRIMERA)) { store.set(KEY_PRIMERA, hoy); }

    var g = L.greeting(fecha.getHours());
    if (esCumple) {
      saludo.textContent = 'Feliz cumpleaños, Mushasha';
      subsaludo.textContent = 'Hoy el rinconcito es todo tuyo.';
    } else {
      saludo.textContent = g.saludo + ', Mushasha';
      subsaludo.textContent = g.sub;
    }
    contador.textContent = L.counterText(L.daysSince(store.get(KEY_PRIMERA), fecha));
    despedidaHora.textContent = L.farewell(fecha.getHours());

    if (diaMostrado !== hoy) {
      fraseActual = fraseDeHoy(fecha, esCumple);
      pintarFrase(fraseActual);
      fraseFecha.textContent = capitalizar(
        fecha.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })
      );
      pintarCumple(info);
      diaMostrado = hoy;
    }
  }

  /* ---------- Entrada ---------- */
  function mostrarRincon() {
    html.classList.add('entrado');
    actualizar();
  }

  function entrar() {
    bienvenida.classList.add('saliendo');
    mostrarRincon();
    window.scrollTo(0, 0);
    saludo.focus({ preventScroll: true });
    window.setTimeout(function () { bienvenida.hidden = true; }, 1000);
  }

  btnEntrar.addEventListener('click', entrar);

  prepararBienvenida(L.birthdayInfo(ahora(), CUMPLE_MES, CUMPLE_DIA, PRIMER_ANIO));

  /* La bienvenida aparece cada vez que entra a la página. */
  actualizar();

  /* Si deja la página abierta y cambia el día, se actualiza sola. */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) { actualizar(); }
  });

  /* ---------- Cartas desplegables ---------- */
  function enlazarCarta(boton, panel) {
    boton.addEventListener('click', function () {
      var abrir = boton.getAttribute('aria-expanded') !== 'true';
      boton.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      panel.classList.toggle('abierta', abrir);
      if (abrir) { panel.removeAttribute('inert'); } else { panel.setAttribute('inert', ''); }
      if (abrir) {
        window.setTimeout(function () {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 350);
      }
    });
  }

  enlazarCarta($('btn-carta'), $('carta'));
  enlazarCarta($('btn-carta-cumple'), $('carta-cumple'));

  /* ---------- Foto de la carta de cumpleaños ----------
     Se muestra solo si el archivo foto.jpg existe junto a index.html. */
  (function () {
    var img = $('cumple-foto-img');
    var figura = $('cumple-foto');
    if (!img || !figura) { return; }
    function mostrar() { figura.hidden = false; }
    if (img.complete && img.naturalWidth > 0) { mostrar(); }
    else { img.addEventListener('load', mostrar); }
  })();

  /* ---------- Copiar la frase ---------- */
  function avisar(msg) {
    copiado.textContent = msg;
    window.setTimeout(function () { copiado.textContent = ''; }, 2500);
  }

  function copiarRespaldo(texto) {
    var t = document.createElement('textarea');
    t.value = texto;
    t.setAttribute('readonly', '');
    t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(t);
    t.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(t);
    return ok;
  }

  btnCopiar.addEventListener('click', function () {
    var texto = fraseActual;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(
        function () { avisar('Frase copiada. Es toda tuya.'); },
        function () { avisar(copiarRespaldo(texto) ? 'Frase copiada. Es toda tuya.' : 'No se pudo copiar.'); }
      );
    } else {
      avisar(copiarRespaldo(texto) ? 'Frase copiada. Es toda tuya.' : 'No se pudo copiar.');
    }
  });
})();
