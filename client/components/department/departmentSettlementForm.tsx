import * as React from "react";
import { useMemo, useState } from "react";
import { BillInput } from "./billInput";
import { CoinInput } from "./coinInput";
import { bills, coins, Settlement } from "../../lib/money/bills";

export function DepartmentSettlementForm() {
  const [settlement, setSettlement] = useState<Settlement>({});
  const sum = useMemo(
    () =>
      Object.keys(settlement)
        .map((k) => settlement[k])
        .reduce((a, b) => a + b, 0),
    [settlement],
  );
  return (
    <>
      <h2>Registrer kontanter</h2>
      {bills.map((bill) => (
        <BillInput
          key={bill.field}
          label={bill.label}
          amount={bill.amount}
          onAmount={(amount) =>
            setSettlement((old) => ({ ...old, label: amount }))
          }
        />
      ))}
      {coins.map((coin) => (
        <CoinInput
          key={coin.field}
          label={coin.label}
          amount={coin.amount}
          grams={coin.grams}
          onAmount={(amount) =>
            setSettlement((old) => ({ ...old, label: amount }))
          }
        />
      ))}
      <h3>Sum</h3>
      <div>Kr {sum}</div>
      <div>
        <button>Lagre</button>
      </div>
    </>
  );
}
