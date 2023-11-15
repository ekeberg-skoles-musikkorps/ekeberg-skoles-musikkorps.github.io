import { Route, Routes } from "react-router-dom";
import React from "react";
import { CashSettlementTable } from "./cashSettlementTable";
import { CashSettlement } from "./cashSettlement";

export function CashRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<CashSettlementTable />} />
      <Route path={"/settlement/:id/*"} element={<CashSettlement />} />
      <Route path={"*"} element={<h2>Kasse-side finnes ikke</h2>} />
    </Routes>
  );
}
