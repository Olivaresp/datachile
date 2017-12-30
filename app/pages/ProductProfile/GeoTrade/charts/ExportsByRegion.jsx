import React from "react";
import { Section } from "datawheel-canon";
import { Treemap } from "d3plus-react";
import { translate } from "react-i18next";
import { browserHistory } from "react-router";

import { regionsColorScale } from "helpers/colors";
import {
  numeral,
  slugifyItem,
  getNumberFromTotalString
} from "helpers/formatters";
import mondrianClient, { levelCut } from "helpers/MondrianClient";
import { getLevelObject } from "helpers/dataUtils";

import ExportLink from "components/ExportLink";
import SourceNote from "components/SourceNote";
import NoDataAvailable from "components/NoDataAvailable";

class ExportsByRegion extends Section {
  state = {
    treemap: true
  };
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
            .drilldown("Geography", "Geography", "Comuna")
            .drilldown("Date", "Date", "Year")
            .measure("FOB US"),
          "HS0",
          "HS2",
          store.i18n.language
        );

        return {
          key: "product_exports_by_region",
          data: __API__ + q.path("jsonrecords")
        };
      });

      return {
        type: "GET_DATA",
        promise: prm
      };
    }
  ];

  render() {
    const { t, className, i18n } = this.props;
    const path = this.context.data.product_exports_by_region;

    const locale = i18n.language;

    return (
      <div className={className}>
        <h3 className="chart-title">
          <span>{t("Exports By Region")}</span>
          <ExportLink path={path} />
        </h3>
        {this.state.treemap ? (
          <Treemap
            config={{
              height: 500,
              data: path,
              groupBy: ["ID Region", "ID Comuna"],
              label: d =>
                d["Country"] instanceof Array ? d["Region"] : d["Comuna"],
              sum: d => d["FOB US"],
              time: "ID Year",
              total: d => d["FOB US"],
              totalConfig: {
                text: d =>
                  "Total: US" +
                  numeral(getNumberFromTotalString(d.text), locale).format(
                    "($ 0.[00] a)"
                  )
              },
              shapeConfig: {
                fill: d => regionsColorScale("c" + d["ID Region"])
              },
              on: {
                click: d => {
                  if (!(d["ID Comuna"] instanceof Array)) {
                    var url = slugifyItem(
                      "countries",
                      d["ID Continent"],
                      d["Continent"],
                      d["ID Comuna"] instanceof Array ? false : d["ID Comuna"],
                      d["Comuna"] instanceof Array ? false : d["Comuna"]
                    );
                    browserHistory.push(url);
                  }
                }
              },
              tooltipConfig: {
                title: d => {
                  return d["Comuna"] instanceof Array
                    ? d["Region"]
                    : d["Comuna"];
                },
                body: d => {
                  const link =
                    d["ID Comuna"] instanceof Array
                      ? ""
                      : "<br/><a>" + t("tooltip.to_profile") + "</a>";
                  return (
                    numeral(d["FOB US"], locale).format("(USD 0 a)") + link
                  );
                }
              },
              legendConfig: {
                label: false,
                shapeConfig: {
                  width: 10,
                  height: 10
                  //backgroundImage: d =>
                  //  "/images/legend/continent/" + d["ID Continent"] + ".png"
                }
              }
            }}
            dataFormat={data => {
              if (data.data && data.data.length > 0) {
                return data.data;
              } else {
                this.setState({ treemap: false });
              }
            }}
          />
        ) : (
          <NoDataAvailable />
        )}
        <SourceNote cube="exports" />
      </div>
    );
  }
}

export default translate()(ExportsByRegion);
