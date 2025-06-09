import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";
import { fetchCryptoRates } from "@/lib/api/exchange-rates";

type Crypto = {
  code: string;
  name: string;
  symbol: string;
};

const cryptos: Crypto[] = [
  { code: "BTC", name: "Bitcoin", symbol: "₿" },
  { code: "ETH", name: "Ethereum", symbol: "Ξ" },
  { code: "USDT", name: "Tether", symbol: "₮" },
  { code: "BNB", name: "Binance Coin", symbol: "BNB" },
  { code: "XRP", name: "Ripple", symbol: "XRP" },
  { code: "SOL", name: "Solana", symbol: "SOL" },
  { code: "ADA", name: "Cardano", symbol: "ADA" },
  { code: "DOGE", name: "Dogecoin", symbol: "Ð" },
  { code: "MATIC", name: "Polygon", symbol: "MATIC" },
  { code: "DOT", name: "Polkadot", symbol: "DOT" },
];

const cryptoIdMap = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  BNB: 'binancecoin',
  XRP: 'ripple',
  SOL: 'solana',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  MATIC: 'matic-network',
  DOT: 'polkadot',
};

const CryptoConverter = () => {
  const [cryptoRates, setCryptoRates] = useState<{[key: string]: {usd: number}}>({});
  const [amount, setAmount] = useState<string>("1");
  const [fromCrypto, setFromCrypto] = useState<string>("BTC");
  const [toCrypto, setToCrypto] = useState<string>("ETH");
  const [result, setResult] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    refreshRates();
  }, []);

  useEffect(() => {
    if (amount && fromCrypto && toCrypto) {
      convertCrypto();
    }
  }, [amount, fromCrypto, toCrypto]);

  const convertCrypto = () => {
    if (!cryptoRates || Object.keys(cryptoRates).length === 0) {
      return;
    }

    const value = parseFloat(amount);
    
    if (isNaN(value)) {
      setResult("");
      return;
    }

    const fromId = cryptoIdMap[fromCrypto as keyof typeof cryptoIdMap];
    const toId = cryptoIdMap[toCrypto as keyof typeof cryptoIdMap];
    
    const fromRate = cryptoRates[fromId]?.usd;
    const toRate = cryptoRates[toId]?.usd;
    
    if (fromRate && toRate) {
      const convertedAmount = (value * fromRate) / toRate;
      
      const toCryptoObj = cryptos.find(c => c.code === toCrypto);
      setResult(`${toCryptoObj?.symbol || ''} ${convertedAmount.toLocaleString(undefined, {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      })}`);
    }
  };

  const refreshRates = async () => {
    setIsLoading(true);
    try {
      const cryptoIds = Object.values(cryptoIdMap);
      const rates = await fetchCryptoRates(cryptoIds);
      setCryptoRates(rates);
      setLastUpdated(new Date().toLocaleString());
      toast.success("Crypto rates updated!");
      convertCrypto();
    } catch (error) {
      toast.error("Failed to update crypto rates");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCryptos = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
  };

  return (
    <AnimatedElement>
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Crypto Converter</h3>
            <div className="text-xs text-muted-foreground">
              Rates last updated: {lastUpdated}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2 h-6 px-2" 
                onClick={refreshRates}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "⟳"}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
              <div className="space-y-2">
                <Label htmlFor="from-crypto">From</Label>
                <Select value={fromCrypto} onValueChange={setFromCrypto}>
                  <SelectTrigger id="from-crypto">
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptos.map((crypto) => (
                      <SelectItem key={crypto.code} value={crypto.code}>
                        {crypto.symbol} {crypto.code} - {crypto.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-center h-12">
                <button
                  onClick={handleSwapCryptos}
                  className="rounded-full p-2 hover:bg-muted"
                  title="Swap cryptocurrencies"
                >
                  ⇄
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-crypto">To</Label>
                <Select value={toCrypto} onValueChange={setToCrypto}>
                  <SelectTrigger id="to-crypto">
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptos.map((crypto) => (
                      <SelectItem key={crypto.code} value={crypto.code}>
                        {crypto.symbol} {crypto.code} - {crypto.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-1">Converted Amount</div>
              <div className="text-2xl font-semibold">
                {result || "-"}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {amount && result
                  ? `${cryptos.find(c => c.code === fromCrypto)?.symbol || ''} ${parseFloat(amount).toLocaleString(undefined, {
                      minimumFractionDigits: 8,
                      maximumFractionDigits: 8,
                    })} ${fromCrypto} = ${result} ${toCrypto}`
                  : ""}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
          💱 Rates are fetched from exchangeratesapi.io 
          and may slightly differ from real-time market values.
          </div>
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default CryptoConverter;