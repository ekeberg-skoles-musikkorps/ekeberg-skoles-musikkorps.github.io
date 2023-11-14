import * as React from "react";
import { useEffect, useMemo, useState } from "react";

export function CoinInput({
  label,
  amount,
  grams,
  onAmount,
}: {
  label: string;
  amount: number;
  grams: number;
  onAmount(amount: number): void;
}) {
  const [count, setCount] = useState("");
  const [weight, setWeight] = useState("");
  const sum = useMemo(() => (parseInt(count) || 0) * amount, [count]);
  useEffect(() => onAmount(sum), [count]);
  useEffect(() => {
    if (weight.length) {
      setCount(Math.round(parseInt(weight) / grams).toString());
    }
  }, [weight]);
  return (
    <div>
      <label>
        <strong>{label}</strong>:
        <br />
        Antall:{" "}
        <input
          type="number"
          disabled={weight.length > 0}
          value={count}
          min={0}
          onChange={(e) => setCount(e.target.value)}
        />{" "}
        kr {(parseInt(count) || 0) * amount} (
        {((sum / amount) * grams).toFixed(2)}g)
        <br />
        Gram:{" "}
        <input
          type="number"
          value={weight}
          min={0}
          onChange={(e) => setWeight(e.target.value)}
          maxLength={5}
        />{" "}
        ({grams}g per mynt)
      </label>
    </div>
  );
}
