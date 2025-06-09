import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CryptoJS from 'crypto-js';

const MD5Tool = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const { toast } = useToast();

  const generateHash = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to generate hash'
        });
        return;
      }
      const md5Hash = CryptoJS.MD5(input).toString();
      setHash(md5Hash);
      // Reset verification state
      setIsMatch(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Hash Generation Error',
        description: 'Failed to generate MD5 hash'
      });
    }
  };

  const verifyMD5 = () => {
    try {
      if (!input.trim() || !verifyHash.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter both text and hash to verify'
        });
        return;
      }
      const generatedHash = CryptoJS.MD5(input).toString();
      setIsMatch(generatedHash.toLowerCase() === verifyHash.toLowerCase());
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Verification Error',
        description: 'Failed to verify MD5 hash'
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
          <h2 className="text-2xl font-bold mb-4">MD5 Hash Generator</h2>
          <p className="mb-2">MD5 (Message Digest Algorithm 5) is a widely-used cryptographic hash function that produces a 128-bit (16-byte) hash value.</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✨ <strong>What is MD5?</strong> MD5 is a one-way hash function that converts any input into a fixed-size string of characters, making it useful for verifying data integrity.</p>
            <p>🔐 <strong>Common Uses:</strong> File integrity verification, password hashing (historically), checksum generation, and digital signatures.</p>
            <p>📝 <strong>How to Use:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Enter your text in the input field</li>
              <li>Click Generate to create the MD5 hash</li>
              <li>Use the verification section to compare and verify MD5 hashes</li>
              <li>Note: While MD5 is fast and widely used, it's not recommended for secure password hashing</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter text to generate MD5 hash"
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

          {/* Hash Generation Section */}
          <div className="space-y-4">
            <Button onClick={generateHash} className="w-full">
              Generate MD5 Hash
            </Button>

            {hash && (
              <div className="space-y-2">
                <Label>Generated Hash</Label>
                <div className="flex gap-2">
                  <Input value={hash} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(hash)}
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Hash Verification Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Verify MD5 Hash</Label>
              <Input
                placeholder="Enter MD5 hash to verify"
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
              />
            </div>

            <Button onClick={verifyMD5} className="w-full">
              Verify Hash
            </Button>

            {isMatch !== null && (
              <div className={`text-center font-medium ${isMatch ? 'text-green-600' : 'text-red-600'}`}>
                {isMatch ? 'Hash matches!' : 'Hash does not match!'}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MD5Tool;