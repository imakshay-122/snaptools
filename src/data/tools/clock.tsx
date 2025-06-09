import { Tool } from "@/types/tool";
import Clock from "@/components/tools/clock/Clock";
import { Clock as ClockIcon } from "lucide-react";

export const clockTool: Tool = {
  name: "Clock Tools",
  id: "clock",
  description: "Collection of time-related tools including current time, stopwatch, timer, and world clock.",
  component: Clock,
  category: "utility",
  keywords: ["time", "clock", "stopwatch", "timer", "world clock", "timezone"],
  icon: ClockIcon,
};