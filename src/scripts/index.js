import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import bootstrapStyles from "../../node_modules/bootstrap/dist/css/bootstrap.css";
import styles from "../styles/style.scss";

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );

render(App);
// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
  const NextApp = require("./components/App").default;
  render(NextApp);
}
