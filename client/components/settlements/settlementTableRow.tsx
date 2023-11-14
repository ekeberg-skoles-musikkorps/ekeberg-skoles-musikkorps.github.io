import {
  BILL_LABELS,
  COIN_LABELS,
  SettlementReport,
} from "../../lib/money/money";
import React from "react";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function SettlementTableRow({
  report,
}: {
  report: Optional<SettlementReport, "time" | "teller">;
}) {
  const { description, settlement, teller, time } = report;
  return (
    <tr>
      <td>{description}</td>
      <td>{time && "27/03 11:20"}</td>
      <td>{teller}</td>
      <td className={"amount"}>
        {Object.values(settlement).reduce((a, b) => a + b, 0)}
      </td>
      {BILL_LABELS.map((l) => (
        <td key={l} className={"bill amount"}>
          {settlement[l]}
        </td>
      ))}
      {COIN_LABELS.map((l) => (
        <td key={l} className={"coin amount"}>
          {settlement[l]}
        </td>
      ))}
    </tr>
  );
}
