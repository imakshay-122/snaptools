import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Clipboard } from 'lucide-react';

const URLEncoderTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const encodeURL = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to encode'
        });
        return;
      }
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      toast({
        title: 'Success',
        description: 'Text encoded successfully'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Encoding Error',
        description: 'Failed to encode text'
      });
    }
  };

  const decodeURL = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to decode'
        });
        return;
      }
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast({
        title: 'Success',
        description: 'Text decoded successfully'
      });
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
      toast({
        title: 'Pasted!',
        description: 'Text pasted from clipboard'
      });
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
          <h2 className="text-xl font-semibold text-foreground">URL Encoder/Decoder</h2>
          <p>
            URL encoding is essential for ensuring special characters in URLs are properly transmitted over the internet.
            It converts special characters into a format that can be safely used in web addresses.
          </p>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">When to use:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Encoding query parameters in URLs</li>
              <li>Handling special characters in API requests</li>
              <li>Ensuring safe transmission of Unicode characters</li>
              <li>Processing form data with special characters</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">Common examples:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Space becomes "%20"</li>
              <li>"&" becomes "%26"</li>
              <li>"=" becomes "%3D"</li>
              <li>"?" becomes "%3F"</li>
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
            <Button onClick={encodeURL} className="flex-1">
              URL Encode
            </Button>
            <Button onClick={decodeURL} className="flex-1">
              URL Decode
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

          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-medium">Tips:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Always encode query parameters before adding them to URLs</li>
              <li>Decode encoded URLs to verify the original content</li>
              <li>Use URL encoding for all non-alphanumeric characters in URLs</li>
              <li>Remember that some characters like forward slash (/) and colon (:) are typically left unencoded</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default URLEncoderTool;