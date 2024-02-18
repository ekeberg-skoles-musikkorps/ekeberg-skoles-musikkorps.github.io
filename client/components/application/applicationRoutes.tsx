import { Route, Routes } from "react-router-dom";
import { FrontPage } from "./frontPage";
import { CashRoutes } from "../cash/cashRoutes";
import { DepartmentRoutes } from "../department/departmentRoutes";
import * as React from "react";
import { ChangeTasksRoutes } from "../changeTasks/changeTasksRoutes";
import { LoginRoutes } from "../login/loginRoutes";
import { EventOverview } from "../events/eventOverview";

export function ApplicationRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/events/*"} element={<EventOverview />} />
      <Route path={"/cash/*"} element={<CashRoutes />} />
      <Route path={"/departments/*"} element={<DepartmentRoutes />} />
      <Route path={"/changeTasks/*"} element={<ChangeTasksRoutes />} />
      <Route path={"/login/*"} element={<LoginRoutes />} />
      <Route path={"*"} element={<h2>Siden finnes ikke</h2>} />
    </Routes>
  );
}
