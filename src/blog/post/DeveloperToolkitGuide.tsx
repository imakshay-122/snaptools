import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Code, Zap, Globe, Settings, Terminal, Database, Shield, Palette, GitBranch, Bug, FileText, Monitor, Smartphone, Cloud, Package, Search, Edit, Image, Clock, User, Calendar, Tag, Target, CheckCircle, AlertCircle, BookOpen, TrendingUp, Layers, Cpu, HardDrive } from 'lucide-react';

const DeveloperToolkitGuide = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeExample, setActiveExample] = useState(null);

  const toolkitCategories = [
    {
      id: 1,
      title: "Code Quality & Formatting Tools",
      icon: <Code className="w-6 h-6" />,
      color: "blue",
      description: "Essential tools for maintaining clean, consistent, and error-free code across your entire development workflow",
      tools: [
        { name: "Prettier", purpose: "Code formatting", usage: "Auto-format JS, CSS, HTML, JSON", popularity: "95%" },
        { name: "ESLint", purpose: "JavaScript linting", usage: "Find and fix code problems", popularity: "92%" },
        { name: "JSHint", purpose: "Code quality", usage: "Detect errors and potential problems", popularity: "78%" }
      ],
      useCases: ["Consistent code style", "Team collaboration", "Error prevention", "Automated code review"],
      tips: "Set up pre-commit hooks with Husky to automatically format and lint code before commits."
    },
    {
      id: 2,
      title: "JSON & Data Processing Tools",
      icon: <Database className="w-6 h-6" />,
      color: "green",
      description: "Powerful utilities for validating, formatting, and transforming JSON data and other structured formats",
      tools: [
        { name: "JSON Validator", purpose: "Syntax validation", usage: "Verify JSON structure", popularity: "99%" },
        { name: "JSON Formatter", purpose: "Pretty printing", usage: "Format and beautify JSON", popularity: "97%" },
        { name: "CSV to JSON", purpose: "Data conversion", usage: "Transform CSV data to JSON", popularity: "85%" }
      ],
      useCases: ["API response validation", "Configuration file editing", "Data migration", "Debug API payloads"],
      tips: "Use JSONPath expressions to query complex JSON structures efficiently during development."
    },
    {
      id: 3,
      title: "Encoding & Security Tools",
      icon: <Shield className="w-6 h-6" />,
      color: "purple",
      description: "Critical security tools for encoding, encryption, and protecting sensitive data in applications",
      tools: [
        { name: "Base64 Encoder/Decoder", purpose: "Data encoding", usage: "Encode binary data for transmission", popularity: "94%" },
        { name: "URL Encoder/Decoder", purpose: "URL encoding", usage: "Handle special characters in URLs", popularity: "91%" },
        { name: "Hash Generator", purpose: "Data integrity", usage: "Generate MD5, SHA1, SHA256 hashes", popularity: "88%" }
      ],
      useCases: ["API authentication", "Password hashing", "Data transmission", "Security token generation"],
      tips: "Always use strong hashing algorithms like SHA-256 or bcrypt for password storage and security tokens."
    },
    {
      id: 4,
      title: "Text & String Manipulation",
      icon: <Edit className="w-6 h-6" />,
      color: "red",
      description: "Versatile text processing tools for formatting, transforming, and manipulating strings efficiently",
      tools: [
        { name: "Case Converter", purpose: "Text transformation", usage: "Convert between camelCase, snake_case, etc.", popularity: "89%" },
        { name: "String Escape", purpose: "Character escaping", usage: "Escape special characters for code", popularity: "87%" },
        { name: "Lorem Ipsum Generator", purpose: "Placeholder text", usage: "Generate dummy content for testing", popularity: "92%" }
      ],
      useCases: ["Variable naming conventions", "SQL query building", "Template generation", "Content placeholders"],
      tips: "Use consistent naming conventions across your project - choose camelCase or snake_case and stick with it."
    },
    {
      id: 5,
      title: "Image & Media Processing",
      icon: <Image className="w-6 h-6" />,
      color: "orange",
      description: "Comprehensive image optimization and media processing tools for web performance and user experience",
      tools: [
        { name: "Image Compressor", purpose: "File size reduction", usage: "Optimize images for web", popularity: "96%" },
        { name: "Format Converter", purpose: "Image conversion", usage: "Convert between PNG, JPG, WebP", popularity: "93%" },
        { name: "Favicon Generator", purpose: "Icon creation", usage: "Generate favicons for websites", popularity: "84%" }
      ],
      useCases: ["Web performance optimization", "Responsive image delivery", "Brand asset creation", "Mobile app icons"],
      tips: "Use WebP format for web images when possible - it provides 25-35% better compression than JPEG."
    },
    {
      id: 6,
      title: "Color & Design Utilities",
      icon: <Palette className="w-6 h-6" />,
      color: "teal",
      description: "Essential design tools for color management, palette generation, and visual design consistency",
      tools: [
        { name: "Color Picker", purpose: "Color selection", usage: "Extract colors from images/designs", popularity: "98%" },
        { name: "Palette Generator", purpose: "Color schemes", usage: "Create harmonious color palettes", popularity: "91%" },
        { name: "Gradient Generator", purpose: "CSS gradients", usage: "Generate CSS gradient code", popularity: "86%" }
      ],
      useCases: ["UI/UX design", "Brand consistency", "CSS styling", "Accessibility compliance"],
      tips: "Always check color contrast ratios for accessibility - aim for at least 4.5:1 for normal text."
    },
    {
      id: 7,
      title: "Development Environment Tools",
      icon: <Terminal className="w-6 h-6" />,
      color: "yellow",
      description: "Productivity-boosting tools for optimizing your development environment and workflow automation",
      tools: [
        { name: "Code Snippet Manager", purpose: "Code reuse", usage: "Store and organize code snippets", popularity: "87%" },
        { name: "Git Diff Viewer", purpose: "Version control", usage: "Visualize code differences", popularity: "94%" },
        { name: "Regex Tester", purpose: "Pattern matching", usage: "Test and debug regular expressions", popularity: "90%" }
      ],
      useCases: ["Code reusability", "Version control workflow", "Pattern matching", "Development automation"],
      tips: "Create a personal snippet library with frequently used code patterns to speed up development."
    },
    {
      id: 8,
      title: "Performance & Monitoring Tools",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "indigo",
      description: "Advanced tools for performance analysis, monitoring, and optimization of web applications",
      tools: [
        { name: "Bundle Analyzer", purpose: "Code analysis", usage: "Analyze JavaScript bundle sizes", popularity: "82%" },
        { name: "Performance Profiler", purpose: "Speed optimization", usage: "Identify performance bottlenecks", popularity: "85%" },
        { name: "Lighthouse Audit", purpose: "Web vitals", usage: "Measure page performance metrics", popularity: "91%" }
      ],
      useCases: ["Performance optimization", "Bundle size reduction", "SEO improvement", "User experience enhancement"],
      tips: "Set performance budgets for your projects and monitor them continuously to prevent performance regression."
    }
  ];

  const codeExamples = [
    {
      id: 1,
      title: "ESLint & Prettier Configuration",
      language: "json",
      code: `// .eslintrc.json
{
  "extends": ["eslint:recommended", "@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}

// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}

// package.json scripts
{
  "scripts": {
    "lint": "eslint src/**/*.{js,ts,tsx}",
    "lint:fix": "eslint src/**/*.{js,ts,tsx} --fix",
    "format": "prettier --write src/**/*.{js,ts,tsx,json,css,md}"
  }
}`
    },
    {
      id: 2,
      title: "Text Processing Utilities",
      language: "javascript",
      code: `// String manipulation utilities
class StringUtils {
  static toCamelCase(str) {
    return str.replace(/[-_\\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  }
  
  static toSnakeCase(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
  }
  
  static toKebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  }
  
  static escapeHtml(str) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, m => map[m]);
  }
}

// Usage examples
console.log(StringUtils.toCamelCase('hello-world')); // helloWorld
console.log(StringUtils.toSnakeCase('helloWorld')); // hello_world
console.log(StringUtils.escapeHtml('<script>alert("xss")</script>'));`
    },
    {
      id: 3,
      title: "Performance Monitoring Hook",
      language: "jsx",
      code: `import { useEffect, useState } from 'react';

const usePerformanceMonitor = (componentName) => {
  const [metrics, setMetrics] = useState({});
  
  useEffect(() => {
    const startTime = performance.now();
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          setMetrics(prev => ({
            ...prev,
            loadTime: entry.loadEventEnd - entry.loadEventStart,
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart
          }));
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation', 'paint'] });
    
    return () => {
      const endTime = performance.now();
      console.log(\`\${componentName} render time: \${endTime - startTime}ms\`);
      observer.disconnect();
    };
  }, [componentName]);
  
  return metrics;
};

// Usage in component
const MyComponent = () => {
  const metrics = usePerformanceMonitor('MyComponent');
  
  return (
    <div>
      <h1>Performance Metrics</h1>
      <p>Load Time: {metrics.loadTime}ms</p>
      <p>DOM Ready: {metrics.domContentLoaded}ms</p>
    </div>
  );
};`
    },
    {
      id: 4,
      title: "Security Utilities",
      language: "javascript",
      code: `// Security and encoding utilities
class SecurityUtils {
  // Base64 encoding/decoding
  static base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  
  static base64Decode(str) {
    return decodeURIComponent(escape(atob(str)));
  }
  
  // URL encoding
  static urlEncode(str) {
    return encodeURIComponent(str);
  }
  
  static urlDecode(str) {
    return decodeURIComponent(str);
  }
  
  // Simple hash function (for non-cryptographic use)
  static simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }
  
  // Generate random token
  static generateToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Usage examples
const encoded = SecurityUtils.base64Encode('Hello World');
console.log('Encoded:', encoded); // SGVsbG8gV29ybGQ=
console.log('Decoded:', SecurityUtils.base64Decode(encoded)); // Hello World
console.log('Hash:', SecurityUtils.simpleHash('test')); // 364492
console.log('Token:', SecurityUtils.generateToken(16));`
    }
  ];

  const devMetrics = [
    { label: "Time Saved Daily", value: "2.5 hours", icon: <Clock className="w-5 h-5" /> },
    { label: "Tools Covered", value: "25+", icon: <Package className="w-5 h-5" /> },
    { label: "Error Reduction", value: "80%", icon: <Bug className="w-5 h-5" /> },
    { label: "Developer Adoption", value: "95%+", icon: <TrendingUp className="w-5 h-5" /> }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">Developer Resources</span>
            <ChevronRight className="w-4 h-4" />
            <span>Essential Tools</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Complete Developer Toolkit: 25 Essential Tools Every Programmer Needs
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Supercharge your development workflow with this comprehensive guide to essential tools. From code formatting to security utilities, performance monitoring to design assets - discover the tools that will transform your productivity.
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
              <span>18 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Code className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Why a Complete Toolkit Matters</h2>
              <p className="text-gray-700 leading-relaxed">
                Modern development requires more than just coding skills. The right tools can reduce errors by 80%, save hours of manual work daily, and ensure consistent quality across your projects. This comprehensive guide covers 25+ essential tools organized by category, with practical examples and implementation strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Developer Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {devMetrics.map((metric, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2 text-blue-600">
                {metric.icon}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Toolkit Categories */}
        <div className="space-y-6">
          {toolkitCategories.map((category, index) => (
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
                        Category #{category.id}
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
                        {/* Tools */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Featured Tools:</h4>
                          <div className="space-y-3">
                            {category.tools.map((tool, idx) => (
                              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900">{tool.name}</span>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{tool.popularity}</span>
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">{tool.purpose}</span> - {tool.usage}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Use Cases */}
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Primary Use Cases:</h4>
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
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-l-4 border-purple-500">
                          <div className="flex items-start gap-2">
                            <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-semibold text-purple-900 mb-1">Pro Tip:</h5>
                              <p className="text-purple-800 text-sm">{category.tips}</p>
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
            Implementation Examples & Code Snippets
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
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{example.title}</h4>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{example.language}</span>
                  </div>
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

        {/* Workflow Integration */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Workflow Integration Strategies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Integrate linting and formatting into your IDE for real-time feedback",
              "Set up pre-commit hooks to automatically run quality checks",
              "Use continuous integration to enforce tool usage across teams",
              "Create custom scripts to chain multiple tools together",
              "Implement automated security scanning in your deployment pipeline",
              "Set up performance monitoring from development to production",
              "Use environment-specific configurations for different stages",
              "Document tool configurations in your project README"
            ].map((strategy, index) => (
              <div key={index} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{strategy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tool Selection Guide */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            How to Choose the Right Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Consider Your Project Type</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Web apps: Focus on bundle analyzers, performance tools</li>
                <li>• Mobile development: Prioritize image optimization, responsive tools</li>
                <li>• API development: Emphasize JSON validators, security tools</li>
                <li>• Enterprise: Add collaboration and code quality tools</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Team Considerations</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Team size: Larger teams need more automation</li>
                <li>• Skill levels: Choose tools with good documentation</li>
                <li>• Existing workflow: Integrate with current processes</li>
                <li>• Budget constraints: Balance features with cost</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Common Tool Implementation Mistakes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Installing too many tools without understanding their purpose",
              "Not configuring tools properly for your specific needs",
              "Ignoring tool conflicts and compatibility issues",
              "Forgetting to update tool configurations as projects evolve",
              "Not training team members on tool usage and best practices",
              "Skipping performance impact assessment of development tools",
              "Not backing up or versioning tool configurations",
              "Overlooking security implications of third-party tools"
            ].map((mistake, index) => (
              <div key={index} className="flex items-start gap-2 text-red-700">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{mistake}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Development Stages */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-gray-600" />
            Tools by Development Stage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Development Phase
              </h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Code formatters (Prettier)</li>
                <li>• Linters (ESLint)</li>
                <li>• Text manipulation tools</li>
                <li>• Snippet managers</li>
                <li>• Regex testers</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Bug className="w-4 h-4" />
                Testing & Debug
              </h4>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• JSON validators</li>
                <li>• API testing tools</li>
                <li>• Performance profilers</li>
                <li>• Security scanners</li>
                <li>• Bundle analyzers</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <Cloud className="w-4 h-4" />
                Deployment Phase
              </h4>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Image optimizers</li>
                <li>• Minification tools</li>
                <li>• Environment managers</li>
                <li>• Monitoring tools</li>
                <li>• Performance audits</li>
              </ul>
            </div>
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
              'developer toolkit',
              'essential programming tools',
              'web developer resources',
              'code quality tools',
              'development workflow',
              'productivity tools',
              'programming utilities',
              'developer productivity',
              'coding tools',
              'software development tools'
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
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Complete Developer Toolkit Suite</h2>
            
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Stop switching between dozens of different websites and tools. Our comprehensive developer toolkit provides all these essential utilities in one streamlined platform.
            </p>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Code className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Code Tools</h4>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Security</h4>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Image className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Media</h4>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Performance</h4>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center">
                Explore All Tools
                <Package className="w-4 h-4" />
              </button>
              </Link>
              <Link to="https://runr.vercel.app/" target="_blank" rel="noopener noreferrer">
                <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center gap-2 justify-center">
                  Developer API
                  <Terminal className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Advanced Tips Section */}
        <div className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Advanced Tool Optimization Strategies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Performance Optimization
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use tool caching to reduce processing time</li>
                  <li>• Implement lazy loading for heavy tools</li>
                  <li>• Configure tools to run only when needed</li>
                  <li>• Parallelize tool execution where possible</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-green-500" />
                  Version Control Integration
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Store tool configurations in version control</li>
                  <li>• Use hooks to enforce tool usage</li>
                  <li>• Document tool versions for reproducibility</li>
                  <li>• Create shared configurations across projects</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-500" />
                  Automation & CI/CD
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Integrate tools into build pipelines</li>
                  <li>• Set up automated quality gates</li>
                  <li>• Use tools in pull request checks</li>
                  <li>• Monitor tool performance metrics</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-500" />
                  Team Collaboration
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Share tool configurations across team</li>
                  <li>• Create tool usage documentation</li>
                  <li>• Establish team coding standards</li>
                  <li>• Regular tool training sessions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Categories Quick Reference */}
        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Reference: Tool Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { category: "Code Quality", count: "8 tools", icon: <Code className="w-4 h-4" />, color: "blue" },
              { category: "Data Processing", count: "6 tools", icon: <Database className="w-4 h-4" />, color: "green" },
              { category: "Security", count: "5 tools", icon: <Shield className="w-4 h-4" />, color: "purple" },
              { category: "Performance", count: "6 tools", icon: <TrendingUp className="w-4 h-4" />, color: "orange" }
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getBadgeClasses(item.color)} border-opacity-50`}>
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <h4 className="font-semibold text-sm">{item.category}</h4>
                </div>
                <p className="text-xs opacity-75">{item.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Ready to optimize your workflow?
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start with the tools most relevant to your current projects, then gradually expand your toolkit as you identify new needs. Remember: the best tools are the ones you actually use consistently.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DeveloperToolkitGuide;