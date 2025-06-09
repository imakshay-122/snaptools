import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CryptoJS from 'crypto-js';
import forge from 'node-forge';

const RSATool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [keySize, setKeySize] = useState('2048');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const { toast } = useToast();

  const generateKeyPair = () => {
    try {
      const rsa = forge.pki.rsa;
      const keypair = rsa.generateKeyPair({ bits: parseInt(keySize), workers: -1 });
      
      const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
      const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

      setPublicKey(publicKeyPem);
      setPrivateKey(privateKeyPem);

      toast({
        title: 'Success',
        description: 'RSA key pair generated successfully'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Generation Error',
        description: 'Failed to generate RSA key pair'
      });
    }
  };

  const encrypt = () => {
    try {
      if (!input.trim() || !publicKey.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text and generate or provide a public key'
        });
        return;
      }

      const publicKeyObj = forge.pki.publicKeyFromPem(publicKey);
      const encrypted = publicKeyObj.encrypt(input, 'RSA-OAEP');
      const base64 = forge.util.encode64(encrypted);
      
      setOutput(base64);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Encryption Error',
        description: 'Failed to encrypt text. Please check your input and key.'
      });
    }
  };

  const decrypt = () => {
    try {
      if (!input.trim() || !privateKey.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter encrypted text and provide a private key'
        });
        return;
      }

      const privateKeyObj = forge.pki.privateKeyFromPem(privateKey);
      const encrypted = forge.util.decode64(input);
      const decrypted = privateKeyObj.decrypt(encrypted, 'RSA-OAEP');
      
      setOutput(decrypted);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Decryption Error',
        description: 'Failed to decrypt text. Please check your input and key.'
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
          <h2 className="text-2xl font-bold mb-4">RSA Encryption Tool</h2>
          <p className="mb-2">RSA (Rivest-Shamir-Adleman) is an asymmetric cryptographic algorithm widely used for secure data transmission and digital signatures.</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✨ <strong>What is RSA?</strong> RSA uses a pair of keys: a public key for encryption and a private key for decryption, making it ideal for secure communication and digital signatures.</p>
            <p>🔐 <strong>Common Uses:</strong> Secure email, digital signatures, SSL/TLS certificates, and secure key exchange in various protocols.</p>
            <p>📝 <strong>How to Use:</strong></p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li>Generate a key pair by selecting the desired key size</li>
              <li>Use the public key to encrypt messages that only the private key holder can decrypt</li>
              <li>Keep the private key secure and never share it</li>
              <li>Use larger key sizes (2048 or 4096 bits) for better security</li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          {/* Key Generation Section */}
          <div className="space-y-2">
            <Label>Key Size</Label>
            <div className="flex gap-2">
              <Select value={keySize} onValueChange={setKeySize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select key size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024">1024 bits</SelectItem>
                  <SelectItem value="2048">2048 bits</SelectItem>
                  <SelectItem value="4096">4096 bits</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={generateKeyPair}>Generate Key Pair</Button>
            </div>
          </div>

          {/* Public Key Section */}
          <div className="space-y-2">
            <Label>Public Key (PEM)</Label>
            <div className="flex gap-2">
              <Textarea
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                placeholder="Enter or generate public key"
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(publicKey)}
                title="Copy public key"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Private Key Section */}
          <div className="space-y-2">
            <Label>Private Key (PEM)</Label>
            <div className="flex gap-2">
              {showPrivateKey ? (
                <Textarea
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter or generate private key"
                  className="font-mono text-sm"
                />
              ) : (
                <Textarea
                  value={privateKey.replace(/./g, '•')}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Enter or generate private key"
                  className="font-mono text-sm"
                />
              )}
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  title={showPrivateKey ? 'Hide private key' : 'Show private key'}
                >
                  {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(privateKey)}
                  title="Copy private key"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

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
          <div className="space-y-2">
            <Label>Output</Label>
            <div className="flex gap-2">
              <Textarea
                value={output}
                readOnly
                placeholder="Output will appear here"
                className="min-h-[100px]"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(output)}
                title="Copy output"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RSATool;