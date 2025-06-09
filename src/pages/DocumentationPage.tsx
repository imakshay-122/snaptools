import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { toolCategories } from "@/data/tools";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DocumentationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState('getting-started');
  const [visibleSections, setVisibleSections] = useState(['getting-started', 'tool-categories', 'best-practices', 'faq', 'need-help']);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sectionParam = params.get('section');
    if (sectionParam) {
      setActiveSection(sectionParam);
      setVisibleSections([sectionParam]);
    }
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setVisibleSections([sectionId]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setVisibleSections(['getting-started', 'tool-categories', 'best-practices', 'faq', 'need-help']);
      return;
    }

    const sections = [];
    
    // Search in Getting Started section
    if ('getting started overview documentation tools'.includes(query)) {
      sections.push('getting-started');
    }

    // Search in Tool Categories
    const hasMatchingTool = toolCategories.some(category => 
      category.title.toLowerCase().includes(query) ||
      category.description?.toLowerCase().includes(query) ||
      category.subTools?.some(tool => 
        tool.title.toLowerCase().includes(query) ||
        tool.description?.toLowerCase().includes(query)
      )
    );
    if (hasMatchingTool) sections.push('tool-categories');

    // Search in Best Practices
    if ('best practices requirements review backup preview'.includes(query)) {
      sections.push('best-practices');
    }

    // Search in FAQ
    if ('faq help questions free secure offline formats'.includes(query)) {
      sections.push('faq');
    }

    // Search in Need Help
    if ('help support questions assistance contact'.includes(query)) {
      sections.push('need-help');
    }

    setVisibleSections(sections);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 hidden md:block pt-16">
          <div className="sticky top-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg mb-6">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search docs..."
                className="bg-transparent border-none focus:outline-none text-sm w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <nav className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Getting Started</div>
                <ul className="space-y-1 pl-4">
                  <li>
                    <button
                      onClick={() => handleSectionClick('getting-started')}
                      className={`text-sm ${activeSection === 'getting-started' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors block py-1 w-full text-left`}
                    >Overview</button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSectionClick('tool-categories')}
                      className={`text-sm ${activeSection === 'tool-categories' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors block py-1 w-full text-left`}
                    >Tool Categories</button>
                  </li>
                </ul>
              </div>
              {/* Tool Categories Navigation */}
              <div>
                <div className="text-sm font-medium mb-2">Tool Categories</div>
                <ul className="space-y-1 pl-4">
                  {toolCategories.map((category) => (
                    <li key={category.id}>
                      <a 
                        href={`#${category.id}`} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1 flex items-center gap-2"
                      >
                        {category.icon && React.createElement(category.icon, { className: "w-4 h-4" })}
                        {category.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium mb-2">Guides</div>
                <ul className="space-y-1 pl-4">
                  <li>
                    <button
                      onClick={() => handleSectionClick('best-practices')}
                      className={`text-sm ${activeSection === 'best-practices' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors block py-1 w-full text-left`}
                    >Best Practices</button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSectionClick('faq')}
                      className={`text-sm ${activeSection === 'faq' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors block py-1 w-full text-left`}
                    >FAQ</button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSectionClick('need-help')}
                      className={`text-sm ${activeSection === 'need-help' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors block py-1 w-full text-left`}
                    >Need Help</button>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow max-w-3xl pt-20">
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {visibleSections.includes('getting-started') && (
              <section id="getting-started" className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 scroll-m-20">Getting Started</h2>
                <p className="text-lg mb-4">
                  Welcome to SnapTools' documentation! Here you'll find comprehensive guides and documentation to help you start working with our extensive collection of tools as quickly as possible.
                </p>
                <p className="text-lg mb-4">
                  SnapTools offers a powerful suite of tools spanning multiple categories including image processing, document handling, code manipulation, encryption, and more. Each tool is designed to be intuitive and efficient while delivering professional-grade results.
                </p>
                <p className="text-lg mb-4">
                  Whether you're a developer, designer, content creator, or business professional, our tools are crafted to streamline your workflow and enhance productivity.
                </p>
              </section>
            )}

            {visibleSections.includes('tool-categories') && (
              <section id="tool-categories" className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 scroll-m-20">Tool Categories</h2>
                {toolCategories.map((category) => (
                  <div key={category.id} id={category.id} className="mb-8 p-6 rounded-lg border bg-card scroll-m-20">
                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      {category.icon && React.createElement(category.icon, { className: "w-6 h-6" })}
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{category.description || `A comprehensive suite of ${category.title.toLowerCase()} tools to enhance your workflow.`}</p>
                    
                    {category.subTools && category.subTools.length > 0 && (
                      <div className="space-y-4">
                        {category.subTools.map((tool) => (
                          <div key={tool.id} id={tool.id} className="p-4 rounded-md bg-muted/50 scroll-m-20">
                            <h4 className="text-xl font-medium mb-2">{tool.title}</h4>
                            <p className="text-muted-foreground mb-3">{tool.description || `Powerful ${tool.title.toLowerCase()} functionality for your needs.`}</p>
                            
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-medium mb-2">Features:</h5>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                  <li>Fast and efficient processing</li>
                                  <li>Support for multiple formats and options</li>
                                  <li>User-friendly interface</li>
                                  <li>Secure and private processing</li>
                                </ul>
                              </div>
                              
                              <div>
                                <h5 className="font-medium mb-2">How to use:</h5>
                                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                                  <li>Navigate to the {tool.title} tool from the main tools page</li>
                                  <li>Upload or input your content according to the tool's requirements</li>
                                  <li>Configure any available options to customize the output</li>
                                  <li>Process your content and download or copy the results</li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

            {visibleSections.includes('best-practices') && (
              <section id="best-practices" className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 scroll-m-20">Best Practices</h2>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="font-medium">✓</span>
                    Always review the tool's description and requirements before use
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">✓</span>
                    Ensure your input files meet the specified format requirements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">✓</span>
                    Back up important files before processing them
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">✓</span>
                    Check the output preview when available before downloading
                  </li>
                </ul>
              </section>
            )}

            {visibleSections.includes('faq') && (
              <section id="faq" className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 scroll-m-20">FAQ</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-2">Are the tools free to use?</h3>
                    <p className="text-muted-foreground">Yes, all our tools are free to use! However, if you find our tools helpful and would like to support continued development, we greatly appreciate donations through our <Link to="/donate" className="text-primary hover:underline">donation page</Link>.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Is my data secure?</h3>
                    <p className="text-muted-foreground">We prioritize your privacy and security. Files are processed locally when possible and securely transmitted when cloud processing is required.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Are all tools fully functional?</h3>
                    <p className="text-muted-foreground">No, some tools might experience temporary issues due to API limitations or ongoing development. We're continuously working to improve and implement new features. If you encounter any problems, please visit our <Link to="/contact" className="text-primary hover:underline">contact page</Link>.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">What should I do if I encounter issues?</h3>
                    <p className="text-muted-foreground">If you experience any problems or have questions, please reach out through our <Link to="/contact" className="text-primary hover:underline">contact page</Link>. Our support team is ready to assist you.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Can I use the tools offline?</h3>
                    <p className="text-muted-foreground">An internet connection is required to access our tools through the website. However, we process all your data locally on your device - nothing is stored on our servers, ensuring your privacy and security.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">What file formats are supported?</h3>
                    <p className="text-muted-foreground">We support a wide range of file formats across our tools. While some formats might not be supported yet, we're actively working on expanding format compatibility. Check each tool's documentation for specific format support details.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Are there any planned features?</h3>
                    <p className="text-muted-foreground">Yes, we're constantly working on new features and improvements. Some tools are still in development and will be implemented in future updates. Stay tuned for announcements!</p>
                  </div>
                </div>
              </section>
            )}

            {visibleSections.includes('need-help') && (
              <section id="need-help" className="mb-12">
                <h2 className="text-3xl font-semibold mb-6 scroll-m-20">Need Help?</h2>
                <p className="text-lg mb-4">
                  If you need additional assistance or have specific questions, our support team is here to help.
                  Contact us through our support channels or check our community forums for more information.
                </p>
              </section>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentationPage;