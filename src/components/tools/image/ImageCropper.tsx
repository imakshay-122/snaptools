import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Image as ImageIcon, Crop } from "lucide-react";
import { toast } from "sonner";

const ImageCropper = () => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropDimensions, setCropDimensions] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setCroppedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropDimensions.width;
      canvas.height = cropDimensions.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(
        img,
        cropDimensions.x,
        cropDimensions.y,
        cropDimensions.width,
        cropDimensions.height,
        0,
        0,
        cropDimensions.width,
        cropDimensions.height
      );

      const croppedDataUrl = canvas.toDataURL();
      setCroppedImage(croppedDataUrl);
      toast.success("Image cropped successfully");
    };
    img.src = image;
  };

  const handleDownload = () => {
    if (!croppedImage) return;

    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "cropped-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Cropped image downloaded");
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

        {image && (
          <>
            <div className="space-y-2">
              <Label>Crop Dimensions</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="crop-x">X Position</Label>
                  <Input
                    id="crop-x"
                    type="number"
                    value={cropDimensions.x}
                    onChange={(e) =>
                      setCropDimensions({
                        ...cropDimensions,
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="crop-y">Y Position</Label>
                  <Input
                    id="crop-y"
                    type="number"
                    value={cropDimensions.y}
                    onChange={(e) =>
                      setCropDimensions({
                        ...cropDimensions,
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="crop-width">Width</Label>
                  <Input
                    id="crop-width"
                    type="number"
                    value={cropDimensions.width}
                    onChange={(e) =>
                      setCropDimensions({
                        ...cropDimensions,
                        width: parseInt(e.target.value) || 100,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="crop-height">Height</Label>
                  <Input
                    id="crop-height"
                    type="number"
                    value={cropDimensions.height}
                    onChange={(e) =>
                      setCropDimensions({
                        ...cropDimensions,
                        height: parseInt(e.target.value) || 100,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleCrop} className="w-full">
              <Crop size={18} className="mr-2" />
              Crop Image
            </Button>

            {croppedImage && (
              <Button onClick={handleDownload} className="w-full">
                <Download size={18} className="mr-2" />
                Download Cropped Image
              </Button>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        {!image && (
          <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md bg-muted/50">
            <div className="flex flex-col items-center text-muted-foreground">
              <ImageIcon size={48} className="mb-2" />
              <p>Upload an image to crop</p>
            </div>
          </div>
        )}

        {image && (
          <div className="space-y-4">
            <div className="border rounded-md p-2">
              <img
                src={image}
                alt="Original"
                className="max-w-full h-auto"
              />
            </div>
            {croppedImage && (
              <div className="border rounded-md p-2">
                <img
                  src={croppedImage}
                  alt="Cropped"
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

export default ImageCropper;