import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tag, Copy } from "lucide-react";
import { getVideoMetadata } from "@/lib/api/youtube";

const YoutubeTagsExtractor: React.FC = () => {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/\w+\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleExtractTags = async () => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      toast.error("Invalid YouTube URL");
      return;
    }

    setLoading(true);
    try {
      const { tags } = await getVideoMetadata(videoId);
      if (tags.length === 0) {
        toast.info("No tags found for this video");
        return;
      }
      setTags(tags);
      toast.success("Tags extracted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to extract tags");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTags = () => {
    if (tags.length === 0) return;
    navigator.clipboard.writeText(tags.join(", "));
    toast.success("Tags copied to clipboard");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid w-full gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="video-url">YouTube Video URL</Label>
            <Input
              id="video-url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <Button
            onClick={handleExtractTags}
            disabled={!url || loading}
            className="w-full"
          >
            {loading ? (
              "Extracting..."
            ) : (
              <>
                <Tag className="mr-2 h-4 w-4" />
                Extract Tags
              </>
            )}
          </Button>

          {tags.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Extracted Tags</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyTags}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground text-center">
            Note: Data is fetched from Google API and may not always be accurate. Please ensure you comply with YouTube's terms of service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YoutubeTagsExtractor;