/**
 * SCrypt Password Hashing Tool Component
 *
 * SCrypt is a memory-hard key derivation function designed by Colin Percival.
 * It is specifically designed to make it costly to perform large-scale custom hardware
 * attacks by requiring a large amount of memory. This makes it particularly effective
 * against ASIC-based attacks.
 *
 * Key Features:
 * - Memory-hard algorithm (requires significant RAM)
 * - Configurable cost parameters (N, r, p)
 * - Built-in salt support
 * - Highly resistant to hardware-based attacks
 *
 * Parameters:
 * - N: CPU/Memory cost parameter (must be power of 2)
 * - r: Block size parameter (8 is common)
 * - p: Parallelization parameter (1 is common)
 * - dkLen: Desired key length in bytes
 *
 * Common Use Cases:
 * - Password hashing in high-security environments
 * - Key derivation for encryption
 * - Cryptocurrency applications
 *
 * Security Considerations:
 * - Choose N based on available memory and security requirements
 * - Higher N values provide better security but require more memory
 * - Use cryptographically secure salt values
 * - Store all parameters (N, r, p) with the hash
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import * as scryptJs from 'scrypt-js';
import { BufferPolyfill } from '@/lib/buffer-polyfill';

const SCryptTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [salt, setSalt] = useState('');
  const [costFactor, setCostFactor] = useState('16384'); // N
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncrypt = async () => {
    try {
      if (!input) {
        toast({
          title: 'Error',
          description: 'Please enter a value to hash',
          variant: 'destructive',
        });
        return;
      }

      const saltBytes = salt ? BufferPolyfill.from(salt) : crypto.getRandomValues(new Uint8Array(16));
      
      const N = parseInt(costFactor);
      const r = 8;
      const p = 1;
      const dkLen = 64;
      
      const inputBuffer = BufferPolyfill.from(input);
      const derivedKey = await scryptJs.scrypt(inputBuffer, saltBytes, N, r, p, dkLen);
      const result = `$scrypt$N=${costFactor},r=8,p=1$${BufferPolyfill.toString(saltBytes)}$${BufferPolyfill.toString(derivedKey)}`;
      setOutput(result);
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
          <div className="space-y-2 mb-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">SCrypt Password Hashing</p>
            <p>SCrypt is a memory-hard key derivation function designed to be resistant to hardware-based attacks by requiring significant memory resources. This makes it particularly effective for password hashing and cryptocurrency applications.</p>
            <div className="mt-4">
              <p className="font-medium text-foreground mb-2">Key Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Memory-hard algorithm requiring significant RAM</li>
                <li>Configurable cost parameters for security scaling</li>
                <li>Built-in salt support for unique hashes</li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="font-medium text-foreground mb-2">Security Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Choose cost factor based on available memory and security needs</li>
                <li>Always use cryptographically secure random salt</li>
                <li>Higher cost factors provide better security but require more memory</li>
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Input
              placeholder="Enter text to hash"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Salt (Optional)</Label>
            <Input
              placeholder="Enter salt value (optional)"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Cost Factor (N)</Label>
            <Select value={costFactor} onValueChange={setCostFactor}>
              <SelectTrigger>
                <SelectValue placeholder="Select cost factor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16384">16384 (2^14)</SelectItem>
                <SelectItem value="32768">32768 (2^15)</SelectItem>
                <SelectItem value="65536">65536 (2^16)</SelectItem>
                <SelectItem value="131072">131072 (2^17)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleEncrypt} className="w-full">
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

export default SCryptTool;