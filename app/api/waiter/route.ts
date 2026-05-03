import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { tableNo, type } = body; 

    console.log(`[SERVER]: Table ${tableNo} is requesting: ${type}`);

    // Simulate calling the external restaurant system
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ 
        success: true, 
        message: `Request for ${type} sent for Table ${tableNo}`,
        timestamp: new Date().toISOString()
    }, { status: 200 });
}