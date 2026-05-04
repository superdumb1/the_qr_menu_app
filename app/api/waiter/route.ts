import { isDev } from '@/lib/env';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { tableNo, type } = body;

        if (!tableNo || !type) {
            return NextResponse.json(
                { success: false, message: "Missing tableNo or type" },
                { status: 400 }
            );
        }
        if (isDev) {
            console.log(`🧪 DEV MODE - Mock waiter request ${type}   ${tableNo}`);

            return NextResponse.json({
                success: true,
                message: `${type} request acknowledged for Table ${tableNo}`,
                tableNo,
                type,
                timestamp: new Date().toISOString()
            });
        }
        else {


            // ✅ map type → Express endpoint
            const endpoint =
                type === 'BILL' ? 'call-for-bill' : 'call-for-order';

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
        }

    } catch (error) {
        console.error("Waiter API error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to process request" },
            { status: 500 }
        );
    }
}