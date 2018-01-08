import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import { ProgressBar } from "@blueprintjs/core";
import "./DatachileProgressBar.css";

class DatachileProgressBar extends Component {
	render() {
		const { value, failed } = this.props;
		return (
			<div className="datachile-progress-bar">
				<img
					className="logo"
					src="/images/logos/logo-dc-beta-small.svg"
				/>
				<ProgressBar value={value} />
        <h1>{failed}</h1>
			</div>
		);
	}
}

DatachileProgressBar = translate()(DatachileProgressBar);

export default DatachileProgressBar;
export { DatachileProgressBar };
