import React, { useState } from 'react';
import { ChevronRight, Image, Zap, Settings, MonitorSpeaker, Smartphone, Globe, BarChart3, Clock, User, Calendar, Tag, TrendingUp, Archive, FileImage, Palette, Eye, Code, Target } from 'lucide-react';
import { Link } from "react-router-dom";

const ImageOptimizationGuide = () => {
  const [activeSection, setActiveSection] = useState(null);

  const techniques = [
    {
      id: 1,
      title: "Advanced Image Compression Strategies",
      icon: <Archive className="w-6 h-6" />,
      color: "blue",
      description: "Master lossless and lossy compression techniques to achieve optimal file sizes without quality degradation",
      features: ["Lossless vs lossy compression analysis", "Quality vs file size optimization", "Batch compression workflows", "Format-specific compression settings"],
      tips: "Use 80-85% quality for JPEG images to achieve the best balance between file size and visual quality. This sweet spot reduces file size by 50-70% while maintaining excellent visual fidelity."
    },
    {
      id: 2,
      title: "Next-Gen Image Formats (WebP, AVIF, HEIC)",
      icon: <FileImage className="w-6 h-6" />,
      color: "green",
      description: "Leverage modern image formats for superior compression and quality compared to traditional formats",
      features: ["WebP implementation strategies", "AVIF adoption and fallbacks", "HEIC mobile optimization", "Browser compatibility handling"],
      tips: "WebP provides 25-35% better compression than JPEG while maintaining visual quality. Always implement proper fallbacks for older browsers."
    },
    {
      id: 3,
      title: "Responsive Image Implementation",
      icon: <MonitorSpeaker className="w-6 h-6" />,
      color: "purple",
      description: "Deliver the right image size for every device and screen resolution to optimize loading performance",
      features: ["Srcset and sizes attributes", "Art direction with picture element", "Density-based image serving", "Breakpoint optimization"],
      tips: "Use the picture element for art direction and srcset for resolution switching. This can reduce image payload by 40-60% on mobile devices."
    },
    {
      id: 4,
      title: "Lazy Loading and Progressive Enhancement",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "orange",
      description: "Implement smart loading strategies to improve initial page load times and user experience",
      features: ["Native lazy loading implementation", "Intersection Observer API", "Progressive image loading", "Critical image prioritization"],
      tips: "Lazy loading can improve initial page load by 20-50%. Ensure above-the-fold images are loaded immediately while deferring others."
    },
    {
      id: 5,
      title: "Image CDN and Caching Strategies",
      icon: <Globe className="w-6 h-6" />,
      color: "teal",
      description: "Leverage content delivery networks and caching mechanisms for faster global image delivery",
      features: ["CDN configuration best practices", "Cache headers optimization", "Edge computing benefits", "Global distribution strategies"],
      tips: "Image CDNs can reduce loading times by 40-80% through geographic distribution and automatic format optimization based on user agent."
    },
    {
      id: 6,
      title: "Format Selection and Conversion",
      icon: <Palette className="w-6 h-6" />,
      color: "pink",
      description: "Choose the optimal image format based on content type, use case, and target audience",
      features: ["JPEG for photographs", "PNG for graphics with transparency", "SVG for scalable graphics", "Format conversion automation"],
      tips: "Use JPEG for photos, PNG for graphics with transparency, WebP as a modern alternative, and SVG for icons and simple graphics."
    },
    {
      id: 7,
      title: "Image Preprocessing and Optimization",
      icon: <Settings className="w-6 h-6" />,
      color: "indigo",
      description: "Prepare images for optimal web delivery through strategic preprocessing techniques",
      features: ["Automatic resizing workflows", "Color space optimization", "Metadata removal", "Batch processing automation"],
      tips: "Remove unnecessary metadata and optimize color profiles to reduce file sizes by 10-30% without affecting visual quality."
    },
    {
      id: 8,
      title: "Performance Monitoring and Analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "red",
      description: "Track and measure image performance impact on overall website speed and user experience",
      features: ["Core Web Vitals tracking", "Loading time analysis", "User experience metrics", "Performance budgeting"],
      tips: "Monitor Largest Contentful Paint (LCP) as images often contribute significantly to this Core Web Vital metric."
    },
    {
      id: 9,
      title: "Mobile-First Image Optimization",
      icon: <Smartphone className="w-6 h-6" />,
      color: "cyan",
      description: "Optimize images specifically for mobile devices and varying network conditions",
      features: ["Mobile-specific formats", "Network-aware loading", "Touch-optimized experiences", "Offline image strategies"],
      tips: "Mobile users consume 70% of web content. Prioritize mobile optimization with smaller initial payloads and progressive enhancement."
    },
    {
      id: 10,
      title: "Accessibility and SEO Considerations",
      icon: <Eye className="w-6 h-6" />,
      color: "yellow",
      description: "Ensure images are accessible and contribute positively to search engine optimization",
      features: ["Alt text optimization", "Structured data implementation", "Image sitemaps", "Accessibility compliance"],
      tips: "Descriptive alt text and proper image markup improve both accessibility and SEO, potentially increasing organic traffic by 10-20%."
    }
  ];

  const keyMetrics = [
    { label: "Average Page Load Improvement", value: "40-60%", icon: <Zap className="w-5 h-5" /> },
    { label: "File Size Reduction", value: "50-80%", icon: <Archive className="w-5 h-5" /> },
    { label: "Mobile Performance Boost", value: "30-50%", icon: <Smartphone className="w-5 h-5" /> },
    { label: "SEO Impact", value: "10-20%", icon: <TrendingUp className="w-5 h-5" /> }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      teal: "bg-teal-50 border-teal-200 text-teal-800",
      pink: "bg-pink-50 border-pink-200 text-pink-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
      red: "bg-red-50 border-red-200 text-red-800",
      cyan: "bg-cyan-50 border-cyan-200 text-cyan-800",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-800"
    };
    return colorMap[color] || colorMap.blue;
  };

  const getBadgeClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-700",
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
      orange: "bg-orange-100 text-orange-700",
      teal: "bg-teal-100 text-teal-700",
      pink: "bg-pink-100 text-pink-700",
      indigo: "bg-indigo-100 text-indigo-700",
      red: "bg-red-100 text-red-700",
      cyan: "bg-cyan-100 text-cyan-700",
      yellow: "bg-yellow-100 text-yellow-700"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Web Performance</span>
            <ChevronRight className="w-4 h-4" />
            <span>Image Optimization</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            The Ultimate Guide to Image Optimization for Web Performance
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Master the art of image optimization to dramatically improve your website's loading speed, user experience, and search engine rankings. Learn industry-proven techniques and modern best practices.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>SnapTools Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>January 22, 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>12 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Image className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Why Image Optimization Matters</h2>
              <p className="text-gray-700 leading-relaxed">
                Images account for over 60% of the average webpage's total size. Proper optimization can dramatically improve loading speeds, reduce bandwidth costs, and enhance user experience across all devices. This comprehensive guide covers everything from basic compression to advanced delivery strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2 text-green-600">
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Techniques */}
        <div className="space-y-6">
          {techniques.map((technique, index) => (
            <div
              key={technique.id}
              className={`border-2 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer ${activeSection === technique.id
                  ? getColorClasses(technique.color)
                  : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => setActiveSection(activeSection === technique.id ? null : technique.id)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${getBadgeClasses(technique.color)}`}>
                    {technique.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getBadgeClasses(technique.color)}`}>
                        #{technique.id}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 truncate">
                        {technique.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-3">
                      {technique.description}
                    </p>

                    {activeSection === technique.id && (
                      <div className="mt-4 space-y-4">
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Techniques:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {technique.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-gray-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {technique.tips && (
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start gap-2">
                              <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-semibold text-blue-900 mb-1">Pro Tip:</h5>
                                <p className="text-blue-800 text-sm">{technique.tips}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${activeSection === technique.id ? 'rotate-90' : ''
                    }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Implementation Checklist */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Quick Implementation Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Choose appropriate image formats",
              "Implement responsive images",
              "Set up lazy loading",
              "Configure image CDN",
              "Optimize compression settings",
              "Add proper alt attributes",
              "Monitor Core Web Vitals",
              "Test across devices"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>{item}</span>
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
              'image optimization',
              'web performance',
              'image compression techniques',
              'responsive images',
              'WebP format',
              'lazy loading',
              'Core Web Vitals',
              'mobile optimization',
              'CDN strategies',
              'SEO images'
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
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Start Optimizing Your Images Today</h2>

            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Transform your website's performance with professional image optimization tools. Reduce loading times, improve user experience, and boost your search rankings with our comprehensive suite of image optimization tools.
            </p>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <Archive className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Image Compressor</h4>
                  <p className="text-sm opacity-90">Reduce file sizes by up to 80%</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <FileImage className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Format Converter</h4>
                  <p className="text-sm opacity-90">Convert to modern formats like WebP</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools/image/image-compressor" target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center">
                  Try Image Compressor
                  <Archive className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/tools/image/image-format-converter" target="_blank" rel="noopener noreferrer">
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center gap-2 justify-center">
                  Format Converter
                  <FileImage className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImageOptimizationGuide;