import React, { useState } from "react";
import { Dialog } from "../elements/dialog";
import { BarCodeScanner } from "../elements/barCodeScanner";

export function MoneyBagLabel({
  label,
  setLabel,
}: {
  label: string;
  setLabel(s: string): void;
}) {
  const [openScanner, setOpenScanner] = useState(false);

  return (
    <label>
      Posenummer:
      <br />
      <input
        type={"number"}
        inputMode={"numeric"}
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <button type={"button"} onClick={() => setOpenScanner(true)}>
        📷
      </button>
      <Dialog onClose={() => setOpenScanner(false)} visible={openScanner}>
        <h1>Scan strekkoden på pengepose</h1>
        <BarCodeScanner
          onScan={(result) => {
            setLabel(result);
            setOpenScanner(false);
          }}
        />
        <button type={"button"} onClick={() => setOpenScanner(false)}>
          Avbryt
        </button>
      </Dialog>
    </label>
  );
}
