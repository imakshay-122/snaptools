
import BinaryConverter from "./BinaryConverter";
import HexDecimalConverter from "./HexDecimalConverter";
import Base64Converter from "./Base64Converter";
import TextAsciiConverter from "./TextAsciiConverter";
import TimestampConverter from "./TimestampConverter";
import TimeZoneConverter from "./TimeZoneConverter";
import MorseCodeConverter from "./MorseCodeConverter";
import CryptoConverter from "./CryptoConverter";

const conversionTools = {
  "binary-decimal": BinaryConverter,
  "binary-hex": BinaryConverter,
  "hex-decimal": HexDecimalConverter,
  "base64": Base64Converter,
  "text-ascii": TextAsciiConverter,
  "timestamp-converter": TimestampConverter,
  "timezone-converter": TimeZoneConverter,
  "morse-code-converter": MorseCodeConverter,
  "crypto-converter": CryptoConverter,
};

export default conversionTools;
