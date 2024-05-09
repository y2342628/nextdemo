import { NextRequest, NextResponse } from "next/server";

import { custom_middleware } from "@/utils/apiMiddleware";

const main_handler = async (request: NextRequest, response: NextResponse) =>
  fetch(process.env.BASE_HOST + "todo", { next: { revalidate: 0 } });

/// Wrapping handle in custom_middleware
export const GET = custom_middleware(main_handler);
