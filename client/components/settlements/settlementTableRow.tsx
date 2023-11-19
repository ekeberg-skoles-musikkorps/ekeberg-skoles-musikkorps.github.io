import {
  amountOfDenomination,
  bills,
  cashTotal,
  coins,
  SettlementReport,
} from "../../lib/money/money";
import React from "react";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export function SettlementTableRow({
  report,
}: {
  report: Optional<SettlementReport, "time" | "teller">;
}) {
  const { description, balance, teller, time } = report;
  return (
    <tr>
      <td>{description}</td>
      <td>{time && "27/03 11:20"}</td>
      <td>{teller}</td>
      <td className={"amount"}>{cashTotal(balance)}</td>
      {bills.map((d) => (
        <td key={d.denomination} className={"bill amount"}>
          {amountOfDenomination(balance, d)}
        </td>
      ))}
      {coins.map((d) => (
        <td key={d.denomination} className={"coin amount"}>
          {amountOfDenomination(balance, d)}
        </td>
      ))}
    </tr>
  );
}
