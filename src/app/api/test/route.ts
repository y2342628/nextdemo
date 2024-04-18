import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const res = await fetch("https://juw9ijeqpj.execute-api.ap-southeast-1.amazonaws.com/test",{next:{revalidate:3600}});

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
    
      const data = await res.json()
      return NextResponse.json({ data })


}