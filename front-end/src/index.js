import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import './semantic/dist/semantic.min.css';

ReactDOM.render(<Router />, document.getElementById("root"));
registerServiceWorker();
