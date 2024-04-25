import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

    const res = await fetch(process.env.BASE_HOST +"todo/category",{next: { revalidate:0 }});

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
    
      const data = await res.json()
      return NextResponse.json({ data })


}