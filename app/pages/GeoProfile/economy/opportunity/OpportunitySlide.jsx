import React from "react";
import { translate } from "react-i18next";
import { Section } from "datawheel-canon";

import FeaturedDatum from "components/FeaturedDatum";

class OpportunitySlide extends Section {
  static need = [];

  render() {
    const { children, t } = this.props;
    const { geo } = this.context.data;

    const text = { geo };

    return (
      <div className="topic-slide-block">
        <div className="topic-slide-intro">
          <div className="topic-slide-title">{t("Opportunity")}</div>
          <div className="topic-slide-text">
            <span
              dangerouslySetInnerHTML={{
                __html: t("geo_profile.economy.opportunity", text)
              }}
            />
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

export default translate()(OpportunitySlide);
