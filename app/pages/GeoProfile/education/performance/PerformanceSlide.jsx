import React from "react";
import { translate } from "react-i18next";
import { Section } from "datawheel-canon";
import { getGeoObject } from "helpers/dataUtils";
import mondrianClient, { geoCut } from "helpers/MondrianClient";
import { trade_by_time_and_product } from "helpers/aggregations";

import FeaturedDatum from "components/FeaturedDatum";

class PerformanceSlide extends Section {
  static need = [];

  render() {
    const { children, t } = this.props;

    return (
      <div className="topic-slide-block">
        <div className="topic-slide-intro">
          <div className="topic-slide-title">Performance</div>
          <div className="topic-slide-text">
            <p />
          </div>
          <div className="topic-slide-data">
            <FeaturedDatum
              className="l-1-3"
              icon="empleo"
              datum="xx"
              title="Lorem ipsum"
              subtitle="Lorem blabla"
            />
            <FeaturedDatum
              className="l-1-3"
              icon="empleo"
              datum="xx"
              title="Lorem ipsum"
              subtitle="Lorem blabla"
            />
            <FeaturedDatum
              className="l-1-3"
              icon="industria"
              datum="xx"
              title="Lorem ipsum"
              subtitle="Lorem blabla"
            />
          </div>
        </div>
        <div className="topic-slide-charts">{children}</div>
      </div>
    );
  }
}

export default translate()(PerformanceSlide);
