import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function MetaTagGenerator() {
  const [metaData, setMetaData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    viewport: 'width=device-width, initial-scale=1.0',
    robots: 'index, follow',
    canonical: '',
    language: 'en',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    twitterCard: 'summary_large_image',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    jsonLd: {
      type: 'WebPage',
      name: '',
      description: '',
      url: '',
      image: ''
    }
  });

  const [seoScore, setSeoScore] = useState(0);
  const [seoWarnings, setSeoWarnings] = useState<string[]>([]);

  useEffect(() => {
    calculateSeoScore();
  }, [metaData]);

  const calculateSeoScore = () => {
    let score = 0;
    const warnings: string[] = [];

    // Title checks
    if (metaData.title) {
      score += 15;
      if (metaData.title.length < 30 || metaData.title.length > 60) {
        warnings.push('Title length should be between 30-60 characters');
      }
    } else {
      warnings.push('Title is missing');
    }

    // Description checks
    if (metaData.description) {
      score += 15;
      if (metaData.description.length < 120 || metaData.description.length > 160) {
        warnings.push('Description length should be between 120-160 characters');
      }
    } else {
      warnings.push('Description is missing');
    }

    // Keywords check
    if (metaData.keywords) score += 10;

    // Canonical URL check
    if (metaData.canonical) score += 10;

    // Open Graph checks
    if (metaData.ogTitle && metaData.ogDescription && metaData.ogImage) score += 15;

    // Twitter Card checks
    if (metaData.twitterTitle && metaData.twitterDescription && metaData.twitterImage) score += 15;

    // JSON-LD check
    if (metaData.jsonLd.name && metaData.jsonLd.description) score += 20;

    setSeoScore(score);
    setSeoWarnings(warnings);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetaData(prev => ({ ...prev, [name]: value }));
  };

  const generateMetaTags = () => {
    const tags = [
      `<meta charset="UTF-8">`,
      `<meta name="viewport" content="${metaData.viewport}">`,
      metaData.title && `<meta name="title" content="${metaData.title}">`,
      metaData.description && `<meta name="description" content="${metaData.description}">`,
      metaData.keywords && `<meta name="keywords" content="${metaData.keywords}">`,
      metaData.author && `<meta name="author" content="${metaData.author}">`,
      metaData.robots && `<meta name="robots" content="${metaData.robots}">`,
      metaData.canonical && `<link rel="canonical" href="${metaData.canonical}">`,
      metaData.language && `<meta http-equiv="content-language" content="${metaData.language}">`,
      // Open Graph tags
      metaData.ogTitle && `<meta property="og:title" content="${metaData.ogTitle}">`,
      metaData.ogDescription && `<meta property="og:description" content="${metaData.ogDescription}">`,
      metaData.ogImage && `<meta property="og:image" content="${metaData.ogImage}">`,
      metaData.ogUrl && `<meta property="og:url" content="${metaData.ogUrl}">`,
      `<meta property="og:type" content="website">`,
      // Twitter Card tags
      `<meta name="twitter:card" content="${metaData.twitterCard}">`,
      metaData.twitterTitle && `<meta name="twitter:title" content="${metaData.twitterTitle}">`,
      metaData.twitterDescription && `<meta name="twitter:description" content="${metaData.twitterDescription}">`,
      metaData.twitterImage && `<meta name="twitter:image" content="${metaData.twitterImage}">`,
      // JSON-LD structured data
      `<script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": metaData.jsonLd.type,
        "name": metaData.jsonLd.name || metaData.title,
        "description": metaData.jsonLd.description || metaData.description,
        "url": metaData.jsonLd.url || metaData.canonical,
        "image": metaData.jsonLd.image || metaData.ogImage
      }, null, 2)}
      </script>`
    ].filter(Boolean).join('\n');

    return tags;
  };

  const copyToClipboard = () => {
    const tags = generateMetaTags();
    navigator.clipboard.writeText(tags);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Meta Tag Generator</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            SEO Score: {seoScore}%
          </div>
          <Progress value={seoScore} className="w-[100px]" />
        </div>
      </div>

      {seoWarnings.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {seoWarnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Meta Tags</TabsTrigger>
          <TabsTrigger value="opengraph">Open Graph</TabsTrigger>
          <TabsTrigger value="twitter">Twitter Cards</TabsTrigger>
          <TabsTrigger value="advanced">Advanced SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={metaData.title}
                  onChange={handleInputChange}
                  placeholder="Enter page title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={metaData.description}
                  onChange={handleInputChange}
                  placeholder="Enter page description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  value={metaData.keywords}
                  onChange={handleInputChange}
                  placeholder="Enter keywords, separated by commas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={metaData.author}
                  onChange={handleInputChange}
                  placeholder="Enter author name"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="opengraph" className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="ogTitle">OG Title</Label>
                <Input
                  id="ogTitle"
                  name="ogTitle"
                  value={metaData.ogTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Open Graph title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogDescription">OG Description</Label>
                <Textarea
                  id="ogDescription"
                  name="ogDescription"
                  value={metaData.ogDescription}
                  onChange={handleInputChange}
                  placeholder="Enter Open Graph description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">OG Image URL</Label>
                <Input
                  id="ogImage"
                  name="ogImage"
                  value={metaData.ogImage}
                  onChange={handleInputChange}
                  placeholder="Enter Open Graph image URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogUrl">OG URL</Label>
                <Input
                  id="ogUrl"
                  name="ogUrl"
                  value={metaData.ogUrl}
                  onChange={handleInputChange}
                  placeholder="Enter Open Graph URL"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="twitter" className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitterTitle">Twitter Title</Label>
                <Input
                  id="twitterTitle"
                  name="twitterTitle"
                  value={metaData.twitterTitle}
                  onChange={handleInputChange}
                  placeholder="Enter Twitter Card title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterDescription">Twitter Description</Label>
                <Textarea
                  id="twitterDescription"
                  name="twitterDescription"
                  value={metaData.twitterDescription}
                  onChange={handleInputChange}
                  placeholder="Enter Twitter Card description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterImage">Twitter Image URL</Label>
                <Input
                  id="twitterImage"
                  name="twitterImage"
                  value={metaData.twitterImage}
                  onChange={handleInputChange}
                  placeholder="Enter Twitter Card image URL"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card className="p-4 space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="canonical">Canonical URL</Label>
                <Input
                  id="canonical"
                  name="canonical"
                  value={metaData.canonical}
                  onChange={handleInputChange}
                  placeholder="Enter canonical URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Content Language</Label>
                <Select value={metaData.language} onValueChange={(value) => setMetaData(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>JSON-LD Type</Label>
                <Select 
                  value={metaData.jsonLd.type} 
                  onValueChange={(value) => setMetaData(prev => ({ 
                    ...prev, 
                    jsonLd: { ...prev.jsonLd, type: value }
                  }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schema type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WebPage">Web Page</SelectItem>
                    <SelectItem value="Article">Article</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Organization">Organization</SelectItem>
                    <SelectItem value="LocalBusiness">Local Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jsonLdName">Schema Name</Label>
                <Input
                  id="jsonLdName"
                  value={metaData.jsonLd.name}
                  onChange={(e) => setMetaData(prev => ({
                    ...prev,
                    jsonLd: { ...prev.jsonLd, name: e.target.value }
                  }))}
                  placeholder="Enter schema name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jsonLdDescription">Schema Description</Label>
                <Textarea
                  id="jsonLdDescription"
                  value={metaData.jsonLd.description}
                  onChange={(e) => setMetaData(prev => ({
                    ...prev,
                    jsonLd: { ...prev.jsonLd, description: e.target.value }
                  }))}
                  placeholder="Enter schema description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jsonLdUrl">Schema URL</Label>
                <Input
                  id="jsonLdUrl"
                  value={metaData.jsonLd.url}
                  onChange={(e) => setMetaData(prev => ({
                    ...prev,
                    jsonLd: { ...prev.jsonLd, url: e.target.value }
                  }))}
                  placeholder="Enter schema URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jsonLdImage">Schema Image URL</Label>
                <Input
                  id="jsonLdImage"
                  value={metaData.jsonLd.image}
                  onChange={(e) => setMetaData(prev => ({
                    ...prev,
                    jsonLd: { ...prev.jsonLd, image: e.target.value }
                  }))}
                  placeholder="Enter schema image URL"
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Generated Meta Tags</h2>
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
          </div>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <pre className="whitespace-pre-wrap break-all">
              {generateMetaTags()}
            </pre>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
}