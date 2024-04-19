import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(
    "https://wskua43dqg.execute-api.ap-southeast-1.amazonaws.com/todo/add",
    {next: { revalidate:0 },  method: "POST", body:JSON.stringify(body) }

  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return NextResponse.json({ data });
}
