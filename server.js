import { JWT } from "google-auth-library";
import { google } from "googleapis";
import * as dotenv from "dotenv";
import { GoogleSpreadsheet } from "google-spreadsheet";
import express from "express";

dotenv.config();

const sheetTitle = process.env.TODO_APP_SHEET_TITLE;
if (!sheetTitle) {
  throw "You must start with TODO_APP_SHEET_TITLE environment property";
}

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file"
  ]
});


async function findOrCreateSheet(title) {
  const drive = google.drive({ version: "v3", auth: auth });
  const files = (await drive.files.list()).data.files;
  const existing = files
    .filter(({ mimeType }) => mimeType === "application/vnd.google-apps.spreadsheet")
    .filter(file => file.name === title);

  for (const file of files) {
    if (file.name.endsWith("- old") || file.name === "This is a new doc") {
      await drive.files.delete({ fileId: file.id });
    }
  }

  if (existing.length > 1) {
    throw `Found more than one sheet with title ${title}: ${existing.map(({ id }) => `https://docs.google.com/spreadsheets/d/${id}`)}`;
  } else if (existing.length === 1) {
    console.log(`Existing sheet https://docs.google.com/spreadsheets/d/${existing[0].id}`);
    return new GoogleSpreadsheet(existing[0].id, auth);
  } else {
    const masterUser = process.env.TODO_APP_MASTER_USER;
    if (!masterUser) {
      throw "You must start with TODO_APP_MASTER_USER environment property";
    }
    const sheet = await GoogleSpreadsheet.createNewSpreadsheetDocument(auth, {
      title
    });
    await sheet.setPublicAccessLevel("commenter");
    await sheet.share(masterUser, { role: "writer" });

    const headerValues = ["date", "user", "title", "description"];
    await sheet.addSheet({
      title: "Todo items",
      headerValues,
      gridProperties: { columnCount: headerValues.length, frozenRowCount: 1 }
    });
    await sheet.sheetsByIndex[0].delete();
    console.log(`New sheet https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}`);
    return sheet;
  }
}


async function main() {
  const spreadsheet = await findOrCreateSheet(sheetTitle);

  const app = express();
  app.use(express.json());

  app.get("/api/tasks", async (req, res) => {
    await spreadsheet.loadInfo(true);
    const sheet = spreadsheet.sheetsByTitle["Todo items"];
    await sheet.loadCells();
    const tasks = [];
    for (let i = 1; i < sheet.rowCount; i++) {
      const task = {
        date: new Date(Math.round((sheet.getCell(i, 0).numberValue - 25569)*86400*1000)),
        user: sheet.getCell(i, 1).stringValue,
        title: sheet.getCell(i, 2).stringValue,
        description: sheet.getCell(i, 3).stringValue
      };
      if (task.user) {
        tasks.push(task);
      }
    }
    res.json(tasks);
  });
  app.post("/api/tasks", async (req, res) => {
    const { title, description, user } = req.body;
    await spreadsheet.loadInfo(true);
    const sheet = spreadsheet.sheetsByTitle["Todo items"];
    const now = new Date();
    const date = 25569.0 + ((now.getTime() - (now.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24))
    await sheet.addRow({ date, user, title, description });
    res.sendStatus(201);
  });

  app.listen(3000);
}


main().catch(console.error);



