import CurrencyConverter from "./CurrencyConverter";
import CryptoConverter from "./CryptoConverter";

type CurrencyToolComponentMap = {
  [key: string]: React.ComponentType;
};

const currencyTools: CurrencyToolComponentMap = {
  "currency-converter": CurrencyConverter,
  "crypto-converter": CryptoConverter,
};

export default currencyTools;