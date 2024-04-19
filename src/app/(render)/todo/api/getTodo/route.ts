import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const res = await fetch("https://wskua43dqg.execute-api.ap-southeast-1.amazonaws.com/todo",{next: { revalidate:0 }});
  

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
    
      const data = await res.json();
      return NextResponse.json({ data })


}