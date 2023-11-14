import { Route, Routes } from "react-router-dom";
import React from "react";
import { CashSettlement } from "./cashSettlement";

export function CashRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<CashSettlement />} />
      <Route path={"*"} element={<h2>Kasse-side finnes ikke</h2>} />
    </Routes>
  );
}
