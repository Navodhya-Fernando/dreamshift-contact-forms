// === Sheets setup ===
const SHEET_ID = 'your-sheet-id; // <-- your Sheet ID

function writeRow_(p) {
  const row = [
    new Date(),
    (p.sourcePage || '').toString(),
    (p.name || '').toString(),
    (p.email || '').toString(),
    (p.isNhsJob === 'true' || p.isNhsJob === true || /yes/i.test(p.isNhsJob || '')) ? 'Yes' : 'No',
    (p.whatsapp || '').toString(),
    (p.linkedin || '').toString(),
    (p.jobs || '').toString(),
    (p.locations || '').toString(),
    (p.pkg || '').toString()
  ];
  const ss = SpreadsheetApp.openById(SHEET_ID);
  ss.getSheets()[0].appendRow(row);
  SpreadsheetApp.flush();
}

function doGet(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    writeRow_(p);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    writeRow_(p);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}