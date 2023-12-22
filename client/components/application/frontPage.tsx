import { Link } from "react-router-dom";
import * as React from "react";

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

  return (
    <div className={"card-container"}>
      <div className={"card"}>
        <Link className={"card-link"} to={"/cash"}></Link>
        <div>
          <h2>Kontantkasse</h2>
          <div>Beholdning: kr 129.231</div>
          <div>Inntjening: kr 125.231</div>
          <Link to={"/cash/settlements/new"}>
            <button>Ny avstemming</button>
          </Link>
        </div>
      </div>
      <div className={"card"}>
        <Link className={"card-link"} to={"/departments"}></Link>
        <div>
          <h2>Avdelinger</h2>
          <div>Inntjening: kr 125.211</div>
          <div>12 avdelinger</div>
          <div>
            <Link to={"/departments/settlements/new"}>
              <button>Ny inntelling</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={"card"}>
        <Link className={"card-link"} to={"/changeTasks"}></Link>
        <div>
          <h2>Veksleoppdrag</h2>
          <div>1 veksleoppdrag</div>
          <div>
            <Link to={"/changeTasks/new"}>
              <button>Nytt oppdrag</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
