/**
 * RIPEMD160 Hash Tool Component
 *
 * RIPEMD160 (RACE Integrity Primitives Evaluation Message Digest) is a cryptographic
 * hash function that produces a 160-bit (20-byte) hash value. It was designed as an
 * alternative to SHA-1 and is commonly used in blockchain technology.
 *
 * Key Features:
 * - 160-bit output length
 * - Resistant to cryptographic attacks
 * - Independent design from the SHA family
 * - Suitable for digital signatures and integrity verification
 *
 * Common Use Cases:
 * - Blockchain address generation
 * - Data integrity verification
 * - Digital signatures
 * - Message authentication
 *
 * Security Considerations:
 * - While RIPEMD160 is considered cryptographically secure, it's not recommended for
 *   password hashing. Use dedicated password hashing functions like bcrypt or Argon2 instead.
 * - Always use it in combination with a secure random salt for enhanced security
 * - Consider using stronger hash functions (SHA-256/SHA-3) for new applications
 */

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CryptoJS from 'crypto-js';

const RIPEMD160Tool = () => {
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
      const ripemd160Hash = CryptoJS.RIPEMD160(input).toString();
      setHash(ripemd160Hash);
      setIsMatch(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Hash Generation Error',
        description: 'Failed to generate RIPEMD160 hash'
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

  const verifyRIPEMD160 = () => {
    try {
      if (!input.trim() || !verifyHash.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter both text and hash to verify'
        });
        return;
      }

      const generatedHash = CryptoJS.RIPEMD160(input).toString();
      setIsMatch(generatedHash.toLowerCase() === verifyHash.toLowerCase());
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Verification Error',
        description: 'Failed to verify RIPEMD160 hash'
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
      {/* Documentation Section */}
      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">RIPEMD160 Hash Generator</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            RIPEMD160 is a cryptographic hash function that produces a 160-bit (20-byte) hash value. It's designed as a secure alternative to SHA-1 and is widely used in blockchain technology.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Key Features</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>160-bit output length for strong security</li>
            <li>Resistant to cryptographic attacks</li>
            <li>Independent design from the SHA family</li>
            <li>Suitable for digital signatures and integrity verification</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">How to Use</h3>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>Enter or paste your text in the input field below</li>
            <li>Click "Generate RIPEMD160 Hash" to create the hash</li>
            <li>Copy the generated hash using the copy button</li>
            <li>To verify a hash, paste it in the verification field and click "Verify Hash"</li>
          </ol>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            <strong>Note:</strong> While RIPEMD160 is cryptographically secure, it's not recommended for password hashing. Use dedicated password hashing functions like bcrypt or Argon2 instead.
          </p>
        </div>
      </Card>

      {/* Tool Section */}
      <Card className="p-6">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter text to generate RIPEMD160 hash"
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
              Generate RIPEMD160 Hash
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
              <Label>Verify Hash</Label>
              <Input
                placeholder="Enter hash to verify"
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
              />
              <Button onClick={verifyRIPEMD160} className="w-full">
                Verify Hash
              </Button>
            </div>

            {isMatch !== null && (
              <div className={`text-center p-2 rounded ${isMatch ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {isMatch ? 'Hash matches!' : 'Hash does not match'}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RIPEMD160Tool;