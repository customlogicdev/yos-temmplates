// app/api/customer/login/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    customer: {
      id: "demo",
      name: "Demo User",
      email: "demo@example.com",
    },
  });
}