# El rinconcito de Mushasha

Una página personal hecha con cariño: frase diaria, una canción, una carta para los días difíciles y una despedida.
HTML, CSS y JavaScript puro. Sin dependencias, sin servidor, sin costo.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube **el contenido** de esta carpeta (que `index.html` quede en la raíz).
2. En el repositorio: **Settings → Pages → Build and deployment**.
3. En *Source* elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guarda.
4. En uno o dos minutos la página queda disponible en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Estructura

```
index.html          Página principal
css/estilos.css     Estilos (paleta café, beige y crema)
js/frases.js        Las 120 frases (se pueden agregar más)
js/logica.js        Fecha, frase del día, saludo, contador y cumpleaños
js/tulipanes.js     Tulipanes dibujados en SVG
js/app.js           Comportamiento de la página
assets/favicon.svg  Ícono de la pestaña
```

## Cómo funciona la frase del día

- Cada día corresponde a una frase, según la fecha local del dispositivo.
- Se recorren las 120 frases completas antes de que alguna se repita, y nunca aparece la misma dos días seguidos.
- La frase se guarda en `localStorage`, así que se mantiene todo el día aunque se actualice la página.
- Si agregas frases nuevas en `js/frases.js`, el ciclo se adapta automáticamente.

## Cumpleaños (27 de noviembre)

- Desde 8 días antes aparece una cuenta regresiva con un jardín donde crece un tulipán por día.
- El 27 hay una bienvenida especial, un ramo de tulipanes que florece, una frase de cumpleaños y una carta.
- Después queda el ramo y la carta como recuerdo ("Tu ramo de tulipanes"), y todo se repite cada año.
- Para verlo antes de tiempo, agrega la fecha a la dirección, por ejemplo `index.html?fecha=2026-11-27` (en la página publicada: `.../?fecha=2026-11-27`). La vista previa no guarda nada en el navegador.
- Para cambiar la fecha, edita `CUMPLE_MES` (0-11) y `CUMPLE_DIA` al inicio de `js/app.js`. La carta de cumpleaños está en `index.html`.

## Para volver a ver la bienvenida

La bienvenida se muestra una vez por día. Para verla de nuevo (por ejemplo, al probar), borra los datos del sitio en el navegador o ejecuta en la consola:

```js
localStorage.clear(); location.reload();
```

## Nota sobre la canción

El reproductor de YouTube necesita internet y funciona al publicar la página (GitHub Pages). Si abres `index.html` directamente desde el disco, YouTube puede negarse a mostrar el video; el enlace "Abrir en YouTube" siempre funciona.
