import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Instagram } from 'lucide-react';

const InstagramDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleDownload = async () => {
    if (!url) {
      toast.error('Please enter an Instagram photo URL');
      return;
    }

    if (!url.includes('instagram.com')) {
      toast.error('Please enter a valid Instagram URL');
      return;
    }

    setLoading(true);

    try {
      // Extract the media ID from the URL
      const mediaId = url.split('/p/')[1]?.split('/')[0];
      if (!mediaId) {
        throw new Error('Invalid Instagram URL');
      }

      // Fetch the media data through our proxy server
      const response = await fetch(`/api/instagram/photo/${mediaId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch photo data: ${response.status} ${response.statusText}`);
      }

      // Check content type before creating blob
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('Invalid content type received from server');
      }

      // Validate and create blob from the response
      const blob = await response.blob();
      
      // Verify the blob is valid
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }
      
      const imageUrl = URL.createObjectURL(blob);
      setPreviewUrl(imageUrl);

      // Create a temporary link to download the image
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `instagram-photo-${Date.now()}.${contentType.split('/')[1] || 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Photo downloaded successfully!');
    } catch (error) {
      console.error('Error downloading photo:', error);
      toast.error('Failed to download photo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Instagram className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Instagram Photo Downloader</h2>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Instagram Photo URL</label>
        <Input
          placeholder="https://www.instagram.com/p/...."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      {previewUrl && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
          <img src={previewUrl} alt="Instagram preview" className="w-full h-full object-cover" />
        </div>
      )}

      <Button
        className="w-full"
        onClick={handleDownload}
        disabled={!url || loading}
      >
        {loading ? 'Downloading...' : 'Download Photo'}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Enter the URL of an Instagram photo to download it
      </p>
    </Card>
  );
};

export default InstagramDownloader;