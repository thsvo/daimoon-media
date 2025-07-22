import { google } from 'googleapis';

const sheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({ spreadsheetId, auth }) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}

function appendRow({ spreadsheetId, auth, sheetName, newRow }) {
  const res = sheets.spreadsheets.values.append({
    spreadsheetId,
    auth,
    range: `${sheetName}!A1`,
    valueInputOption: 'RAW',
    resource: {
      values: [newRow],
    },
  });

  return res;
}

module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
  appendRow,
};
