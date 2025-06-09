import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function OpenGraphPreview() {
  const [previewData, setPreviewData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    url: '',
    siteName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreviewData(prev => ({ ...prev, [name]: value }));
  };

  const SocialPreviewCard = ({ platform }: { platform: 'facebook' | 'twitter' | 'linkedin' }) => {
    const getCardStyle = () => {
      switch (platform) {
        case 'facebook':
          return 'bg-[#1877F2] text-white';
        case 'twitter':
          return 'bg-[#1DA1F2] text-white';
        case 'linkedin':
          return 'bg-[#0A66C2] text-white';
        default:
          return '';
      }
    };

    return (
      <div className="space-y-4">
        <div className={`rounded-t-lg p-2 ${getCardStyle()}`}>
          <h3 className="text-lg font-semibold capitalize">{platform}</h3>
        </div>
        <div className="border rounded-b-lg p-4 space-y-4">
          <div className="space-y-2">
            {previewData.imageUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={previewData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}
            <div className="space-y-1">
              {previewData.url && (
                <p className="text-sm text-gray-500 truncate">
                  {previewData.url.replace(/^https?:\/\//i, '')}
                </p>
              )}
              <h4 className="font-semibold line-clamp-2">
                {previewData.title || 'Your Title Will Appear Here'}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-3">
                {previewData.description || 'Your description will appear here. Make it compelling!'}
              </p>
              {previewData.siteName && (
                <p className="text-sm text-gray-500">{previewData.siteName}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Open Graph Preview</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={previewData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={previewData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={previewData.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                value={previewData.url}
                onChange={handleInputChange}
                placeholder="Enter URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                name="siteName"
                value={previewData.siteName}
                onChange={handleInputChange}
                placeholder="Enter site name"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Tabs defaultValue="facebook" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="facebook">Facebook</TabsTrigger>
              <TabsTrigger value="twitter">Twitter</TabsTrigger>
              <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            </TabsList>

            <TabsContent value="facebook">
              <SocialPreviewCard platform="facebook" />
            </TabsContent>

            <TabsContent value="twitter">
              <SocialPreviewCard platform="twitter" />
            </TabsContent>

            <TabsContent value="linkedin">
              <SocialPreviewCard platform="linkedin" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}