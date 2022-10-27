import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalContext from "./contexts";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </React.StrictMode>
);
