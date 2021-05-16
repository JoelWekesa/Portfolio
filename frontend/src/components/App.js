import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "../routes";
import "antd/dist/antd.css";
import "../../static/assets/css/style.css";
import "../../static/assets/vendor/aos/aos.css";
import "../../static/assets/vendor/glightbox/css/glightbox.min.css";
import "../../static/assets/vendor/swiper/swiper-bundle.min.css";
import "../../static/assets/vendor/iframe/iframe.css";

export class App extends Component {
	render() {
		return (
			<Router>
				<Routes />
			</Router>
		);
	}
}

export default App;
