import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calculator, Code, Zap, Globe, Ruler, Clock, Thermometer, Weight, Droplets, User, Calendar, Tag, Target, CheckCircle, AlertCircle, BookOpen, Settings, TrendingUp, Database, Smartphone, Monitor } from 'lucide-react';

const UnitConversionGuide = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeExample, setActiveExample] = useState(null);

  const conversionCategories = [
    {
      id: 1,
      title: "Length & Distance Conversions",
      icon: <Ruler className="w-6 h-6" />,
      color: "blue",
      description: "Master metric, imperial, and digital measurement conversions essential for responsive design and international development",
      formulas: [
        { from: "Pixels", to: "REM", formula: "pixels ÷ 16", example: "32px = 2rem" },
        { from: "Inches", to: "Centimeters", formula: "inches × 2.54", example: "5in = 12.7cm" },
        { from: "Points", to: "Pixels", formula: "points × 1.333", example: "12pt = 16px" }
      ],
      useCases: ["Responsive web design", "Print layout calculations", "Mobile app sizing", "CSS unit optimization"],
      tips: "Always use relative units (rem, em) for scalable web designs. 1rem = 16px is the standard browser default."
    },
    {
      id: 2,
      title: "Data Storage & Transfer Conversions",
      icon: <Database className="w-6 h-6" />,
      color: "green",
      description: "Convert between different data units for storage optimization, bandwidth calculations, and performance monitoring",
      formulas: [
        { from: "Bytes", to: "Kilobytes", formula: "bytes ÷ 1024", example: "2048 bytes = 2KB" },
        { from: "Megabits", to: "Megabytes", formula: "megabits ÷ 8", example: "100 Mbps = 12.5 MB/s" },
        { from: "Gigabytes", to: "Terabytes", formula: "gigabytes ÷ 1024", example: "2048GB = 2TB" }
      ],
      useCases: ["File size optimization", "Bandwidth calculations", "Database storage planning", "CDN cost estimation"],
      tips: "Remember: 1 byte = 8 bits. Network speeds are often advertised in bits per second, but file sizes are in bytes."
    },
    {
      id: 3,
      title: "Time & Duration Calculations",
      icon: <Clock className="w-6 h-6" />,
      color: "purple",
      description: "Handle time zone conversions, duration calculations, and timestamp formatting for global applications",
      formulas: [
        { from: "Milliseconds", to: "Seconds", formula: "milliseconds ÷ 1000", example: "5000ms = 5s" },
        { from: "Unix Timestamp", to: "Date", formula: "new Date(timestamp * 1000)", example: "1640995200 = Jan 1, 2022" },
        { from: "Hours", to: "Minutes", formula: "hours × 60", example: "2.5h = 150min" }
      ],
      useCases: ["API response parsing", "Scheduling systems", "Performance monitoring", "International time handling"],
      tips: "Always store timestamps in UTC and convert to local time zones on the frontend for consistent global behavior."
    },
    {
      id: 4,
      title: "Temperature Conversions",
      icon: <Thermometer className="w-6 h-6" />,
      color: "red",
      description: "Convert between Celsius, Fahrenheit, and Kelvin for scientific applications and international user interfaces",
      formulas: [
        { from: "Celsius", to: "Fahrenheit", formula: "(°C × 9/5) + 32", example: "25°C = 77°F" },
        { from: "Fahrenheit", to: "Celsius", formula: "(°F - 32) × 5/9", example: "100°F = 37.8°C" },
        { from: "Kelvin", to: "Celsius", formula: "K - 273.15", example: "300K = 26.85°C" }
      ],
      useCases: ["Weather applications", "IoT sensor data", "Scientific calculations", "International localization"],
      tips: "Use precise decimal calculations for temperature conversions to avoid rounding errors in scientific applications."
    },
    {
      id: 5,
      title: "Weight & Mass Conversions",
      icon: <Weight className="w-6 h-6" />,
      color: "orange",
      description: "Convert between metric and imperial weight units for e-commerce, shipping, and international applications",
      formulas: [
        { from: "Kilograms", to: "Pounds", formula: "kg × 2.20462", example: "10kg = 22.05lbs" },
        { from: "Grams", to: "Ounces", formula: "grams × 0.035274", example: "500g = 17.64oz" },
        { from: "Tons", to: "Kilograms", formula: "tons × 1000", example: "2.5t = 2500kg" }
      ],
      useCases: ["E-commerce platforms", "Shipping calculators", "Recipe applications", "Manufacturing systems"],
      tips: "Always validate weight inputs and use appropriate precision for different use cases (shipping vs. cooking)."
    },
    {
      id: 6,
      title: "Volume & Capacity Conversions",
      icon: <Droplets className="w-6 h-6" />,
      color: "teal",
      description: "Handle liquid measurements, container capacities, and volume calculations for various applications",
      formulas: [
        { from: "Liters", to: "Gallons (US)", formula: "liters × 0.264172", example: "10L = 2.64 gal" },
        { from: "Milliliters", to: "Fluid Ounces", formula: "ml × 0.033814", example: "500ml = 16.91 fl oz" },
        { from: "Cubic Meters", to: "Liters", formula: "m³ × 1000", example: "2m³ = 2000L" }
      ],
      useCases: ["Recipe applications", "Fuel calculators", "Chemical formulations", "Container logistics"],
      tips: "Be aware of US vs. UK gallon differences (US: 3.785L, UK: 4.546L) for international applications."
    },
    {
      id: 7,
      title: "Currency & Financial Conversions",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "yellow",
      description: "Implement real-time currency conversions and financial calculations for global commerce applications",
      formulas: [
        { from: "USD", to: "EUR", formula: "USD × current_rate", example: "$100 = €85 (example rate)" },
        { from: "Percentage", to: "Decimal", formula: "percentage ÷ 100", example: "25% = 0.25" },
        { from: "Interest Rate", to: "APY", formula: "(1 + rate/n)^n - 1", example: "5% monthly = 79.6% APY" }
      ],
      useCases: ["E-commerce platforms", "Financial dashboards", "Investment calculators", "International pricing"],
      tips: "Always use real-time exchange rates from reliable APIs and handle rate limiting gracefully."
    },
    {
      id: 8,
      title: "Energy & Power Conversions",
      icon: <Zap className="w-6 h-6" />,
      color: "indigo",
      description: "Convert between different energy units for IoT applications, sustainability tracking, and power calculations",
      formulas: [
        { from: "Watts", to: "Kilowatts", formula: "watts ÷ 1000", example: "1500W = 1.5kW" },
        { from: "Joules", to: "Calories", formula: "joules × 0.239", example: "1000J = 239 cal" },
        { from: "kWh", to: "Joules", formula: "kWh × 3,600,000", example: "1kWh = 3.6MJ" }
      ],
      useCases: ["Smart home applications", "Energy monitoring", "Carbon footprint calculators", "IoT sensor data"],
      tips: "Consider regional electricity pricing differences and peak/off-peak rates for accurate cost calculations."
    }
  ];

  const codeExamples = [
    {
      id: 1,
      title: "JavaScript Conversion Functions",
      language: "javascript",
      code: `// Temperature conversions
const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;

// Data size conversions
const bytesToKB = (bytes) => bytes / 1024;
const mbToBytes = (mb) => mb * 1024 * 1024;

// Length conversions
const pxToRem = (pixels, baseFontSize = 16) => pixels / baseFontSize;
const inchesToCm = (inches) => inches * 2.54;

// Usage examples
console.log(celsiusToFahrenheit(25)); // 77
console.log(pxToRem(32)); // 2
console.log(bytesToKB(2048)); // 2`
    },
    {
      id: 2,
      title: "Python Unit Converter Class",
      language: "python",
      code: `class UnitConverter:
    @staticmethod
    def length_convert(value, from_unit, to_unit):
        # Convert to meters first
        to_meters = {
            'mm': 0.001, 'cm': 0.01, 'm': 1, 
            'km': 1000, 'in': 0.0254, 'ft': 0.3048
        }
        
        meters = value * to_meters[from_unit]
        return meters / to_meters[to_unit]
    
    @staticmethod
    def weight_convert(value, from_unit, to_unit):
        to_kg = {'g': 0.001, 'kg': 1, 'lb': 0.453592, 'oz': 0.0283495}
        kg = value * to_kg[from_unit]
        return kg / to_kg[to_unit]

# Usage
converter = UnitConverter()
print(converter.length_convert(100, 'cm', 'm'))  # 1.0
print(converter.weight_convert(10, 'kg', 'lb'))  # 22.05`
    },
    {
      id: 3,
      title: "React Hook for Conversions",
      language: "jsx",
      code: `import { useState, useCallback } from 'react';

const useUnitConverter = () => {
  const [result, setResult] = useState(null);
  
  const convert = useCallback((value, fromUnit, toUnit, category) => {
    const conversions = {
      length: {
        'px': { rem: v => v / 16, em: v => v / 16 },
        'rem': { px: v => v * 16, em: v => v }
      },
      temperature: {
        'celsius': { 
          fahrenheit: v => (v * 9/5) + 32,
          kelvin: v => v + 273.15
        },
        'fahrenheit': {
          celsius: v => (v - 32) * 5/9,
          kelvin: v => ((v - 32) * 5/9) + 273.15
        }
      }
    };
    
    const conversion = conversions[category]?.[fromUnit]?.[toUnit];
    if (conversion) {
      setResult(conversion(value));
    }
  }, []);
  
  return { result, convert };
};`
    }
  ];

  const devMetrics = [
    { label: "Calculation Accuracy", value: "99.99%", icon: <Target className="w-5 h-5" /> },
    { label: "Supported Units", value: "200+", icon: <Calculator className="w-5 h-5" /> },
    { label: "API Response Time", value: "<50ms", icon: <Zap className="w-5 h-5" /> },
    { label: "Framework Support", value: "Universal", icon: <Code className="w-5 h-5" /> }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      red: "bg-red-50 border-red-200 text-red-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      teal: "bg-teal-50 border-teal-200 text-teal-800",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800"
    };
    return colorMap[color] || colorMap.blue;
  };

  const getBadgeClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-700",
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
      red: "bg-red-100 text-red-700",
      orange: "bg-orange-100 text-orange-700",
      teal: "bg-teal-100 text-teal-700",
      yellow: "bg-yellow-100 text-yellow-700",
      indigo: "bg-indigo-100 text-indigo-700"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full text-xs font-medium">Developer Tools</span>
            <ChevronRight className="w-4 h-4" />
            <span>Unit Conversion</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Converting Units Like a Pro: Essential Formulas for Developers
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Master unit conversions with comprehensive formulas, code examples, and best practices. From pixels to rem units, bytes to gigabytes, and Celsius to Fahrenheit - become a conversion expert.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>SnapTools Dev Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>January 27, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>15 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-cyan-50 to-green-50 border border-cyan-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-100 rounded-lg">
              <Calculator className="w-6 h-6 text-cyan-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Why Unit Conversion Mastery Matters</h2>
              <p className="text-gray-700 leading-relaxed">
                Every developer encounters unit conversion challenges - from responsive design calculations to API data processing. Mastering these conversions saves time, prevents errors, and enables building truly international applications. This guide covers all essential formulas with practical code examples.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {devMetrics.map((metric, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2 text-cyan-600">
                {metric.icon}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Conversion Categories */}
        <div className="space-y-6">
          {conversionCategories.map((category, index) => (
            <div
              key={category.id}
              className={`border-2 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer ${
                activeSection === category.id 
                  ? getColorClasses(category.color) 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection(activeSection === category.id ? null : category.id)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${getBadgeClasses(category.color)}`}>
                    {category.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getBadgeClasses(category.color)}`}>
                        #{category.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {category.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {category.description}
                    </p>
                    
                    {activeSection === category.id && (
                      <div className="mt-4 space-y-4">
                        {/* Formulas */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Essential Formulas:</h4>
                          <div className="space-y-3">
                            {category.formulas.map((formula, idx) => (
                              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <span className="font-medium text-gray-900">{formula.from} → {formula.to}</span>
                                  <code className="block text-sm text-blue-600 font-mono mt-1">{formula.formula}</code>
                                </div>
                                <div className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                                  {formula.example}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Use Cases */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Common Use Cases:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {category.useCases.map((useCase, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{useCase}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Pro Tips */}
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex items-start gap-2">
                            <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-semibold text-blue-900 mb-1">Pro Tip:</h5>
                              <p className="text-blue-800 text-sm">{category.tips}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    activeSection === category.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Examples */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Code className="w-6 h-6 text-green-600" />
            Ready-to-Use Code Examples
          </h3>
          
          <div className="space-y-6">
            {codeExamples.map((example, index) => (
              <div
                key={example.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <div 
                  className="p-4 bg-gray-50 border-b border-gray-200 cursor-pointer flex items-center justify-between"
                  onClick={() => setActiveExample(activeExample === example.id ? null : example.id)}
                >
                  <h4 className="font-semibold text-gray-900">{example.title}</h4>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    activeExample === example.id ? 'rotate-90' : ''
                  }`} />
                </div>
                
                {activeExample === example.id && (
                  <div className="p-0">
                    <pre className="bg-gray-900 text-green-400 p-4 overflow-x-auto text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Development Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Always validate input values and handle edge cases",
              "Use appropriate precision for different use cases",
              "Implement proper error handling for invalid conversions",
              "Cache frequently used conversion factors",
              "Consider internationalization requirements early",
              "Test conversions with boundary values",
              "Document expected input/output ranges",
              "Use type-safe conversion functions when possible"
            ].map((practice, index) => (
              <div key={index} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{practice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Common Conversion Pitfalls
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Confusing bits and bytes in data calculations",
              "Ignoring floating-point precision errors",
              "Using outdated exchange rates for currency",
              "Mixing US and UK gallon measurements",
              "Forgetting timezone considerations in time conversions",
              "Not handling negative temperature values properly",
              "Assuming all users use the same unit system",
              "Hardcoding conversion factors without documentation"
            ].map((pitfall, index) => (
              <div key={index} className="flex items-start gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{pitfall}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords Section */}
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Related Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'unit conversion formulas',
              'developer conversion tools',
              'measurement conversions',
              'css units',
              'responsive design',
              'data size calculations',
              'temperature conversion',
              'international development',
              'api calculations',
              'precision mathematics'
            ].map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Tool Showcase */}
        <div className="mt-12 bg-gradient-to-r from-cyan-500 to-green-600 text-white rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Professional Unit Conversion Tools</h2>
            
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Skip the manual calculations and potential errors. Our comprehensive suite of unit converters handles all your development needs with precision and speed.
            </p>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Ruler className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Length</h4>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Weight className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Weight</h4>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Thermometer className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Temperature</h4>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Database className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Data</h4>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools/conversion" target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-cyan-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center">
                  Explore All Converters
                  <Calculator className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/tools/unit" target="_blank" rel="noopener noreferrer">
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors inline-flex items-center gap-2 justify-center">
                  Unit Converter
                  <Code className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UnitConversionGuide;