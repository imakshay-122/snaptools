import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Image as ImageIcon, FlipHorizontal } from "lucide-react";
import { toast } from "sonner";

const ImageColorInverter = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [invertedImage, setInvertedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setInvertedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const invertColors = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];         // Invert red
        data[i + 1] = 255 - data[i + 1]; // Invert green
        data[i + 2] = 255 - data[i + 2]; // Invert blue
        // Alpha channel (data[i + 3]) remains unchanged
      }

      ctx.putImageData(imageData, 0, 0);
      const invertedDataUrl = canvas.toDataURL();
      setInvertedImage(invertedDataUrl);
      toast.success("Colors inverted successfully");
    };
    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!invertedImage) return;

    const link = document.createElement("a");
    link.href = invertedImage;
    link.download = "inverted-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inverted image downloaded");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="image-upload">Upload Image</Label>
          <div className="flex gap-2">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              size="icon"
            >
              <Upload size={18} />
            </Button>
          </div>
        </div>

        {originalImage && (
          <>
            <Button onClick={invertColors} className="w-full">
              <FlipHorizontal size={18} className="mr-2" />
              Invert Colors
            </Button>

            {invertedImage && (
              <Button onClick={handleDownload} className="w-full">
                <Download size={18} className="mr-2" />
                Download Inverted Image
              </Button>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        {!originalImage && (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md bg-muted/50">
            <div className="flex flex-col items-center text-muted-foreground">
              <ImageIcon size={48} className="mb-2" />
              <p>Upload an image to invert colors</p>
            </div>
          </div>
        )}

        {originalImage && (
          <div className="space-y-4">
            <div className="border rounded-md p-2">
              <img
                src={originalImage}
                alt="Original"
                className="max-w-full h-auto"
              />
            </div>
            {invertedImage && (
              <div className="border rounded-md p-2">
                <img
                  src={invertedImage}
                  alt="Inverted"
                  className="max-w-full h-auto"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageColorInverter;