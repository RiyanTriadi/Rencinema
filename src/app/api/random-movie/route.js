import { NextResponse } from "next/server";
import { getRandomMovie } from "@/lib/tmdb";

export async function GET() {
    try {
        const movie = await getRandomMovie();
        return NextResponse.json(movie);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch random movie" },
            { status: 500 }
        );
    }
}