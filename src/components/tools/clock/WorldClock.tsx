import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeZoneCity {
  city: string;
  timezone: string;
}

interface CountryData {
  name: string;
  cities: TimeZoneCity[];
}

const countryData: CountryData[] = [
  {
    name: 'United States',
    cities: [
      { city: 'New York', timezone: 'America/New_York' },
      { city: 'Los Angeles', timezone: 'America/Los_Angeles' },
      { city: 'Chicago', timezone: 'America/Chicago' },
      { city: 'Denver', timezone: 'America/Denver' },
      { city: 'Phoenix', timezone: 'America/Phoenix' },
      { city: 'Anchorage', timezone: 'America/Anchorage' },
      { city: 'Honolulu', timezone: 'Pacific/Honolulu' },
    ],
  },
  {
    name: 'United Kingdom',
    cities: [
      { city: 'London', timezone: 'Europe/London' },
      { city: 'Edinburgh', timezone: 'Europe/London' },
      { city: 'Manchester', timezone: 'Europe/London' },
      { city: 'Belfast', timezone: 'Europe/London' },
    ],
  },
  {
    name: 'Japan',
    cities: [
      { city: 'Tokyo', timezone: 'Asia/Tokyo' },
      { city: 'Osaka', timezone: 'Asia/Tokyo' },
      { city: 'Sapporo', timezone: 'Asia/Tokyo' },
      { city: 'Fukuoka', timezone: 'Asia/Tokyo' },
    ],
  },
  {
    name: 'Australia',
    cities: [
      { city: 'Sydney', timezone: 'Australia/Sydney' },
      { city: 'Melbourne', timezone: 'Australia/Melbourne' },
      { city: 'Brisbane', timezone: 'Australia/Brisbane' },
      { city: 'Perth', timezone: 'Australia/Perth' },
      { city: 'Adelaide', timezone: 'Australia/Adelaide' },
      { city: 'Darwin', timezone: 'Australia/Darwin' },
      { city: 'Hobart', timezone: 'Australia/Hobart' },
    ],
  },
  {
    name: 'China',
    cities: [
      { city: 'Beijing', timezone: 'Asia/Shanghai' },
      { city: 'Shanghai', timezone: 'Asia/Shanghai' },
      { city: 'Guangzhou', timezone: 'Asia/Shanghai' },
      { city: 'Shenzhen', timezone: 'Asia/Shanghai' },
    ],
  },
  {
    name: 'India',
    cities: [
      { city: 'New Delhi', timezone: 'Asia/Kolkata' },
      { city: 'Kolkata', timezone: 'Asia/Kolkata' },
      { city: 'Mumbai', timezone: 'Asia/Kolkata' },
      { city: 'Bangalore', timezone: 'Asia/Kolkata' },
      { city: 'Chennai', timezone: 'Asia/Kolkata' },
    ],
  },
  {
    name: 'Germany',
    cities: [
      { city: 'Berlin', timezone: 'Europe/Berlin' },
      { city: 'Munich', timezone: 'Europe/Berlin' },
      { city: 'Hamburg', timezone: 'Europe/Berlin' },
      { city: 'Frankfurt', timezone: 'Europe/Berlin' },
    ],
  },
  {
    name: 'France',
    cities: [
      { city: 'Paris', timezone: 'Europe/Paris' },
      { city: 'Lyon', timezone: 'Europe/Paris' },
      { city: 'Marseille', timezone: 'Europe/Paris' },
      { city: 'Toulouse', timezone: 'Europe/Paris' },
    ],
  },
  {
    name: 'Brazil',
    cities: [
      { city: 'Sao Paulo', timezone: 'America/Sao_Paulo' },
      { city: 'Rio de Janeiro', timezone: 'America/Sao_Paulo' },
      { city: 'Brasilia', timezone: 'America/Sao_Paulo' },
      { city: 'Salvador', timezone: 'America/Bahia' },
    ],
  },
  {
    name: 'Canada',
    cities: [
      { city: 'Toronto', timezone: 'America/Toronto' },
      { city: 'Vancouver', timezone: 'America/Vancouver' },
      { city: 'Montreal', timezone: 'America/Montreal' },
      { city: 'Calgary', timezone: 'America/Edmonton' },
    ],
  },
  {
    name: 'Russia',
    cities: [
      { city: 'Moscow', timezone: 'Europe/Moscow' },
      { city: 'Saint Petersburg', timezone: 'Europe/Moscow' },
      { city: 'Novosibirsk', timezone: 'Asia/Novosibirsk' },
      { city: 'Vladivostok', timezone: 'Asia/Vladivostok' },
    ],
  },
  {
    name: 'South Korea',
    cities: [
      { city: 'Seoul', timezone: 'Asia/Seoul' },
      { city: 'Busan', timezone: 'Asia/Seoul' },
      { city: 'Incheon', timezone: 'Asia/Seoul' },
      { city: 'Daegu', timezone: 'Asia/Seoul' },
    ],
  },
  {
    name: 'Mexico',
    cities: [
      { city: 'Mexico City', timezone: 'America/Mexico_City' },
      { city: 'Guadalajara', timezone: 'America/Mexico_City' },
      { city: 'Monterrey', timezone: 'America/Monterrey' },
      { city: 'Tijuana', timezone: 'America/Tijuana' },
    ],
  },
  {
    name: 'Spain',
    cities: [
      { city: 'Madrid', timezone: 'Europe/Madrid' },
      { city: 'Barcelona', timezone: 'Europe/Madrid' },
      { city: 'Valencia', timezone: 'Europe/Madrid' },
      { city: 'Seville', timezone: 'Europe/Madrid' },
    ],
  },
  {
    name: 'Italy',
    cities: [
      { city: 'Rome', timezone: 'Europe/Rome' },
      { city: 'Milan', timezone: 'Europe/Rome' },
      { city: 'Naples', timezone: 'Europe/Rome' },
      { city: 'Turin', timezone: 'Europe/Rome' },
    ],
  },
  {
    name: 'Singapore',
    cities: [
      { city: 'Singapore', timezone: 'Asia/Singapore' },
    ],
  },
  {
    name: 'New Zealand',
    cities: [
      { city: 'Auckland', timezone: 'Pacific/Auckland' },
      { city: 'Wellington', timezone: 'Pacific/Auckland' },
      { city: 'Christchurch', timezone: 'Pacific/Auckland' },
      { city: 'Hamilton', timezone: 'Pacific/Auckland' },
    ],
  },
  {
    name: 'South Africa',
    cities: [
      { city: 'Johannesburg', timezone: 'Africa/Johannesburg' },
      { city: 'Cape Town', timezone: 'Africa/Johannesburg' },
      { city: 'Durban', timezone: 'Africa/Johannesburg' },
      { city: 'Pretoria', timezone: 'Africa/Johannesburg' },
    ],
  },
  {
    name: 'Argentina',
    cities: [
      { city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
      { city: 'Cordoba', timezone: 'America/Argentina/Cordoba' },
      { city: 'Rosario', timezone: 'America/Argentina/Rosario' },
      { city: 'Mendoza', timezone: 'America/Argentina/Mendoza' },
    ],
  },
  {
    name: 'Thailand',
    cities: [
      { city: 'Bangkok', timezone: 'Asia/Bangkok' },
      { city: 'Phuket', timezone: 'Asia/Bangkok' },
      { city: 'Chiang Mai', timezone: 'Asia/Bangkok' },
      { city: 'Pattaya', timezone: 'Asia/Bangkok' },
    ],
  },
  {
    name: 'Netherlands',
    cities: [
      { city: 'Amsterdam', timezone: 'Europe/Amsterdam' },
      { city: 'Rotterdam', timezone: 'Europe/Amsterdam' },
      { city: 'The Hague', timezone: 'Europe/Amsterdam' },
      { city: 'Utrecht', timezone: 'Europe/Amsterdam' },
    ],
  },
  {
    name: 'Sweden',
    cities: [
      { city: 'Stockholm', timezone: 'Europe/Stockholm' },
      { city: 'Gothenburg', timezone: 'Europe/Stockholm' },
      { city: 'Malmo', timezone: 'Europe/Stockholm' },
      { city: 'Uppsala', timezone: 'Europe/Stockholm' },
    ],
  },
  {
    name: 'Norway',
    cities: [
      { city: 'Oslo', timezone: 'Europe/Oslo' },
      { city: 'Bergen', timezone: 'Europe/Oslo' },
      { city: 'Trondheim', timezone: 'Europe/Oslo' },
      { city: 'Stavanger', timezone: 'Europe/Oslo' },
    ],
  },
  {
    name: 'Denmark',
    cities: [
      { city: 'Copenhagen', timezone: 'Europe/Copenhagen' },
      { city: 'Aarhus', timezone: 'Europe/Copenhagen' },
      { city: 'Odense', timezone: 'Europe/Copenhagen' },
      { city: 'Aalborg', timezone: 'Europe/Copenhagen' },
    ],
  },
  {
    name: 'Poland',
    cities: [
      { city: 'Warsaw', timezone: 'Europe/Warsaw' },
      { city: 'Krakow', timezone: 'Europe/Warsaw' },
      { city: 'Lodz', timezone: 'Europe/Warsaw' },
      { city: 'Wroclaw', timezone: 'Europe/Warsaw' },
    ],
  },
  {
    name: 'Turkey',
    cities: [
      { city: 'Istanbul', timezone: 'Europe/Istanbul' },
      { city: 'Ankara', timezone: 'Europe/Istanbul' },
      { city: 'Izmir', timezone: 'Europe/Istanbul' },
      { city: 'Antalya', timezone: 'Europe/Istanbul' },
    ],
  },
  {
    name: 'Israel',
    cities: [
      { city: 'Jerusalem', timezone: 'Asia/Jerusalem' },
      { city: 'Tel Aviv', timezone: 'Asia/Jerusalem' },
      { city: 'Haifa', timezone: 'Asia/Jerusalem' },
      { city: 'Eilat', timezone: 'Asia/Jerusalem' },
    ],
  },
  {
    name: 'United Arab Emirates',
    cities: [
      { city: 'Dubai', timezone: 'Asia/Dubai' },
      { city: 'Abu Dhabi', timezone: 'Asia/Dubai' },
      { city: 'Sharjah', timezone: 'Asia/Dubai' },
      { city: 'Ajman', timezone: 'Asia/Dubai' },
    ],
  },
  {
    name: 'Malaysia',
    cities: [
      { city: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur' },
      { city: 'George Town', timezone: 'Asia/Kuala_Lumpur' },
      { city: 'Johor Bahru', timezone: 'Asia/Kuala_Lumpur' },
      { city: 'Ipoh', timezone: 'Asia/Kuala_Lumpur' },
    ],
  },
  {
    name: 'Indonesia',
    cities: [
      { city: 'Jakarta', timezone: 'Asia/Jakarta' },
      { city: 'Surabaya', timezone: 'Asia/Jakarta' },
      { city: 'Medan', timezone: 'Asia/Jakarta' },
      { city: 'Bandung', timezone: 'Asia/Jakarta' },
    ],
  },
  {
    name: 'Philippines',
    cities: [
      { city: 'Manila', timezone: 'Asia/Manila' },
      { city: 'Quezon City', timezone: 'Asia/Manila' },
      { city: 'Davao City', timezone: 'Asia/Manila' },
      { city: 'Cebu City', timezone: 'Asia/Manila' },
    ],
  },
  {
    name: 'Vietnam',
    cities: [
      { city: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh' },
      { city: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh' },
      { city: 'Da Nang', timezone: 'Asia/Ho_Chi_Minh' },
      { city: 'Hai Phong', timezone: 'Asia/Ho_Chi_Minh' },
    ],
  },
  {
    name: 'Egypt',
    cities: [
      { city: 'Cairo', timezone: 'Africa/Cairo' },
      { city: 'Alexandria', timezone: 'Africa/Cairo' },
      { city: 'Giza', timezone: 'Africa/Cairo' },
      { city: 'Shubra El Kheima', timezone: 'Africa/Cairo' },
    ],
  },
];

const WorldClock: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity('');
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const getTimezone = (): string => {
    if (!selectedCountry || !selectedCity) return 'UTC';
    const country = countryData.find(c => c.name === selectedCountry);
    const city = country?.cities.find(c => c.city === selectedCity);
    return city?.timezone || 'UTC';
  };

  const formatTime = (date: Date, timezone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    }).format(date);
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col space-y-4 w-full max-w-xs">
            <Select
              value={selectedCountry}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countryData.map((country) => (
                  <SelectItem key={country.name} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedCity}
              onValueChange={handleCityChange}
              disabled={!selectedCountry}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {selectedCountry &&
                  countryData
                    .find((c) => c.name === selectedCountry)
                    ?.cities.map((city) => (
                      <SelectItem key={city.city} value={city.city}>
                        {city.city}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-6xl font-mono font-bold">
            {formatTime(time, getTimezone())}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldClock;