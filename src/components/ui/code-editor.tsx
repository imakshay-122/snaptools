import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  minHeight?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  minHeight = "300px",
}) => {
  const lines = value.split("\n");
  const lineNumbers = Array.from({ length: Math.max(lines.length, 1) }, (_, i) => i + 1);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbersContainer = lineNumbersRef.current;

    if (!textarea || !lineNumbersContainer) return;

    const handleScroll = () => {
      lineNumbersContainer.scrollTop = textarea.scrollTop;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative font-mono text-sm">
      <div
        ref={lineNumbersRef}
        className="absolute left-0 top-0 flex flex-col items-end px-3 py-3 select-none text-gray-500 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-[50px] overflow-hidden"
        style={{ height: minHeight }}
      >
        {lineNumbers.map((num) => (
          <div key={num} className="leading-6">
            {num}
          </div>
        ))}
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className="pl-[60px] font-mono min-h-[300px] leading-6 resize-y"
        style={{ minHeight }}
      />
    </div>
  );
};

export default CodeEditor;