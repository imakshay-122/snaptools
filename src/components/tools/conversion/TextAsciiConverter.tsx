import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, X } from "lucide-react";
import AnimatedElement from "@/components/animated-element";

const TextAsciiConverter = () => {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");
  const [activeTab, setActiveTab] = useState<"text-ascii" | "ascii-text">("text-ascii");

  // Text to ASCII
  const convertTextToAscii = () => {
    if (!text) {
      toast.error("Please enter some text to convert");
      return;
    }

    try {
      const asciiValues = text
        .split("")
        .map(char => char.charCodeAt(0))
        .join(" ");
      setAscii(asciiValues);
      toast.success("Text converted to ASCII successfully");
    } catch (error) {
      toast.error("Failed to convert text to ASCII");
      console.error("Conversion error:", error);
    }
  };

  // ASCII to Text
  const convertAsciiToText = () => {
    if (!ascii) {
      toast.error("Please enter ASCII values to convert");
      return;
    }

    try {
      const asciiArray = ascii.trim().split(/\s+/);
      const convertedText = asciiArray
        .map(value => {
          const num = parseInt(value, 10);
          if (isNaN(num)) throw new Error("Invalid ASCII value");
          return String.fromCharCode(num);
        })
        .join("");
      setText(convertedText);
      toast.success("ASCII converted to text successfully");
    } catch (error) {
      toast.error("Failed to convert ASCII to text. Please ensure all values are valid ASCII codes.");
      console.error("Conversion error:", error);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (content: string, type: "text" | "ascii") => {
    if (!content) {
      toast.error(`No ${type} content to copy`);
      return;
    }
    
    navigator.clipboard.writeText(content)
      .then(() => toast.success(`${type === "text" ? "Text" : "ASCII"} copied to clipboard`))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  const clearFields = () => {
    setText("");
    setAscii("");
  };

  return (
    <AnimatedElement>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Text ⇄ ASCII Converter</CardTitle>
          <CardDescription>
            Convert text to ASCII values or ASCII values back to text
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue="text-ascii" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "text-ascii" | "ascii-text")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text-ascii">Text to ASCII</TabsTrigger>
              <TabsTrigger value="ascii-text">ASCII to Text</TabsTrigger>
            </TabsList>
            
            <TabsContent value="text-ascii" className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="text-input">Text</Label>
                  <div className="space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(text, "text")} 
                      disabled={!text}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="text-input"
                  placeholder="Enter text to convert to ASCII"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="ascii-output">ASCII Values</Label>
                  <div className="space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(ascii, "ascii")} 
                      disabled={!ascii}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="ascii-output"
                  placeholder="ASCII values will appear here"
                  value={ascii}
                  readOnly
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={clearFields}
                >
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
                <Button
                  onClick={convertTextToAscii}
                >
                  Convert to ASCII
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ascii-text" className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="ascii-input">ASCII Values</Label>
                  <div className="space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(ascii, "ascii")} 
                      disabled={!ascii}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="ascii-input"
                  placeholder="Enter ASCII values separated by spaces (e.g. 72 101 108 108 111)"
                  value={ascii}
                  onChange={(e) => setAscii(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="text-output">Text</Label>
                  <div className="space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(text, "text")} 
                      disabled={!text}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="text-output"
                  placeholder="Converted text will appear here"
                  value={text}
                  readOnly
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={clearFields}
                >
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
                <Button
                  onClick={convertAsciiToText}
                >
                  Convert to Text
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default TextAsciiConverter;