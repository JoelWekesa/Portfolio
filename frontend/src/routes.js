import { Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./components/Home";

export class Routes extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
		);
	}
}

export default Routes;
