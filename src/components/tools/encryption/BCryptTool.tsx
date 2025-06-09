/**
 * BCrypt Password Hashing Tool Component
 *
 * BCrypt is a password hashing function designed by Niels Provos and David Mazières.
 * It is based on the Blowfish cipher and incorporates a salt to protect against
 * rainbow table attacks. BCrypt is an adaptive function: over time, the iteration
 * count (rounds) can be increased to make it slower, so it remains resistant to
 * brute-force attacks even with increasing computation power.
 *
 * Key Features:
 * - Adaptive cost factor (rounds)
 * - Built-in salt generation
 * - Slow by design to prevent brute-force attacks
 * - Industry standard for password hashing
 *
 * Common Use Cases:
 * - Secure password storage
 * - User authentication systems
 * - Password verification
 *
 * Security Considerations:
 * - Choose an appropriate number of rounds based on your security requirements
 * - Higher rounds provide better security but increase computation time
 * - The default of 10 rounds is suitable for most applications
 * - BCrypt truncates passwords at 72 bytes, consider pre-hashing longer passwords
 * - Store the complete hash string including version, cost, and salt
 */

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import bcrypt from 'bcryptjs';

const BCryptTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [rounds, setRounds] = useState('10');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleHash = async () => {
    try {
      if (!input) {
        toast({
          title: 'Error',
          description: 'Please enter a value to hash',
          variant: 'destructive',
        });
        return;
      }

      const salt = await bcrypt.genSalt(parseInt(rounds));
      const hash = await bcrypt.hash(input, salt);
      setOutput(hash);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to hash the input',
        variant: 'destructive',
      });
    }
  };

  const handleVerify = async () => {
    try {
      if (!input || !output) {
        toast({
          title: 'Error',
          description: 'Please provide both input and hash values',
          variant: 'destructive',
        });
        return;
      }

      const isValid = await bcrypt.compare(input, output);
      toast({
        title: isValid ? 'Success' : 'Failed',
        description: isValid ? 'Hash verification successful' : 'Hash verification failed',
        variant: isValid ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify the hash',
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
            <p className="font-medium text-foreground">BCrypt Password Hashing</p>
            <p>BCrypt is a password hashing function designed to be slow and resistant to brute-force attacks. It automatically handles salt generation and allows adjusting the computational cost through rounds.</p>
            <div className="mt-4">
              <p className="font-medium text-foreground mb-2">Key Features:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Adaptive cost factor (rounds) for future-proof security</li>
                <li>Built-in cryptographically secure salt generation</li>
                <li>Industry standard for secure password storage</li>
              </ul>
            </div>
            <div className="mt-4">
              <p className="font-medium text-foreground mb-2">Security Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Higher rounds provide better security but increase computation time</li>
                <li>Default of 10 rounds is suitable for most applications</li>
                <li>Pre-hash passwords longer than 72 bytes</li>
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
            <Label>Rounds (Cost Factor)</Label>
            <Select value={rounds} onValueChange={setRounds}>
              <SelectTrigger>
                <SelectValue placeholder="Select rounds" />
              </SelectTrigger>
              <SelectContent>
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleHash} className="flex-1">
              Generate Hash
            </Button>
            <Button onClick={handleVerify} variant="outline" className="flex-1">
              Verify Hash
            </Button>
          </div>

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

export default BCryptTool;