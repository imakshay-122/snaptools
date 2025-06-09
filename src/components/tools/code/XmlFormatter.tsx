import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/ui/code-editor";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const XmlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatXml = () => {
    if (!input.trim()) {
      toast.error("Please enter XML text");
      return;
    }

    try {
      // Remove whitespace between tags
      let xml = input.replace(/>[\s\r\n]*</g, "><");
      
      // Add newline and indentation
      let formatted = "";
      let indent = 0;
      
      xml.split(/>[<]/).forEach(node => {
        if (node.match(/^\/\w/)) {
          indent -= 1;
        }
        formatted += "\n" + "  ".repeat(indent) + "<" + node + ">";
        if (!node.match(/^\//) && !node.match(/\/$/)) {
          indent += 1;
        }
        if (node.match(/\/$/)) {
          indent -= 1;
        }
      });

      // Remove first line break and fix self-closing tags
      formatted = formatted.substring(1).replace(/></g, ">");
      setOutput(formatted);
      toast.success("XML formatted successfully!");
    } catch (error) {
      toast.error("Invalid XML. Please check your input.");
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No formatted XML to copy");
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
              placeholder="Enter XML here..."
              value={input}
              onChange={setInput}
            />
            <div className="flex gap-2">
              <Button onClick={formatXml}>Format XML</Button>
              <Button onClick={clearAll} variant="outline">Clear All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <CodeEditor
              placeholder="Formatted XML will appear here..."
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

export default XmlFormatter;