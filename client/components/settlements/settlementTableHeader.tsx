import {
  BILL_LABELS,
  COIN_LABELS,
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
      {BILL_LABELS.map((l) => (
        <th key={l} className={"bill amount"}>
          {settlement[l]}
        </th>
      ))}
      {COIN_LABELS.map((l) => (
        <th key={l} className={"coin amount"}>
          {settlement[l]}
        </th>
      ))}
    </tr>
  );
}
