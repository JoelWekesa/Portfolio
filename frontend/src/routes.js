import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

const Routes = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</Suspense>
	</Router>
);

export default Routes;
