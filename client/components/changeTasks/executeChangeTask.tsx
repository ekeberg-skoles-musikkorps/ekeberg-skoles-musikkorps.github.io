import React, { useEffect, useMemo, useState } from "react";
import {
  CashBalance,
  cashTotal,
  ChangeOrder,
  denominations,
  DenominationType,
} from "../../lib/money/money";
import { sampleCashBalance } from "../../lib/money/sampleSettlements";
import { useWakeLock } from "../../lib/useWakeLock";

function ChangeDenominationInput({
  denominationType: { denomination, amount, label },
  changeTask,
  balance,
  setBalance,
}: {
  denominationType: DenominationType;
  changeTask: ChangeOrder;
  balance: CashBalance;
  setBalance: (fn: (old: CashBalance) => CashBalance) => void;
}) {
  const value = balance[denomination];
  const [input, setInput] = useState(() =>
    value && "count" in value && value.count ? "" + value.count : "",
  );
  const count = useMemo(() => (input ? parseInt(input) : 0), [input]);
  const sum = useMemo(() => count * amount, [count]);
  useEffect(
    () => setBalance((old) => ({ ...old, [denomination]: { count } })),
    [count],
  );
  const orderedCount = changeTask.balance[denomination].count;
  const invalid = useMemo(
    () => input.length && count != orderedCount,
    [input, count],
  );
  return (
    <div>
      <label>
        <strong>{label}:</strong>
        <br />
        <strong>Bestilt: {orderedCount} </strong>
        <br />
        Levert:{" "}
        <input
          className={invalid ? "invalid" : ""}
          type="number"
          value={input}
          min={0}
          max={1000}
          onChange={(e) => setInput(e.target.value)}
        />
        kr {sum}
      </label>
    </div>
  );
}

export function ExecuteChangeTask() {
  useWakeLock();
  const [changeTask, setChangeTask] = useState<ChangeOrder>({
    department: "Avdeling a",
    balance: sampleCashBalance(),
  });
  const [balance, setBalance] = useState<CashBalance>(() => {
    const currentValue = sessionStorage.getItem("currentValue");
    return currentValue ? JSON.parse(currentValue) : sampleCashBalance();
  });
  useEffect(() => {
    sessionStorage.setItem("currentValue", JSON.stringify(balance));
  }, [balance]);
  const sum = useMemo(() => cashTotal(balance), [balance]);
  return (
    <>
      <h2>Fullfør veksleoppdrag</h2>
      <form>
        {denominations.map((bill) => (
          <ChangeDenominationInput
            key={bill.denomination}
            denominationType={bill}
            changeTask={changeTask}
            balance={balance}
            setBalance={setBalance}
          />
        ))}
        <h3>Sum</h3>
        <div>Kr {sum}</div>
        <div>
          <button>Lagre</button>
        </div>
      </form>
    </>
  );
}
