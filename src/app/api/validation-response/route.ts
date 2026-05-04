import { NextResponse } from "next/server";

function payloadForWebhook(payload: unknown) {
  const secret = process.env.VALIDATION_WEBHOOK_SECRET;

  if (!secret) {
    return payload;
  }

  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    return {
      ...payload,
      _inarelaySecret: secret,
    };
  }

  return {
    payload,
    _inarelaySecret: secret,
  };
}

async function forwardToWebhook(payload: unknown) {
  const webhookUrl = process.env.VALIDATION_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      forwarded: false,
      reason: "VALIDATION_WEBHOOK_URL is not configured.",
    };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.VALIDATION_WEBHOOK_SECRET
        ? {
            "x-inarelay-secret": process.env.VALIDATION_WEBHOOK_SECRET,
          }
        : {}),
    },
    body: JSON.stringify(payloadForWebhook(payload)),
  });

  if (!response.ok) {
    throw new Error(`Validation webhook returned ${response.status}`);
  }

  const responseText = await response.text();

  if (responseText) {
    const responsePayload = JSON.parse(responseText) as { ok?: boolean; error?: string };

    if (responsePayload.ok === false) {
      throw new Error(responsePayload.error || "Validation webhook rejected the request.");
    }
  }

  return {
    forwarded: true,
    reason: "Validation response forwarded to webhook.",
  };
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid JSON payload.",
      },
      { status: 400 },
    );
  }

  console.info("validation response received", payload);

  try {
    const result = await forwardToWebhook(payload);

    return NextResponse.json({
      ok: true,
      stored: result.forwarded,
      next: result.reason,
    });
  } catch (error) {
    console.error("validation webhook failed", error);

    return NextResponse.json(
      {
        ok: false,
        stored: false,
        error: "Validation response was received, but forwarding failed.",
      },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    ok: true,
    route: "validation-response",
    storage: process.env.VALIDATION_WEBHOOK_URL ? "webhook" : "console-only",
  });
}
