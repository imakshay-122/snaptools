import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

const RandomIpGenerator: React.FC = () => {
  const [ipVersion, setIpVersion] = useState<'ipv4' | 'ipv6'>('ipv4');
  const [generatedIp, setGeneratedIp] = useState<string>('');

  const generateIPv4 = () => {
    const segments = [];
    for (let i = 0; i < 4; i++) {
      segments.push(Math.floor(Math.random() * 256));
    }
    return segments.join('.');
  };

  const generateIPv6 = () => {
    const segments = [];
    for (let i = 0; i < 8; i++) {
      const segment = Math.floor(Math.random() * 65536)
        .toString(16)
        .padStart(4, '0');
      segments.push(segment);
    }
    return segments.join(':');
  };

  const handleGenerate = () => {
    const ip = ipVersion === 'ipv4' ? generateIPv4() : generateIPv6();
    setGeneratedIp(ip);
  };

  const handleCopy = () => {
    if (generatedIp) {
      navigator.clipboard.writeText(generatedIp);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>IP Version</Label>
            <RadioGroup
              defaultValue="ipv4"
              value={ipVersion}
              onValueChange={(value) => setIpVersion(value as 'ipv4' | 'ipv6')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ipv4" id="ipv4" />
                <Label htmlFor="ipv4">IPv4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ipv6" id="ipv6" />
                <Label htmlFor="ipv6">IPv6</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Generated IP Address</Label>
            <div className="flex space-x-2">
              <Input
                value={generatedIp}
                readOnly
                placeholder={ipVersion === 'ipv4' ? '192.168.1.1' : '2001:0db8:85a3:0000:0000:8a2e:0370:7334'}
              />
              <Button onClick={handleCopy} disabled={!generatedIp} variant="outline">
                Copy
              </Button>
            </div>
          </div>

          <Button onClick={handleGenerate} className="w-full">
            Generate {ipVersion.toUpperCase()} Address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RandomIpGenerator;