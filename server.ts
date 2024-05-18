import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import * as creds from "./config/google.json";
import { sampleSettlements } from "./lib/money/sampleSettlements";
import { BILL_DENOMINATIONS, COIN_DENOMINATIONS } from "./lib/money/money";

const auth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    // note that sharing-related calls require the google drive scope
    'https://www.googleapis.com/auth/drive.file',
  ],
});



async function main() {
  const doc = await GoogleSpreadsheet.createNewSpreadsheetDocument(auth, { title: 'This is a new doc' });
  console.log(`https://docs.google.com/spreadsheets/d/${doc.spreadsheetId}`);

  await doc.setPublicAccessLevel("commenter");
  await doc.share("jhannes@gmail.com", {role: "writer"})

  const columns = ["date", "teller", "type", ...BILL_DENOMINATIONS, ...COIN_DENOMINATIONS];
  const sheet = await doc.addSheet({
    title: "Cash",
    headerValues: columns,
    gridProperties: {
      frozenRowCount: 1,
      frozenColumnCount: 3,
      columnCount: columns.length,
    },
  })
  const settlements = sampleSettlements();
  await sheet.addRows(settlements.map(s => ({
    date: s.time.toString(), teller: s.teller, type: s.description || "",
    ...Object.fromEntries(BILL_DENOMINATIONS.map(d => [d, (s.balance[d] as any).count] || "")),
    ...Object.fromEntries(COIN_DENOMINATIONS.map(d => [d, (s.balance[d] as any).count] || ""))
  })))
}

main().then();



