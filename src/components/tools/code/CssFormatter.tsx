import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/ui/code-editor";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const CssFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const beautifyCss = () => {
    if (!input.trim()) {
      toast.error("Please enter CSS code");
      return;
    }

    try {
      // Remove comments and extra whitespace
      let css = input.replace(/\/\*[\s\S]*?\*\//g, "").trim();
      
      // Split into rules
      const rules = css.split("}");
      let formatted = "";
      
      rules.forEach(rule => {
        if (!rule.trim()) return;
        
        // Split selectors and declarations
        const parts = rule.split("{");
        if (parts.length !== 2) return;
        
        const selector = parts[0].trim();
        const declarations = parts[1].trim();
        
        // Format declarations
        const props = declarations.split(";").filter(prop => prop.trim());
        const formattedProps = props.map(prop => `  ${prop.trim()};`).join("\n");
        
        // Combine formatted rule
        formatted += `${selector} {\n${formattedProps}\n}\n\n`;
      });
      
      setOutput(formatted.trim());
      toast.success("CSS beautified successfully!");
    } catch (error) {
      toast.error("Error formatting CSS. Please check your input.");
    }
  };

  const minifyCss = () => {
    if (!input.trim()) {
      toast.error("Please enter CSS code");
      return;
    }

    try {
      // Remove comments
      let minified = input.replace(/\/\*[\s\S]*?\*\//g, "");
      
      // Remove newlines and extra spaces
      minified = minified.replace(/\s+/g, " ");
      
      // Remove spaces around special characters
      minified = minified.replace(/\s*([{}:;,])\s*/g, "$1");
      
      // Remove trailing semicolons
      minified = minified.replace(/;}/g, "}");
      
      // Remove leading/trailing whitespace
      minified = minified.trim();
      
      setOutput(minified);
      toast.success("CSS minified successfully!");
    } catch (error) {
      toast.error("Error minifying CSS. Please check your input.");
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No formatted CSS to copy");
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
              placeholder="Enter CSS here..."
              value={input}
              onChange={setInput}
            />
            <div className="flex gap-2">
              <Button onClick={beautifyCss}>Beautify CSS</Button>
              <Button onClick={minifyCss} variant="outline">Minify CSS</Button>
              <Button onClick={clearAll} variant="outline">Clear All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <CodeEditor
              placeholder="Formatted CSS will appear here..."
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

export default CssFormatter;