import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/ui/code-editor";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const HtmlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const beautifyHtml = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML code");
      return;
    }

    try {
      // Remove existing whitespace
      let html = input.trim();
      
      // Add newlines and indentation
      let formatted = "";
      let indent = 0;
      
      // Split into individual tags
      const tags = html.split(/(<\/?[^>]+>)/g);
      
      for (let tag of tags) {
        if (!tag.trim()) continue;
        
        // Check if it's a closing tag
        if (tag.match(/^<\//)) {
          indent--;
        }
        
        // Add indentation
        formatted += "\n" + "  ".repeat(Math.max(0, indent)) + tag.trim();
        
        // Check if it's an opening tag and not self-closing
        if (tag.match(/^<[^/]/) && !tag.match(/\/>$/) && !tag.match(/^<(br|hr|img|input|link|meta)/)) {
          indent++;
        }
      }
      
      setOutput(formatted.trim());
      toast.success("HTML beautified successfully!");
    } catch (error) {
      toast.error("Error formatting HTML. Please check your input.");
    }
  };

  const minifyHtml = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML code");
      return;
    }

    try {
      // Remove comments
      let minified = input.replace(/<!--[\s\S]*?-->/g, "");
      
      // Remove whitespace between tags
      minified = minified.replace(/>[\s\r\n]+</g, "><");
      
      // Remove unnecessary whitespace
      minified = minified.replace(/\s+/g, " ").trim();
      
      setOutput(minified);
      toast.success("HTML minified successfully!");
    } catch (error) {
      toast.error("Error minifying HTML. Please check your input.");
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No formatted HTML to copy");
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
            <CodeEditor
              placeholder="Enter HTML here..."
              value={input}
              onChange={setInput}
            />
            <div className="flex gap-2">
              <Button onClick={beautifyHtml}>Beautify HTML</Button>
              <Button onClick={minifyHtml} variant="outline">Minify HTML</Button>
              <Button onClick={clearAll} variant="outline">Clear All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <CodeEditor
              placeholder="Formatted HTML will appear here..."
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

export default HtmlFormatter;