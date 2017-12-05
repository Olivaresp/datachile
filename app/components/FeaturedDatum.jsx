import React, { Component } from "react";
import { translate } from "react-i18next";
import SvgImage from "components/SvgImage";

import { asset_url } from "helpers/url";

import "./FeaturedDatum.css";

class FeaturedDatum extends Component {
  render() {
    const { t, icon, datum, title, subtitle, className } = this.props;

    return (
      <div className={"featured-datum " + className}>
        <div className="featured-datum-icon">
          <SvgImage src={asset_url(`/images/slider-icon/icon-${icon}.svg`)} />
        </div>
        <div className="featured-datum-text">
          <p className="featured-datum-data">{datum}</p>
          <h4 className="featured-datum-title">{title}</h4>
          <p className="featured-datum-subtitle">{subtitle}</p>
        </div>
      </div>
    );
  }
}

export default translate()(FeaturedDatum);
