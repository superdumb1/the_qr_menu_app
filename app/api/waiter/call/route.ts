import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { tableNo, type } = await req.json();

    // Log for your local console so you can see it working
    console.log(`[EXTERNAL SYSTEM] Table ${tableNo} requested: ${type}`);

    // Dummy delay to simulate network to the boss's Windows server
    await new Promise(res => setTimeout(res, 1500));

    return NextResponse.json({ 
        success: true, 
        message: `${type} request received for Table ${tableNo}` 
    });
}