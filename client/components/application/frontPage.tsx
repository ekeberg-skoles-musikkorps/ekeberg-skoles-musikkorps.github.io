import { Link } from "react-router-dom";
import * as React from "react";

export function FrontPage() {
  return (
    <div className={"card-container"}>
      <div className={"card"}>
        <Link to={"/cash"}>
          <h2>Kontantkasse</h2>
          <div>Beholdning: kr 129.231</div>
          <div>Inntjening: kr 125.231</div>
          <Link to={"/cash/settlements/new"}>
            <button>Ny avstemming</button>
          </Link>
        </Link>
      </div>
      <div className={"card"}>
        <Link to={"/departments"}>
          <h2>Avdelinger</h2>
          <div>Inntjening: kr 125.211</div>
          <div>12 avdelinger</div>
          <div>
            <Link to={"/departments/settlements/new"}>
              <button>Ny inntelling</button>
            </Link>
          </div>
        </Link>
      </div>
      <div className={"card"}>
        <Link to={"/changeTasks"}>
          <h2>Veksleoppdrag</h2>
          <div>1 veksleoppdrag</div>
          <div>
            <Link to={"/changeTasks/new"}>
              <button>Nytt oppdrag</button>
            </Link>
          </div>
        </Link>
      </div>
    </div>
  );
}
