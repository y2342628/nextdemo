import { NextRequest, NextResponse } from "next/server";

import { custom_middleware } from "@/utils/apiMiddleware";

const main_handler = async (request: NextRequest, response: NextResponse) => {
  const body = await request.json();

  return fetch(process.env.BASE_HOST + "todo/add", {
    next: { revalidate: 0 },
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

/// Wrapping handle in custom_middleware
export const POST = custom_middleware(main_handler);
