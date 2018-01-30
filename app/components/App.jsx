import React, { Component } from "react";
import { translate } from "react-i18next";
import Helmet from "react-helmet";

import Footer from "components/Footer";
import mondrianClient from "helpers/MondrianClient";
import StagingIndicator from "components/StagingIndicator";

import "./App.css";

class App extends Component {
  static preneed = [
    (params, store) => {
      let prm;
      const r = { key: "__cubes__" };
      if (typeof window === "undefined") {
        prm = Promise.resolve({ ...r, data: false });
      } else if (store.data.__cubes__) {
        prm = Promise.resolve({ ...r, data: true });
      } else {
        // force population of the internal MondrianClient cache.
        prm = mondrianClient.cubes().then(() => ({ ...r, data: true }));
      }

      return {
        type: "GET_DATA",
        promise: prm
      };
    }
  ];

  render() {
    const { children, t } = this.props;
    return (
      <div className="main-container">
        <Helmet titleTemplate="%s — DataChile" defaultTitle="DataChile">
          <meta name="description" content={t("home.subtitle")} />
        </Helmet>
        <StagingIndicator />
        {children}
        <Footer />
      </div>
    );
  }
}

export default translate()(App);
