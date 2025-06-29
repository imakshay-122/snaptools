
import { ArrowDown } from "lucide-react";
import SearchBar from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import AnimatedElement from "@/components/animated-element";
import { motion } from "framer-motion";
import { toolCategories } from "@/data/tools";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    if (query.startsWith('/tools/')) {
      navigate(query);
      return;
    }

    const searchQuery = query.toLowerCase();
    for (const category of toolCategories) {
      const subTools = category.subTools || [];
      const matchingTool = subTools.find(tool => 
        tool.title.toLowerCase().includes(searchQuery) ||
        tool.description?.toLowerCase().includes(searchQuery)
      );
      
      if (matchingTool) {
        navigate(`/tools/${category.id}/${matchingTool.id}`);
        return;
      }
    }
  };
  const scrollToTools = () => {
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-b from-background to-accent/30">
      <div className="container relative z-10 text-center">
        <AnimatedElement animation="fadeIn">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-tooltopia-purple-vivid to-primary">
            One Platform,<br className="md:hidden" /> Every Tool You Need
          </h1>
        </AnimatedElement>
        
        <AnimatedElement delay={0.1} animation="fadeIn">
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Access 100+ powerful tools in one place. No ads, no tracking, just blazing fast productivity.
          </p>
        </AnimatedElement>
        
        <AnimatedElement delay={0.2} animation="fadeIn">
          <div className="flex flex-col items-center space-y-8">
            <SearchBar className="w-full max-w-lg" onSearch={handleSearch} />
            
            <div className="flex items-center gap-4 mt-4">
              <Button 
                size="lg"
                onClick={() => navigate('/tools')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </Button>
              <motion.div
                whileHover={{ y: [0, -5, 0], transition: { repeat: Infinity, duration: 1.5 } }}
              >
                <Button 
                  variant="ghost" 
                  onClick={scrollToTools}
                  className="flex items-center gap-2"
                >
                  Explore Tools <ArrowDown size={16} />
                </Button>
              </motion.div>
            </div>
          </div>
        </AnimatedElement>
      </div>
      
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-36 -left-36 w-96 h-96 bg-tooltopia-purple-vivid/20 rounded-full blur-3xl opacity-50"></div>
    </section>
  );
};

export default HeroSection;
