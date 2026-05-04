import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    // 1. Move body extraction outside the try block so it's available to the catch block
    let body: any = {};
    
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ success: false, message: "Invalid JSON" }, { status: 400 });
    }

    const { tableNo, type } = body;

    try {
        if (!tableNo || !type) {
            return NextResponse.json(
                { success: false, message: "Missing tableNo or type" },
                { status: 400 }
            );
        }

        const endpoint = type === 'BILL' ? 'call-for-bill' : 'call-for-order';
        const BACKEND_URL = `${process.env.BACKEND_API_URL}/qr-menu/${endpoint}`;

        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tableNo }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Backend error');
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("Waiter API error, falling back to mock:", error);
        
        // 2. Pass the already extracted variables to your fallback
        return devRes({ type, tableNo });
    }
}

// 3. Ensure devRes returns the actual NextResponse object to be returned by the handler
const devRes = ({ type, tableNo }: any) => {
    return NextResponse.json({
        success: true,
        message: `🧪 MOCK MODE - ${type} request acknowledged for Table ${tableNo}`,
        tableNo,
        type,
        timestamp: new Date().toISOString()
    });
}