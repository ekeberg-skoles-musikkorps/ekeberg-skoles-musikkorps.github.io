import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { BillInput } from "./billInput";
import { CoinInput } from "./coinInput";
import { bills, coins, Settlement } from "../../lib/money/money";

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
  const [settlement, setSettlement] = useState<Settlement>(() =>
    JSON.parse(sessionStorage.getItem("currentSettlement") || "{}"),
  );
  useEffect(() => {
    sessionStorage.setItem("currentSettlement", JSON.stringify(settlement));
  }, [settlement]);
  const sum = useMemo(
    () => Object.values(settlement).reduce((a, b) => a + b, 0),
    [settlement],
  );
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
            setSettlement((old) => ({ ...old, [bill.denomination]: amount }))
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
            setSettlement((old) => ({ ...old, [coin.denomination]: amount }))
          }
        />
      ))}
      <h3>Sum</h3>
      <div>Kr {sum}</div>
      <div>
        <button>Lagre</button>
      </div>
      <pre>{JSON.stringify(settlement, null, 2)}</pre>
    </form>
  );
}
