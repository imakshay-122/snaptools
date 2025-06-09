import { useState } from "react";
import JsBarcode from "jsbarcode";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedElement from "@/components/animated-element";

const BarcodeGenerator = () => {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("CODE128");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [barcodeUrl, setBarcodeUrl] = useState("");

  const generateBarcode = () => {
    if (!text) {
      toast.error("Please enter some text");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, text, {
        format,
        width,
        height,
        lineColor: color,
        background: bgColor,
        margin: 10,
        displayValue: true,
        fontSize: 16,
      });

      setBarcodeUrl(canvas.toDataURL("image/png"));
      toast.success("Barcode generated successfully!");
    } catch (error) {
      console.error("Error generating barcode:", error);
      toast.error("Failed to generate barcode. Please check your input.");
    }
  };

  const downloadBarcode = () => {
    if (!barcodeUrl) {
      toast.error("Please generate a barcode first");
      return;
    }

    const link = document.createElement("a");
    link.href = barcodeUrl;
    link.download = `barcode-${format.toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Barcode downloaded successfully!");
  };

  return (
    <AnimatedElement>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Input
                id="text"
                placeholder="Enter text for barcode"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Barcode Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select barcode format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CODE128">Code 128</SelectItem>
                  <SelectItem value="EAN13">EAN-13</SelectItem>
                  <SelectItem value="EAN8">EAN-8</SelectItem>
                  <SelectItem value="UPC">UPC</SelectItem>
                  <SelectItem value="CODE39">Code 39</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="width">Bar Width: {width}px</Label>
              <Slider
                id="width"
                min={1}
                max={4}
                step={0.5}
                value={[width]}
                onValueChange={(values) => setWidth(values[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height: {height}px</Label>
              <Slider
                id="height"
                min={50}
                max={200}
                step={10}
                value={[height]}
                onValueChange={(values) => setHeight(values[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Bar Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={generateBarcode} className="w-full">
                Generate Barcode
              </Button>
              <Button
                onClick={downloadBarcode}
                variant="outline"
                disabled={!barcodeUrl}
                className="w-full"
              >
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            {barcodeUrl ? (
              <div className="text-center">
                <img
                  src={barcodeUrl}
                  alt="Barcode"
                  className="mx-auto mb-4 border rounded-lg"
                />
                <p className="text-sm text-muted-foreground">Your barcode is ready!</p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p className="mb-2">Your barcode will appear here</p>
                <p className="text-sm">Fill in the details and click Generate</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AnimatedElement>
  );
};

export default BarcodeGenerator;