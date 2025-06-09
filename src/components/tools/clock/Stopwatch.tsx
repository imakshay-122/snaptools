import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CopyIcon, Pencil1Icon, ImageIcon } from '@radix-ui/react-icons';
import { toast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timestamps, setTimestamps] = useState<{ time: number; formattedTime: string; reference?: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setTimestamps([]);
  };

  const handleAddTimestamp = () => {
    setTimestamps(prev => [...prev, { time, formattedTime: formatTime(time), reference: `Lap ${prev.length + 1}` }]);
  };

  const handleCopyTimestamp = (timestamp: string, index?: number) => {
    const stamp = timestamps[index || 0];
    const textToCopy = index !== undefined ? `${stamp.reference || `#${index + 1}`} - ${timestamp}` : timestamp;
    navigator.clipboard.writeText(textToCopy);
    toast.success('Timestamp copied to clipboard');
  };

  const handleCopyAllTimestamps = () => {
    const allTimestamps = timestamps.map((stamp, index) => `${stamp.reference || `#${index + 1}`} - ${stamp.formattedTime}`).join('\n');
    navigator.clipboard.writeText(allTimestamps);
    toast.success('All timestamps copied to clipboard');
  };

  const handleExportImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = Math.max(200, 100 + timestamps.length * 30);

    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text style
    ctx.font = '24px monospace';
    ctx.fillStyle = '#000000';

    // Draw title
    ctx.fillText('Stopwatch Timestamps', 20, 40);

    // Draw timestamps
    ctx.font = '16px monospace';
    timestamps.forEach((stamp, index) => {
      const y = 80 + index * 30;
      ctx.fillText(`${stamp.reference || `#${index + 1}`} - ${stamp.formattedTime}`, 20, y);
    });

    // Convert to image and download
    const link = document.createElement('a');
    link.download = 'stopwatch-timestamps.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Image exported successfully');
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-6xl font-mono font-bold">
            {formatTime(time)}
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={handleStartStop}
              variant={isRunning ? "destructive" : "default"}
            >
              {isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={isRunning}
              className={isRunning ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Reset
            </Button>
            {isRunning && (
              <Button
                onClick={handleAddTimestamp}
                variant="secondary"
              >
                Add Timestamp
              </Button>
            )}
          </div>
          {timestamps.length > 0 && (
            <ScrollArea className="h-[200px] w-full border rounded-md p-4">
              <div className="space-y-2">
                <div className="flex justify-end mb-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExportImage}
                      title="Export as image"
                    >
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Export Image
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAllTimestamps}
                    >
                      Copy All
                    </Button>
                  </div>
                </div>
                {timestamps.map((stamp, index) => (
                  <div key={index} className="flex justify-between items-center">
                    {editingIndex === index ? (
                      <Input
                        className="w-40 font-mono"
                        value={stamp.reference || ``}
                        onChange={(e) => {
                          const newTimestamps = [...timestamps];
                          newTimestamps[index].reference = e.target.value;
                          setTimestamps(newTimestamps);
                        }}
                        onBlur={() => setEditingIndex(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingIndex(null)}
                        autoFocus
                      />
                    ) : (
                      <span className="font-mono">
                        {stamp.reference || `#${index + 1}`} - {stamp.formattedTime}
                      </span>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingIndex(index)}
                        title="Edit reference"
                      >
                        <Pencil1Icon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyTimestamp(stamp.formattedTime)}
                        title="Copy time only"
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyTimestamp(stamp.formattedTime, index)}
                        title="Copy with reference"
                      >
                        #<CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        <div className="mt-6 text-sm text-muted-foreground text-center">
          A precise stopwatch with lap timing, customizable references, and export capabilities. Start/stop timing, add timestamps, edit references, and export your data as text or image.
        </div>
      </CardContent>
    </Card>
  );
};

export default Stopwatch;