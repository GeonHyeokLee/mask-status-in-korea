import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CombineProvider } from "./modules";

ReactDOM.render(
  <CombineProvider>
    <App />
  </CombineProvider>,
  document.getElementById("root")
);
