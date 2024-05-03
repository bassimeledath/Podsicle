import { NextRequest, NextResponse } from 'next/server'
import fetch from 'node-fetch';


async function fetchTranscriptData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching transcript data:', error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
	const data = await request.json();

    await new Promise(resolve => setTimeout(resolve, 7000));

    const audio = "/podcast/podcast.mp3";
    const transcript = await fetchTranscriptData("https://firebasestorage.googleapis.com/v0/b/podsicle.appspot.com/o/transcript%2Ftransformer_transcript.json?alt=media&token=f1a636ac-2669-44b7-a1d5-54ee150baddd")

    return NextResponse.json({ audio, transcript },{status: 200});
    }
    