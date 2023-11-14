import { Link, Route, Routes } from "react-router-dom";
import * as React from "react";
import { DepartmentSettlementForm } from "./departmentSettlementForm";

function SettlementDepartmentSelector() {
  return (
    <>
      <h2>Velg avdeling</h2>
      <div>
        <Link to={"/departments/1/settlements/new"}>Avdeling 1</Link>
      </div>
      <div>
        <Link to={"/departments/2/settlements/new"}>Avdeling 2</Link>
      </div>
    </>
  );
}

export function DepartmentRoutes() {
  return (
    <Routes>
      <Route
        path={"/settlements/new"}
        element={<SettlementDepartmentSelector />}
      />
      <Route
        path={"/:id/settlements/new"}
        element={<DepartmentSettlementForm />}
      />
      <Route path={"*"} element={<h2>Avdelingssiden finnes ikke</h2>} />
    </Routes>
  );
}
