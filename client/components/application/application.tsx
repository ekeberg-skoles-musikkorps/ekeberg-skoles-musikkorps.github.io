import * as React from "react";

import "./application.css";
import { Link } from "react-router-dom";
import { ApplicationRoutes } from "./applicationRoutes";

export function Application() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Ekeberg skoles musikkorps</Link>
        </h1>
      </header>
      <main>
        <ApplicationRoutes />
      </main>
      <footer>© Ekeberg skoles musikkorps</footer>
    </>
  );
}
