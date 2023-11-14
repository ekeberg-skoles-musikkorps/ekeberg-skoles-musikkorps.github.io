import { Link } from "react-router-dom";
import * as React from "react";

export function DepartmentList() {
  return (
    <>
      <h2>Avdelinger</h2>
      <div className={"card-container"}>
        <div className="card">
          <Link to={"1"}>
            <h3>Avdeling 1</h3>
            <div>
              <strong>Inntjening:</strong> kr 24.214
            </div>
          </Link>
        </div>
        <div className="card">
          <Link to={"2"}>
            <h3>Avdeling 2</h3>
            <div>
              <strong>Inntjening:</strong> kr 4.200
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
