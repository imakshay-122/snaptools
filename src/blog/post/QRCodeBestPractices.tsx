import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, QrCode, Smartphone, Eye, Palette, Target, Users, BarChart3, Clock, User, Calendar, Tag, Wifi, Camera, Settings, MapPin, Star, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';


const QRCodeBestPractices = () => {
  const [activeSection, setActiveSection] = useState(null);

  const qrStrategies = [
    {
      id: 1,
      title: "Visual Design and Branding Excellence",
      icon: <Palette className="w-6 h-6" />,
      color: "purple",
      description: "Create QR codes that seamlessly integrate with your brand while maintaining optimal scannability",
      features: ["Custom color schemes", "Logo integration", "Brand-consistent aesthetics", "Visual hierarchy balance"],
      tips: "Maintain at least 40% contrast between dark and light elements. Your QR code should be recognizable as part of your brand at first glance.",
      example: "Nike's QR codes use their signature swoosh and maintain brand colors while ensuring perfect scannability"
    },
    {
      id: 2,
      title: "Strategic Size and Placement Optimization",
      icon: <Target className="w-6 h-6" />,
      color: "blue",
      description: "Master the science of QR code sizing and positioning for maximum scan success rates",
      features: ["Minimum size requirements", "Distance-based scaling", "Contextual placement", "Environmental considerations"],
      tips: "Use the 10:1 rule - for every 1 inch of scanning distance, your QR code should be 0.1 inches wide. Billboard QR codes need to be massive!",
      example: "Restaurant table QR codes: 1 inch minimum for arm's length scanning"
    },
    {
      id: 3,
      title: "Content Strategy and Value Proposition",
      icon: <Star className="w-6 h-6" />,
      color: "yellow",
      description: "Create compelling reasons for users to scan your QR codes with valuable, relevant content",
      features: ["Exclusive content access", "Instant value delivery", "Clear benefit communication", "Compelling call-to-actions"],
      tips: "Always communicate what users will get BEFORE they scan. 'Scan for 20% discount' outperforms 'Scan me' by 300%.",
      example: "'Scan for exclusive backstage video' vs 'Scan to visit our website'"
    },
    {
      id: 4,
      title: "Technical Error Correction Mastery",
      icon: <Settings className="w-6 h-6" />,
      color: "green",
      description: "Implement robust error correction to ensure your QR codes work even when partially damaged or obscured",
      features: ["Error correction levels (L, M, Q, H)", "Damage resistance optimization", "Print quality considerations", "Environmental durability"],
      tips: "Use High (H) error correction for outdoor or high-wear applications. It allows 30% of the code to be damaged while still functioning.",
      example: "Construction site QR codes with High error correction survive dust, dirt, and minor damage"
    },
    {
      id: 5,
      title: "Mobile-First User Experience",
      icon: <Smartphone className="w-6 h-6" />,
      color: "indigo",
      description: "Optimize the entire scanning experience for mobile users across different devices and platforms",
      features: ["Cross-platform compatibility", "Fast loading destinations", "Mobile-responsive landing pages", "App store optimization"],
      tips: "Test your QR codes on multiple devices and apps. Some QR readers handle different formats better than others.",
      example: "Instagram QR codes work best with Instagram's built-in scanner, while generic QR codes need universal compatibility"
    },
    {
      id: 6,
      title: "Location-Based Implementation Strategies",
      icon: <MapPin className="w-6 h-6" />,
      color: "red",
      description: "Adapt your QR code strategy based on physical location and environmental factors",
      features: ["Indoor vs outdoor considerations", "Lighting condition optimization", "Surface material compatibility", "Weather resistance"],
      tips: "Glossy surfaces create glare that interferes with scanning. Use matte finishes or adjust placement angles to minimize reflection.",
      example: "Museum QR codes on matte-finished plaques positioned to avoid overhead lighting glare"
    },
    {
      id: 7,
      title: "Analytics and Performance Tracking",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "teal",
      description: "Implement comprehensive tracking to measure and optimize your QR code campaign performance",
      features: ["Scan rate analytics", "Geographic tracking", "Device type analysis", "Conversion funnel optimization"],
      tips: "Track not just scans, but actions taken after scanning. A high scan rate with low conversion indicates poor landing page experience.",
      example: "Campaign A: 1000 scans, 50 conversions (5%) vs Campaign B: 500 scans, 100 conversions (20%)"
    },
    {
      id: 8,
      title: "Security and Trust Building",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "orange",
      description: "Build user confidence and protect against malicious QR code threats through security best practices",
      features: ["URL preview systems", "Brand verification", "Security scanning", "Phishing protection"],
      tips: "Always use branded short URLs and display the destination clearly. Users are increasingly cautious about scanning unknown QR codes.",
      example: "yourbrand.com/menu instead of bit.ly/xyz123 - builds trust and recognition"
    },
    {
      id: 9,
      title: "Cross-Media Integration Excellence",
      icon: <Users className="w-6 h-6" />,
      color: "pink",
      description: "Seamlessly integrate QR codes across multiple marketing channels and touchpoints",
      features: ["Print-to-digital bridges", "Social media integration", "Email campaign enhancement", "Omnichannel consistency"],
      tips: "Use QR codes to bridge offline and online experiences. A physical brochure QR code can lead to digital product demos or exclusive videos.",
      example: "Business card QR code → LinkedIn profile + contact info + portfolio showcase"
    },
    {
      id: 10,
      title: "Advanced Dynamic QR Code Features",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "cyan",
      description: "Leverage dynamic QR codes for flexible, updatable, and sophisticated marketing campaigns",
      features: ["Content updating capability", "A/B testing functionality", "Scheduled content changes", "Campaign lifecycle management"],
      tips: "Dynamic QR codes allow you to change destinations without reprinting. Perfect for seasonal campaigns or evolving product launches.",
      example: "Restaurant QR menu that updates daily specials without reprinting table tents"
    }
  ];

  const scanMetrics = [
    { label: "Scan Success Rate", value: "95%+", icon: <Eye className="w-5 h-5" /> },
    { label: "Mobile Compatibility", value: "99.9%", icon: <Smartphone className="w-5 h-5" /> },
    { label: "User Engagement", value: "3x Higher", icon: <Users className="w-5 h-5" /> },
    { label: "Conversion Rate", value: "25%+", icon: <Target className="w-5 h-5" /> }
  ];

  const qrExamples = [
    { type: "Restaurant Menu", context: "Table tent", size: "1.5 inches", tip: "Include 'Scan for menu' text" },
    { type: "Business Card", context: "Contact sharing", size: "0.8 inches", tip: "Link to vCard or LinkedIn" },
    { type: "Event Ticket", context: "Check-in", size: "1 inch", tip: "High error correction for wear" },
    { type: "Product Packaging", context: "Instructions/Info", size: "0.6 inches", tip: "Clear value proposition" }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
      green: "bg-green-50 border-green-200 text-green-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
      red: "bg-red-50 border-red-200 text-red-800",
      teal: "bg-teal-50 border-teal-200 text-teal-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      pink: "bg-pink-50 border-pink-200 text-pink-800",
      cyan: "bg-cyan-50 border-cyan-200 text-cyan-800"
    };
    return colorMap[color] || colorMap.blue;
  };

  const getBadgeClasses = (color) => {
    const colorMap = {
      purple: "bg-purple-100 text-purple-700",
      blue: "bg-blue-100 text-blue-700",
      yellow: "bg-yellow-100 text-yellow-700",
      green: "bg-green-100 text-green-700",
      indigo: "bg-indigo-100 text-indigo-700",
      red: "bg-red-100 text-red-700",
      teal: "bg-teal-100 text-teal-700",
      orange: "bg-orange-100 text-orange-700",
      pink: "bg-pink-100 text-pink-700",
      cyan: "bg-cyan-100 text-cyan-700"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">Digital Marketing</span>
            <ChevronRight className="w-4 h-4" />
            <span>QR Code Strategy</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            How to Create QR Codes That Actually Get Scanned
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Master the art and science of QR code creation. Learn proven strategies to dramatically increase scan rates, user engagement, and campaign success with professional QR code best practices.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>SnapTools Marketing Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>January 26, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>9 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <QrCode className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">The QR Code Renaissance</h2>
              <p className="text-gray-700 leading-relaxed">
                QR codes have made a massive comeback, with usage increasing by 750% since 2020. But most QR codes fail to get scanned because they ignore fundamental design and user experience principles. This guide reveals the secrets to creating QR codes that users actually want to scan.
              </p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {scanMetrics.map((metric, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2 text-purple-600">
                {metric.icon}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* QR Code Examples */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-500" />
            Real-World QR Code Applications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qrExamples.map((example, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{example.type}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div><span className="font-medium">Context:</span> {example.context}</div>
                  <div><span className="font-medium">Ideal Size:</span> {example.size}</div>
                  <div><span className="font-medium">Best Practice:</span> {example.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Strategies */}
        <div className="space-y-6">
          {qrStrategies.map((strategy, index) => (
            <div
              key={strategy.id}
              className={`border-2 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer ${
                activeSection === strategy.id 
                  ? getColorClasses(strategy.color) 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection(activeSection === strategy.id ? null : strategy.id)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${getBadgeClasses(strategy.color)}`}>
                    {strategy.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getBadgeClasses(strategy.color)}`}>
                        #{strategy.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {strategy.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {strategy.description}
                    </p>
                    
                    {activeSection === strategy.id && (
                      <div className="mt-4 space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {strategy.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {strategy.tips && (
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start gap-2">
                              <QrCode className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-semibold text-blue-900 mb-1">Pro Tip:</h5>
                                <p className="text-blue-800 text-sm">{strategy.tips}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {strategy.example && (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h5 className="font-semibold text-gray-900 mb-2">Real Example:</h5>
                            <p className="text-sm text-gray-700 italic">{strategy.example}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    activeSection === strategy.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Common Mistakes to Avoid */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Common QR Code Mistakes to Avoid
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Too small to scan easily",
              "No clear value proposition",
              "Links to non-mobile websites",
              "Poor contrast or colors",
              "No error correction",
              "Placed in hard-to-reach spots",
              "Generic 'Scan me' messaging",
              "No testing on multiple devices"
            ].map((mistake, index) => (
              <div key={index} className="flex items-center gap-2 text-red-700">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✗</span>
                </div>
                <span className="text-sm">{mistake}</span>
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
              'qr code best practices',
              'effective qr codes',
              'qr code tips',
              'mobile marketing',
              'digital engagement',
              'scan rate optimization',
              'qr code design',
              'marketing automation',
              'customer experience',
              'omnichannel marketing'
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

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Create Professional QR Codes That Get Results</h2>
            
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Transform your marketing campaigns with QR codes that users actually want to scan. Our professional tools help you create branded, trackable QR codes that deliver real results and drive engagement.
            </p>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <QrCode className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">QR Code Generator</h4>
                  <p className="text-sm opacity-90">Create custom, branded QR codes</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Barcode Generator</h4>
                  <p className="text-sm opacity-90">Generate all barcode types</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools/qr/qr-generator" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center">
                Create QR Code
                <QrCode className="w-4 h-4" />
              </button>
              </Link>
              <Link to="/tools/qr/barcode-generator" target="_blank" rel="noopener noreferrer">
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center gap-2 justify-center">
                  Generate Barcodes
                  <BarChart3 className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QRCodeBestPractices;