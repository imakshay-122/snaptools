import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const MorseCodeConverter = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [activeTab, setActiveTab] = useState<"text-morse" | "morse-text">("text-morse");

  const morseCodeMap: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
    '!': '-.-.--', ' ': ' '
  };

  const reverseMorseCodeMap = Object.entries(morseCodeMap).reduce(
    (acc, [char, morse]) => ({ ...acc, [morse]: char }),
    {} as { [key: string]: string }
  );

  const convertTextToMorse = () => {
    if (!text) {
      toast.error("Please enter some text");
      return;
    }

    try {
      const result = text
        .toUpperCase()
        .split('')
        .map(char => morseCodeMap[char] || char)
        .join(' ');
      setMorse(result);
      toast.success("Conversion successful");
    } catch (error) {
      toast.error("Conversion failed");
    }
  };

  const convertMorseToText = () => {
    if (!morse) {
      toast.error("Please enter Morse code");
      return;
    }

    try {
      const result = morse
        .split(' ')
        .map(code => reverseMorseCodeMap[code] || code)
        .join('');
      setText(result);
      toast.success("Conversion successful");
    } catch (error) {
      toast.error("Conversion failed");
    }
  };

  const resetFields = () => {
    setText("");
    setMorse("");
  };

  const playMorseCode = () => {
    if (!morse) {
      toast.error("No Morse code to play");
      return;
    }

    const dotDuration = 100;
    const dashDuration = dotDuration * 3;
    const pauseDuration = dotDuration;
    const wordPauseDuration = dotDuration * 7;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    oscillator.start();

    let currentTime = audioContext.currentTime;

    morse.split('').forEach((symbol) => {
      if (symbol === '.') {
        gainNode.gain.setValueAtTime(1, currentTime);
        gainNode.gain.setValueAtTime(0, currentTime + dotDuration / 1000);
        currentTime += (dotDuration + pauseDuration) / 1000;
      } else if (symbol === '-') {
        gainNode.gain.setValueAtTime(1, currentTime);
        gainNode.gain.setValueAtTime(0, currentTime + dashDuration / 1000);
        currentTime += (dashDuration + pauseDuration) / 1000;
      } else if (symbol === ' ') {
        currentTime += wordPauseDuration / 1000;
      }
    });

    oscillator.stop(currentTime);
  };

  return (
    <AnimatedElement>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Morse Code Converter</CardTitle>
          <CardDescription>
            Convert between text and Morse code, with audio playback support
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue="text-morse" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "text-morse" | "morse-text")}
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="text-morse">Text → Morse</TabsTrigger>
              <TabsTrigger value="morse-text">Morse → Text</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-morse" className="mt-6">
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="text-input">Text</Label>
                    <Input
                      id="text-input"
                      placeholder="Enter text to convert"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    <Button onClick={convertTextToMorse} size="sm">
                      Convert to Morse ↓
                    </Button>
                    <Button onClick={resetFields} size="sm" variant="outline">
                      Reset
                    </Button>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="morse-output">Morse Code</Label>
                    <Input
                      id="morse-output"
                      placeholder="Morse code result"
                      value={morse}
                      readOnly
                    />
                    <Button 
                      onClick={playMorseCode} 
                      size="sm" 
                      variant="secondary"
                      className="mt-2"
                    >
                      Play Morse Code 🔊
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="morse-text" className="mt-6">
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="morse-input">Morse Code</Label>
                    <Input
                      id="morse-input"
                      placeholder="Enter Morse code (use dots and dashes)"
                      value={morse}
                      onChange={(e) => setMorse(e.target.value)}
                    />
                    <Button 
                      onClick={playMorseCode} 
                      size="sm" 
                      variant="secondary"
                      className="mt-2"
                    >
                      Play Morse Code 🔊
                    </Button>
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    <Button onClick={convertMorseToText} size="sm">
                      Convert to Text ↓
                    </Button>
                    <Button onClick={resetFields} size="sm" variant="outline">
                      Reset
                    </Button>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="text-output">Text</Label>
                    <Input
                      id="text-output"
                      placeholder="Text result"
                      value={text}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default MorseCodeConverter;