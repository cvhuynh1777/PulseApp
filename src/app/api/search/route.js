import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  if (!query) return NextResponse.json({ videos: [] });

  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  const res = await youtube.search.list({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: 20,
  });

  const videos = res.data.items.map(item => ({
    title: item.snippet.title,
    videoId: item.id.videoId,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    category: 'Search Result', // Add category for filtering
  }));

  return NextResponse.json({ videos });
}
