import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";
import parserTypescript from "prettier/parser-typescript";

type Language = {
  id: string;
  name: string;
  parser: string;
};

const languages: Language[] = [
  { id: "javascript", name: "JavaScript", parser: "babel" },
  { id: "typescript", name: "TypeScript", parser: "typescript" },
  { id: "html", name: "HTML", parser: "html" },
  { id: "css", name: "CSS", parser: "css" },
  { id: "json", name: "JSON", parser: "json" },
];

const CodeFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);

  const getParser = (languageId: string) => {
    switch (languageId) {
      case "javascript":
        return { parser: "babel", plugin: parserBabel };
      case "typescript":
        return { parser: "typescript", plugin: parserTypescript };
      case "html":
        return { parser: "html", plugin: parserHtml };
      case "css":
        return { parser: "css", plugin: parserCss };
      case "json":
        return { parser: "json", plugin: parserBabel };
      default:
        return { parser: "babel", plugin: parserBabel };
    }
  };

  const formatCode = async () => {
    if (!input.trim()) {
      toast.error("Please enter some code to format");
      return;
    }

    setIsLoading(true);
    try {
      const { parser, plugin } = getParser(language);
      const formattedCode = await prettier.format(input, {
        parser,
        plugins: [plugin],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
      });
      setOutput(formattedCode);
      toast.success("Code formatted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to format code. Please check your input.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) {
      toast.error("No formatted code to copy");
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <AnimatedElement>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Code Formatter</h3>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="input">Input Code</Label>
              <Textarea
                id="input"
                className="h-[400px] font-mono"
                placeholder="Paste your code here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="output">Formatted Code</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  Copy
                </Button>
              </div>
              <Textarea
                id="output"
                className="h-[400px] font-mono"
                value={output}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={formatCode}
              disabled={isLoading}
              className="min-w-[200px]"
            >
              {isLoading ? "Formatting..." : "Format Code"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Powered by Prettier. Supports JavaScript, TypeScript, HTML, CSS, and JSON.
          </div>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default CodeFormatter;