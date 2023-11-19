import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { CashBalance, CoinDenomination } from "../../lib/money/money";

export function CoinInput({
  denomination,
  balance,
  setBalance,
}: {
  denomination: CoinDenomination;
  balance: CashBalance;
  setBalance: (fn: (old: CashBalance) => CashBalance) => void;
}) {
  const value = balance[denomination.denomination];
  const { grams } = denomination;
  const [inputCount, setInputCount] = useState(() =>
    value && "count" in value && value.count ? "" + value.count : "",
  );
  const [inputWeight, setInputWeight] = useState(() =>
    value && "grams" in value && value.grams ? "" + value.grams : "",
  );
  const calculatedCount = useMemo(
    () => (inputWeight ? Math.round(parseInt(inputWeight) / grams) : 0),
    [inputWeight],
  );
  const calculatedWeight = useMemo(
    () => (inputCount ? parseInt(inputCount) * grams : 0),
    [inputCount],
  );
  const count = useMemo(
    () => (inputCount ? parseInt(inputCount) : calculatedCount),
    [inputCount, calculatedCount],
  );
  useEffect(() => {
    if (inputWeight) {
      const grams = parseInt(inputWeight);
      setBalance((old) => ({ ...old, [denomination.denomination]: { grams } }));
    } else {
      setBalance((old) => ({ ...old, [denomination.denomination]: { count } }));
    }
  }, [inputWeight, inputCount]);
  return (
    <div>
      <label>
        <strong>{denomination.label}</strong>:
        <br />
        Antall:{" "}
        <input
          type="number"
          maxLength={6}
          disabled={inputWeight.length > 0}
          value={inputCount || calculatedCount || ""}
          min={0}
          onChange={(e) => setInputCount(e.target.value)}
        />{" "}
        kr {count * denomination.amount} ({(count * grams).toFixed(2)}g)
        <br />
        Gram:{" "}
        <input
          type="number"
          value={inputWeight || calculatedWeight || ""}
          disabled={inputCount.length > 0}
          min={0}
          onChange={(e) => setInputWeight(e.target.value)}
          maxLength={5}
        />{" "}
        ({grams}g per mynt)
      </label>
    </div>
  );
}
