/* Lógica pura (sin DOM) del rinconcito: fechas, frase del día, saludo y contador.
   Se mantiene separada de app.js para poder probarla fácilmente. */
(function (root) {
  'use strict';

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /* Fecha local del dispositivo como "AAAA-MM-DD". */
  function ymd(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  /* Número de día (días desde 1970) tomando la fecha LOCAL. Usar UTC aquí evita
     errores por cambios de horario de verano. */
  function dayNumber(d) {
    return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  }

  function parseYmd(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
    if (!m) { return null; }
    return Date.UTC(+m[1], +m[2] - 1, +m[3]) / 86400000;
  }

  /* Días transcurridos desde la primera visita (0 = hoy es el primer día). */
  function daysSince(firstYmd, date) {
    var first = parseYmd(firstYmd);
    if (first === null) { return 0; }
    return Math.max(0, dayNumber(date) - first);
  }

  /* Generador pseudoaleatorio determinista (mulberry32). */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Orden mezclado de 0..n-1 para un "ciclo". Cada ciclo recorre TODAS las
     frases una sola vez antes de que alguna se repita. */
  function rawOrder(n, cycle) {
    var rnd = mulberry32(0x9E3779B1 ^ ((cycle + 1) * 2654435761));
    var a = [], i, j, t;
    for (i = 0; i < n; i++) { a.push(i); }
    for (i = n - 1; i > 0; i--) {
      j = Math.floor(rnd() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Igual que rawOrder, pero evita que la última frase de un ciclo sea la
     primera del siguiente (nunca dos días seguidos con la misma frase). */
  function orderFor(n, cycle) {
    var o = rawOrder(n, cycle), t;
    if (cycle > 0 && n > 2) {
      var prev = rawOrder(n, cycle - 1);
      if (o[0] === prev[n - 1]) { t = o[0]; o[0] = o[1]; o[1] = t; }
    }
    return o;
  }

  /* Índice de la frase que corresponde a un número de día. Es determinista:
     el mismo día siempre da la misma frase, en cualquier dispositivo. */
  function phraseIndexForDay(day, n) {
    var cycle = Math.floor(day / n);
    var pos = ((day % n) + n) % n;
    return orderFor(n, cycle)[pos];
  }

  /* Saludo según la hora local (0-23). */
  function greeting(hour) {
    if (hour >= 5 && hour < 12) {
      return { periodo: 'manana', saludo: 'Buenos días', sub: 'Que hoy empiece suave.' };
    }
    if (hour >= 12 && hour < 19) {
      return { periodo: 'tarde', saludo: 'Buenas tardes', sub: 'Un momento para ti en medio del día.' };
    }
    return { periodo: 'noche', saludo: 'Buenas noches', sub: 'Qué bueno que te des este respiro antes de descansar.' };
  }

  /* Despedida según el momento del día. */
  function farewell(hour) {
    var p = greeting(hour).periodo;
    if (p === 'manana') { return 'Que tengas un día muy bonito.'; }
    if (p === 'tarde') { return 'Que tu tarde sea suave y tranquila.'; }
    return 'Que descanses muy bonito esta noche.';
  }

  /* Texto del contador de días. */
  function counterText(n) {
    if (n <= 0) { return 'Hoy es el primer día de tu rinconcito.'; }
    if (n === 1) { return 'Llevas 1 día con tu rinconcito.'; }
    return 'Llevas ' + n + ' días con tu rinconcito.';
  }

  /* Estado del cumpleaños para una fecha.
     modo: 'cumple'   -> hoy es el día
           'cuenta'   -> faltan 8 días o menos (crece un tulipán por día)
           'recuerdo' -> ya pasó su primer cumpleaños; queda el ramo de recuerdo
           'ninguno'  -> nada que mostrar
     mes es 0-11 (noviembre = 10). Se repite cada año. */
  function birthdayInfo(date, mes, dia, primerAnio) {
    var y = date.getFullYear();
    var hoy = dayNumber(date);
    var esteAnio = dayNumber(new Date(y, mes, dia));
    var proximo = hoy <= esteAnio ? esteAnio : dayNumber(new Date(y + 1, mes, dia));
    var faltan = proximo - hoy;
    var ultimoAnio = hoy >= esteAnio ? y : y - 1;
    var modo = 'ninguno';
    if (faltan === 0) { modo = 'cumple'; }
    else if (faltan <= 8) { modo = 'cuenta'; }
    else if (ultimoAnio >= primerAnio) { modo = 'recuerdo'; }
    return { modo: modo, faltan: faltan, anio: y, indiceAnio: y - primerAnio };
  }

  var api = {
    birthdayInfo: birthdayInfo,
    ymd: ymd, dayNumber: dayNumber, parseYmd: parseYmd, daysSince: daysSince,
    phraseIndexForDay: phraseIndexForDay, orderFor: orderFor,
    greeting: greeting, farewell: farewell, counterText: counterText
  };

  root.Logica = api;
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; }
})(typeof window !== 'undefined' ? window : this);
