import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type EncodingType = 'url' | 'html';

const EncodingTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [encodingType, setEncodingType] = useState<EncodingType>('url');
  const { toast } = useToast();

  const encode = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to encode'
        });
        return;
      }

      let encoded: string;
      if (encodingType === 'url') {
        encoded = encodeURIComponent(input);
      } else {
        const div = document.createElement('div');
        div.textContent = input;
        encoded = div.innerHTML;
      }

      setOutput(encoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Encoding Error',
        description: `Failed to ${encodingType.toUpperCase()} encode text`
      });
    }
  };

  const decode = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to decode'
        });
        return;
      }

      let decoded: string;
      if (encodingType === 'url') {
        decoded = decodeURIComponent(input);
      } else {
        const div = document.createElement('div');
        div.innerHTML = input;
        decoded = div.textContent || '';
      }

      setOutput(decoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Decoding Error',
        description: `Failed to ${encodingType.toUpperCase()} decode text`
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Text copied to clipboard'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Failed to copy text to clipboard'
      });
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Paste Failed',
        description: 'Failed to paste text from clipboard'
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Encoding Type Selection */}
          <div className="space-y-2">
            <Label>Encoding Type</Label>
            <Select
              value={encodingType}
              onValueChange={(value: EncodingType) => setEncodingType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select encoding type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="url">URL Encoding</SelectItem>
                <SelectItem value="html">HTML Encoding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder={`Enter text to ${encodingType.toUpperCase()} encode/decode`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[100px]"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={pasteFromClipboard}
                title="Paste from clipboard"
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={encode} className="flex-1">
              Encode
            </Button>
            <Button onClick={decode} className="flex-1">
              Decode
            </Button>
          </div>

          {/* Output Section */}
          {output && (
            <div className="space-y-2">
              <Label>Output</Label>
              <div className="flex gap-2">
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[100px]"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(output)}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EncodingTool;