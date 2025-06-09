import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// import { BarChart2, Share2, Globe, Clock, Loader2 } from "lucide-react";
import { BarChart2, Share2, Globe, Clock, Loader2, TrendingUp } from "lucide-react";

import axios from "axios";

interface MostViewedVideo {
  title: string;
  channelTitle: string;
  viewCount: string;
  rawViewCount: number;
  publishedAt: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
}

interface PageInfo {
  nextPageToken?: string;
  totalResults: number;
}

interface CachedData {
  videos: MostViewedVideo[];
  pageInfo: PageInfo;
  timestamp: number;
  activeTab: 'long' | 'shorts';
  timeRange: string;
}

interface TimeRange {
  value: string;
  label: string;
  date: string;
}

const YoutubeMostViewedVideos: React.FC = () => {
  const [region, setRegion] = useState("global");
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<MostViewedVideo[]>([]);
  const [cache, setCache] = useState<Record<string, Record<string, CachedData>>>({});
  const [pageInfo, setPageInfo] = useState<PageInfo>({ totalResults: 0 });
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState<'long' | 'shorts'>('long');
  const [timeRange, setTimeRange] = useState('all');
  const [error, setError] = useState<string | null>(null);

  const timeRanges: TimeRange[] = [
    { value: 'day', label: 'Last 24 Hours', date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { value: 'week', label: 'Last 7 Days', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
    { value: 'month', label: 'Last 30 Days', date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
    { value: 'year', label: 'Last Year', date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString() },
    { value: 'years5', label: 'Last 5 Years', date: new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000).toISOString() },
    { value: 'all', label: 'All Time', date: '1970-01-01T00:00:00Z' }
  ];
  
  const MAX_RESULTS = 500;
  const PAGE_SIZE = 50; // Maximum allowed by YouTube API

  const regions = [
    { value: "global", label: "Global/Worldwide" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "KR", label: "South Korea" },
    { value: "IN", label: "India" },
    { value: "BR", label: "Brazil" },
    { value: "AU", label: "Australia" },
  ];

  // In a real app, you'd want to use environment variables
  // If you don't have a real API key, we'll mock the response
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

  // Format YouTube duration string (PT1H30M15S) to readable format (1:30:15)
  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "Unknown";
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  const getCacheKey = () => {
    return `${region}-${activeTab}-${timeRange}`;
  };

  const isCacheValid = (cachedData: CachedData) => {
    return Date.now() - cachedData.timestamp < CACHE_DURATION;
  };

  const fetchMostViewedVideos = async (nextPageToken?: string) => {
    if (!nextPageToken) {
      setLoading(true);
      setError(null);
    } else {
      setLoadingMore(true);
    }

    try {
      const cacheKey = getCacheKey();
      
      // Check cache first if it's the initial load
      if (!nextPageToken && cache[region]?.[activeTab]) {
        const cachedData = cache[region][activeTab];
        if (cachedData && isCacheValid(cachedData)) {
          setVideos(cachedData.videos);
          setPageInfo(cachedData.pageInfo);
          setLoading(false);
          return;
        }
      }

      // If no YouTube API key is provided, use mocked data
      if (!YOUTUBE_API_KEY) {
        await mockYoutubeData(nextPageToken);
        return;
      }

      // First get video IDs from search
      const searchParams = {
        part: 'snippet',
        maxResults: PAGE_SIZE,
        pageToken: nextPageToken,
        key: YOUTUBE_API_KEY,
        type: 'video',
        order: 'viewCount',
        videoDuration: activeTab === 'long' ? 'long' : 'short',
        regionCode: region !== 'global' ? region : undefined,
        publishedAfter: timeRanges.find(range => range.value === timeRange)?.date || '1970-01-01T00:00:00Z',
        fields: 'items(id),nextPageToken'
      };

      const searchResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, { params: searchParams });
      
      if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
        setVideos([]);
        setError("No videos found. Try changing the region or category.");
        setLoading(false);
        setLoadingMore(false);
        return;
      }
      
      const videoIds = searchResponse.data.items.map((item: any) => item.id.videoId).join(',');

      // Then get full video details
      const videoParams = {
        part: 'snippet,statistics,contentDetails',
        id: videoIds,
        key: YOUTUBE_API_KEY,
        regionCode: region !== 'global' ? region : undefined
      };

      const videoResponse = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, { params: videoParams });
      
      if (!videoResponse.data.items) {
        throw new Error('Invalid response from YouTube API');
      }

      const newVideos: MostViewedVideo[] = videoResponse.data.items.map((item: any) => {
        const rawViewCount = parseInt(item.statistics.viewCount || '0', 10);
        return {
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          viewCount: new Intl.NumberFormat('en', { notation: 'compact' }).format(rawViewCount),
          rawViewCount: rawViewCount,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          thumbnailUrl: item.snippet.thumbnails.medium.url,
          videoId: item.id,
          duration: formatDuration(item.contentDetails.duration)
        };
      });

      // Sort by view count (highest first)
      newVideos.sort((a, b) => b.rawViewCount - a.rawViewCount);

      const updatedVideos = nextPageToken ? [...videos, ...newVideos] : newVideos;

      // Update state
      setVideos(updatedVideos);
      setPageInfo({
        nextPageToken: searchResponse.data.nextPageToken,
        totalResults: updatedVideos.length
      });

      // Update cache only for initial load
      if (!nextPageToken) {
        setCache(prevCache => ({
          ...prevCache,
          [region]: {
            ...prevCache[region],
            [activeTab]: {
              videos: updatedVideos,
              pageInfo: {
                nextPageToken: searchResponse.data.nextPageToken,
                totalResults: updatedVideos.length
              },
              timestamp: Date.now(),
              activeTab,
              timeRange
            }
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      setError("Failed to fetch videos. Please try again later.");
      toast.error("Failed to fetch YouTube videos");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Mock function for when API key is not available
  const mockYoutubeData = async (nextPageToken?: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

    const mockVideos: MostViewedVideo[] = [];
          const categories = {
      all: 'Popular',
      long: 'Documentary',
      shorts: 'Short'
    };
    
          // Generate 15 mock videos
    for (let i = 0; i < 15; i++) {
      const viewCount = Math.floor(Math.random() * 1000000000) + 100000000; // Much higher view counts for all-time
      mockVideos.push({
        title: `${categories[activeTab]} Video ${nextPageToken ? parseInt(nextPageToken) + i : i + 1} - ${region}`,
        channelTitle: `Channel ${i + 1}`,
        viewCount: new Intl.NumberFormat('en', { notation: 'compact' }).format(viewCount),
        rawViewCount: viewCount,
        publishedAt: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        thumbnailUrl: `/api/placeholder/320/180?text=YouTube+${i}`,
        videoId: `mock-id-${Date.now()}-${i}`,
        duration: activeTab === 'shorts' ? '0:30' : '10:15'
      });
    }

    // Sort by view count
    mockVideos.sort((a, b) => b.rawViewCount - a.rawViewCount);

    const updatedVideos = nextPageToken ? [...videos, ...mockVideos] : mockVideos;
    const mockNextPageToken = nextPageToken ? String(parseInt(nextPageToken) + 15) : '15';
    
    setVideos(updatedVideos);
    setPageInfo({
      nextPageToken: updatedVideos.length < MAX_RESULTS ? mockNextPageToken : undefined,
      totalResults: updatedVideos.length
    });

    // Update mock cache
    if (!nextPageToken) {
      setCache(prevCache => ({
        ...prevCache,
        [region]: {
          ...prevCache[region],
          [activeTab]: {
            videos: updatedVideos,
            pageInfo: {
              nextPageToken: mockNextPageToken,
              totalResults: updatedVideos.length
            },
            timestamp: Date.now(),
            activeTab,
            timeRange
          }
        }
      }));
    }
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
  };

  const handleTabChange = (tab: 'long' | 'shorts') => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetchMostViewedVideos();
  }, [region, activeTab, timeRange]);

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">⚠️ Testing Mode: This component is currently in testing mode. The data shown may not reflect actual YouTube statistics.</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-bold">YouTube Most Viewed Videos (All-Time)</h2>
          </div>
        </div>

        <div className="grid w-full gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'long' ? 'default' : 'outline'}
                onClick={() => handleTabChange('long')}
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                Long Videos ({'>'}2 min)
              </Button>
              <Button
                variant={activeTab === 'shorts' ? 'default' : 'outline'}
                onClick={() => handleTabChange('shorts')}
                className="flex items-center gap-1"
              >
                <BarChart2 className="h-4 w-4" />
                Short Videos ({'<'}2 min)
              </Button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Time Range</Label>
                <Select value={timeRange} onValueChange={(value) => {
                  setTimeRange(value);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="region-select">Select Region</Label>
                <Select value={region} onValueChange={handleRegionChange}>
                  <SelectTrigger id="region-select" className="w-full sm:w-48">
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p>Loading most viewed videos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error}</p>
                <Button 
                  onClick={() => fetchMostViewedVideos()} 
                  className="mt-4"
                  variant="outline"
                >
                  Try Again
                </Button>
              </div>
            ) : videos.length > 0 ? (
              <>
                <div className="grid gap-4">
                  {videos.map((video) => (
                    <div
                      key={video.videoId}
                      className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full sm:w-40 h-24 object-cover rounded"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 flex-grow">
                        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.channelTitle}</p>
                        <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                          <span className="font-medium">{video.viewCount} views</span>
                          <span>•</span>
                          <span>{video.publishedAt}</span>
                        </div>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 w-fit"
                        >
                          <Share2 className="h-4 w-4" />
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                {pageInfo.nextPageToken && pageInfo.totalResults < MAX_RESULTS && (
                  <Button
                    onClick={() => fetchMostViewedVideos(pageInfo.nextPageToken)}
                    disabled={loadingMore}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading more...
                      </>
                    ) : (
                      "Load More Videos"
                    )}
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Globe className="mx-auto h-12 w-12 mb-2" />
                <p>No videos found for the selected criteria</p>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Videos are sorted by all-time view count in the selected region.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YoutubeMostViewedVideos;