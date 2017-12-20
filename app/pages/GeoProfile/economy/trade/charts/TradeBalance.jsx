import React from "react";
import { Section } from "datawheel-canon";
import values from "lodash/values";
import { LinePlot } from "d3plus-react";
import { translate } from "react-i18next";

import { geoChartPath } from "helpers/MondrianClient";
import { tradeBalanceColorScale } from "helpers/colors";
import { melt, replaceKeyNames } from "helpers/dataUtils";
import { numeral } from "helpers/formatters";

import ExportLink from "components/ExportLink";

class TradeBalance extends Section {
  state = { chartPath: null };

  componentDidMount() {
    geoChartPath(
      this.props.i18n.locale,
      this.context.data.geo,
      "exports_and_imports",
      ["FOB", "CIF", "Trade Balance"],
      { drillDowns: [["Date", "Year"]] }
    ).then(path => {
      this.setState({
        chartPath: path
      });
    });
  }

  render() {
    const { t, className, i18n } = this.props;
    const path = this.state.chartPath;
    const locale = i18n.locale;

    return (
      <div className={className}>
        <h3 className="chart-title">
          <span>{t("Trade Balance")}</span>
          <ExportLink path={path} />
        </h3>
        <LinePlot
          config={{
            height: 200,
            data: path,
            groupBy: "variable",
            x: "ID Year",
            y: "value",
            xConfig: {
              tickSize: 0,
              title: false
            },
            yConfig: {
              title: t("USD"),
              tickFormat: tick => numeral(tick, locale).format("(0 a)")
            },
            shapeConfig: {
              Line: {
                stroke: d => tradeBalanceColorScale(d["variable"]),
                strokeWidth: 2
              }
            }
          }}
          dataFormat={data => {
            const tKeys = {
              FOB: t("trade_balance.fob"),
              CIF: t("trade_balance.cif"),
              "Trade Balance": t("trade_balance.trade_balance")
            };
            data.data = replaceKeyNames(data.data, tKeys);
            return melt(data.data, ["ID Year"], values(tKeys));
          }}
        />
      </div>
    );
  }
}

export default translate()(TradeBalance);
