import { Route, Routes } from "react-router-dom";
import { FrontPage } from "./frontPage";
import { CashRoutes } from "../cash/cashRoutes";
import { DepartmentRoutes } from "../department/departmentRoutes";
import * as React from "react";

export function ApplicationRoutes() {
  // @ts-ignore
  const prod = import.meta.env.PROD;

  if (prod) {
    return (
      <div>
        <h2>Velkommen til Loppemarked på Ekeberg skole (kommer)</h2>

        <p>Her vil du kunne registrere kjøp i cafeen</p>

        <h3>For dugnadsmannskap</h3>

        <div>
          <button>Logg inn (kommer)</button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/cash/*"} element={<CashRoutes />} />
      <Route path={"/departments/*"} element={<DepartmentRoutes />} />
      <Route path={"*"} element={<h2>Siden finnes ikke</h2>} />
    </Routes>
  );
}
