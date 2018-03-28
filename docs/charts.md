[Volver al índice](general.md)

# Detalles sobre gráficos
La elección de gráficos a utilizar dentro de Datachile, fue producto de un proceso iterativo con una serie de criterios objetivos.

A continuación detallaremos los criterios de uso de cada tipo de visualización.

## Etapas previas
### Usando needs
La librería `datawheel-canon` incluye el método estático llamado `need`, que permite manipular consultas de manera asincrónica a la API de Datachile. Dentro de cada `need` se realizan queries usando `mondrian-rest-client`. Como resultado de cada query, se genera una URL asincrónica, desde la cuál `d3plus` obtiene los datos.

```JSX
static need = [
  (params, store) => {
    const product = getLevelObject(params);
    const prm = mondrianClient.cube("exports").then(cube => {
      var q = levelCut(
        product,
        "Export HS",
        "HS",
        cube.query
          .option("parents", true)
          .drilldown("Destination Country", "Country", "Country")
          .drilldown("Date", "Date", "Year")
          .measure("FOB US"),
        "HS0",
        "HS2",
        store.i18n.locale
      );

      return {
        key: "product_exports_by_destination",
        data: __API__ + q.path("jsonrecords")
      };
    });

    return {
      type: "GET_DATA",
      promise: prm
    };
  }
];
```

En caso de resolverse correctamente la `Promise`, se almacenan los resultados en `this.context.data` usando como acceso el nombre dado a la key. 
```JSX
const path = this.context.data.key_defined_in_need
```



## Treemap
Su uso está relacionado con el despliegue de datos jerárquicos y por orden de importancia. Es la visualización más usada dentro del website, por su versatilidad y funcionalidad.

Sin embargo, en ningún caso se recomienda su uso si se pretenden filtrar *tuplas* de los datos, dado que se basa en mostrar totales.

```JSX
import {Treemap} from "d3plus-react";

<Treemap config={} />
```

## Bar Chart
Se realizaron comparaciones basándose en:
* Sexo
* Rango Etáreo
* Nivel Geográfico

```JSX
import {BarChart} from "d3plus-react";

<BarChart config={} />
```

## Stacked Area
Si bien el Treemap permite desplegar datos jerárquicos, no es el mejor output para visualizar variación en el tiempo. En caso de requerir lo anterior, `StackedArea` es una buena opción

```JSX
import {StackedArea} from "d3plus-react";

<StackedArea config={} />
```

## Line Plot
Es muy similar al `StackedArea`, dado que busca representar variaciones en el tiempo. En datachile, el uso de `LinePlot` se focalizó en **balances comerciales** (importaciones/exportaciones).

```JSX
import {LinePlot} from "d3plus-react";

<LinePlot config={} />
```

## Scatter Plot
Cuando se poseen tres o más `measures` que pueden ser representadas en un `chart`, se utilizó ScatterPlot, con el objetivo de visualizar con respecto a `x`, `y` y `size`. En datachile sólo se usó en dos casos: ParticipationScatter y PSUNEMScatter, de las secciones Cívica y Educación respectivamente.

```JSX
import {Plot} from "d3plus-react";

<Plot config={
  {
    ...  
    sizeMin: 10,
    sizeMax: 30
  }
} />
```