import axios from 'axios';

const EXCHANGERATE_API_KEY = import.meta.env.VITE_EXCHANGERATE_API_KEY || 'your_api_key_here';
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
const EXCHANGERATE_BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

type CurrencyRates = {
  [key: string]: number;
};

type CryptoRates = {
  [key: string]: {
    usd: number;
  };
};

export const fetchCurrencyRates = async (baseCurrency: string = 'USD'): Promise<CurrencyRates> => {
  try {
    const response = await axios.get(
      `${EXCHANGERATE_BASE_URL}/${baseCurrency}`
    );

    return response.data.rates;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    throw error;
  }
};

export const fetchCryptoRates = async (cryptoIds: string[]): Promise<CryptoRates> => {
  try {
    const ids = cryptoIds.join(',').toLowerCase();
    const response = await axios.get(
      `${COINGECKO_BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching crypto rates:', error);
    throw error;
  }
};