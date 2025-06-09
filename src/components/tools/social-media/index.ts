import TweetGenerator from './TweetGenerator';
import InstagramPost from './InstagramPostGenerator';
import InstagramDownloader from './instagram-downloader';
import YoutubeThumbnailDownloader from './YoutubeThumbnailDownloader';
import YoutubeVideoDownloader from './YoutubeVideoDownloader';
import YoutubeTrendingVideos from './YoutubeTrendingVideos';
import YoutubeTagsExtractor from './YoutubeTagsExtractor';
import YoutubeMostViewedVideos from './YoutubeMostViewedVideos';
import YoutubeStats from './YoutubeStats';

const socialMediaTools = {
  'tweet-generator': TweetGenerator,
  'instagram-post': InstagramPost,
  'instagram-downloader' : InstagramDownloader,
  'yt-thumbnail': YoutubeThumbnailDownloader,
  'yt-video': YoutubeVideoDownloader,
  'yt-trending': YoutubeTrendingVideos,
  'yt-tags': YoutubeTagsExtractor,
  'yt-most-viewed': YoutubeMostViewedVideos,
  'youtube-stats': YoutubeStats
};

export default socialMediaTools;