import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const WordsToNumber = () => {
  const [words, setWords] = useState('');
  const [number, setNumber] = useState('');
  const { toast } = useToast();

  const wordToValue: { [key: string]: number } = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
    sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
    twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90
  };

  const scaleValues: { [key: string]: number } = {
    hundred: 100,
    thousand: 1000,
    million: 1000000,
    billion: 1000000000,
    trillion: 1000000000000
  };

  const convertToNumber = (text: string) => {
    try {
      // Clean and normalize input
      const cleanText = text.toLowerCase()
        .replace(/[^a-z\s-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) {
        setNumber('');
        return;
      }

      // Split hyphenated numbers
      const words = cleanText.split(/\s+|-/);
      let total = 0;
      let currentNumber = 0;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        if (word in wordToValue) {
          currentNumber += wordToValue[word];
        } else if (word in scaleValues) {
          if (currentNumber === 0) currentNumber = 1;
          if (word === 'hundred') {
            currentNumber *= scaleValues[word];
          } else {
            currentNumber *= scaleValues[word];
            total += currentNumber;
            currentNumber = 0;
          }
        } else {
          throw new Error(`Unknown word: ${word}`);
        }
      }

      total += currentNumber;
      setNumber(total.toString());
    } catch (error) {
      setNumber('Invalid input');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWords(value);
    convertToNumber(value);
  };

  const copyToClipboard = async () => {
    if (!number || number === 'Invalid input') return;
    
    try {
      await navigator.clipboard.writeText(number);
      toast({
        description: 'Number copied to clipboard!',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'Failed to copy number.',
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter numbers in words (e.g., twenty-three thousand)"
            value={words}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="bg-muted p-4 rounded-md relative min-h-[60px]">
          <p className="font-mono font-medium break-words pr-10">
            {number || 'Result will appear here'}
          </p>
          {number && number !== 'Invalid input' && (
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
          Convert written numbers into numerical values. Supports numbers up to trillions.
        </p>
      </div>
    </Card>
  );
};

export default WordsToNumber;