import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Channel {
  title: string;
  subscriberCount: string;
  viewCount: string;
  thumbnailUrl: string;
  country?: string;
}

const YoutubeStats: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('global');

  const countries = [
    { code: 'global', name: 'Global' },
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'BR', name: 'Brazil' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'JP', name: 'Japan' },
  ];

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      try {
        // Note: Replace YOUR_API_KEY with actual YouTube Data API key
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&type=channel&regionCode=${
            selectedCountry === 'global' ? '' : selectedCountry
          }&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );

        const channelIds = response.data.items.map((item: any) => item.snippet.channelId).join(',');

        const channelResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );

        const channelData = channelResponse.data.items.map((channel: any) => ({
          title: channel.snippet.title,
          subscriberCount: Number(channel.statistics.subscriberCount).toLocaleString(),
          viewCount: Number(channel.statistics.viewCount).toLocaleString(),
          thumbnailUrl: channel.snippet.thumbnails.default.url,
          country: channel.snippet.country,
        }));

        // Sort by subscriber count
        channelData.sort((a: Channel, b: Channel) => 
          Number(b.subscriberCount.replace(/,/g, '')) - Number(a.subscriberCount.replace(/,/g, ''))
        );

        setChannels(channelData);
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
      }
      setLoading(false);
    };

    fetchChannels();
  }, [selectedCountry]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Most Subscribed YouTube Channels</h2>

      <div className="w-[200px]">
        <Label>Select Country</Label>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {channels.map((channel, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={channel.thumbnailUrl}
                    alt={channel.title}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate" title={channel.title}>
                      {index + 1}. {channel.title}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Subscribers: {channel.subscriberCount}</p>
                  <p>Total Views: {channel.viewCount}</p>
                  {channel.country && <p>Country: {channel.country}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default YoutubeStats;