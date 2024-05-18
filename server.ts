import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import * as creds from "./config/google.json";

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
  console.log("Hello world");
  const doc = await GoogleSpreadsheet.createNewSpreadsheetDocument(auth, { title: 'This is a new doc' });
  console.log("Done", doc.spreadsheetId, doc.title);

  await doc.setPublicAccessLevel("commenter");
  await doc.share("jhannes@gmail.com", {role: "writer"})
}

main().then();