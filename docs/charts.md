[Volver al índice](general.md)

# Detalles sobre gráficos
La elección de gráficos a utilizar dentro de Datachile, fue producto de un proceso iterativo con una serie de criterios objetivos.

A continuación detallaremos los criterios de uso de cada tipo de visualización.

## Treemap
Su uso está relacionado con el despliegue de datos jerárquicos y por orden de importancia. Es la visualización más usada dentro del website, por su versatilidad y funcionalidad.

Sin embargo, en ningún caso se recomienda su uso si se pretenden filtrar *tuplas* de los datos, dado que se basa en mostrar totales.

## Bar Chart
Se realizaron comparaciones basándose en:
* Sexo
* Rango Etáreo
* Nivel Geográfico

## Stacked Area
Si bien el Treemap permite desplegar datos jerárquicos, no es el mejor output para visualizar variación en el tiempo. En caso de requerir lo anterior, `StackedArea` es una buena opción

## Line Plot
Es muy similar al `StackedArea`, dado que busca representar variaciones en el tiempo. En datachile, el uso de `LinePlot` se focalizó en **balances comerciales** (importaciones/exportaciones).

## Scatter Plot
Cuando se poseen tres o más `measures` que pueden ser representadas en un `chart`, se utilizó ScatterPlot, con el objetivo de visualizar con respecto a `x`, `y` y `size`. En datachile sólo se usó en dos casos: ParticipationScatter y PSUNEMScatter, de las secciones Cívica y Educación respectivamente. 