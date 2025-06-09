import React, { useState } from 'react';
import { ChevronRight, FileText, Scissors, RotateCcw, Shield, Zap, RefreshCw, Edit3, Search, Clock, User, Calendar, Tag } from 'lucide-react';
import { Link } from "react-router-dom";

const PDFManipulationTechniques = () => {
  const [activeSection, setActiveSection] = useState(null);

  const techniques = [
    {
      id: 1,
      title: "Smart PDF Merging with Custom Page Ordering",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "green",
      description: "Master advanced merging techniques with custom page ordering and metadata preservation",
      features: ["Rearrange pages during merger", "Apply page-level transitions", "Maintain bookmarks and metadata", "Optimize file size during merging"]
    },
    {
      id: 2,
      title: "Strategic PDF Splitting",
      icon: <Scissors className="w-6 h-6" />,
      color: "purple",
      description: "Learn efficient document division while preserving structure and functionality",
      features: ["Split by page ranges", "Extract specific sections", "Create logical document divisions", "Preserve formatting and links"]
    },
    {
      id: 3,
      title: "PDF to Word Conversion Best Practices",
      icon: <FileText className="w-6 h-6" />,
      color: "yellow",
      description: "Convert PDFs to Word while maintaining formatting integrity and handling complex layouts",
      features: ["Maintain complex formatting", "Preserve tables and images", "Handle multi-column layouts", "Convert scanned documents accurately"]
    },
    {
      id: 4,
      title: "Advanced Page Management",
      icon: <RotateCcw className="w-6 h-6" />,
      color: "red",
      description: "Take control of PDF pages with advanced manipulation techniques",
      features: ["Rotating and aligning pages", "Adding and removing pages", "Reordering content efficiently", "Managing page sizes"]
    },
    {
      id: 5,
      title: "Form Field Manipulation",
      icon: <Edit3 className="w-6 h-6" />,
      color: "indigo",
      description: "Create and manage interactive PDF forms for enhanced workflows",
      features: ["Create interactive forms", "Extract form data", "Validate field inputs", "Automate form filling"]
    },
    {
      id: 6,
      title: "Security and Encryption",
      icon: <Shield className="w-6 h-6" />,
      color: "gray",
      description: "Protect sensitive documents with industry-standard security measures",
      features: ["Set document permissions", "Apply digital signatures", "Encrypt sensitive content", "Manage access controls"]
    },
    {
      id: 7,
      title: "PDF Optimization Techniques",
      icon: <Zap className="w-6 h-6" />,
      color: "orange",
      description: "Optimize PDFs for better performance without compromising quality",
      features: ["Faster loading", "Reduced file size", "Web compatibility", "Mobile viewing"]
    },
    {
      id: 8,
      title: "Batch Processing Workflows",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "teal",
      description: "Automate document processing with efficient batch operations",
      features: ["Custom processing rules", "Bulk operations", "Scheduled tasks", "Error handling"]
    },
    {
      id: 9,
      title: "Advanced Annotation Tools",
      icon: <Edit3 className="w-6 h-6" />,
      color: "pink",
      description: "Enhance collaboration with professional markup and commenting features",
      features: ["Custom stamps", "Rich text comments", "Drawing tools", "Review tracking"]
    },
    {
      id: 10,
      title: "OCR and Watermarking",
      icon: <Search className="w-6 h-6" />,
      color: "cyan",
      description: "Transform scanned documents and protect intellectual property",
      features: ["OCR text recognition", "Multi-language support", "Custom watermark design", "Batch watermarking"]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      green: "bg-green-50 border-green-200 text-green-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
      red: "bg-red-50 border-red-200 text-red-800",
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
      gray: "bg-gray-50 border-gray-200 text-gray-800",
      orange: "bg-orange-50 border-orange-200 text-orange-800",
      teal: "bg-teal-50 border-teal-200 text-teal-800",
      pink: "bg-pink-50 border-pink-200 text-pink-800",
      cyan: "bg-cyan-50 border-cyan-200 text-cyan-800"
    };
    return colorMap[color] || colorMap.gray;
  };

  const getBadgeClasses = (color) => {
    const colorMap = {
      green: "bg-green-100 text-green-700",
      purple: "bg-purple-100 text-purple-700",
      yellow: "bg-yellow-100 text-yellow-700",
      red: "bg-red-100 text-red-700",
      indigo: "bg-indigo-100 text-indigo-700",
      gray: "bg-gray-100 text-gray-700",
      orange: "bg-orange-100 text-orange-700",
      teal: "bg-teal-100 text-teal-700",
      pink: "bg-pink-100 text-pink-700",
      cyan: "bg-cyan-100 text-cyan-700"
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">PDF Tools</span>
            <ChevronRight className="w-4 h-4" />
            <span>Advanced Techniques</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            10 Advanced PDF Manipulation Techniques for Professionals
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Master professional-grade PDF manipulation with these advanced techniques. Learn expert methods for merging, splitting, and converting PDFs efficiently.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>SnapTools Team</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>January 18, 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <p className="text-lg text-blue-900 leading-relaxed">
            PDF manipulation is a crucial skill for professionals who work with digital documents. In this comprehensive guide, we'll explore 10 advanced techniques that will enhance your PDF workflow and productivity. Whether you're a document management expert, business professional, or developer, these techniques will help you master PDF manipulation.
          </p>
        </div>

        {/* Techniques Grid */}
        <div className="space-y-8">
          {techniques.map((technique, index) => (
            <div
              key={technique.id}
              className={`border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                activeSection === technique.id 
                  ? getColorClasses(technique.color) 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setActiveSection(activeSection === technique.id ? null : technique.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getBadgeClasses(technique.color)}`}>
                  {technique.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeClasses(technique.color)}`}>
                      #{technique.id}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">
                      {technique.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {technique.description}
                  </p>
                  
                  {activeSection === technique.id && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                      <ul className="space-y-2">
                        {technique.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {technique.id === 1 && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                          <p className="text-blue-900">
                            <strong>Pro Tip:</strong> Using SnapTools' PDF Merger, you can achieve this with just a few clicks while maintaining document integrity. Our intelligent merging algorithm ensures that your documents retain their original quality and interactive elements.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  activeSection === technique.id ? 'rotate-90' : ''
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Keywords Section */}
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Related Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'pdf manipulation',
              'advanced pdf techniques',
              'pdf editing tips',
              'pdf merger',
              'pdf splitter',
              'pdf to word conversion'
            ].map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Master PDF Manipulation?</h2>
          
          <p className="text-lg mb-6 opacity-90">
            Mastering these advanced PDF manipulation techniques will significantly enhance your document management capabilities. Whether you're working with complex forms, securing sensitive information, or automating document workflows, these skills will help you work more efficiently.
          </p>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
            <p className="mb-4 text-blue-100">
              Start implementing these techniques today with SnapTools' comprehensive suite of PDF tools. Our intuitive interface and powerful features make it easy to apply these advanced techniques to your workflow.
            </p>
            
            <Link to="/tools/pdf/" target="_blank" rel="noopener noreferrer">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              Get Started with SnapTools
              <ChevronRight className="w-4 h-4" />
            </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PDFManipulationTechniques;