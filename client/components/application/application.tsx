import * as React from "react";
import { FrontPage } from "./frontPage";

export function Application() {
  return (
    <>
      <header>
        <h1>Dugnadsregnskap</h1>
      </header>
      <main>
        <FrontPage />
      </main>
      <footer>© Johannes Brodwall</footer>
    </>
  );
}
