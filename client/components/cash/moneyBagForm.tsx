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
          denomination={bill}
          balance={balance}
          setBalance={setBalance}
        />
      ))}
      {coins.map((coin) => (
        <CoinInput
          key={coin.denomination}
          denomination={coin}
          balance={balance}
          setBalance={setBalance}
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
