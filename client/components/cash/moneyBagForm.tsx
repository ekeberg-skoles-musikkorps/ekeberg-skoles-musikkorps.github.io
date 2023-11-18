import React, { useState } from "react";
import { bills, CashBalance, cashTotal, coins } from "../../lib/money/money";
import { BillInput } from "../department/billInput";
import { CoinInput } from "../department/coinInput";

export function MoneyBagForm() {
  const [balance, setBalance] = useState<CashBalance>({});

  function handleSubmit() {}

  return (
    <form method={"dialog"} onSubmit={handleSubmit}>
      <h2>Registrer sedler og mynt</h2>
      <div>
        <label>
          Posenummer:
          <br />
          <input type={"number"} inputMode={"numeric"} />
        </label>
      </div>
      {bills.map((bill) => (
        <BillInput
          key={bill.denomination}
          label={bill.label}
          amount={bill.amount}
          onAmount={(amount) =>
            setBalance((old) => ({ ...old, [bill.denomination]: amount }))
          }
        />
      ))}
      {coins.map((coin) => (
        <CoinInput
          key={coin.denomination}
          label={coin.label}
          amount={coin.amount}
          grams={coin.grams}
          onAmount={(amount) =>
            setBalance((old) => ({ ...old, [coin.denomination]: amount }))
          }
        />
      ))}
      <div>
        <div>Totalt: kr {cashTotal(balance)}</div>
      </div>
      <div>
        <button>Fullfør</button>
      </div>
    </form>
  );
}
