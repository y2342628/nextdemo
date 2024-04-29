import { ApiError } from "next/dist/server/api-utils";
import { NextResponse, NextRequest } from "next/server";

export const custom_middleware =
  (handler:Function) =>
  async (resquest: NextRequest, response: NextResponse) => {
    try {
    
       const res = await handler(resquest, response);
        if (!res.ok) {
            throw new ApiError(res.status,'Failed to fetch data')
        }
        const data = await res.json();
        return NextResponse.json({ data })
            
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message },
          { status: error.statusCode }
        );
      } else {
        /// Log server errors using winston or your preferred logger
        return NextResponse.json(
          { message: "Server died for some reason" },
          { status: 500 }
        );
      }
    }
  };