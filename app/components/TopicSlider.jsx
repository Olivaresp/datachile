/* global __SERVER__, setTimeout, Event */
import React, { Component } from "react";
import Slider from "react-slick";
import _ from "lodash";
import { translate } from "react-i18next";
import "./TopicSlider.css";
import "../../node_modules/slick-carousel/slick/slick.css";

class TopicSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartsRendered: false
    };
  }

  render() {
    const { children, selected } = this.props;

    const afterChange = () => {
      if (this.state.chartsRendered) return;

      //disgusting code, just to trigger the new slide's charts render (d3plus).
      if (!__SERVER__) {
        setTimeout(() => {
          _.times(10, () => window.dispatchEvent(new Event("scroll")));
          window.dispatchEvent(new Event("scroll"));
          this.setState({ chartsRendered: true });
        }, 100);
      }
    };

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      lazyLoad: false
    };

    return (
      <div className="topic-slider">
        <Slider
          {...settings}
          slickGoTo={selected}
          afterChange={afterChange}
          /* beforeChange={beforeChange} */
        >
          {children}
        </Slider>
      </div>
    );
  }
}

export default translate()(TopicSlider);
