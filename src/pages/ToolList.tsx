import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ToolsSearchBar from "@/components/tools-search-bar";
import { toolCategories } from "@/data/tools";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const ToolList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredCategories, setFilteredCategories] = useState(toolCategories);

  const handleSearch = (query: string) => {
    if (query.startsWith("/tools/")) {
      window.location.href = query;
    } else {
      setSearchQuery(query);
    }
  };

  useEffect(() => {
    const filtered = toolCategories.map(category => ({
      ...category,
      subTools: category.subTools?.filter(tool => 
        (tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!selectedCategory || category.id === selectedCategory)
      )
    })).filter(category => category.subTools && category.subTools.length > 0);
    
    setFilteredCategories(filtered);
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-8 pt-20">
        <div className="mb-8">
          <motion.button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4 bg-transparent border-none cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </motion.button>
          <h1 className="text-4xl font-bold mb-4">All Tools</h1>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Browse our complete collection of tools, organized by category.
          </p>
          <div className="flex gap-4 items-start mb-8">
            <ToolsSearchBar 
              onSearch={handleSearch}
              className="flex-1"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {selectedCategory ? 
                    toolCategories.find(c => c.id === selectedCategory)?.title : 
                    "All Categories"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <button
                    className={cn(
                      "w-full text-left px-2 py-1 rounded hover:bg-accent/50 transition-colors",
                      !selectedCategory && "bg-accent/50"
                    )}
                    onClick={() => handleCategorySelect(null)}
                  >
                    All Categories
                  </button>
                  {filteredCategories.map((category) => (
                    <button
                      key={category.id}
                      className={cn(
                        "w-full text-left px-2 py-1 rounded hover:bg-accent/50 transition-colors",
                        selectedCategory === category.id && "bg-accent/50"
                      )}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", category.color)}>
                  {category.icon && <category.icon size={20} className="text-primary-foreground" />}
                </div>
                <h2 className="text-2xl font-semibold">{category.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.subTools?.map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/tools/${category.id}/${tool.id}`}
                    className="group block p-4 rounded-lg border bg-card hover:shadow-md transition-all"
                  >
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    {tool.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {tool.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ToolList;