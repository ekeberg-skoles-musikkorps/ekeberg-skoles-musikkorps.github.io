import {
  BILL_LABELS,
  COIN_LABELS,
  SettlementReport,
} from "../../lib/money/bills";
import React from "react";

import "./settlement.css";

export function SettlementTable({
  settlements,
}: {
  settlements: SettlementReport[];
}) {
  return (
    <table className={"settlement-table"}>
      <thead>
        <tr>
          <th>Når</th>
          <th>Hva</th>
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
        <tr>
          <th>SUM</th>
          <th></th>
          <th></th>
          <th>
            {settlements
              .map((s) =>
                Object.values(s.settlement).reduce((a, b) => a + b, 0),
              )
              .reduce((a, b) => a + b, 0)}
          </th>
          {BILL_LABELS.map((l) => (
            <th key={l} className={"bill amount"}>
              {settlements
                .map((s) => s.settlement[l])
                .reduce((a, b) => a + b, 0) || 0}
            </th>
          ))}
          {COIN_LABELS.map((l) => (
            <th key={l} className={"coin amount"}>
              {" "}
              {settlements
                .map((s) => s.settlement[l])
                .reduce((a, b) => a + b, 0) || 0}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {settlements.map((s) => (
          <tr key={s.time.toString()}>
            <td>TEST</td>
            <td>{s.description}</td>
            <td>{s.teller}</td>
            <td>{Object.values(s.settlement).reduce((a, b) => a + b, 0)}</td>
            {BILL_LABELS.map((l) => (
              <td key={l} className={"bill amount"}>
                {s.settlement[l]}
              </td>
            ))}
            {COIN_LABELS.map((l) => (
              <td key={l} className={"coin amount"}>
                {s.settlement[l]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
