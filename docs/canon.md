[Volver al índice](general.md)

# Detalles sobre Canon
El entorno de desarrollo sobre el cuál está desarrollado Datachile es [`datawheel-canon`](https://github.com/Datawheel/datawheel-canon), que es un ambiente de desarrollo en React.js para crear motores de visualización. Es desarrollado por Datawheel y cuenta con un set de funcionalidades, entre los que se incluyen `d3plus-react`, `lodash`, `blueprintjs`, entre otros.

## Variables de entorno
Para asegurarse que funcione correctamente el sitio, debes tener configuradas una serie de variables de entorno, las cuáles las definiremos en `.env.example`.

```JSX
export NODE_ENV="development"
export CANON_PORT=3300
export ROOT=`pwd`

export CANON_CONST_API="http://chilecube.datawheel.us/"

export CANON_LANGUAGES="es,en"
export CANON_LANGUAGE_DEFAULT="en"
export CANON_LOGLOCALE=false
export CANON_LOGREDUX=false
```

Posteriormente, debes inicializar estas variables con el comando `source .env.example`.

Para más información sobre perfiles debes [acceder aquí](charts.md)

## Multilenguaje
Canon permite administrar el multilenguaje presente en Datachile. Para establecer los idiomas que son aceptados en la plataforma, en las variables de entorno debes definir:

```JSX
export CANON_LANGUAGES="en,es"
```

Con dicha variable de entorno definida, cualquier componente que necesite texto en más de un idioma debe ser envuelto en la función `translate` de `react-i18next`.

```JSX
import React, {Component} from "react";
import {Link} from "react-router";
import {translate} from "react-i18next";

class Nav extends Component {

  render() {

    const {t} = this.props;

    return (
      <nav>
        <Link href="/about">{ t("nav.about") }</Link>
        { t("nav.welcome", {name: "Dave"}) }
      </nav>
    );

  }
}

export default translate()(Nav);
```

Cuando una función es envuelta con `translate`, tendrás acceso a una función llamada `t` dentro de `props`. Esta función es la que maneja la obtención de la traducción adecuada, y también nos permite scrapear el proyecto para localizar cada `string` que necesita traducción. Cuando estés listo para comenzar a rellenar las traducciones, simplemente ejecuta `npm run locales`.

`datawheel-canon` buscará en todo el código fuente por cualquier componente que use la función `t()`. Las traducciones serán almacenadas en archivos JSON en una carpeta llamada `locales/` en el directorio base. En este ejemplo, corriendo el script para `data-chile-site` se produciría la siguiente estructura de archivos:

```
locales/
├── en/
│   ├── data-chile-site_old.json
│   └── data-chile-site.json
└── es/
    ├── data-chile-site_old.json
    └── data-chile-site.json
```
Las traducciones que están en uso son almacenadas en un archivo JSON, mientras que las traducciones que estuvieron previamente en uso (desde la última vez que corriste el script) son almacenadas con el sufijo _old. Mientras corres el script, cualquier traducción existente se mantendrá, así que no te preocupes de sobrescribir las traducciones previas.

Luego de finalizado el scrapping, los archivos de ambos idiomas lucirán así:

```JSON
{
  "nav": {
    "about": "",
    "welcome": ""
  }
}
```
Si observas el sitio, se mostrarán los `strings` de forma literal, dado que se encuentran vacíos. Un archivo de traducción completo luce así:

```JSON
{
  "nav": {
    "about": "About",
    "welcome": "Welcome back {{name}}!"
  }
}
```
Podrás observar que el segundo string contiene una variable rodeada por dos conjuntos de llaves. Esta es la notación para pasar la variable a las cadenas traducidas, y es crucial en la creación de texto de estilo de `mad-libs`.

