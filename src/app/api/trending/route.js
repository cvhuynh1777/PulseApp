import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const CATEGORY_IDS = {
  '10': 'Music',
  '17': 'Sports',
  '20': 'Gaming',
  '25': 'News',
};

export async function GET() {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  let allVideos = [];

  // Fetch Top 20 for each category
  for (const [id, name] of Object.entries(CATEGORY_IDS)) {
    const res = await youtube.videos.list({
      part: 'snippet,statistics',
      chart: 'mostPopular',
      regionCode: 'US',
      videoCategoryId: id,
      maxResults: 20,
    });

    const videos = res.data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id,
      channel: item.snippet.channelTitle,
      views: item.statistics.viewCount,
      thumbnail: `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`,
      category: name,
    }));

    allVideos.push(...videos);
  }

  // Shuffle all videos for "All" category
  const shuffledVideos = allVideos.sort(() => Math.random() - 0.5);

  return NextResponse.json({
    videos: shuffledVideos.slice(0, 40), // Show 40 random videos for "All"
    allVideos, // Full list for category filtering
  });
}
