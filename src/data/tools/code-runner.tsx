import { Tool } from "@/types/tool";
import CodeRunner from "@/components/tools/code/CodeRunner";
import { Code } from "lucide-react";

export const codeRunnerTool: Tool = {
  name: "Code Runner",
  id: "code-runner",
  description: "Write and execute code in multiple programming languages with real-time output.",
  component: CodeRunner,
  category: "code",
  keywords: ["code", "programming", "compiler", "executor", "python", "javascript", "java", "development"],
  icon: Code,
};