import {
  amountOfDenomination,
  bills,
  CashBalance,
  cashTotal,
  coins,
} from "../../lib/money/money";
import React from "react";

export function SettlementTableHeader({
  report,
}: {
  report: { balance: CashBalance; description?: string };
}) {
  const { balance } = report;
  return (
    <tr>
      <th>{report.description}</th>
      <th></th>
      <th></th>
      <th className={"amount"}>{cashTotal(balance)}</th>
      {bills.map((d) => (
        <th key={d.denomination} className={"bill amount"}>
          {amountOfDenomination(balance, d)}
        </th>
      ))}
      {coins.map((d) => (
        <th key={d.denomination} className={"coin amount"}>
          {amountOfDenomination(balance, d)}
        </th>
      ))}
    </tr>
  );
}
