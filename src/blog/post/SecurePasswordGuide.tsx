import React, { useState } from 'react';
import { ChevronRight, Shield, Lock, Eye, EyeOff, AlertTriangle, CheckCircle, Clock, User, Calendar, Tag, Key, Smartphone, Database, Users, Server, Brain, Zap } from 'lucide-react';
import { Link } from "react-router-dom";

const SecurePasswordGuide = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrategies = [
    {
      id: 1,
      title: "Passphrase Power: The New Gold Standard",
      icon: <Brain className="w-6 h-6" />,
      color: "blue",
      description: "Master the art of creating memorable yet secure passphrases that are both human-friendly and hacker-resistant",
      features: ["4-6 random word combinations", "Easy to remember, hard to crack", "100+ character possibilities", "Diceware methodology"],
      tips: "Use passphrases like 'Coffee-Sunset-Bicycle-Mountain-92!' instead of complex character strings. They're easier to remember and exponentially harder to crack.",
      example: "correct horse battery staple → CorrectHorseBatteryStaple2025!"
    },
    {
      id: 2,
      title: "Multi-Factor Authentication Integration",
      icon: <Smartphone className="w-6 h-6" />,
      color: "green",
      description: "Layer your security with robust multi-factor authentication strategies that go beyond simple SMS codes",
      features: ["Hardware security keys", "Biometric authentication", "Time-based codes (TOTP)", "Backup authentication methods"],
      tips: "Use hardware security keys like YubiKey for maximum protection. They're phishing-resistant and provide the highest level of security.",
      example: "Password + Fingerprint + Hardware Key = Military-grade security"
    },
    {
      id: 3,
      title: "Password Manager Mastery",
      icon: <Database className="w-6 h-6" />,
      color: "purple",
      description: "Leverage password managers to generate, store, and manage unique passwords for every account securely",
      features: ["Unique passwords for every account", "Secure encrypted storage", "Cross-device synchronization", "Breach monitoring alerts"],
      tips: "Use a reputable password manager like Bitwarden, 1Password, or LastPass. Never reuse passwords across multiple accounts.",
      example: "One master password → Unlimited unique 32-character passwords"
    },
    {
      id: 4,
      title: "Advanced Character Combination Strategies",
      icon: <Key className="w-6 h-6" />,
      color: "orange",
      description: "Create complex yet memorable passwords using strategic character substitution and pattern techniques",
      features: ["Leetspeak transformations", "Pattern-based generation", "Personal algorithm creation", "Memorable complexity rules"],
      tips: "Create a personal algorithm: Take a base phrase, add the service name, current year, and apply consistent character substitutions.",
      example: "MySecureBase + Gmail + 2025 = MyS3cur3B@se_Gmail_2025!"
    },
    {
      id: 5,
      title: "Enterprise Security Protocols",
      icon: <Server className="w-6 h-6" />,
      color: "red",
      description: "Implement organization-wide password policies that balance security with usability for teams",
      features: ["Policy enforcement tools", "Regular security audits", "Employee training programs", "Incident response procedures"],
      tips: "Implement a minimum 14-character requirement with complexity rules, but focus on passphrases over character complexity.",
      example: "Company policy: 16+ characters, unique per service, MFA required"
    },
    {
      id: 6,
      title: "Social Engineering Defense",
      icon: <Users className="w-6 h-6" />,
      color: "teal",
      description: "Protect against human-based attacks that bypass even the strongest technical security measures",
      features: ["Phishing awareness training", "Verification protocols", "Suspicious activity recognition", "Communication security"],
      tips: "Never share passwords via email, text, or phone. Legitimate services will never ask for your password directly.",
      example: "Unknown caller asking for password = Immediate red flag"
    },
    {
      id: 7,
      title: "Breach Response and Recovery",
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "yellow",
      description: "Develop rapid response strategies for when security breaches affect your accounts or organization",
      features: ["Immediate password changes", "Account monitoring", "Credit freezing procedures", "Legal compliance steps"],
      tips: "Have a breach response plan ready. Change passwords immediately, enable additional security measures, and monitor accounts closely.",
      example: "Breach detected → Change passwords → Enable MFA → Monitor accounts"
    },
    {
      id: 8,
      title: "Biometric and Passwordless Authentication",
      icon: <Eye className="w-6 h-6" />,
      color: "indigo",
      description: "Explore the future of authentication with biometric and passwordless security solutions",
      features: ["Fingerprint authentication", "Facial recognition security", "Voice pattern verification", "Behavioral biometrics"],
      tips: "While convenient, always have backup authentication methods. Biometrics can't be changed if compromised.",
      example: "Fingerprint + PIN backup = Robust mobile security"
    }
  ];

  const securityMetrics = [
    { label: "Password Crack Time", value: "Centuries", icon: <Clock className="w-5 h-5" /> },
    { label: "Breach Protection", value: "99.9%", icon: <Shield className="w-5 h-5" /> },
    { label: "Account Security", value: "Enterprise-level", icon: <Lock className="w-5 h-5" /> },
    { label: "Phishing Resistance", value: "Maximum", icon: <AlertTriangle className="w-5 h-5" /> }
  ];

  const passwordStrengthDemo = {
    weak: "password123",
    medium: "P@ssw0rd123!",
    strong: "CorrectHorseBatteryStaple2025!",
    time: {
      weak: "2 seconds",
      medium: "2 hours",
      strong: "Centuries"
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-800",
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      red: "bg-red-50 border-red-200 text-red-800",
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
      orange: "bg-orange-100 text-orange-700",
      red: "bg-red-100 text-red-700",
      teal: "bg-teal-100 text-teal-700",
      yellow: "bg-yellow-100 text-yellow-700",
      indigo: "bg-indigo-100 text-indigo-700"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">Cybersecurity</span>
            <ChevronRight className="w-4 h-4" />
            <span>Password Security</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Secure Password Practices: Creating Unbreakable Passwords in 2025
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Master the latest password security techniques and protect yourself from cyber threats. Learn how to create passwords that are both secure and memorable using proven 2025 methodologies.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>SnapTools Security Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>January 25, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>10 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">The Password Crisis of 2025</h2>
              <p className="text-gray-700 leading-relaxed">
                With cyberattacks increasing by 300% and AI-powered cracking tools becoming more sophisticated, traditional password advice is obsolete. This guide reveals cutting-edge techniques used by cybersecurity professionals to create truly unbreakable passwords.
              </p>
            </div>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {securityMetrics.map((metric, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-2 text-red-600">
                {metric.icon}
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Password Strength Demo */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Password Strength Comparison
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <code className="font-mono text-sm">{passwordStrengthDemo.weak}</code>
              </div>
              <div className="text-sm text-red-700">Cracked in: {passwordStrengthDemo.time.weak}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <code className="font-mono text-sm">{passwordStrengthDemo.medium}</code>
              </div>
              <div className="text-sm text-yellow-700">Cracked in: {passwordStrengthDemo.time.medium}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <code className="font-mono text-sm">{passwordStrengthDemo.strong}</code>
              </div>
              <div className="text-sm text-green-700">Cracked in: {passwordStrengthDemo.time.strong}</div>
            </div>
          </div>
        </div>

        {/* Password Strategies */}
        <div className="space-y-6">
          {passwordStrategies.map((strategy, index) => (
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
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-start gap-2">
                              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-semibold text-blue-900 mb-1">Security Tip:</h5>
                                <p className="text-blue-800 text-sm">{strategy.tips}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {strategy.example && (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h5 className="font-semibold text-gray-900 mb-2">Example:</h5>
                            <code className="text-sm text-gray-700 font-mono">{strategy.example}</code>
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

        {/* Quick Security Checklist */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Password Security Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Use unique passwords for every account",
              "Enable multi-factor authentication",
              "Use a reputable password manager",
              "Create passwords 16+ characters long",
              "Avoid personal information in passwords",
              "Regular security audits and updates",
              "Monitor for data breaches",
              "Use hardware security keys when possible"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-sm">{item}</span>
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
              'secure password creation',
              'password security tips',
              'strong password generator',
              'multi-factor authentication',
              'password manager',
              'cybersecurity 2025',
              'phishing protection',
              'data breach prevention',
              'enterprise security',
              'biometric authentication'
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
        <div className="mt-12 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Secure Your Digital Life Today</h2>
            
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Don't leave your security to chance. Use our professional-grade tools to generate unbreakable passwords and protect your most valuable digital assets with military-grade encryption.
            </p>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <Key className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Password Generator</h4>
                  <p className="text-sm opacity-90">Create unbreakable passwords instantly</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <Lock className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Encryption Tools</h4>
                  <p className="text-sm opacity-90">Protect sensitive data with encryption</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools/password/password-generator" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center">
                Generate Secure Password
                <Key className="w-4 h-4" />
              </button>
              </Link>
              <Link to="/tools/encryption" target="_blank" rel="noopener noreferrer">
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors inline-flex items-center gap-2 justify-center">
                Explore Encryption Tools
                <Lock className="w-4 h-4" />
              </button>
            </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SecurePasswordGuide;