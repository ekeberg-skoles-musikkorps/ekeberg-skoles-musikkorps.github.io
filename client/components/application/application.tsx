import * as React from "react";
import { FrontPage } from "./frontPage";

import "./application.css";
import { Link, Route, Routes } from "react-router-dom";
import { DepartmentRoutes } from "../department/departmentRoutes";

export function Application() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Dugnadsregnskap</Link>
        </h1>
      </header>
      <main>
        <Routes>
          <Route path={"/"} element={<FrontPage />} />
          <Route path={"/departments/*"} element={<DepartmentRoutes />} />
          <Route path={"*"} element={<h2>Siden finnes ikke</h2>} />
        </Routes>
      </main>
      <footer>© Johannes Brodwall</footer>
    </>
  );
}
