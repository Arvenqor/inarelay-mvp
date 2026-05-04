# Google Sheets Validation Webhook

Use this when the MVP needs durable validation-response capture without a database.

## Sheet Setup

Create a Google Sheet named:

```text
InaRelay MVP Validation Responses
```

Add a tab named:

```text
Responses
```

Add these headers in row 1:

```text
received_at
submission_id
prompt_location
case_id
active_view
operator_name
work_email
team_role
pilot_readiness
answers_json
note
raw_json
```

## Apps Script

Open the Google Sheet, then go to **Extensions -> Apps Script**. Replace the default code with:

```js
const SHEET_NAME = "Responses";

function doGet() {
  return jsonResponse({
    ok: true,
    service: "inarelay-validation-webhook",
  });
}

function doPost(e) {
  try {
    const expectedSecret = PropertiesService.getScriptProperties().getProperty(
      "VALIDATION_WEBHOOK_SECRET",
    );
    const body = e?.postData?.contents ? JSON.parse(e.postData.contents) : {};

    if (expectedSecret && body._inarelaySecret !== expectedSecret) {
      return jsonResponse({
        ok: false,
        error: "Unauthorized webhook request.",
      });
    }

    delete body._inarelaySecret;

    const sheet = getOrCreateSheet();
    const submittedAt = body.submittedAt || new Date().toISOString();
    const lead = body.lead || {};

    sheet.appendRow([
      new Date(),
      Utilities.getUuid(),
      body.promptLocation || "",
      body.caseId || "",
      body.activeView || "",
      lead.operatorName || "",
      lead.workEmail || "",
      lead.teamRole || "",
      lead.pilotReadiness || "",
      JSON.stringify(body.answers || {}),
      body.note || "",
      JSON.stringify({
        ...body,
        submittedAt,
      }),
    ]);

    return jsonResponse({
      ok: true,
      stored: true,
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error),
    });
  }
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "received_at",
      "submission_id",
      "prompt_location",
      "case_id",
      "active_view",
      "operator_name",
      "work_email",
      "team_role",
      "pilot_readiness",
      "answers_json",
      "note",
      "raw_json",
    ]);
  }

  return sheet;
}

function jsonResponse(payload) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

Apps Script web apps may still return HTTP 200 for application-level errors. The MVP API route treats `{"ok": false}` from this script as a failed webhook request.

## Script Property

In Apps Script:

1. Open **Project Settings**.
2. Add a script property:

```text
VALIDATION_WEBHOOK_SECRET
```

Use a long random value. Use the same value in Vercel.

## Deployment

In Apps Script:

1. Click **Deploy -> New deployment**.
2. Select type: **Web app**.
3. Execute as: **Me**.
4. Who has access: **Anyone**.
5. Click **Deploy**.
6. Copy the `/exec` web app URL.

If the URL contains `/u/1/`, remove that segment. The URL should look like:

```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

## Vercel Environment Variables

Add these to the Vercel project for **Production** and **Preview**:

```text
VALIDATION_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VALIDATION_WEBHOOK_SECRET=the-same-secret-from-apps-script
```

Redeploy after saving environment variables.
