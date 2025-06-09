import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const HTMLEncodeTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const encodeHTML = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to encode'
        });
        return;
      }
      const encoded = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      setOutput(encoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Encoding Error',
        description: 'Failed to encode text'
      });
    }
  };

  const decodeHTML = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to decode'
        });
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.innerHTML = input;
      const decoded = textarea.value;
      setOutput(decoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Decoding Error',
        description: 'Failed to decode text. Please check your input.'
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
        <div className="mb-6 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">HTML Encoder/Decoder</h2>
          <p>
            HTML encoding converts special characters into their HTML entity equivalents,
            making text safe for display in web pages and preventing XSS (Cross-Site Scripting) attacks.
          </p>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">When to use:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Displaying user-generated content safely on web pages</li>
              <li>Preventing XSS attacks in web applications</li>
              <li>Ensuring special characters render correctly in HTML</li>
              <li>Processing text that contains HTML markup characters</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">Common examples:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>{"<"} becomes {"&lt;"}</li>
              <li>{">"} becomes {"&gt;"}</li>
              <li>{"&"} becomes {"&amp;"}</li>
              <li>{'"'} becomes {"&quot;"}</li>
              <li>{"'"} becomes {"&#039;"}</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          {/* Input Section */}
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

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={encodeHTML} className="flex-1">
              HTML Encode
            </Button>
            <Button onClick={decodeHTML} className="flex-1">
              HTML Decode
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

export default HTMLEncodeTool;