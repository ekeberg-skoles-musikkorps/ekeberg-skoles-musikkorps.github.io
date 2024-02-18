import {
  ChangeOrder,
  countOfDenomination,
  DenominationType,
} from "../../lib/money/money";
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";

export function ChangeOrderCell({
  order,
  setChangeReserveOrder,
  denominationType,
  row,
  column,
  onMove,
  currentCell,
}: {
  order: ChangeOrder;
  setChangeReserveOrder: Dispatch<SetStateAction<ChangeOrder[]>>;
  denominationType: DenominationType;
  row: number;
  column: number;
  onMove(row: number, column: number): void;
  currentCell: { row: number; column: number };
}) {
  const { denomination } = denominationType;
  function handleKey(e: KeyboardEvent) {
    let preventDefault = true;
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      return;
    }
    if (e.key === "ArrowUp") {
      onMove(row - 1, column);
    } else if (e.key === "ArrowDown") {
      onMove(row + 1, column);
    } else if (e.key === "ArrowLeft") {
      onMove(row, column - 1);
    } else if (e.key === "ArrowRight") {
      onMove(row, column + 1);
    } else if (e.key === "+") {
      setValue((v) => v + 1);
    } else if (e.key === "-") {
      setValue((v) => (v > 0 ? v - 1 : 0));
    } else {
      preventDefault = false;
    }
    if (preventDefault) {
      e.preventDefault();
    }
  }

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const value = useMemo(() => {
    const amount = countOfDenomination(order.balance, denominationType);
    return amount ? "" + amount : "";
  }, [order.balance[denomination]]);

  function setValue(v: (prevState: number) => number) {
    function nonNegative(n: number) {
      return isNaN(n) || n < 0 ? 0 : n;
    }
    setChangeReserveOrder((old) =>
      old.map((o) =>
        o.department === order.department
          ? {
              ...o,
              balance: {
                ...o.balance,
                [denomination]: {
                  count: nonNegative(v(o.balance[denomination]?.count || 0)),
                },
              },
            }
          : o,
      ),
    );
  }

  const count = useMemo(() => (value.length ? parseInt(value) : 0), [value]);
  useEffect(() => {
    inputRef.current.addEventListener("keydown", handleKey);
    return () => inputRef.current?.removeEventListener("keydown", handleKey);
  }, []);
  useEffect(() => {
    if (currentCell.row === row && currentCell.column === column) {
      inputRef.current.focus({});
      inputRef.current.select();
    }
  }, [currentCell]);

  return (
    <>
      <input
        tabIndex={column === 0 && row === 0 ? 0 : -1}
        ref={inputRef}
        style={{ width: "4em" }}
        type={"number"}
        inputMode={"numeric"}
        value={value}
        size={5}
        maxLength={3}
        max={100}
        onChange={(e) => setValue(() => parseInt(e.target.value))}
      />
      <span>(kr&nbsp;{count * denominationType.amount})</span>
    </>
  );
}
