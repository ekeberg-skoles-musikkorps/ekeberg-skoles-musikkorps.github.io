import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Application } from "./components/application/application";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
