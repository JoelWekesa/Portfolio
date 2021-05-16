import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "../routes";
// import "bootswatch/dist/cerulean/bootstrap.min.css";
import "antd/dist/antd.css";
import "../../static/assets/css/style.css";
import "../../static/assets/vendor/aos/aos.css";
import "../../static/assets/vendor/glightbox/css/glightbox.min.css";
import "../../static/assets/vendor/swiper/swiper-bundle.min.css";
import "../../static/assets/vendor/iframe/iframe.css";

export default function App() {
	return (
		<Router>
			<Routes />
		</Router>
	);
}
