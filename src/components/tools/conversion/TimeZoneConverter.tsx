import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Copy, X } from "lucide-react";
import AnimatedElement from "@/components/animated-element";

const TimeZoneConverter = () => {
  const [sourceDateTime, setSourceDateTime] = useState("");
  const [sourceTimeZone, setSourceTimeZone] = useState("UTC");
  const [targetTimeZone, setTargetTimeZone] = useState("UTC");
  const [convertedDateTime, setConvertedDateTime] = useState("");

  // List of common time zones
  const timeZones = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
    "Pacific/Auckland"
  ];

  const convertTime = () => {
    if (!sourceDateTime) {
      toast.error("Please enter a date and time");
      return;
    }

    try {
      const date = new Date(sourceDateTime);
      if (date.toString() === "Invalid Date") {
        throw new Error("Invalid date format");
      }

      const options = {
        timeZone: targetTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      } as Intl.DateTimeFormatOptions;

      const converted = date.toLocaleString('en-US', options);
      setConvertedDateTime(converted);
      toast.success("Time converted successfully");
    } catch (error) {
      toast.error("Failed to convert time. Please check your input.");
      console.error("Conversion error:", error);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (content: string, type: "source" | "converted") => {
    if (!content) {
      toast.error(`No ${type} time to copy`);
      return;
    }
    
    navigator.clipboard.writeText(content)
      .then(() => toast.success(`${type === "source" ? "Source" : "Converted"} time copied to clipboard`))
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  const clearFields = () => {
    setSourceDateTime("");
    setConvertedDateTime("");
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    setSourceDateTime(now.toISOString().slice(0, 16));
  };

  return (
    <AnimatedElement>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Time Zone Converter</CardTitle>
          <CardDescription>
            Convert times between different time zones
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="source-datetime">Source Date and Time</Label>
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
                  onClick={() => copyToClipboard(sourceDateTime, "source")} 
                  disabled={!sourceDateTime}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
            </div>
            <Input
              id="source-datetime"
              type="datetime-local"
              value={sourceDateTime}
              onChange={(e) => setSourceDateTime(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-timezone">From Time Zone</Label>
              <Select
                value={sourceTimeZone}
                onValueChange={setSourceTimeZone}
              >
                <SelectTrigger id="source-timezone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  {timeZones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-timezone">To Time Zone</Label>
              <Select
                value={targetTimeZone}
                onValueChange={setTargetTimeZone}
              >
                <SelectTrigger id="target-timezone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  {timeZones.map((tz) => (
                    <SelectItem key={tz} value={tz}>
                      {tz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="converted-datetime">Converted Time</Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(convertedDateTime, "converted")} 
                disabled={!convertedDateTime}
              >
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            </div>
            <Input
              id="converted-datetime"
              value={convertedDateTime}
              readOnly
              placeholder="Converted time will appear here"
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
              onClick={convertTime}
            >
              Convert
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default TimeZoneConverter;