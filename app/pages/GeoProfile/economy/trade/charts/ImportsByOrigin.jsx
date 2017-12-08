import React from "react";
import { Section } from "datawheel-canon";
import { Treemap } from "d3plus-react";
import { translate } from "react-i18next";
import { browserHistory } from "react-router";

import { numeral, slugifyItem } from "helpers/formatters";
import { continentColorScale } from "helpers/colors";
import { simpleGeoChartNeed } from "helpers/MondrianClient";
import { asset_url } from "helpers/url";

import ExportLink from "components/ExportLink";

class ImportsByOrigin extends Section {
  static need = [
    simpleGeoChartNeed("path_imports_by_origin", "imports", ["CIF US"], {
      drillDowns: [["Origin Country", "Country"], ["Date", "Year"]],
      options: { parents: true }
    })
  ];

  render() {
    const { t, className, i18n } = this.props;
    const path = this.context.data.path_imports_by_origin;
    const geo = this.context.data.geo;
    const locale = i18n.locale;

    return (
      <div className={className}>
        <h3 className="chart-title">
          <span>{t(`Imports by origin of firms located in ${geo.name}`)}</span>
          <ExportLink path={path} />
        </h3>
        <Treemap
          config={{
            height: 500,
            data: path,
            groupBy: ["ID Continent", "ID Country"],
            label: d => d["Country"],
            sum: d => d["CIF US"],
            time: "ID Year",
            shapeConfig: {
              fill: d => continentColorScale("c" + d["ID Continent"])
            },
            total: d => d["CIF US"],
            totalConfig: {
              text: d =>
                "Total: US" +
                numeral(d.text.split(": ")[1], locale).format("($ 0.00 a)")
            },
            on: {
              click: d => {
                if (!(d["ID Country"] instanceof Array)) {
                  var url = slugifyItem(
                    "countries",
                    d["ID Subregion"],
                    d["Subregion"],
                    d["ID Country"] instanceof Array ? false : d["ID Country"],
                    d["Country"] instanceof Array ? false : d["Country"]
                  );
                  browserHistory.push(url);
                }
              }
            },
            tooltipConfig: {
              title: d => {
                return d["ID Country"] instanceof Array
                  ? d["Continent"]
                  : d["Country"];
              },
              body: d => {
                const link =
                  d["ID Country"] instanceof Array
                    ? ""
                    : "<br/><a>" + t("tooltip.to_profile") + "</a>";
                return numeral(d["CIF US"], locale).format("(USD 0 a)") + link;
              }
            },
            legendConfig: {
              label: d => d["Continent"],
              shapeConfig: {
                width: 40,
                height: 40,
                backgroundImage: d =>
                  asset_url(
                    "/images/legend/continent/" + d["ID Continent"] + ".png"
                  )
              }
            }
          }}
          dataFormat={data => data.data}
        />
      </div>
    );
  }
}

export default translate()(ImportsByOrigin);
