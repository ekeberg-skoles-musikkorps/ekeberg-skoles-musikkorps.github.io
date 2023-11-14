import { BILL_LABELS, COIN_LABELS } from "../../lib/money/money";
import React from "react";

export function SettlementTableTitleHeader() {
  return (
    <tr>
      <th>Hva</th>
      <th>Når</th>
      <th>Hvem</th>
      <th>Sum</th>
      {BILL_LABELS.map((l) => (
        <th key={l} className={"bill"}>
          {l}
        </th>
      ))}
      {COIN_LABELS.map((l) => (
        <th key={l} className={"bill"}>
          {l}
        </th>
      ))}
    </tr>
  );
}
