'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import AnimatedElement from '@/components/animated-element';

interface SharedFile {
  name: string;
  size: number;
  url: string;
}

const ShareFileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fileData, setFileData] = useState<SharedFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedFile = async () => {
      try {
        // In a real application, this would make an API call to fetch file data
        // For now, we'll simulate an error since the backend is not implemented
        setError('This shared file is not available. The file sharing backend has not been implemented yet.');
      } catch (err) {
        setError('Failed to load shared file');
      } finally {
        setLoading(false);
      }
    };

    fetchSharedFile();
  }, [id]);

  if (loading) {
    return (
      <AnimatedElement>
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-6 text-center">
            <p>Loading shared file...</p>
          </CardContent>
        </Card>
      </AnimatedElement>
    );
  }

  if (error) {
    return (
      <AnimatedElement>
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>File Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>{error}</p>
          </CardContent>
        </Card>
      </AnimatedElement>
    );
  }

  return (
    <AnimatedElement>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Download Shared File</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fileData && (
            <>
              <div className="p-4 rounded-lg bg-muted">
                <p className="font-medium mb-1">File Details</p>
                <p className="text-sm text-muted-foreground">
                  {fileData.name} ({(fileData.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => window.location.href = fileData.url}
              >
                <Download className="mr-2 h-4 w-4" />
                Download File
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default ShareFileView;