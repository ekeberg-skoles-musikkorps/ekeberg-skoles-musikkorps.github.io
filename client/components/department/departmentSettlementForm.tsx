import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { BillInput } from "./billInput";
import { bills, CashBalance, cashTotal, coins } from "../../lib/money/money";
import { CoinInput } from "./coinInput";

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
      <h3>Sum</h3>
      <div>Kr {sum}</div>
      <div>
        <button>Lagre</button>
      </div>
      <pre>{JSON.stringify(balance, null, 2)}</pre>
    </form>
  );
}
