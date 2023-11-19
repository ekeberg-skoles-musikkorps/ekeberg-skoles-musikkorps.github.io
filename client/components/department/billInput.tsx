import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { CashBalance, Denomination } from "../../lib/money/money";

export function BillInput({
  denomination,
  balance,
  setBalance,
}: {
  denomination: Denomination;
  balance: CashBalance;
  setBalance: (fn: (old: CashBalance) => CashBalance) => void;
}) {
  const value = balance[denomination.denomination];
  const [input, setInput] = useState(() =>
    value && "count" in value && value.count ? "" + value.count : "",
  );
  const count = useMemo(() => (input ? parseInt(input) : 0), [input]);
  const sum = useMemo(() => count * denomination.amount, [count]);
  useEffect(
    () =>
      setBalance((old) => ({ ...old, [denomination.denomination]: { count } })),
    [count],
  );
  return (
    <div>
      <label>
        <strong>{denomination.label}</strong>:
        <br />
        Antall:{" "}
        <input
          type="number"
          value={input}
          min={0}
          onChange={(e) => setInput(e.target.value)}
        />
        kr {sum}
      </label>
    </div>
  );
}
