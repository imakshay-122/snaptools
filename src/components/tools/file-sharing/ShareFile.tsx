'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { Upload, Copy, QrCode } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { QRCodeSVG } from 'qrcode.react';
import AnimatedElement from '@/components/animated-element';

interface FileInfo {
  file: File;
  shareLink: string;
  qrCode: string;
}

const FileSharer: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);

    try {
      // Generate a unique identifier for the file
      const uniqueId = Math.random().toString(36).substring(2, 15);
      const shareLink = `${window.location.origin}/share/${uniqueId}`;

      // In a real application, you would upload the file to a server here
      // For demo purposes, we'll just create a local URL
      setFileInfo({
        file,
        shareLink,
        qrCode: shareLink
      });

      toast.success('File ready to share!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to prepare file for sharing');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <AnimatedElement>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Share File</CardTitle>
          <CardDescription>
            Upload a file to share it with anyone through a unique link or QR code
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
          >
            <input {...getInputProps()} />
            <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
            {isUploading ? (
              <p>Preparing file...</p>
            ) : isDragActive ? (
              <p>Drop the file here</p>
            ) : (
              <div className="space-y-2">
                <p>Drag & drop a file here, or click to select</p>
                <p className="text-sm text-muted-foreground">
                  Maximum file size: 100MB
                </p>
              </div>
            )}
          </div>

          {fileInfo && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="font-medium mb-1">File Details</p>
                <p className="text-sm text-muted-foreground">
                  {fileInfo.file.name} ({(fileInfo.file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-medium">Share Link</p>
                <div className="flex gap-2">
                  <Input
                    value={fileInfo.shareLink}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(fileInfo.shareLink)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium">QR Code</p>
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <QRCodeSVG
                    value={fileInfo.qrCode}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default FileSharer;