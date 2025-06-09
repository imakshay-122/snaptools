import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

interface InstagramResponse {
  graphql?: {
    shortcode_media?: {
      display_url: string;
    };
  };
}

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

router.get('/photo/:mediaId', async (req, res) => {
  try {
    const { mediaId } = req.params;

    // Fetch the media data from Instagram
    const response = await fetch(`https://www.instagram.com/p/${mediaId}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch photo data');
    }

    const html = await response.text();
    const match = html.match(/"display_url":"([^"]+)"/); 
    const imageUrl = match ? match[1].replace(/\\u0026/g, '&') : null;

    if (!imageUrl) {
      throw new Error('Photo not found');
    }

    // Fetch the actual image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image');
    }

    // Forward the image data and headers with proper caching controls
    const contentType = imageResponse.headers.get('content-type');
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error('Invalid content type received from Instagram');
    }
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    // Stream the image data with error handling
    await new Promise((resolve, reject) => {
      imageResponse.body.pipe(res)
        .on('finish', resolve)
        .on('error', reject);
    });

  } catch (error) {
    console.error('Instagram API error:', error);
    res.status(500).json({ error: 'Failed to fetch Instagram photo' });
  }
});

export default router;