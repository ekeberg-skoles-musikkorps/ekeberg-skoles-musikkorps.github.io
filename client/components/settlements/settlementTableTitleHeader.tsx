import { BILL_DENOMINATIONS, COIN_DENOMINATIONS } from "../../lib/money/money";
import React from "react";

export function SettlementTableTitleHeader() {
  return (
    <tr>
      <th>Hva</th>
      <th>Når</th>
      <th>Hvem</th>
      <th>Sum</th>
      {BILL_DENOMINATIONS.map((d) => (
        <th key={d} className={"bill"}>
          {d}
        </th>
      ))}
      {COIN_DENOMINATIONS.map((d) => (
        <th key={d} className={"coin"}>
          {d}
        </th>
      ))}
    </tr>
  );
}
