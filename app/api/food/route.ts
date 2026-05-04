// app/api/food/route.ts
import { NextResponse } from 'next/server';
import { newJson } from "@/lib/NewJson";
import { isDev } from '@/lib/env';

export async function GET() {
    // Ensure this matches your simplified backend path
    console.log(isDev)
    if (isDev) {
        return NextResponse.json({ message: "All categories retrieved.", data: newJson, status: true, statusCode: 200 }, { status: 200 });
    }

    const BACKEND_URL = `${process.env.BACKEND_API_URL}/qr-menu`;


    try {
        const response = await fetch(BACKEND_URL, {
            method: 'GET', // Changed to GET
            headers: {
                'Content-Type': 'application/json',
            },
            // Body removed!
            next: { revalidate: 60 } // Optional: Cache menu for 60 seconds
        });
        if (!response.ok) {
            throw new Error(`Backend responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
    }
}