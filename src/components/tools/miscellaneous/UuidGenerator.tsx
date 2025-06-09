import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UuidGenerator = () => {
  const [uuid, setUuid] = useState(uuidv4());
  const { toast } = useToast();

  const generateNewUuid = () => {
    setUuid(uuidv4());
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      toast({
        description: 'UUID copied to clipboard!',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Failed to copy UUID.',
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            value={uuid}
            readOnly
            className="font-mono"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={generateNewUuid}
            title="Generate new UUID"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          A UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information in computer systems.
        </p>
      </div>
    </Card>
  );
};

export default UuidGenerator;