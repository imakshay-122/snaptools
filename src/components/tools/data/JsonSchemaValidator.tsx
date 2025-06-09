import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";
import Ajv from "ajv";

const JsonSchemaValidator = () => {
  const [schema, setSchema] = useState("");
  const [json, setJson] = useState("");
  const [validationResult, setValidationResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const validateJson = () => {
    if (!schema.trim() || !json.trim()) {
      toast.error("Please provide both schema and JSON data");
      return;
    }

    setIsLoading(true);
    try {
      const ajv = new Ajv({ allErrors: true });
      let parsedSchema = JSON.parse(schema);
      let parsedJson = JSON.parse(json);

      const validate = ajv.compile(parsedSchema);
      const valid = validate(parsedJson);

      if (valid) {
        setValidationResult("✅ JSON is valid according to the schema");
        toast.success("Validation successful");
      } else {
        const errors = validate.errors?.map(
          (error) => `${error.instancePath} ${error.message}`
        ).join('\n');
        setValidationResult(`❌ Validation errors:\n${errors}`);
        toast.error("Validation failed");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof SyntaxError) {
        toast.error("Invalid JSON syntax");
        setValidationResult(`❌ Syntax error: ${error.message}`);
      } else {
        toast.error("Validation failed");
        setValidationResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearFields = () => {
    setSchema("");
    setJson("");
    setValidationResult("");
  };

  return (
    <AnimatedElement>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">JSON Schema Validator</h3>
            <Button variant="ghost" size="sm" onClick={clearFields}>
              Clear All
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="schema">JSON Schema</Label>
              <Textarea
                id="schema"
                className="h-[300px] font-mono"
                placeholder="Enter your JSON schema here..."
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="json">JSON Data</Label>
              <Textarea
                id="json"
                className="h-[300px] font-mono"
                placeholder="Enter your JSON data here..."
                value={json}
                onChange={(e) => setJson(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={validateJson}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Validating..." : "Validate JSON"}
            </Button>

            {validationResult && (
              <div className="p-4 bg-muted rounded-lg">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {validationResult}
                </pre>
              </div>
            )}
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Validate your JSON data against a JSON Schema specification.
            Supports JSON Schema draft-07.
          </div>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default JsonSchemaValidator;