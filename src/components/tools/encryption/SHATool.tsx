import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CryptoJS from 'crypto-js';

type SHAVariant = '1' | '256' | '384' | '512';

const SHATool = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [variant, setVariant] = useState<SHAVariant>('256');
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

      let shaHash: string;
      switch (variant) {
        case '1':
          shaHash = CryptoJS.SHA1(input).toString();
          break;
        case '256':
          shaHash = CryptoJS.SHA256(input).toString();
          break;
        case '384':
          shaHash = CryptoJS.SHA384(input).toString();
          break;
        case '512':
          shaHash = CryptoJS.SHA512(input).toString();
          break;
        default:
          shaHash = CryptoJS.SHA256(input).toString();
      }

      setHash(shaHash);
      setIsMatch(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Hash Generation Error',
        description: `Failed to generate SHA-${variant} hash`
      });
    }
  };

  const verifySHA = () => {
    try {
      if (!input.trim() || !verifyHash.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter both text and hash to verify'
        });
        return;
      }

      let generatedHash: string;
      switch (variant) {
        case '1':
          generatedHash = CryptoJS.SHA1(input).toString();
          break;
        case '256':
          generatedHash = CryptoJS.SHA256(input).toString();
          break;
        case '384':
          generatedHash = CryptoJS.SHA384(input).toString();
          break;
        case '512':
          generatedHash = CryptoJS.SHA512(input).toString();
          break;
        default:
          generatedHash = CryptoJS.SHA256(input).toString();
      }

      setIsMatch(generatedHash.toLowerCase() === verifyHash.toLowerCase());
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Verification Error',
        description: `Failed to verify SHA-${variant} hash`
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
          <h2 className="text-2xl font-bold mb-4">SHA Hash Generator</h2>
          <p className="mb-2">SHA (Secure Hash Algorithm) is a family of cryptographic hash functions designed to provide a unique, fixed-size representation of data.</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✨ <strong>What is SHA?</strong> SHA generates a fixed-length string (hash) from any input, making it impossible to reconstruct the original data from the hash.</p>
            <p>🔐 <strong>Available Variants:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>SHA-1 (160 bits) - Legacy algorithm, not recommended for security-critical applications</li>
              <li>SHA-256 (256 bits) - Most widely used, excellent security for general purposes</li>
              <li>SHA-384 (384 bits) - Stronger variant, good for sensitive applications</li>
              <li>SHA-512 (512 bits) - Highest security, ideal for critical systems</li>
            </ul>
            <p>📝 <strong>Common Uses:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Digital signatures and certificates</li>
              <li>Password hashing and storage</li>
              <li>File integrity verification</li>
              <li>Blockchain and cryptocurrency systems</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          {/* How to Use Section */}
          <div className="mb-6 text-sm text-muted-foreground">
            <p>🔍 <strong>How to Use:</strong></p>
            <ol className="list-decimal list-inside pl-4 space-y-1">
              <li>Select your preferred SHA variant based on your security needs</li>
              <li>Enter or paste the text you want to hash</li>
              <li>Click "Generate Hash" to create the hash value</li>
              <li>To verify a hash, enter the original text and the hash value, then click "Verify"</li>
            </ol>
          </div>

          {/* SHA Variant Selection */}
          <div className="space-y-2">
            <Label>SHA Variant</Label>
            <Select
              value={variant}
              onValueChange={(value: SHAVariant) => setVariant(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select SHA variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">SHA-1</SelectItem>
                <SelectItem value="256">SHA-256</SelectItem>
                <SelectItem value="384">SHA-384</SelectItem>
                <SelectItem value="512">SHA-512</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder={`Enter text to generate SHA-${variant} hash`}
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
              Generate SHA-{variant} Hash
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
              <Label>Verify SHA-{variant} Hash</Label>
              <Input
                placeholder={`Enter SHA-${variant} hash to verify`}
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
              />
            </div>

            <Button onClick={verifySHA} className="w-full">
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

export default SHATool;