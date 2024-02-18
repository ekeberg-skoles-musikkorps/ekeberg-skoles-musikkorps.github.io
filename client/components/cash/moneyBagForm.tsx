import React, { useState } from "react";
import { bills, CashBalance, cashTotal, coins } from "../../lib/money/money";
import { BillInput } from "../department/billInput";
import { CoinInput } from "../department/coinInput";
import { MoneyBagLabel } from "./moneyBagLabel";

export function MoneyBagForm({ onClose }: { onClose(): void }) {
  const [label, setLabel] = useState("");
  const [balance, setBalance] = useState<CashBalance>({});

  function handleSubmit() {}

  return (
    <form method={"dialog"} onSubmit={handleSubmit}>
      <h2>Registrer sedler/mynt</h2>
      <div>
        <MoneyBagLabel label={label} setLabel={setLabel} />
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
        <div>Total: kr&nbsp;{cashTotal(balance)}</div>
      </div>
      <div>
        <button>Fullfør</button>
        <button onClick={onClose}>Avbryt</button>
      </div>
    </form>
  );
}
