import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FileCorruptor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  const corruptFile = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    try {
      // Read the file as ArrayBuffer
      const buffer = await selectedFile.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);

      // Corrupt the file by modifying random bytes
      const corruptedArray = new Uint8Array(uint8Array);
      const numBytesToCorrupt = Math.floor(corruptedArray.length * 0.1); // Corrupt 10% of bytes

      for (let i = 0; i < numBytesToCorrupt; i++) {
        const randomIndex = Math.floor(Math.random() * corruptedArray.length);
        corruptedArray[randomIndex] = Math.floor(Math.random() * 256);
      }

      // Create and download the corrupted file
      const blob = new Blob([corruptedArray]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `corrupted_${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Reset the form
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSelectedFile(null);
    } catch (err) {
      setError('Failed to corrupt file. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="file">Select File to Corrupt</Label>
            <Input
              ref={fileInputRef}
              id="file"
              type="file"
              onChange={handleFileSelect}
              className="cursor-pointer"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={corruptFile}
            disabled={!selectedFile}
            className="w-full"
            variant="destructive"
          >
            Corrupt File
          </Button>

          <div className="text-sm text-gray-500">
            Note: This tool will create a corrupted copy of your file. The original file will remain unchanged.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCorruptor;