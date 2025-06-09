import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Encoding Error',
        description: 'Please enter valid text to encode'
      });
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Decoding Error',
        description: 'Please enter valid base64 encoded text'
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Base64 Encoding Tool</h2>
          <p className="mb-2">Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-64 representation.</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✨ <strong>What is Base64?</strong> Base64 encoding converts binary data into a text format using 64 characters (A-Z, a-z, 0-9, + and /). It's commonly used when you need to transmit binary data over media designed to deal with text.</p>
            <p>🔐 <strong>Common Uses:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Encoding binary data in emails (MIME)</li>
              <li>Embedding image data in HTML/CSS</li>
              <li>Transmitting binary data in URLs</li>
              <li>Storing binary data in JSON</li>
            </ul>
            <p>📝 <strong>How to Use:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Enter your text in the input field</li>
              <li>Click Encode to convert to Base64 format</li>
              <li>Click Decode to convert Base64 back to original text</li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter text to encode/decode"
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

          <div className="flex gap-4 justify-center">
            <Button onClick={encode}>Encode to Base64</Button>
            <Button onClick={decode}>Decode from Base64</Button>
          </div>

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
        </div>
      </Card>
    </div>
  );
};

export default Base64Tool;