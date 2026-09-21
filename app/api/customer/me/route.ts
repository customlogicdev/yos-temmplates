// app/api/customer/me/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ customer: null });
}

export async function POST() {
  return NextResponse.json({ customer: null });
}