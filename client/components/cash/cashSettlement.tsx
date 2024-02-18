import React, { useState } from "react";
import { sampleSettlements } from "../../lib/money/sampleSettlements";
import {
  amountOfDenomination,
  bills,
  CashBalance,
  cashTotal,
  coins,
} from "../../lib/money/money";
import { Dialog } from "../elements/dialog";
import { MoneyBagForm } from "./moneyBagForm";

export function CashSettlement() {
  const [registrationDialogVisible, setRegistrationDialogVisible] =
    useState(false);
  const candidateSettlements = sampleSettlements();

  const balance: CashBalance = {};

  return (
    <>
      <Dialog
        onClose={() => setRegistrationDialogVisible(false)}
        visible={registrationDialogVisible}
      >
        <MoneyBagForm onClose={() => setRegistrationDialogVisible(false)} />
      </Dialog>
      <h2>Fullfør oppgjør</h2>
      <div>
        <button onClick={() => setRegistrationDialogVisible(true)}>
          Registrer ny seddel/myntpose
        </button>
      </div>
      {bills.map((d) => (
        <li id={d.denomination}>
          {d.label}: {amountOfDenomination(balance, d)}
        </li>
      ))}
      {coins.map((d) => (
        <li id={d.denomination}>
          {d.label}: {amountOfDenomination(balance, d)}
        </li>
      ))}

      <h3>Inkluderer følgende inntellinger</h3>
      {candidateSettlements.map((report) => (
        <div key={report.time.toString()}>
          <label>
            <input type="checkbox" />
            {report.time?.toString()}
            {report.description}: kr&nbsp;{cashTotal(report.balance)}
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
