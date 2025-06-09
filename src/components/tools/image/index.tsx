
import ImageCompressor from "./ImageCompressor";
import ImageSizeIncreaser from "./ImageSizeIncreaser";
import ImageBase64Converter from "./ImageBase64Converter";
import ImageFormatConverter from "./ImageFormatConverter";
import ImageDimensionChanger from "./ImageDimensionChanger";
import ImageCropper from "./ImageCropper";
import ImageColorInverter from "./ImageColorInverter";
import ImageBlackAndWhite from "./ImageBlackAndWhite";
import ImageFilterEffects from "./ImageFilterEffects";

type ImageToolComponentMap = {
  [key: string]: React.ComponentType;
};

const imageTools: ImageToolComponentMap = {
  "image-compressor": ImageCompressor,
  "image-size-increaser": ImageSizeIncreaser,
  "image-base64": ImageBase64Converter,
  "image-format-converter": ImageFormatConverter,
  "image-dimension-changer": ImageDimensionChanger,
  "image-cropper": ImageCropper,
  "image-color-inverter": ImageColorInverter,
  "image-black-and-white": ImageBlackAndWhite,
  "image-filter-effects": ImageFilterEffects
};

export default imageTools;
