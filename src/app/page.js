'use client';
import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import Modal from '../components/Modal';
import Chart from '../components/Chart';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [trending, setTrending] = useState([]);         
  const [allVideos, setAllVideos] = useState([]);       
  const [analysis, setAnalysis] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/api/trending').then(res => {
      setTrending(res.data.videos);
      setAllVideos(res.data.allVideos);
    });
  }, []);

  const analyze = (videoId, title) => {
    console.log('Calling analyze for', videoId, title);
    axios.get(`/api/analyze?videoId=${videoId}`)
      .then(res => {
        console.log('API response:', res.data);
        setAnalysis({ title, data: res.data });
      })
      .catch(err => {
        console.error('Analyze failed:', err);
      });
  };

  const searchVideos = () => {
    if (searchQuery.trim()) {
      axios
        .get(`/api/search?query=${encodeURIComponent(searchQuery.trim())}`)
        .then(res => {
          setTrending(res.data.videos);
          setActiveCategory('Search Result');
          setUrl('');
        })
        .catch(err => {
          console.error('Search failed:', err);
        });
    }
  };

  const filteredVideos =
    activeCategory === 'Search Result'
      ? trending
      : activeCategory === 'All'
      ? allVideos
      : allVideos.filter(v => v.category === activeCategory);

  return (
    <main className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-3 text-4xl font-extrabold text-pink-400 mb-2">
          <img src="/logo.gif" alt="Opinia logo" className="w-12 h-12 rounded-full -mt-3" />
          PULSE
        </h1>
        <h2 className="text-3xl font-extrabold text-pink-300 mb-2">
          YOUTUBE SENTIMENT EXPLORER
        </h2>
        <details className="bg-pink-50 border border-pink-200 rounded-lg p-4 mt-2">
          <summary className="cursor-pointer text-pink-400 font-semibold">
            About Pulse
          </summary>
          <p className="text-gray-700 text-m mt-2">
          In November 2021, YouTube removed public dislike counts to encourage civility, but it also obscured audience sentiment. Pulse brings transparency back, analyzing YouTube comments with VADER to reveal the emotional tone of videos. </p>
          <p className="text-gray-700 text-m mt-2">
          While VADER is fast and lightweight, it has limitations with sarcasm and complex context. Future versions of Pulse aim to integrate advanced NLP models for richer, more accurate sentiment insights.
          </p>
        </details>


      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search YouTube videos"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-grow p-2 rounded bg-purple-50 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
        />
        <button
          onClick={searchVideos}
          className="px-4 py-2 bg-pink-300 hover:bg-pink-400 rounded text-gray-800 font-semibold transition"
        >
          Search
        </button>
      </div>

      {/* URL Analyze */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter YouTube video URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-grow p-2 rounded bg-purple-50 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
        />
        <button
          onClick={() => {
            try {
              const parsed = new URL(url);
              if (parsed.hostname.includes('youtube.com')) {
                const id = parsed.searchParams.get('v');
                if (id) return analyze(id, 'Custom Video');
              }
              console.error('Not a valid YouTube URL');
            } catch {
              console.error('Invalid URL format');
            }
          }}
          className="px-4 py-2 bg-pink-400 hover:bg-pink-500 rounded text-gray-800 font-semibold transition"
        >
          Analyze
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-3 flex-wrap mb-4">
        {['All', 'Music', 'Gaming', 'News', 'Sports', 'Search Result'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition
              ${activeCategory === cat
                ? 'bg-pink-300 text-gray-800'
                : 'bg-purple-100 text-gray-600 hover:bg-purple-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <section>
        
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredVideos.map(video => (
              <VideoCard
                key={video.videoId}
                video={video}
                onAnalyze={() => analyze(video.videoId, video.title)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No videos to display. Try another category or search.</p>
        )}
      </section>

      {/* Analysis Modal */}
      {analysis && (
        <Modal title={analysis.title} onClose={() => setAnalysis(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Chart type="pie" data={analysis.data} />
            <Chart type="bar" data={analysis.data} />
          </div>
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold text-pink-300">Example Comments</h3>
            {['Positive', 'Neutral', 'Negative'].map(sentiment => (
              <details
                key={sentiment}
                className="bg-purple-50 rounded-lg p-3"
              >
                <summary className="cursor-pointer font-semibold text-pink-400">
                  {sentiment} Comments
                </summary>
                <ul className="list-disc ml-6 mt-2 text-sm text-gray-700 space-y-1">
                  {(analysis.data?.comments || [])
                    .filter(c => c.sentiment === sentiment)
                    .slice(0, 5)
                    .map((c, i) => <li key={i}>{c.text}</li>)
                  }
                  {((analysis.data?.comments || []).filter(c => c.sentiment === sentiment).length === 0) && (
                    <li className="italic text-gray-500">No {sentiment.toLowerCase()} comments found.</li>
                  )}
                </ul>
              </details>
            ))}
          </div>
        </Modal>
      )}
    </main>
  );
}
