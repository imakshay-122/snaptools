import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/ui/code-editor";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatJson = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON text");
      return;
    }

    try {
      const parsedJson = JSON.parse(input);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setOutput(formattedJson);
      toast.success("JSON formatted successfully!");
    } catch (error) {
      toast.error("Invalid JSON. Please check your input.");
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      toast.error("Please enter JSON text");
      return;
    }

    try {
      JSON.parse(input);
      toast.success("JSON is valid!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Invalid JSON: ${error.message}`);
      } else {
        toast.error("Invalid JSON");
      }
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No formatted JSON to copy");
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
              placeholder="Enter JSON here..."
              value={input}
              onChange={setInput}
            />
            <div className="flex gap-2">
              <Button onClick={formatJson}>Format JSON</Button>
              <Button onClick={validateJson} variant="outline">Validate JSON</Button>
              <Button onClick={clearAll} variant="outline">Clear All</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <CodeEditor
              placeholder="Formatted JSON will appear here..."
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

export default JsonFormatter;