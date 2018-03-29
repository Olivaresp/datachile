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