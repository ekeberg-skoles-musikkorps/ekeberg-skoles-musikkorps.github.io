import * as React from "react";
import { useEffect, useMemo, useState } from "react";

export function BillInput({
  label,
  amount,
  onAmount,
}: {
  label: string;
  amount: number;
  onAmount(amount: number): void;
}) {
  const [count, setCount] = useState("");
  const sum = useMemo(() => (parseInt(count) || 0) * amount, [count]);
  useEffect(() => onAmount(sum), [count]);
  return (
    <div>
      <label>
        <strong>{label}</strong>:
        <br />
        Antall:{" "}
        <input
          type="number"
          value={count}
          min={0}
          onChange={(e) => setCount(e.target.value)}
        />
        kr {(parseInt(count) || 0) * amount}
      </label>
    </div>
  );
}
