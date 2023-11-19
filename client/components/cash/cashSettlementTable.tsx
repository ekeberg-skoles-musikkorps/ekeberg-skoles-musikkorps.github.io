import React from "react";
import {
  sampleCashBalance,
  sampleChangeReserveOrder,
  sampleSettlementReport,
  sampleTeller,
} from "../../lib/money/sampleSettlements";
import { SettlementTableTitleHeader } from "../settlements/settlementTableTitleHeader";
import { SettlementTableHeader } from "../settlements/settlementTableHeader";
import { SettlementTableRow } from "../settlements/settlementTableRow";
import {
  amountOfDenomination,
  bills,
  cashTotal,
  coins,
  sumBalances,
} from "../../lib/money/money";
import { Link } from "react-router-dom";
import { CashBalanceSettlement } from "../../lib/money/model";

export function CashSettlementTable() {
  const settlements: CashBalanceSettlement[] = [
    {
      description: "Start",
      time: new Date(),
      looseCash: sampleCashBalance(),
      moneyBags: [],
      includedSettlements: [],
    },
    {
      description: "Etter veksel",
      time: new Date(),
      looseCash: sampleCashBalance(0.1),
      moneyBags: [],
      includedSettlements: [
        sampleChangeReserveOrder(),
        sampleChangeReserveOrder(),
      ],
    },
    {
      description: "Etter dag 1",
      time: new Date(),
      looseCash: sampleCashBalance(10),
      moneyBags: [],
      includedSettlements: [
        sampleSettlementReport(),
        sampleSettlementReport(),
        sampleSettlementReport(),
      ],
    },
    {
      description: "Etter veksel dag 2",
      time: new Date(),
      looseCash: sampleCashBalance(0.1),
      moneyBags: [],
      includedSettlements: [
        sampleChangeReserveOrder(),
        sampleChangeReserveOrder(),
      ],
    },
  ];

  const incompleteSettlement = sampleCashBalance();

  return (
    <>
      <h2>Kontantavstemming</h2>
      <table className={"settlement-table"}>
        <thead>
          <SettlementTableTitleHeader />
        </thead>
        <tbody>
          {settlements.map((s) => (
            <>
              {s.includedSettlements.length > 0 && (
                <SettlementTableRow
                  report={{
                    balance: sumBalances(
                      s.includedSettlements.map((i) => i.balance),
                    ),
                    description: "Sum av posteringer",
                  }}
                />
              )}
              <SettlementTableHeader
                key={s.time.toString()}
                report={{
                  description: s.description,
                  balance: sumBalances([
                    ...s.moneyBags.map((b) => b.balance),
                    s.looseCash,
                  ]),
                }}
              />
            </>
          ))}
        </tbody>
        <tfoot>
          <tr className={"incomplete"}>
            <td>
              <Link to={"settlement/5"}>Påbegynt</Link>
            </td>
            <td>
              <Link to={"settlement/5"}>Påbegynt</Link>
            </td>
            <td>{sampleTeller()}</td>
            <td className={"amount"}>{cashTotal(incompleteSettlement)}</td>
            {bills.map((d) => (
              <td key={d.denomination} className={"bill amount"}>
                {amountOfDenomination(incompleteSettlement, d)}
              </td>
            ))}
            {coins.map((d) => (
              <td key={d.denomination} className={"coin amount"}>
                {amountOfDenomination(incompleteSettlement, d)}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </>
  );
}
