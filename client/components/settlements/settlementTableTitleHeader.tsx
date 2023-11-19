import { bills, coins } from "../../lib/money/money";
import React from "react";

export function SettlementTableTitleHeader() {
  return (
    <tr>
      <th>Hva</th>
      <th>Når</th>
      <th>Hvem</th>
      <th>Sum</th>
      {bills.map((d) => (
        <th key={d.denomination} className={"bill"}>
          {d.label}
        </th>
      ))}
      {coins.map((d) => (
        <th key={d.denomination} className={"coin"}>
          {d.label}
        </th>
      ))}
    </tr>
  );
}
