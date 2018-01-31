import React from "react";
import { translate } from "react-i18next";
import "./Documentation.css";
/*<div
                  dangerouslySetInnerHTML={{
                    __html: t("about.data.nesi.text")
                  }}
                />
 */
class Documentation extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="documentation">
        <section>
          <h3>{t("documentation_api.title1")}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: t("documentation_api.intro.text1")
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t("documentation_api.intro.text2")
            }}
          />
          <div className="def-text">
            <h5 className="title">Cubo</h5>
            <p
              dangerouslySetInnerHTML={{
                __html: t("documentation_api.definitions.cube")
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: t("documentation_api.definitions.cube2")
              }}
            />
          </div>
          <div className="def-text">
            <h5 className="title">Drilldown</h5>
            {t("Some previous definitions")}:
            <ul>
              <li
                dangerouslySetInnerHTML={{
                  __html: t("documentation_api.definitions.member")
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t("documentation_api.definitions.level")
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t("documentation_api.definitions.hierarchy")
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: t("documentation_api.definitions.dimension")
                }}
              />
            </ul>
            <p
              dangerouslySetInnerHTML={{
                __html: t("documentation_api.definitions.drilldown")
              }}
            />
          </div>

          <div className="def-text">
            <h5 className="title">Measure</h5>
            <p
              dangerouslySetInnerHTML={{
                __html: t("documentation_api.definitions.measure")
              }}
            />
          </div>
          <div className="def-text">
            <h5 className="title">Cut</h5>
            <p
              dangerouslySetInnerHTML={{
                __html: t("documentation_api.definitions.cut")
              }}
            />
          </div>
        </section>
        <h3>{t("documentation_api.title2")}</h3>
        <div className="method">
          <span className="text">GET</span>{" "}
          <span className="url">
            {`https://chilecube.datawheel.us/cubes/{{cube_name}}/aggregate`}
          </span>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: t("documentation_api.syntax.text1")
          }}
        />
        <table>
          <thead>
            <tr>
              <th className="field">{t("Param")}</th>
              <th>{t("Type")}</th>
              <th className="description">{t("Description")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>drilldown[]</td>
              <td>
                <span className="code">string</span>
              </td>
              <td className="description">
                Para generar un drilldown, se debe tener en cuenta: Dimension,
                Hierarchy, Level.
                <span className="code format">
                  [Dimension].[Hierarchy].[Level]
                </span>
              </td>
            </tr>
            <tr>
              <td>measures[]</td>
              <td>
                <span className="code">string</span>
              </td>
              <td className="description">
                <span className="code">Measure</span>
              </td>
            </tr>
            <tr>
              <td>cut[]</td>
              <td>
                <span className="code">string</span>
              </td>
              <td className="description">
                Se debe concatenar el drilldown sobre el cuál se desea hacer el
                corte, con <span className="code">Level ID</span>.
                <span className="code format">
                  [Dimension].[Hierarchy].[Level].&[member_id]<sup>1</sup>
                </span>
              </td>
            </tr>
            <tr>
              <td>nonempty</td>
              <td>
                <span className="code">boolean</span>
              </td>
              <td className="description">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("documentation_api.definitions.nonempty")
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>distinct</td>
              <td>
                <span className="code">boolean</span>
              </td>
              <td className="description">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("documentation_api.definitions.distinct")
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>parents</td>
              <td>
                <span className="code">boolean</span>
              </td>
              <td className="description">
                En caso de encontrarse en un nivel de profundidad mayor a 1,
                obtiene el ID y nombre de los niveles padres. --
              </td>
            </tr>
            <tr>
              <td>sparse</td>
              <td>
                <span className="code">boolean</span>
              </td>
              <td className="description">--</td>
            </tr>
          </tbody>
        </table>

        <div className="pagenote">
          1. Si se hace la consulta directamente en URL, se debe reemplazar &
          por %26 para evitar problemas de parseo del corte.
        </div>
        <h3>{t("documentation_api.title3")}</h3>
        <div className="def-text">
          The following examples illustrate how queries are constructed, by
          restricting the search space with the drilldown, cut, and measures
          parameters. Aquí se muestra el aspecto de la URL y el JSON devuelto
          cuando se pregunta ¿Qué número de personas está en cada previsión de
          salud en Concepción?
        </div>
        <div className="code left">
          {`https://chilecube.datawheel.us//cubes/casen_health_system/aggregate.json?drilldown[]=[Health System].[Health System]&cut[]=[Geography].[Comuna].%26[64]&measures[]=Expansion Factor Comuna&caption[]=[Health System].[Health System].Description ES&caption[]=[Health System].[Health System Group].Description ES&nonempty=true&distinct=false&parents=true&sparse=true`}
        </div>
        <pre>
          <code>
            {`
    {
      "axes": [
        {
          "members": [
            {
              "name": "Expansion Factor Comuna",
              "full_name": "[Measures].[Expansion Factor Comuna]",
              "caption": "Expansion Factor Comuna",
              "key": "Expansion Factor Comuna",
              ...
            }
          ]
        },
        {
          "members": [
            {
              "name": "FONASA",
              "full_name": "[Health System].[FONASA]",
              "caption": "FONASA",
              "key": 1,
              ...
            },
            {
              "name": "Isapre",
              "full_name": "[Health System].[Isapre]",
              "caption": "Isapre",
              "key": 3,
              ...
            }
            ...
          ]
        }
      ],
      "axis_dimensions": [
        {
          "name": "Measures",
          "caption": "Measures",
          "type": "measures",
          "level": "MeasuresLevel",
          "level_depth": 0
        },
        {
          "name": "Health System",
          "caption": "Health System",
          "type": "standard",
          "level": "Health System Group",
          "level_depth": 1
        }
      ],
      "values": [
        [ 1130724.0 ],
        [ 62378.0 ],
        [ 255801.0 ],
        [ 81866.0 ]
      ]
    }
                `}
          </code>
        </pre>
        <div className="def-text">
          <h3>{t("documentation_api.title4")}</h3>
          These criteria can be combined to define robust queries. Here are a
          few examples.
          <div className="example">
            <p className="text">
              Seleccionar los valores de las regiones de Valparaíso (ID 5) y de
              Coquimbo (ID 4)
            </p>
            <div className="code">
              {`cut[]: {[Geography].[Geography].[Region].&[4], [Geography].[Geography].[Region].&[5]}`}
            </div>
            <p className="clarification">
              Para realizar cortes por más de un ID, cada cut debe estar
              separado por <span className="code">,</span>
              dentro de <span className="code">{`{}`}</span>.
            </p>
          </div>
          <div className="example">
            <p className="text">
              Obtener las importaciones de todas las comunas de Chile entre los
              años 2013 y 2015.
            </p>
            <div className="code">
              {`drilldown[]: [Origin Country].[Country].[Country]`}
              <br />
              {`drilldown[]: [Geography].[Geography].[Comuna]`}
              <br />
              {`drilldown[]: [Date].[Date].[Year]`}
              <br />
              {`measures[]: CIF US`}
              <br />
              {`cut[]: {[Date].[Date].[Year].&[2013], [Date].[Date].[Year].&[2014], [Date].[Date].[Year].&[2015]}`}
            </div>
            <p className="clarification">
              Para realizar cortes por más de un ID, cada cut debe estar
              separado por <span className="code">,</span>
              dentro de <span className="code">{`{}`}</span>.
            </p>
          </div>
        </div>
        <h3>{t("documentation_api.title5")}</h3>
        <p>https://github.com/Datawheel/mondrian-rest-client</p>
        <h3>{t("documentation_api.title6")}</h3>
        <p>
          Para fomentar el uso de la API de DataChile, hemos habilitado en
          Python un módulo que permite interactuar con todos los datos
          disponibles.
        </p>
        <p>
          Para instalar, debes usar:{" "}
          <span className="code">pip install datachile</span>
        </p>
        <pre>
          <code>
            {`
            from opendata_rest.datachile import DataChile 
            
            q = DataChile.get(
                "exports", { 
                    drilldowns: [
                        ["Date", "Year"], 
                        ["Destination Country", "Country", "Continent"]
                    ], 
                    measures: ["FOB US", "Geo Rank"],
                }
            ) 
            
            print(q)
            `}
          </code>
        </pre>
      </div>
    );
  }
}
export default translate()(Documentation);
