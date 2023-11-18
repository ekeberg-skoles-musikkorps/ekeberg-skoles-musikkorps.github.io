import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { BillInput } from "./billInput";
import { CoinInput } from "./coinInput";
import { bills, CashBalance, cashTotal, coins } from "../../lib/money/money";

function useWakeLock() {
  const [wakeLockSentinel, setWakeLockSentinel] = useState<WakeLockSentinel>();
  useEffect(() => {
    navigator.wakeLock.request("screen").then((s) => {
      setWakeLockSentinel(s);
    });
    return () => {
      wakeLockSentinel?.release().then();
    };
  }, []);
}

export function DepartmentSettlementForm() {
  const [balance, setBalance] = useState<CashBalance>(() =>
    JSON.parse(sessionStorage.getItem("currentSettlement") || "{}"),
  );
  useEffect(() => {
    sessionStorage.setItem("currentSettlement", JSON.stringify(balance));
  }, [balance]);
  const sum = useMemo(() => cashTotal(balance), [balance]);
  useWakeLock();
  return (
    <form>
      <h2>Registrer kontanter</h2>
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
      <h3>Sum</h3>
      <div>Kr {sum}</div>
      <div>
        <button>Lagre</button>
      </div>
      <pre>{JSON.stringify(balance, null, 2)}</pre>
    </form>
  );
}
