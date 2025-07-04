import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import vader from 'vader-sentiment';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ comments: [] });
  }

  const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });
  let comments = [];
  let nextToken = null;

  try {
    do {
      const res = await youtube.commentThreads.list({
        part: 'snippet',
        videoId,
        maxResults: 100,
        pageToken: nextToken,
        textFormat: 'plainText',
      });

      res.data.items.forEach(i => {
        comments.push(i.snippet.topLevelComment.snippet.textDisplay);
      });

      nextToken = res.data.nextPageToken;
    } while (comments.length < 200 && nextToken);

    const analyzed = comments.map(text => {
      const { compound } = vader.SentimentIntensityAnalyzer.polarity_scores(text);
      const sentiment = compound >= 0.05
        ? 'Positive'
        : compound <= -0.05
        ? 'Negative'
        : 'Neutral';
      return { text, sentiment };
    });

    return NextResponse.json({ comments: analyzed });
  } catch (err) {
    console.error('Analyze API error:', err);
    return NextResponse.json({ comments: [] });
  }
}
