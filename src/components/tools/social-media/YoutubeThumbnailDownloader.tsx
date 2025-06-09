import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const YoutubeThumbnailDownloader: React.FC = () => {
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [quality, setQuality] = useState("maxres");

  const qualities = {
    maxres: { label: "Maximum Resolution", suffix: "maxresdefault" },
    hq: { label: "High Quality", suffix: "hqdefault" },
    mq: { label: "Medium Quality", suffix: "mqdefault" },
    sd: { label: "Standard Quality", suffix: "default" }
  };

  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/?\w+\/)|(\/embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleDownload = () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    const selectedQuality = qualities[quality];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${selectedQuality.suffix}.jpg`;

    fetch(thumbnailUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${selectedQuality.label} thumbnail`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `youtube-thumbnail-${videoId}-${quality}.jpg`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        toast.success(`${selectedQuality.label} thumbnail downloaded successfully!`);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to download thumbnail");
        if (quality === "maxres") {
          setQuality("hq");
          handleDownload();
        }
      });
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

          {thumbnailUrl && (
            <div className="flex flex-col gap-2">
              <Label>Preview</Label>
              <img
                src={thumbnailUrl}
                alt="YouTube Thumbnail"
                className="w-full rounded-lg"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label>Thumbnail Quality</Label>
            <Select value={quality} onValueChange={setQuality}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(qualities).map(([key, { label }]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleDownload}
            disabled={!url}
            className="w-full"
          >
            Download Thumbnail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default YoutubeThumbnailDownloader;