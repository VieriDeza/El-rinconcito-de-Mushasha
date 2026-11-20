/* Frases del rinconcito de Mushasha.
   Para agregar más, basta con añadir líneas al arreglo (sin repetir).
   El orden de aparición lo decide logica.js, así que el orden aquí no importa. */
(function (root) {
  'use strict';

  var FRASES = [
    /* Ánimo y motivación */
    'Hoy no tienes que hacerlo perfecto, solo hacerlo a tu ritmo.',
    'Lo que hoy parece enorme, mañana será una historia que contarás con calma.',
    'Eres más capaz de lo que crees, y ya lo has demostrado muchas veces.',
    'Un paso pequeño sigue siendo un paso. Avanza tranquila.',
    'Confía en el proceso: florecer lleva su tiempo.',
    'Tus ganas de seguir adelante dicen mucho de quién eres.',
    'Hoy es un buen día para empezar algo que te haga ilusión.',
    'No te compares: tu camino tiene su propio paisaje.',
    'Cada intento suma, incluso los que no salen como esperabas.',
    'Tienes derecho a equivocarte y volver a intentarlo.',
    'Lo estás haciendo mejor de lo que piensas.',
    'Que el cansancio no te haga olvidar cuánto has avanzado.',
    'Hoy te toca confiar un poquito más en ti.',
    'Los sueños grandes también se construyen con días tranquilos.',
    'Tu constancia es una forma muy bonita de valentía.',
    'Respira hondo: puedes con esto y con más.',
    'Si hoy solo logras lo básico, igual fue un buen día.',
    'Avanzar despacio sigue siendo avanzar.',
    'Lo mejor de ti no depende de un solo día.',
    'Eres valiente aunque a veces no lo sientas.',

    /* Autoestima */
    'Eres suficiente, tal como eres hoy.',
    'Tu forma de ser hace más amable el mundo de quienes te rodean.',
    'No necesitas ser distinta para merecer cosas bonitas.',
    'Háblate hoy con la misma ternura con la que le hablarías a alguien que quieres.',
    'Tu valor no depende de lo productiva que seas.',
    'Tienes luz propia, aunque algunos días se te olvide.',
    'Poner límites también es una forma de quererte.',
    'Tus emociones importan, todas, incluso las incómodas.',
    'No tienes que merecer el descanso: simplemente lo necesitas.',
    'Tu sensibilidad es una fortaleza, no una debilidad.',
    'Hoy permítete sentirte orgullosa de ti.',
    'Eres más fuerte de lo que a veces te dejas ver.',
    'Lo que eres vale más que cualquier meta que logres.',
    'Tienes derecho a ocupar tu lugar sin pedir permiso.',
    'Cuídate como cuidas a las personas que quieres.',
    'Tu historia no necesita parecerse a la de nadie.',
    'Eres de esas personas que dejan una huella suave y bonita.',
    'Ojalá hoy te quieras un poquito más que ayer.',
    'Eres digna de cariño, de calma y de buenos días.',
    'Hoy te recuerdo lo que a veces olvidas: vales muchísimo.',

    /* Tranquilidad */
    'Respira. Suelta los hombros. Aquí no hay prisa.',
    'Un café, un respiro y todo se ve un poco más claro.',
    'No todo se resuelve hoy, y está bien.',
    'Hoy puedes ir más despacio y el mundo seguirá girando.',
    'La calma también es una forma de avanzar.',
    'Dale un descanso a tu mente: trabaja mucho por ti.',
    'Lo que no depende de ti, déjalo descansar un rato.',
    'Haz una pausa pequeña: mira por la ventana, respira, sonríe.',
    'Las cosas se acomodan; a veces solo necesitan tiempo.',
    'Que tu día tenga al menos un momento de silencio bonito.',
    'No tienes que cargar con todo a la vez.',
    'Toma agua, estira el cuerpo y sé amable contigo.',
    'La tranquilidad se cultiva con pequeñas pausas.',
    'Hoy te mereces una tarde sin culpas.',
    'Está bien detenerse a mirar el cielo un rato.',
    'Todo pasa, incluso los días pesados.',
    'Que nada te quite la paz que tanto te ha costado construir.',
    'Toma el día en pedacitos pequeños.',
    'Una cosa a la vez; eso basta.',
    'Que tu corazón encuentre hoy un lugar tranquilo donde descansar.',

    /* Cariño */
    'Qué bonito es que existas.',
    'Me alegra que hoy estés aquí otra vez.',
    'Pensar en ti es una de las cosas lindas de mis días.',
    'Ojalá este día te abrace tan bonito como mereces.',
    'Gracias por ser como eres, de verdad.',
    'Que hoy te lleguen cosas buenas de todos lados.',
    'Estoy contigo, aunque sea con unas palabritas.',
    'Tu sonrisa le cambia el clima a cualquier día.',
    'Eres una de mis personas favoritas, que lo sepas.',
    'Ojalá nunca olvides cuánto te quieren.',
    'Mereces ternura todos los días, no solo algunos.',
    'Qué suerte tienen quienes te conocen.',
    'Hoy te mando un abrazo largo y sin prisa.',
    'Que siempre te rodees de gente que te trate con cariño.',
    'Aquí siempre hay un lugar para ti.',
    'Tu presencia vuelve los días más suaves.',
    'Si hoy te sientes sola, recuerda que alguien piensa en ti con cariño.',
    'Gracias por existir con tanta dulzura.',
    'Eres de esas personas que se extrañan cuando no están.',
    'Qué suerte que existas en este mundo.',

    /* Cumplidos */
    'Eres muy linda, por dentro y por fuera.',
    'Hoy te ves hermosa, aunque no te hayas mirado al espejo todavía.',
    'Tu sonrisa es de lo más bonito que hay.',
    'Tienes una forma de ser que encanta sin esfuerzo.',
    'Eres elegante sin proponértelo.',
    'Tienes una mirada que se queda en la memoria.',
    'Qué lindo es verte feliz.',
    'Tu risa es de esas que contagian la alegría.',
    'Tienes un encanto muy tuyo, imposible de copiar.',
    'Eres bonita en lo evidente y en lo que casi nadie nota.',
    'Tu ternura es parte de tu belleza.',
    'Hay algo muy especial en cómo eres.',
    'Eres inteligente, sensible y encantadora: una mezcla poco común.',
    'Hoy luces tranquila, y esa calma te queda preciosa.',
    'Eres un detalle bonito en el día de quien te conoce.',

    /* Esperanza y pequeñas alegrías */
    'Hoy puede pasar algo bonito; deja la puerta abierta.',
    'Mañana también será una oportunidad nueva.',
    'Que algo pequeño te alegre hoy: una canción, un café, un mensaje.',
    'Las mejores cosas a veces llegan sin avisar.',
    'Disfruta lo sencillo: ahí vive buena parte de la felicidad.',
    'Que hoy el café te sepa mejor que nunca.',
    'Que tengas una tarde de esas que se recuerdan con cariño.',
    'Mira lo que ya has superado y hasta dónde has llegado.',
    'La vida tiene días difíciles, pero también muchos buenos esperándote.',
    'Hoy puedes regalarte algo pequeño que te haga feliz.',
    'Que el día te trate con suavidad.',
    'Ojalá hoy te rías de algo sin motivo.',
    'Hay cosas bonitas que todavía no conoces, y vienen en camino.',
    'Que no te falte una buena canción para acompañar el día.',
    'Te deseo una noche tranquila y un descanso de los que reparan.',

    /* Para el día a día */
    'Eres una persona que merece cosas hermosas.',
    'Hazte espacio hoy: tus sueños también necesitan tiempo.',
    'Que hoy confíes en lo que sientes y en lo que sabes.',
    'Si el día se tuerce, vuelve aquí a respirar.',
    'Aunque el día sea gris, tú puedes ser su parte más cálida.',
    'Hoy elige algo que te haga bien y hazlo sin pedir disculpas.',
    'Cierra los ojos un segundo: ya lo estás haciendo bien.',
    'No hace falta correr para llegar a donde mereces estar.',
    'Que hoy te sorprenda una buena noticia pequeñita.',
    'Hay días para lograr cosas y días para simplemente estar. Ambos cuentan.'
  ];

  /* Frases solo para el día de su cumpleaños (una distinta cada año). */
  var FRASES_CUMPLE = [
    'Feliz cumpleaños: que este nuevo año te trate con toda la suavidad que mereces.',
    'Hoy el mundo celebra que existes, y yo con él.',
    'Que este año te regale calma, risas y cosas que te hagan ilusión.',
    'Un año más de ti es un regalo para quienes te queremos.',
    'Hoy no tienes que hacer nada más que dejarte consentir.',
    'Que cada día de este año traiga algo bonito, aunque sea pequeño.',
    'Crecer también es florecer: sigue haciéndolo a tu ritmo.',
    'Gracias por ser como eres. Feliz cumpleaños, Mushasha.',
    'Que este año te encuentre más tranquila, más segura y más tú.',
    'Hoy mereces tulipanes, cariño y un buen café.'
  ];

  root.FRASES = FRASES;
  root.FRASES_CUMPLE = FRASES_CUMPLE;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = FRASES;
    module.exports.CUMPLE = FRASES_CUMPLE;
  }
})(typeof window !== 'undefined' ? window : this);
