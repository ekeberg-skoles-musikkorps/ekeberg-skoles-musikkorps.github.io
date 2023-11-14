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
  const [inputCount, setInputCount] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const calculatedCount = useMemo(
    () => Math.round(parseInt(inputWeight) / grams),
    [inputWeight],
  );
  const calculatedWeight = useMemo(
    () => parseInt(inputCount) * grams,
    [inputCount],
  );
  const sum = useMemo(
    () => (inputCount ? parseInt(inputCount) : calculatedCount || 0) * amount,
    [inputCount, calculatedCount],
  );
  useEffect(() => onAmount(sum), [inputCount, inputWeight]);
  return (
    <div>
      <label>
        <strong>{label}</strong>:
        <br />
        Antall:{" "}
        <input
          type="number"
          maxLength={6}
          disabled={inputWeight.length > 0}
          value={inputCount || calculatedCount}
          min={0}
          onChange={(e) => setInputCount(e.target.value)}
        />{" "}
        kr {sum} ({((sum / amount) * grams).toFixed(2)}g)
        <br />
        Gram:{" "}
        <input
          type="number"
          value={inputWeight || calculatedWeight}
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
