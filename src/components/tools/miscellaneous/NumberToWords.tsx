import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NumberToWords = () => {
  const [number, setNumber] = useState('');
  const [words, setWords] = useState('');
  const { toast } = useToast();

  const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

  const convertChunk = (chunk: number): string => {
    if (chunk === 0) return '';
    
    let result = '';
    
    // Handle hundreds
    if (chunk >= 100) {
      result += units[Math.floor(chunk / 100)] + ' hundred ';
      chunk %= 100;
    }
    
    // Handle tens and units
    if (chunk >= 10 && chunk < 20) {
      result += teens[chunk - 10];
    } else {
      const tensDigit = Math.floor(chunk / 10);
      const unitsDigit = chunk % 10;
      
      if (tensDigit > 0) {
        result += tens[tensDigit];
        if (unitsDigit > 0) result += '-';
      }
      
      if (unitsDigit > 0) {
        result += units[unitsDigit];
      }
    }
    
    return result.trim();
  };

  const convertToWords = (num: string) => {
    // Remove any non-digit characters and leading zeros
    const cleanNum = num.replace(/[^0-9]/g, '').replace(/^0+/, '');
    
    if (!cleanNum) {
      setWords('zero');
      return;
    }
    
    if (cleanNum.length > 15) {
      setWords('Number is too large to convert');
      return;
    }
    
    const numValue = parseInt(cleanNum);
    if (numValue === 0) {
      setWords('zero');
      return;
    }
    
    // Split number into chunks of 3 digits
    const chunks: number[] = [];
    let remaining = cleanNum;
    while (remaining.length > 0) {
      chunks.unshift(parseInt(remaining.slice(-3)));
      remaining = remaining.slice(0, -3);
    }
    
    const wordsArray = chunks.map((chunk, i) => {
      const wordChunk = convertChunk(chunk);
      return wordChunk ? `${wordChunk} ${scales[chunks.length - 1 - i]}` : '';
    });
    
    setWords(wordsArray.filter(w => w).join(' ').trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber(value);
    convertToWords(value);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(words);
      toast({
        description: 'Text copied to clipboard!',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Failed to copy text.',
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter a number"
            value={number}
            onChange={handleInputChange}
            className="font-mono"
          />
        </div>
        
        <div className="bg-muted p-4 rounded-md relative min-h-[60px]">
          <p className="font-medium break-words pr-10">{words || 'Result will appear here'}</p>
          {words && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Convert numbers into their word representation. Supports numbers up to trillions.
        </p>
      </div>
    </Card>
  );
};

export default NumberToWords;