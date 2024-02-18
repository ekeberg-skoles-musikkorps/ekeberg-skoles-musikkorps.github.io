import * as React from "react";
import { EventOverview } from "../events/eventOverview";

export function FrontPage() {
  // @ts-ignore
  const prod = import.meta.env.PROD;

  if (prod) {
    return (
      <div>
        <h2>Velkommen til Loppemarked på Ekeberg skole (kommer)</h2>

        <p>Her vil du kunne registrere kjøp i cafeen</p>

        <h3>For dugnadsmannskap</h3>

        <div>
          <button>Logg inn (kommer)</button>
        </div>
      </div>
    );
  }

  return <EventOverview />;
}
