import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideoMetadata {
  tags: string[];
  title: string;
  description: string;
}

export async function getVideoMetadata(videoId: string): Promise<YouTubeVideoMetadata> {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key is not configured');
  }

  try {
    const response = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
      params: {
        part: 'snippet',
        id: videoId,
        key: YOUTUBE_API_KEY
      }
    });

    const video = response.data.items[0];
    if (!video) {
      throw new Error('Video not found');
    }

    return {
      tags: video.snippet.tags || [],
      title: video.snippet.title,
      description: video.snippet.description
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('Invalid or expired YouTube API key');
      }
      throw new Error(`YouTube API error: ${error.response?.data?.error?.message || error.message}`);
    }
    throw error;
  }
}