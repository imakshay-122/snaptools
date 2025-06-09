import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CryptoJS from 'crypto-js';

const BlowfishTool = () => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const encrypt = () => {
    try {
      if (!input.trim() || !key.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter both text and encryption key'
        });
        return;
      }

      const encrypted = CryptoJS.Blowfish.encrypt(input, key).toString();
      setOutput(encrypted);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Encryption Error',
        description: 'Failed to encrypt text'
      });
    }
  };

  const decrypt = () => {
    try {
      if (!input.trim() || !key.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter both encrypted text and key'
        });
        return;
      }

      const decrypted = CryptoJS.Blowfish.decrypt(input, key);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Invalid key or encrypted text');
      }

      setOutput(decryptedText);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Decryption Error',
        description: 'Failed to decrypt text. Please check your key and input.'
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
          <h2 className="text-2xl font-bold mb-4">Blowfish Encryption Tool</h2>
          <p className="mb-2">Blowfish is a symmetric-key block cipher designed by Bruce Schneier in 1993. It provides a good encryption rate and is known for its strong security.</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✨ <strong>What is Blowfish?</strong> Blowfish is a fast block cipher that uses a variable-length key, from 32 bits to 448 bits, making it both flexible and secure for various applications.</p>
            <p>🔐 <strong>Common Uses:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Password hashing systems</li>
              <li>File and disk encryption</li>
              <li>Secure communication protocols</li>
              <li>Database encryption</li>
            </ul>
            <p>📝 <strong>How to Use:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Enter your text in the input field</li>
              <li>Provide a strong encryption key (32-448 bits)</li>
              <li>Click Encrypt to secure your data or Decrypt to reveal encrypted content</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter text to encrypt/decrypt"
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

          {/* Key Input Section */}
          <div className="space-y-2">
            <Label>Encryption Key</Label>
            <div className="flex gap-2">
              <Input
                type={showKey ? 'text' : 'password'}
                placeholder="Enter encryption key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowKey(!showKey)}
                title={showKey ? 'Hide key' : 'Show key'}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={encrypt} className="flex-1">
              Encrypt
            </Button>
            <Button onClick={decrypt} className="flex-1">
              Decrypt
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

export default BlowfishTool;