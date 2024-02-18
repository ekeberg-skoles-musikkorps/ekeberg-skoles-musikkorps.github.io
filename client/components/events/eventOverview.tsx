import { Link } from "react-router-dom";
import * as React from "react";

export function EventOverview() {
  return (
    <div className={"card-container"}>
      <div className={"card"}>
        <Link className={"card-link"} to={"/cash"}></Link>
        <div>
          <h2>Kontantkasse</h2>
          <div>Beholdning: kr 129.231</div>
          <div>Inntjening: kr 125.231</div>
          <Link to={"/cash/settlements/new"}>
            <button tabIndex={-1}>Ny avstemming</button>
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
              <button tabIndex={-1}>Ny inntelling</button>
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
              <button tabIndex={-1}>Nytt veksleplan</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
