import { Link } from "react-router-dom";
import React from "react";

export function ListChangeTasks({ departments }: { departments: string[] }) {
  return (
    <>
      <h2>List veksleoppdrag</h2>
      <ul>
        {departments.map((d) => (
          <li key={d}>
            <Link to={"1"}>{d}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
