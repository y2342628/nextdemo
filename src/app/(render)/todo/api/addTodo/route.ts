import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();


  const res = await fetch(process.env.BASE_HOST + "todo/add", {
    next: { revalidate: 0 },
    method: "POST",
    headers:{"Content-Type":'application/json'},
    body:JSON.stringify(body),
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return NextResponse.json({ data });
}
