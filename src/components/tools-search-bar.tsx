import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface ToolsSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const ToolsSearchBar = ({
  className,
  placeholder = "Search for any tool...",
  onSearch,
}: ToolsSearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value); // Optional chaining call
  };

  return (
    <div className={cn("relative flex w-full max-w-lg items-center", className)}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 h-12 rounded-full bg-background border-input shadow-sm"
        />
      </div>
    </div>
  );
};

export default ToolsSearchBar;
