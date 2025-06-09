import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const JavaScriptMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minifyJavaScript = () => {
    if (!input.trim()) {
      toast.error("Please enter JavaScript code");
      return;
    }

    try {
      // Remove comments
      let minified = input
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
        .replace(/\/\/.*/g, ""); // Remove single-line comments

      // Remove whitespace and newlines
      minified = minified
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .replace(/\s*([\{\}\(\)\[\]\,\;\:\+\-\*\/\>\<\=]|\!\=|\=\=)\s*/g, "$1") // Remove spaces around operators
        .replace(/\s*\n\s*/g, "") // Remove newlines and surrounding spaces
        .trim(); // Remove leading/trailing whitespace

      setOutput(minified);
      toast.success("JavaScript minified successfully!");
    } catch (error) {
      toast.error("Error minifying JavaScript. Please check your input.");
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No minified JavaScript to copy");
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    toast.success("Cleared all content");
  };

  return (
    <AnimatedElement>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="Enter JavaScript here..."
              className="min-h-[300px] font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={minifyJavaScript}>Minify JavaScript</Button>
              <Button onClick={clearAll} variant="outline">Clear All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <Textarea
              placeholder="Minified JavaScript will appear here..."
              className="min-h-[300px] font-mono"
              value={output}
              readOnly
            />
            <Button
              onClick={copyToClipboard}
              disabled={!output}
            >
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </AnimatedElement>
  );
};

export default JavaScriptMinifier;