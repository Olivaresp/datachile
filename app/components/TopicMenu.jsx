import React, { Component } from "react";
import SvgImage from "components/SvgImage";
import { asset_url } from "helpers/url";
import "./TopicMenu.css";

class TopicMenu extends Component {
  render() {
    const { topics } = this.props;

    return (
      <div id="topic-profile-menu" className="topic-menu">
        {topics.map(topic => (
          <a key={topic.slug} className="topic-link" href={`#${topic.slug}`}>
            <SvgImage
              src={asset_url(`/images/profile-icon/icon-${topic.slug}.svg`)}
            />
            <span>{topic.title}</span>
          </a>
        ))}
      </div>
    );
  }
}

export default TopicMenu;
export { TopicMenu };
