import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  // The MVP starts with a stable server-side boundary; Supabase/Neon writes slot in here.
  console.info("validation response received", payload);

  return NextResponse.json({
    ok: true,
    stored: false,
    next: "Connect this route to the mvp_validation_responses table.",
  });
}
