import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const UrlEncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("encode");

  const encodeUrl = () => {
    if (!input.trim()) {
      toast.error("Please enter a URL to encode");
      return;
    }

    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      toast.success("URL encoded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to encode URL");
    }
  };

  const decodeUrl = () => {
    if (!input.trim()) {
      toast.error("Please enter a URL to decode");
      return;
    }

    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast.success("URL decoded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to decode URL. Invalid encoded string.");
    }
  };

  const handleTabChange = (value: "encode" | "decode") => {
    setActiveTab(value);
    setInput("");
    setOutput("");
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No result to copy");
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  const clearFields = () => {
    setInput("");
    setOutput("");
  };

  return (
    <AnimatedElement>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">URL Encoder/Decoder</h3>
            <Button variant="ghost" size="sm" onClick={clearFields}>
              Clear All
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode URL</TabsTrigger>
              <TabsTrigger value="decode">Decode URL</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="input-encode">URL to Encode</Label>
                <Textarea
                  id="input-encode"
                  placeholder="Enter URL to encode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="font-mono"
                />
              </div>

              <Button onClick={encodeUrl} className="w-full">
                Encode URL
              </Button>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="input-decode">URL to Decode</Label>
                <Textarea
                  id="input-decode"
                  placeholder="Enter encoded URL to decode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="font-mono"
                />
              </div>

              <Button onClick={decodeUrl} className="w-full">
                Decode URL
              </Button>
            </TabsContent>
          </Tabs>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Result</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <pre className="whitespace-pre-wrap break-all font-mono text-sm">
                  {output}
                </pre>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center">
            {activeTab === "encode"
              ? "Encode URLs to make them safe for transmission"
              : "Decode encoded URLs back to their original form"}
          </div>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default UrlEncoderDecoder;