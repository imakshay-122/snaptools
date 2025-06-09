import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

const YoutubeVideoDownloader: React.FC = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("720p");
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/?\w+\/)|(\/embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleDownload = async () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      // Note: This is a placeholder for the actual download implementation
      // In a real implementation, you would need to:
      // 1. Set up a backend service to handle YouTube downloads
      // 2. Use a library like youtube-dl or similar
      // 3. Handle the download through your backend API
      toast.info("This is a demo version. Backend implementation required for actual downloads.");
    } catch (error) {
      toast.error("Failed to download video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid w-full gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="url">YouTube Video URL</Label>
            <Input
              id="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4 (Video)</SelectItem>
                  <SelectItem value="mp3">MP3 (Audio)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Quality</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1080p">1080p</SelectItem>
                  <SelectItem value="720p">720p</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="360p">360p</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            disabled={!url || loading}
            className="w-full"
          >
            {loading ? "Processing..." : "Download Video"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Note: This is a demo version. Please ensure you comply with YouTube's terms of service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YoutubeVideoDownloader;