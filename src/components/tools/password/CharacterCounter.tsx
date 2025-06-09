import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AnimatedElement from "@/components/animated-element";

const CharacterCounter = () => {
  const [text, setText] = useState("");

  const countCharacters = (text: string, withSpaces: boolean) => {
    return withSpaces ? text.length : text.replace(/\s/g, "").length;
  };

  const countLines = (text: string) => {
    return text.trim() === "" ? 0 : text.split(/\r\n|\r|\n/).length;
  };

  const countWords = (text: string) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  };

  const getCharacterFrequency = (text: string) => {
    const frequency: { [key: string]: number } = {};
    const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    for (const char of cleanText) {
      frequency[char] = (frequency[char] || 0) + 1;
    }

    return Object.entries(frequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([char, count]) => `${char}: ${count}`);
  };

  return (
    <AnimatedElement>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="text" className="text-lg font-medium mb-2 block">
                  Enter your text
                </Label>
                <Textarea
                  id="text"
                  placeholder="Type or paste your text here..."
                  className="min-h-[300px]"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-4">Character Analysis</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Characters</span>
                      <span className="font-medium">{countCharacters(text, true)}</span>
                    </div>
                    <Separator className="my-2" />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Characters (no spaces)</span>
                      <span className="font-medium">{countCharacters(text, false)}</span>
                    </div>
                    <Separator className="my-2" />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Words</span>
                      <span className="font-medium">{countWords(text)}</span>
                    </div>
                    <Separator className="my-2" />
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lines</span>
                      <span className="font-medium">{countLines(text)}</span>
                    </div>
                    <Separator className="my-2" />
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Most Common Characters</h4>
                    {text.trim() !== "" && (
                      <div className="grid grid-cols-2 gap-2">
                        {getCharacterFrequency(text).map((freq, index) => (
                          <div
                            key={index}
                            className="text-sm text-muted-foreground bg-muted p-2 rounded-md"
                          >
                            {freq}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedElement>
  );
};

export default CharacterCounter;