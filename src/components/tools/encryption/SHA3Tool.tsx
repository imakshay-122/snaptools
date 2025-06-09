import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import CryptoJS from 'crypto-js';

const SHA3Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [outputSize, setOutputSize] = useState('256');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleHash = () => {
    try {
      if (!input) {
        toast({
          title: 'Error',
          description: 'Please enter a value to hash',
          variant: 'destructive',
        });
        return;
      }

      let hashedValue: string;
      switch (outputSize) {
        case '224':
          hashedValue = CryptoJS.SHA3(input, { outputLength: 224 }).toString();
          break;
        case '256':
          hashedValue = CryptoJS.SHA3(input, { outputLength: 256 }).toString();
          break;
        case '384':
          hashedValue = CryptoJS.SHA3(input, { outputLength: 384 }).toString();
          break;
        case '512':
          hashedValue = CryptoJS.SHA3(input, { outputLength: 512 }).toString();
          break;
        default:
          hashedValue = CryptoJS.SHA3(input).toString();
      }

      setOutput(hashedValue);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to hash the input',
        variant: 'destructive',
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: 'Success',
      description: 'Hash copied to clipboard',
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Input
              placeholder="Enter text to hash"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Output Size (bits)</Label>
            <Select value={outputSize} onValueChange={setOutputSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select output size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="224">224</SelectItem>
                <SelectItem value="256">256</SelectItem>
                <SelectItem value="384">384</SelectItem>
                <SelectItem value="512">512</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleHash} className="w-full">
            Generate Hash
          </Button>

          {output && (
            <div className="space-y-2">
              <Label>Hash Output</Label>
              <div className="relative">
                <Input value={output} readOnly />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SHA3Tool;