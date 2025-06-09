import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Upload, 
  Download, 
  Image as ImageIcon, 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  FlipVertical, 
  RefreshCw,
  Clock,
  Palette,
  Sliders,
  Layers
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ImageFilterEffects = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState("basic");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Basic filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [vibrance, setVibrance] = useState(0);

  // Advanced filters
  const [sepia, setSepia] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);
  const [invert, setInvert] = useState(0);
  const [opacity, setOpacity] = useState(100);

  // Transforms
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  // Effects
  const [currentEffect, setCurrentEffect] = useState("none");

  useEffect(() => {
    if (originalImage && historyIndex === -1) {
      addToHistory(originalImage);
    }
  }, [originalImage]);

  const addToHistory = (imageData) => {
    // Keep only the history up to current index if user went back
    const newHistory = [...history.slice(0, historyIndex + 1), imageData];
    // Limit history to 20 items
    const limitedHistory = newHistory.slice(-20);
    setHistory(limitedHistory);
    setHistoryIndex(limitedHistory.length - 1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      setOriginalImage(dataUrl);
      setPreviewImage(dataUrl);
      resetFilters();
      setHistory([]);
      setHistoryIndex(-1);
    };
    reader.readAsDataURL(file);
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setBlur(0);
    setGrayscale(0);
    setTemperature(0);
    setVibrance(0);
    setSepia(0);
    setHueRotate(0);
    setInvert(0);
    setOpacity(100);
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
    setCurrentEffect("none");
  };

  const applyFilters = () => {
    if (!originalImage) return;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      if (!canvasRef.current) {
        canvasRef.current = document.createElement("canvas");
      }
      
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set up transformation
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation * Math.PI / 180);
      if (flipX) ctx.scale(-1, 1);
      if (flipY) ctx.scale(1, -1);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Apply CSS filters
      ctx.filter = `
        brightness(${brightness}%) 
        contrast(${contrast}%) 
        saturate(${saturation + vibrance}%) 
        blur(${blur}px)
        grayscale(${grayscale}%)
        sepia(${sepia}%)
        hue-rotate(${hueRotate + temperature}deg)
        invert(${invert}%)
        opacity(${opacity}%)
      `;

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Apply special effects
      applySpecialEffect(ctx, canvas, currentEffect);

      ctx.restore();

      // Get result
      const filteredDataUrl = canvas.toDataURL("image/png");
      setPreviewImage(filteredDataUrl);
      addToHistory(filteredDataUrl);
      setIsProcessing(false);
    };
    
    // If we're applying from history, use the original image
    // Otherwise use current preview for compound effects
    img.src = historyIndex === 0 ? originalImage : previewImage;
  };

  const applySpecialEffect = (ctx, canvas, effect) => {
    // Skip if no effect
    if (effect === "none") return;

    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    switch(effect) {
      case "vignette":
        // Create a radial gradient for vignette
        const gradient = ctx.createRadialGradient(
          w/2, h/2, 0,
          w/2, h/2, Math.max(w, h) * 0.75
        );
        gradient.addColorStop(0, "rgba(0,0,0,0)");
        gradient.addColorStop(1, "rgba(0,0,0,0.85)");
        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = "multiply";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        break;
        
      case "noise":
        // Add random noise
        for (let i = 0; i < data.length; i += 4) {
          const noise = Math.random() * 30 - 15;
          data[i] = Math.min(255, Math.max(0, data[i] + noise));
          data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
          data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));
        }
        ctx.putImageData(imageData, 0, 0);
        break;
        
      case "pixelate":
        // Pixelate effect
        const size = Math.max(8, Math.ceil(Math.min(w, h) / 50));
        for (let y = 0; y < h; y += size) {
          for (let x = 0; x < w; x += size) {
            // Get the pixel color in the center of each block
            const pixelX = Math.min(x + size/2, w-1);
            const pixelY = Math.min(y + size/2, h-1);
            const pixelIndex = (pixelY * w + pixelX) * 4;
            
            // Fill the block with that color
            ctx.fillStyle = `rgba(${data[pixelIndex]}, ${data[pixelIndex+1]}, ${data[pixelIndex+2]}, ${data[pixelIndex+3]/255})`;
            ctx.fillRect(x, y, size, size);
          }
        }
        break;
        
      case "vintage":
        // Apply vintage film effect
        for (let i = 0; i < data.length; i += 4) {
          // Slightly reduce blue channel and add warmth
          data[i] = Math.min(255, data[i] * 1.1); // Increase red
          data[i+1] = Math.min(255, data[i+1] * 1.05); // Slightly increase green
          data[i+2] = Math.min(255, data[i+2] * 0.9); // Reduce blue
          
          // Add slight grain
          const grain = (Math.random() - 0.5) * 15;
          data[i] = Math.min(255, Math.max(0, data[i] + grain));
          data[i+1] = Math.min(255, Math.max(0, data[i+1] + grain));
          data[i+2] = Math.min(255, Math.max(0, data[i+2] + grain));
        }
        ctx.putImageData(imageData, 0, 0);
        break;

      case "duotone":
        // Apply duotone effect (blue/orange)
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i+1] + data[i+2]) / 3;
          if (avg < 128) {
            // Dark tones get blue
            data[i] = avg * 0.1;   // R
            data[i+1] = avg * 0.4; // G
            data[i+2] = avg * 0.9; // B
          } else {
            // Light tones get orange
            data[i] = avg * 1.0;   // R
            data[i+1] = avg * 0.6; // G
            data[i+2] = avg * 0.1; // B
          }
        }
        ctx.putImageData(imageData, 0, 0);
        break;
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPreviewImage(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPreviewImage(history[historyIndex + 1]);
    }
  };

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const handleFlipX = () => {
    setFlipX((prev) => !prev);
  };

  const handleFlipY = () => {
    setFlipY((prev) => !prev);
  };

  const handleReset = () => {
    if (originalImage) {
      setPreviewImage(originalImage);
      resetFilters();
      setHistory([originalImage]);
      setHistoryIndex(0);
    }
  };

  const handleDownload = () => {
    if (!previewImage) return;

    const link = document.createElement("a");
    link.href = previewImage;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    link.download = `filtered-image-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Modern Image Filter & Effects Tool</h2>
      
      <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
        {/* Preview Panel */}
        <div className="space-y-4 order-1 md:order-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="aspect-square rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col h-full items-center justify-center text-gray-400">
                  <ImageIcon className="h-16 w-16 mb-2" />
                  <span>Upload an image to begin editing</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              className="flex items-center justify-center"
              variant="outline"
            >
              <Upload size={18} className="mr-2" />
              Upload Image
            </Button>
            
            <Button 
              onClick={handleDownload} 
              className="flex items-center justify-center"
              disabled={!previewImage}
            >
              <Download size={18} className="mr-2" />
              Download
            </Button>
          </div>
          
          {/* History & Transforms */}
          {previewImage && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
              <div className="flex justify-between mb-4">
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleUndo}
                    disabled={historyIndex <= 0}
                  >
                    <RotateCcw size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleRedo}
                    disabled={historyIndex >= history.length - 1}
                  >
                    <RotateCw size={16} />
                  </Button>
                </div>
                
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleRotateLeft}
                  >
                    <RotateCcw size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleRotateRight}
                  >
                    <RotateCw size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleFlipX}
                  >
                    <FlipHorizontal size={16} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleFlipY}
                  >
                    <FlipVertical size={16} />
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleReset}
                >
                  <RefreshCw size={16} className="mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Controls Panel */}
        <div className="space-y-6 order-2 md:order-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            
            {originalImage && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="basic" className="flex items-center">
                    <Sliders size={16} className="mr-2" />
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center">
                    <Palette size={16} className="mr-2" />
                    Advanced
                  </TabsTrigger>
                  <TabsTrigger value="effects" className="flex items-center">
                    <Layers size={16} className="mr-2" />
                    Effects
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Brightness</Label>
                      <span className="text-sm">{brightness}%</span>
                    </div>
                    <Slider
                      value={[brightness]}
                      onValueChange={(value) => setBrightness(value[0])}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Contrast</Label>
                      <span className="text-sm">{contrast}%</span>
                    </div>
                    <Slider
                      value={[contrast]}
                      onValueChange={(value) => setContrast(value[0])}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Saturation</Label>
                      <span className="text-sm">{saturation}%</span>
                    </div>
                    <Slider
                      value={[saturation]}
                      onValueChange={(value) => setSaturation(value[0])}
                      min={0}
                      max={200}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Blur</Label>
                      <span className="text-sm">{blur}px</span>
                    </div>
                    <Slider
                      value={[blur]}
                      onValueChange={(value) => setBlur(value[0])}
                      min={0}
                      max={10}
                      step={0.1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Grayscale</Label>
                      <span className="text-sm">{grayscale}%</span>
                    </div>
                    <Slider
                      value={[grayscale]}
                      onValueChange={(value) => setGrayscale(value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Temperature</Label>
                      <span className="text-sm">{temperature}°</span>
                    </div>
                    <Slider
                      value={[temperature]}
                      onValueChange={(value) => setTemperature(value[0])}
                      min={-100}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Vibrance</Label>
                      <span className="text-sm">{vibrance}%</span>
                    </div>
                    <Slider
                      value={[vibrance]}
                      onValueChange={(value) => setVibrance(value[0])}
                      min={-100}
                      max={100}
                      step={1}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="advanced" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Sepia</Label>
                      <span className="text-sm">{sepia}%</span>
                    </div>
                    <Slider
                      value={[sepia]}
                      onValueChange={(value) => setSepia(value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Hue Rotate</Label>
                      <span className="text-sm">{hueRotate}°</span>
                    </div>
                    <Slider
                      value={[hueRotate]}
                      onValueChange={(value) => setHueRotate(value[0])}
                      min={0}
                      max={360}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Invert</Label>
                      <span className="text-sm">{invert}%</span>
                    </div>
                    <Slider
                      value={[invert]}
                      onValueChange={(value) => setInvert(value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Opacity</Label>
                      <span className="text-sm">{opacity}%</span>
                    </div>
                    <Slider
                      value={[opacity]}
                      onValueChange={(value) => setOpacity(value[0])}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="effects" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Special Effects</Label>
                    <Select value={currentEffect} onValueChange={setCurrentEffect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an effect" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="vignette">Vignette</SelectItem>
                        <SelectItem value="pixelate">Pixelate</SelectItem>
                        <SelectItem value="noise">Film Grain</SelectItem>
                        <SelectItem value="duotone">Duotone</SelectItem>
                        <SelectItem value="vintage">Vintage Film</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-sm text-gray-500 mb-4">
                      Special effects require applying changes to see the result. 
                      Your current adjustments will be applied together with the selected effect.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto p-1">
                    {history.map((img, index) => (
                      <div 
                        key={index}
                        className={`aspect-square rounded border-2 cursor-pointer overflow-hidden ${
                          index === historyIndex ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
                        }`}
                        onClick={() => {
                          setHistoryIndex(index);
                          setPreviewImage(img);
                        }}
                      >
                        <img src={img} alt={`History ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  {history.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No history available yet. Apply some filters to see your changes here.
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
          
          {originalImage && (
            <Button 
              onClick={applyFilters} 
              className="w-full" 
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Apply Changes"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageFilterEffects;