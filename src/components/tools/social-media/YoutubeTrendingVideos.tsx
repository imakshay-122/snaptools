import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { TrendingUp, Share2 } from "lucide-react";
import axios from "axios";

interface TrendingVideo {
  title: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoId: string;
}

interface PageToken {
  nextPageToken?: string;
  totalResults: number;
}

interface CachedData {
  videos: TrendingVideo[];
  timestamp: number;
}

const YoutubeTrendingVideos: React.FC = () => {
  const [region, setRegion] = useState("US");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<TrendingVideo[]>([]);
  const [cache, setCache] = useState<Record<string, CachedData>>({});
  const [pageToken, setPageToken] = useState<PageToken>({ totalResults: 0 });
  const [loadingMore, setLoadingMore] = useState(false);
  const MAX_RESULTS = 500;

  const regions = [
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "KR", label: "South Korea" },
    { value: "IN", label: "India" },
    { value: "BR", label: "Brazil" },
    { value: "RU", label: "Russia" },
  ];

  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  const isCacheValid = (cachedData: CachedData) => {
    return Date.now() - cachedData.timestamp < CACHE_DURATION;
  };

  const fetchTrendingVideos = async (nextPageToken?: string) => {
    if (!nextPageToken) {
      setLoading(true);
      setVideos([]);
    } else {
      setLoadingMore(true);
    }

    try {
      // Check cache first if it's the initial load
      if (!nextPageToken) {
        const cachedData = cache[region];
        if (cachedData && isCacheValid(cachedData)) {
          setVideos(cachedData.videos);
          setPageToken({ totalResults: cachedData.videos.length });
          setLoading(false);
          return;
        }
      }

      if (!YOUTUBE_API_KEY) {
        throw new Error('YouTube API key is not configured');
      }

      const response = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          regionCode: region,
          maxResults: 50,
          pageToken: nextPageToken,
          key: YOUTUBE_API_KEY
        }
      });

      const newVideos: TrendingVideo[] = response.data.items.map(item => ({
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        viewCount: new Intl.NumberFormat('en', { notation: 'compact' }).format(Number(item.statistics.viewCount)),
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        thumbnailUrl: item.snippet.thumbnails.medium.url,
        videoId: item.id
      }));

      const updatedVideos = nextPageToken ? [...videos, ...newVideos] : newVideos;

      // Update state
      setVideos(updatedVideos);
      setPageToken({
        nextPageToken: response.data.nextPageToken,
        totalResults: updatedVideos.length
      });

      // Update cache only for initial load
      if (!nextPageToken) {
        setCache(prevCache => ({
          ...prevCache,
          [region]: {
            videos: updatedVideos,
            timestamp: Date.now()
          }
        }));
      }
    } catch (error) {
      toast.error("Failed to fetch trending videos");
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    fetchTrendingVideos();
  };

  // Fetch videos when region changes
  useEffect(() => {
    fetchTrendingVideos();
  }, [region]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid w-full gap-6">
          <div className="flex flex-col gap-2">
            <Label>Select Region</Label>
            <Select value={region} onValueChange={handleRegionChange}>
              <SelectTrigger>
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

          <div className="grid gap-4">
            {loading ? (
              <div className="text-center py-8">Loading trending videos...</div>
            ) : videos.length > 0 ? (
              <>
                {videos.map((video) => (
                <div
                  key={video.videoId}
                  className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-40 h-24 object-cover rounded"
                  />
                  <div className="flex flex-col gap-1 flex-grow">
                    <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.channelTitle}</p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{video.viewCount} views</span>
                      <span>·</span>
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
                {pageToken.nextPageToken && pageToken.totalResults < MAX_RESULTS && (
                  <Button
                    onClick={() => fetchTrendingVideos(pageToken.nextPageToken)}
                    disabled={loadingMore}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    {loadingMore ? "Loading more..." : "Load More Videos"}
                  </Button>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="mx-auto h-12 w-12 mb-2" />
                <p>Select a region to see trending videos</p>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Note: PLease Select the Country Properly to get the Trending Videos of That Country.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YoutubeTrendingVideos;