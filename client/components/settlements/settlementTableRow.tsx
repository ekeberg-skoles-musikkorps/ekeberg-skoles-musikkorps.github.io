import {
  BILL_DENOMINATIONS,
  COIN_DENOMINATIONS,
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
      {BILL_DENOMINATIONS.map((d) => (
        <td key={d} className={"bill amount"}>
          {settlement[d]}
        </td>
      ))}
      {COIN_DENOMINATIONS.map((d) => (
        <td key={d} className={"coin amount"}>
          {settlement[d]}
        </td>
      ))}
    </tr>
  );
}
