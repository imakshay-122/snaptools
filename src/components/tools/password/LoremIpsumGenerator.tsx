import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const LoremIpsumGenerator = () => {
  const [paragraphCount, setParagraphCount] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(50);
  const [includeLineBreaks, setIncludeLineBreaks] = useState(true);
  const [generatedText, setGeneratedText] = useState("");

  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur",
    "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui",
    "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const generateParagraph = (wordCount: number) => {
    let paragraph = [];
    for (let i = 0; i < wordCount; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      paragraph.push(i === 0 ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1) : randomWord);
    }
    return paragraph.join(" ") + ".";
  };

  const generateText = () => {
    let text = [];
    for (let i = 0; i < paragraphCount; i++) {
      text.push(generateParagraph(wordsPerParagraph));
    }
    setGeneratedText(text.join(includeLineBreaks ? "\n\n" : " "));
    toast.success("Lorem Ipsum text generated!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast.success("Copied to clipboard!");
  };

  return (
    <AnimatedElement>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-lg font-medium mb-2 block">
                  Number of Paragraphs
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[paragraphCount]}
                    onValueChange={(value) => setParagraphCount(value[0])}
                    max={10}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{paragraphCount}</span>
                </div>
              </div>

              <div>
                <Label className="text-lg font-medium mb-2 block">
                  Words per Paragraph
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[wordsPerParagraph]}
                    onValueChange={(value) => setWordsPerParagraph(value[0])}
                    max={100}
                    min={10}
                    step={5}
                    className="flex-1"
                  />
                  <span className="w-12 text-right">{wordsPerParagraph}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="line-breaks"
                  checked={includeLineBreaks}
                  onCheckedChange={setIncludeLineBreaks}
                />
                <Label htmlFor="line-breaks">Include Line Breaks</Label>
              </div>

              <Button onClick={generateText} className="w-full">
                Generate Lorem Ipsum
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-medium">Generated Text</Label>
              <Button
                variant="outline"
                onClick={copyToClipboard}
                disabled={!generatedText}
              >
                Copy to Clipboard
              </Button>
            </div>
            <Textarea
              value={generatedText}
              readOnly
              className="min-h-[300px]"
              placeholder="Generated text will appear here..."
            />
          </CardContent>
        </Card>
      </div>
    </AnimatedElement>
  );
};

export default LoremIpsumGenerator;