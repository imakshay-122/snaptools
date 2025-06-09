import CurrentTime from "./CurrentTime";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";
import WorldClock from "./WorldClock";

type ClockToolComponentMap = {
  [key: string]: React.ComponentType;
};

const clockTools: ClockToolComponentMap = {
  "current-time": CurrentTime,
  "stopwatch": Stopwatch,
  "timer": Timer,
  "world-clock": WorldClock,
};

export default clockTools;