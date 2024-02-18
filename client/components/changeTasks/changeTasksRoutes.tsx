import { Route, Routes } from "react-router-dom";
import React from "react";
import { NewChangeReserveTable } from "./newChangeReserveTable";
import { ExecuteChangeTask } from "./executeChangeTask";
import { ListChangeTasks } from "./listChangeTasks";

export function ChangeTasksRoutes() {
  const departments = ["Department a", "Department b", "Department c"];
  return (
    <Routes>
      <Route
        path={"/"}
        element={<ListChangeTasks departments={departments} />}
      />
      <Route path={"/:id"} element={<ExecuteChangeTask />} />
      <Route
        path={"/new"}
        element={<NewChangeReserveTable departments={departments} />}
      />
      <Route path={"*"} element={<h2>Ukjent vekslefunksjon</h2>} />
    </Routes>
  );
}
