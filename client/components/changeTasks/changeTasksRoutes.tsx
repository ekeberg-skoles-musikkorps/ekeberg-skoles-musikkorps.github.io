import { Route, Routes } from "react-router-dom";
import React from "react";
import { NewChangeReserveTable } from "./newChangeReserveTable";

export function ChangeTasksRoutes() {
  const departments = ["Department a", "Department b", "Department c"];
  return (
    <Routes>
      <Route
        path={"/new"}
        element={<NewChangeReserveTable departments={departments} />}
      />
      <Route path={"*"} element={<h2>Ukjent vekslefunksjon</h2>} />
    </Routes>
  );
}
