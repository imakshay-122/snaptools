import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, X } from "lucide-react";
import AnimatedElement from "@/components/animated-element";

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [activeTab, setActiveTab] = useState<"date-timestamp" | "timestamp-date">("timestamp-date");

  // Convert timestamp to date
  const convertTimestampToDate = () => {
    if (!timestamp) {
      toast.error("Please enter a timestamp");
      return;
    }

    try {
      const ts = parseInt(timestamp, 10);
      if (isNaN(ts)) {
        toast.error("Invalid timestamp format");
        return;
      }

      // Handle both seconds and milliseconds timestamps
      const date = new Date(ts.toString().length === 10 ? ts * 1000 : ts);
      if (date.toString() === "Invalid Date") {
        throw new Error("Invalid timestamp");
      }

      setDateTime(date.toISOString());
      toast.success("Timestamp converted successfully");
    } catch (error) {
      toast.error("Failed to convert timestamp");
      console.error("Conversion error:", error);
    }
  };

  // Convert date to timestamp
  const convertDateToTimestamp = () => {
    if (!dateTime) {
      toast.error("Please enter a date and time");
      return;
    }

    try {
      const date = new Date(dateTime);
      if (date.toString() === "Invalid Date") {
        throw new Error("Invalid date format");
      }

      const ts = Math.floor(date.getTime() / 1000); // Convert to seconds
      setTimestamp(ts.toString());
      toast.success("Date converted to timestamp successfully");
    } catch (error) {
      toast.error("Failed to convert date. Please ensure the format is correct.");
      console.error("Conversion error:", error);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (content: string, type: "timestamp" | "date") => {
    if (!content) {
      toast.error(`No ${type} to copy`);
      return;
    }
    
    navigator.clipboard.writeText(content)
      .then(() => toast.success(`${type === "timestamp" ? "Timestamp" : "Date"} copied to clipboard`))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  const clearFields = () => {
    setTimestamp("");
    setDateTime("");
  };

  const getCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now.toString());
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    setDateTime(now.toISOString().slice(0, 16));
  };

  return (
    <AnimatedElement>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Timestamp Converter</CardTitle>
          <CardDescription>
            Convert between Unix timestamps and human-readable dates
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue="timestamp-date" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "timestamp-date" | "date-timestamp")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timestamp-date">Timestamp to Date</TabsTrigger>
              <TabsTrigger value="date-timestamp">Date to Timestamp</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timestamp-date" className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="timestamp-input">Unix Timestamp</Label>
                  <div className="space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={getCurrentTimestamp}
                    >
                      Current
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(timestamp, "timestamp")} 
                      disabled={!timestamp}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
                <Input
                  id="timestamp-input"
                  placeholder="Enter Unix timestamp (e.g., 1625097600)"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="date-output">Date and Time (UTC)</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(dateTime, "date")} 
                    disabled={!dateTime}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <Input
                  id="date-output"
                  value={dateTime}
                  readOnly
                  placeholder="Converted date will appear here"
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
                  onClick={convertTimestampToDate}
                >
                  Convert to Date
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="date-timestamp" className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="date-input">Date and Time (UTC)</Label>
                  <div className="space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={getCurrentDateTime}
                    >
                      Current
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(dateTime, "date")} 
                      disabled={!dateTime}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
                <Input
                  id="date-input"
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="timestamp-output">Unix Timestamp</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(timestamp, "timestamp")} 
                    disabled={!timestamp}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <Input
                  id="timestamp-output"
                  value={timestamp}
                  readOnly
                  placeholder="Converted timestamp will appear here"
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
                  onClick={convertDateToTimestamp}
                >
                  Convert to Timestamp
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default TimestampConverter;