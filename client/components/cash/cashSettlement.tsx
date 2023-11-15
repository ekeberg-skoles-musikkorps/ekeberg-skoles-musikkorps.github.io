import React from "react";
import { sampleSettlements } from "../../lib/money/sampleSettlements";
import {
  BILL_DENOMINATIONS,
  COIN_DENOMINATIONS,
  Settlement,
} from "../../lib/money/money";
import { Link } from "react-router-dom";

export function CashSettlement() {
  const candidateSettlements = sampleSettlements();

  const settlement: Settlement = {};

  return (
    <>
      <dialog>
        <h3>Registrer myntpose</h3>
      </dialog>
      <h2>Fullfør oppgjør</h2>
      {BILL_DENOMINATIONS.map((d) => (
        <li id={d}>
          {d}: {settlement[d] || 0}
          <br />
          <button>Registrer ny pose</button>
        </li>
      ))}
      {COIN_DENOMINATIONS.map((d) => (
        <li id={d}>
          <Link to={`coins/${d}`}>
            {d}: {settlement[d] || 0}
          </Link>
        </li>
      ))}

      <h3>Inkluderer følgende inntellinger</h3>
      {candidateSettlements.map((report) => (
        <div key={report.time.toString()}>
          <label>
            <input type="checkbox" />
            {report.time?.toString()}
            {report.description}
          </label>
        </div>
      ))}
      <h3>Fullfør</h3>

      <div>
        <button>Bekreft</button>
      </div>
    </>
  );
}
