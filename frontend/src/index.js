import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// const App = lazy(() => import("./components/App"));

// import { Provider } from "react-redux";
// import store from "./Components/Redux/store";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	// <Suspense fallback={<h1>Loading...</h1>}>
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	// </Suspense>,
	document.getElementById("app")
);
