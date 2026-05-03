import { NextResponse } from 'next/server';
import { newJson } from '@/lib/NewJson'; 

export async function GET() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
        
        const data = newJson[0]?.data || [];
        
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
    }
}