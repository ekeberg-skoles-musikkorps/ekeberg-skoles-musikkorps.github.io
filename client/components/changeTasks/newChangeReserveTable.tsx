import React, { useMemo, useState } from "react";
import {
  amountOfDenomination,
  cashTotal,
  ChangeOrder,
  countOfDenomination,
  denominations,
  sumBalances,
} from "../../lib/money/money";
import { sampleCashBalance } from "../../lib/money/sampleSettlements";
import { ChangeOrderCell } from "./changeOrderCell";

export function NewChangeReserveTable({
  departments,
}: {
  departments: string[];
}) {
  const [currentCell, setCurrentCell] = useState({
    row: 0,
    column: 0,
  });
  function handleMove(row: number, column: number) {
    setCurrentCell({ row, column });
  }

  const cashReserve = useMemo(() => sampleCashBalance(10), []);

  const [changeReserveOrders, setChangeReserveOrders] = useState<ChangeOrder[]>(
    () =>
      departments.map((department) => ({
        department,
        balance: Object.fromEntries(
          Object.entries(cashReserve).map(([d, v]) => {
            if ("count" in v) {
              return [d, { count: Math.trunc(v.count / departments.length) }];
            }
            return [d, { count: 0 }];
          }),
        ),
      })),
  );

  return (
    <>
      <h2>Planlegg veksel</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Sum</td>
            {denominations.map((b) => (
              <th key={b.denomination}>{b.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {changeReserveOrders.map((order, row) => (
            <tr key={order.department}>
              <th>{order.department}</th>
              <td>{cashTotal(order.balance)}</td>
              {denominations.map((denominationType, column) => (
                <td
                  key={order.department + "-" + denominationType.denomination}
                >
                  <ChangeOrderCell
                    order={order}
                    setChangeReserveOrder={setChangeReserveOrders}
                    denominationType={denominationType}
                    row={row}
                    column={column}
                    onMove={handleMove}
                    currentCell={currentCell}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Totalt</th>
            <td>
              {cashTotal(
                sumBalances(changeReserveOrders.map((b) => b.balance)),
              )}
            </td>
            {denominations.map((denominationType) => (
              <td key={denominationType.denomination}>
                kr{" "}
                {amountOfDenomination(
                  sumBalances(changeReserveOrders.map((b) => b.balance)),
                  denominationType,
                )}
              </td>
            ))}
          </tr>
          <tr>
            <th>Antall</th>
            <td></td>
            {denominations.map((denominationType) => (
              <td key={denominationType.denomination}>
                {countOfDenomination(cashReserve, denominationType)}
              </td>
            ))}
          </tr>
          <tr>
            <th>Kasse</th>
            <td>{cashTotal(cashReserve)}</td>
            {denominations.map((denominationType) => (
              <td key={denominationType.denomination}>
                kr&nbsp;{amountOfDenomination(cashReserve, denominationType)}
              </td>
            ))}
          </tr>
          <tr>
            <th>Antall</th>
            <td>{cashTotal(cashReserve)}</td>
            {denominations.map((denominationType) => (
              <td key={denominationType.denomination}>
                {countOfDenomination(cashReserve, denominationType)}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </>
  );
}
