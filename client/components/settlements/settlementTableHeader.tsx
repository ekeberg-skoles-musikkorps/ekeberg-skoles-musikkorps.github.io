import {
  BILL_DENOMINATIONS,
  COIN_DENOMINATIONS,
  SettlementReport,
} from "../../lib/money/money";
import React from "react";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function SettlementTableHeader({
  report,
}: {
  report: Optional<SettlementReport, "teller" | "time">;
}) {
  const { settlement } = report;
  return (
    <tr>
      <th>{report.description}</th>
      <th></th>
      <th></th>
      <th className={"amount"}>
        {Object.values(settlement).reduce((a, b) => a + b, 0)}
      </th>
      {BILL_DENOMINATIONS.map((d) => (
        <th key={d} className={"bill amount"}>
          {settlement[d]}
        </th>
      ))}
      {COIN_DENOMINATIONS.map((d) => (
        <th key={d} className={"coin amount"}>
          {settlement[d]}
        </th>
      ))}
    </tr>
  );
}
