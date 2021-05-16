import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
// import Test from "./components/Test";

const Routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			{/* <Route exact path="/" component={Test} /> */}
		</Switch>
	</Router>
);

export default Routes;
