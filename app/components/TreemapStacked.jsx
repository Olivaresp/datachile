import React from "react";
import { translate } from "react-i18next";
import { Treemap, StackedArea } from "d3plus-react";

import "./TreemapStacked.css";

class TreemapStacked extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: "treemap"
    };
    this.toggleChart = this.toggleChart.bind(this);
  }

  toggleChart(chart) {
    this.setState({
      chart
    });
  }

  menuChart(selected) {
    return (
      <div className="treemap-stacked-options">
        <a
          className={`toggle ${selected === "treemap" ? "selected" : ""}`}
          onClick={evt => this.toggleChart("treemap")}
        >
          Treemap
        </a>
        <a
          className={`toggle ${selected === "stacked" ? "selected" : ""}`}
          onClick={evt => this.toggleChart("stacked")}
        >
          Stacked
        </a>
      </div>
    );
  }
  render() {
    const { t, path, msrName, drilldowns, config } = this.props;
    const chart = this.state.chart;

    if (!chart) {
      return null;
    }
    switch (chart) {
      case "treemap": {
        return (
          <div>
            <Treemap
              config={{
                ...config,
                height: 500,
                data: path,
                label: d => d[drilldowns[1]],
                groupBy: ["ID " + drilldowns[0], "ID " + drilldowns[1]],
                sum: d => d[msrName],
                time: "Year"
              }}
              dataFormat={data => data.data}
            />
            {this.menuChart(chart)}
          </div>
        );
      }

      case "stacked": {
        return (
          <div>
            <StackedArea
              config={{
                ...config,
                label: d => d[drilldowns[0]],
                total: false,
                totalConfig: {
                  text: ""
                },
                height: 500,
                data: path,
                groupBy: "ID " + drilldowns[0],
                y: d => d[msrName],
                x: d => d["Year"],

                xConfig: {
                  title: t("Year")
                }
                //legend: false
              }}
              dataFormat={data => data.data}
            />
            {this.menuChart(chart)}
          </div>
        );
      }
    }
  }
}

export default translate()(TreemapStacked);
