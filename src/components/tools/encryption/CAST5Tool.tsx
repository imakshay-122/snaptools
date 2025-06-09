import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CryptoJS from 'crypto-js';

const CAST5Tool = () => {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  const encrypt = () => {
    try {
      const trimmedInput = input.trim();
      const trimmedKey = key.trim();

      if (!trimmedInput) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to encrypt'
        });
        return;
      }

      if (trimmedInput.length > 10000) {
        toast({
          variant: 'destructive',
          title: 'Input Too Long',
          description: 'Input text must not exceed 10,000 characters'
        });
        return;
      }

      if (!trimmedKey) {
        toast({
          variant: 'destructive',
          title: 'Key Required',
          description: 'Please enter an encryption key'
        });
        return;
      }

      if (trimmedKey.length < 8) {
        toast({
          variant: 'destructive',
          title: 'Invalid Key',
          description: 'Encryption key must be at least 8 characters long'
        });
        return;
      }

      if (trimmedKey.length > 32) {
        toast({
          variant: 'destructive',
          title: 'Invalid Key',
          description: 'Encryption key must not exceed 32 characters'
        });
        return;
      }

      const encrypted = CryptoJS.CAST5.encrypt(input, key).toString();
      if (!encrypted) {
        throw new Error('Encryption failed - invalid result');
      }
      setOutput(encrypted);
    } catch (error) {
      console.error('CAST5 encryption error:', error);
      let errorMessage = 'Failed to encrypt text';
      
      if (error instanceof Error) {
        if (error.message.includes('invalid')) {
          errorMessage = 'Invalid input or key format';
        } else if (error.message.includes('key')) {
          errorMessage = 'Invalid encryption key';
        }
      }

      toast({
        variant: 'destructive',
        title: 'Encryption Error',
        description: errorMessage
      });
    }
  };

  const decrypt = () => {
    try {
      const trimmedInput = input.trim();
      const trimmedKey = key.trim();

      if (!trimmedInput) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter encrypted text to decrypt'
        });
        return;
      }

      if (trimmedInput.length > 10000) {
        toast({
          variant: 'destructive',
          title: 'Input Too Long',
          description: 'Input text must not exceed 10,000 characters'
        });
        return;
      }

      if (!trimmedKey) {
        toast({
          variant: 'destructive',
          title: 'Key Required',
          description: 'Please enter the decryption key'
        });
        return;
      }

      if (trimmedKey.length < 8) {
        toast({
          variant: 'destructive',
          title: 'Invalid Key',
          description: 'Decryption key must be at least 8 characters long'
        });
        return;
      }

      if (trimmedKey.length > 32) {
        toast({
          variant: 'destructive',
          title: 'Invalid Key',
          description: 'Decryption key must not exceed 32 characters'
        });
        return;
      }

      const decrypted = CryptoJS.CAST5.decrypt(input, key);
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Invalid key or encrypted text format');
      }

      setOutput(decryptedText);
    } catch (error) {
      console.error('CAST5 decryption error:', error);
      let errorMessage = 'Failed to decrypt text';
      
      if (error instanceof Error) {
        if (error.message.includes('format')) {
          errorMessage = 'Invalid encrypted text format';
        } else if (error.message.includes('key')) {
          errorMessage = 'Invalid decryption key';
        }
      }

      toast({
        variant: 'destructive',
        title: 'Decryption Error',
        description: errorMessage
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
          <h2 className="text-2xl font-bold mb-4">CAST5 Encryption Tool</h2>
          <p className="mb-2">CAST5 is a symmetric key block cipher that provides strong encryption for data protection with a variable key length.</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✨ <strong>What is CAST5?</strong> CAST5 is a symmetric encryption algorithm that uses a variable key length (40 to 128 bits) and operates on 64-bit blocks of data.</p>
            <p>🔐 <strong>Common Uses:</strong> File encryption, secure communications, and data protection in various applications.</p>
            <p>📝 <strong>Input Requirements:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Text Input:</strong>
                <ul className="list-disc list-inside pl-4">
                  <li>Maximum length: 10,000 characters</li>
                  <li>Supports all Unicode characters</li>
                  <li>Empty spaces at start/end will be trimmed</li>
                </ul>
              </li>
              <li><strong>Encryption Key:</strong>
                <ul className="list-disc list-inside pl-4">
                  <li>Minimum length: 8 characters</li>
                  <li>Maximum length: 32 characters</li>
                  <li>Must contain letters, numbers, or special characters</li>
                  <li>Avoid using easily guessable keys</li>
                </ul>
              </li>
            </ul>
            <p>📝 <strong>How to Use:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Enter your text in the input field (up to 10,000 characters)</li>
              <li>Provide a strong encryption key (8-32 characters)</li>
              <li>Click Encrypt to secure your data or Decrypt to reveal encrypted content</li>
              <li>Use the show/hide button to toggle key visibility</li>
              <li>Copy/paste buttons available for convenience</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter text to encrypt/decrypt (max 10,000 characters)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[100px]"
                maxLength={10000}
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
                placeholder="Enter encryption key (8-32 characters)"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                maxLength={32}
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

export default CAST5Tool;