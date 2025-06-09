import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  History,
  RotateCcw,
  Delete,
  ChevronLeft,
  Clock,
  Calculator,
  BookOpen,
  PercentSquare
} from "lucide-react";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [secondaryDisplay, setSecondaryDisplay] = useState("");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [memory, setMemory] = useState(null);
  const [angleMode, setAngleMode] = useState("deg");
  const [history, setHistory] = useState([]);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isHypActive, setIsHypActive] = useState(false);
  const [error, setError] = useState(null);

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (/[0-9]/.test(key)) {
        handleNumberClick(key);
      } else if (key === ".") {
        handleDecimal();
      } else if (key === "Enter" || key === "=") {
        handleEquals();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape") {
        handleClear();
      } else if (key === "+") {
        handleOperationClick('+');
      } else if (key === "-") {
        handleOperationClick('-');
      } else if (key === "*") {
        handleOperationClick('×');
      } else if (key === "/") {
        handleOperationClick('÷');
      } else if (key === "^") {
        handleOperationClick('^');
      } else if (key === "%") {
        handlePercentage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, previousValue, operation, resetDisplay]);

  const handleNumberClick = (number) => {
    if (display === "0" || resetDisplay || display === "Error") {
      setDisplay(number);
      setResetDisplay(false);
    } else if (display.length < 16) { // Limit input length
      setDisplay(display + number);
    }
  };

  const handleOperationClick = (op) => {
    try {
      if (display === "Error") {
        return;
      }
      
      const current = parseFloat(display);
      
      if (previousValue === null) {
        setPreviousValue(current);
        setSecondaryDisplay(`${current} ${op}`);
      } else if (operation) {
        const result = calculate(previousValue, current, operation);
        setPreviousValue(result);
        setDisplay(formatNumber(result));
        setSecondaryDisplay(`${formatNumber(result)} ${op}`);
      }
      
      setOperation(op);
      setResetDisplay(true);
    } catch (err) {
      handleError(err.message);
    }
  };

  const formatNumber = (num) => {
    if (isNaN(num) || !isFinite(num)) return "Error";
    
    // Handle small and large numbers with scientific notation
    if (Math.abs(num) < 0.000001 && num !== 0) {
      return num.toExponential(6);
    }
    if (Math.abs(num) > 9999999999) {
      return num.toExponential(6);
    }
    
    // Convert to string and check if it's an integer
    const str = num.toString();
    if (str.includes('.')) {
      // For floating point, limit to reasonable precision
      return parseFloat(num.toFixed(10)).toString();
    }
    return str;
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': 
        if (b === 0) throw new Error("Division by zero");
        return a / b;
      case '^': return Math.pow(a, b);
      case 'mod': return a % b;
      case 'yroot': return Math.pow(a, 1/b);
      case 'log_base': return Math.log(a) / Math.log(b);
      default: return b;
    }
  };

  const handleEquals = () => {
    try {
      if (display === "Error" || previousValue === null || operation === null) {
        return;
      }
      
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      
      // Add to history
      const calculation = `${formatNumber(previousValue)} ${operation} ${formatNumber(current)} = ${formatNumber(result)}`;
      setHistory(prev => [calculation, ...prev.slice(0, 9)]);
      
      setDisplay(formatNumber(result));
      setSecondaryDisplay(`${formatNumber(previousValue)} ${operation} ${formatNumber(current)} =`);
      setPreviousValue(null);
      setOperation(null);
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setSecondaryDisplay("");
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
    setError(null);
  };

  const handleClearEntry = () => {
    setDisplay("0");
    setResetDisplay(false);
    setError(null);
  };

  const handleDecimal = () => {
    if (display === "Error") {
      return;
    }
    
    if (resetDisplay) {
      setDisplay("0.");
      setResetDisplay(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleBackspace = () => {
    if (display === "Error" || display === "0") {
      return;
    }
    
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleSignChange = () => {
    if (display === "Error" || display === "0") {
      return;
    }
    
    setDisplay((parseFloat(display) * -1).toString());
  };

  const handlePercentage = () => {
    try {
      if (display === "Error") {
        return;
      }
      
      const current = parseFloat(display);
      
      if (previousValue === null) {
        const result = current / 100;
        setDisplay(formatNumber(result));
      } else {
        // When in the middle of an operation, calculate percentage of the first number
        const result = (previousValue * current) / 100;
        setDisplay(formatNumber(result));
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  const convertToRadians = (value) => {
    return angleMode === "deg" ? value * (Math.PI / 180) : value;
  };

  const convertToDegrees = (value) => {
    return angleMode === "deg" ? value : value * (180 / Math.PI);
  };

  const handleScientificOperation = (op) => {
    try {
      if (display === "Error") {
        return;
      }
      
      const current = parseFloat(display);
      let result;
      const angle = convertToRadians(current);
      
      switch (op) {
        case 'sin':
          result = isHypActive ? Math.sinh(angle) : Math.sin(angle);
          break;
        case 'cos':
          result = isHypActive ? Math.cosh(angle) : Math.cos(angle);
          break;
        case 'tan':
          result = isHypActive ? Math.tanh(angle) : Math.tan(angle);
          break;
        case 'asin':
          if (!isHypActive && (current < -1 || current > 1)) {
            throw new Error("Domain error");
          }
          result = isHypActive 
            ? Math.log(current + Math.sqrt(current * current + 1))
            : Math.asin(current);
          result = angleMode === "deg" ? result * (180 / Math.PI) : result;
          break;
        case 'acos':
          if (!isHypActive && (current < -1 || current > 1)) {
            throw new Error("Domain error");
          }
          result = isHypActive 
            ? Math.log(current + Math.sqrt(current * current - 1))
            : Math.acos(current);
          result = angleMode === "deg" ? result * (180 / Math.PI) : result;
          break;
        case 'atan':
          result = isHypActive 
            ? 0.5 * Math.log((1 + current) / (1 - current))
            : Math.atan(current);
          result = angleMode === "deg" ? result * (180 / Math.PI) : result;
          break;
        case 'log':
          if (current <= 0) throw new Error("Domain error");
          result = Math.log10(current);
          break;
        case 'ln':
          if (current <= 0) throw new Error("Domain error");
          result = Math.log(current);
          break;
        case 'sqrt':
          if (current < 0) throw new Error("Domain error");
          result = Math.sqrt(current);
          break;
        case 'cbrt':
          result = Math.cbrt(current);
          break;
        case 'square':
          result = Math.pow(current, 2);
          break;
        case 'cube':
          result = Math.pow(current, 3);
          break;
        case '1/x':
          if (current === 0) throw new Error("Division by zero");
          result = 1 / current;
          break;
        case 'exp':
          result = Math.exp(current);
          break;
        case '10^x':
          result = Math.pow(10, current);
          break;
        case 'x!':
          if (current < 0 || !Number.isInteger(current)) throw new Error("Domain error");
          result = factorial(current);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        case 'abs':
          result = Math.abs(current);
          break;
        case 'floor':
          result = Math.floor(current);
          break;
        case 'ceil':
          result = Math.ceil(current);
          break;
        case 'round':
          result = Math.round(current);
          break;
        case 'rand':
          result = Math.random();
          break;
        default:
          result = current;
      }
      
      setDisplay(formatNumber(result));
      setResetDisplay(true);
    } catch (err) {
      handleError(err.message);
    }
  };

  const factorial = (n) => {
    if (n > 170) throw new Error("Overflow");
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleMemoryOperation = (op) => {
    try {
      if (display === "Error") {
        return;
      }
      
      const current = parseFloat(display);
      
      switch (op) {
        case 'ms':
          setMemory(current);
          toast.success("Value stored in memory");
          break;
        case 'mr':
          if (memory !== null) {
            setDisplay(formatNumber(memory));
            setResetDisplay(true);
          }
          break;
        case 'mc':
          setMemory(null);
          toast.success("Memory cleared");
          break;
        case 'm+':
          if (memory !== null) {
            setMemory(memory + current);
            toast.success("Value added to memory");
          } else {
            setMemory(current);
            toast.success("Value stored in memory");
          }
          break;
        case 'm-':
          if (memory !== null) {
            setMemory(memory - current);
            toast.success("Value subtracted from memory");
          } else {
            setMemory(-current);
            toast.success("Negative value stored in memory");
          }
          break;
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleError = (message) => {
    setDisplay("Error");
    setError(message || "Error");
    setResetDisplay(true);
  };

  const clearHistory = () => {
    setHistory([]);
    toast.success("History cleared");
  };

  const recallFromHistory = (calculation) => {
    const parts = calculation.split(' = ');
    if (parts.length === 2) {
      setDisplay(parts[1]);
      setSecondaryDisplay(parts[0] + ' =');
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="mb-4">
            {error && (
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm mb-2">
                {error}
              </div>
            )}
            
            <div className="mb-4 space-y-2">
              <Input
                value={secondaryDisplay}
                readOnly
                className="text-right text-sm font-medium h-10 bg-muted/50 text-muted-foreground border-input"
              />
              <Input
                value={display}
                readOnly
                className="text-right text-2xl font-medium h-14 bg-muted/50 text-foreground border-input"
              />
            </div>
            
            <div className="flex justify-between items-center my-3 text-sm">
              <div className="flex gap-2">
                <Button
                  variant={angleMode === "deg" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAngleMode("deg")}
                >
                  DEG
                </Button>
                <Button
                  variant={angleMode === "rad" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAngleMode("rad")}
                >
                  RAD
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={isShiftActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsShiftActive(!isShiftActive)}
                >
                  SHIFT
                </Button>
                <Button
                  variant={isHypActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsHypActive(!isHypActive)}
                >
                  HYP
                </Button>
              </div>
              
              {memory !== null && (
                <Badge variant="outline" className="text-xs">
                  M: {formatNumber(memory)}
                </Badge>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="basic">
                <Calculator className="h-4 w-4 mr-1" />
                Basic
              </TabsTrigger>
              <TabsTrigger value="scientific">
                <BookOpen className="h-4 w-4 mr-1" />
                Scientific
              </TabsTrigger>
              <TabsTrigger value="memory">
                <PercentSquare className="h-4 w-4 mr-1" />
                Functions
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-1" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="mt-0">
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" onClick={handleClearEntry}>
                  CE
                </Button>
                <Button variant="outline" onClick={handleClear}>
                  C
                </Button>
                <Button variant="outline" onClick={handleBackspace}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="secondary" onClick={() => handleOperationClick('÷')}>
                  ÷
                </Button>
                
                {[7, 8, 9].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => handleNumberClick(num.toString())}
                  >
                    {num}
                  </Button>
                ))}
                <Button variant="secondary" onClick={() => handleOperationClick('×')}>
                  ×
                </Button>
                
                {[4, 5, 6].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => handleNumberClick(num.toString())}
                  >
                    {num}
                  </Button>
                ))}
                <Button variant="secondary" onClick={() => handleOperationClick('-')}>
                  −
                </Button>
                
                {[1, 2, 3].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => handleNumberClick(num.toString())}
                  >
                    {num}
                  </Button>
                ))}
                <Button variant="secondary" onClick={() => handleOperationClick('+')}>
                  +
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleSignChange}
                >
                  ±
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumberClick('0')}
                >
                  0
                </Button>
                <Button variant="outline" onClick={handleDecimal}>
                  .
                </Button>
                <Button variant="default" onClick={handleEquals}>
                  =
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="scientific" className="mt-0">
              <div className="grid grid-cols-5 gap-2">
                {/* First row */}
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'asin' : 'sin')}>
                  {isShiftActive ? (isHypActive ? "asinh" : "asin") : (isHypActive ? "sinh" : "sin")}
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'acos' : 'cos')}>
                  {isShiftActive ? (isHypActive ? "acosh" : "acos") : (isHypActive ? "cosh" : "cos")}
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'atan' : 'tan')}>
                  {isShiftActive ? (isHypActive ? "atanh" : "atan") : (isHypActive ? "tanh" : "tan")}
                </Button>
                <Button variant="secondary" onClick={() => handleOperationClick(isShiftActive ? 'yroot' : '^')}>
                  {isShiftActive ? "ʸ√x" : "xʸ"}
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? '10^x' : 'log')}>
                  {isShiftActive ? "10ˣ" : "log"}
                </Button>
                
                {/* Second row */}
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'cbrt' : 'sqrt')}>
                  {isShiftActive ? "∛" : "√"}
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'cube' : 'square')}>
                  {isShiftActive ? "x³" : "x²"}
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation('1/x')}>
                  1/x
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'abs' : 'exp')}>
                  {isShiftActive ? "|x|" : "eˣ"}
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'e' : 'ln')}>
                  {isShiftActive ? "e" : "ln"}
                </Button>
                
                {/* Third row */}
                <Button variant="secondary" onClick={() => handleScientificOperation('pi')}>
                  π
                </Button>
                <Button variant="secondary" onClick={handlePercentage}>
                  %
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation('x!')}>
                  x!
                </Button>
                <Button variant="secondary" onClick={() => handleOperationClick('mod')}>
                  mod
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation(isShiftActive ? 'rand' : 'round')}>
                  {isShiftActive ? "rand" : "round"}
                </Button>
                
                {/* Fourth row */}
                <Button variant="outline" onClick={handleClear}>
                  C
                </Button>
                <Button variant="outline" onClick={() => handleBackspace()}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={handleSignChange}>
                  ±
                </Button>
                <Button variant="secondary" onClick={() => handleOperationClick(isShiftActive ? 'log_base' : '÷')}>
                  {isShiftActive ? "logₙ" : "÷"}
                </Button>
                <Button variant="default" onClick={handleEquals}>
                  =
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="memory" className="mt-0">
              <div className="grid grid-cols-3 gap-2">
                <Button variant="secondary" onClick={() => handleMemoryOperation('ms')}>
                  MS
                </Button>
                <Button variant="secondary" onClick={() => handleMemoryOperation('mr')}>
                  MR
                </Button>
                <Button variant="secondary" onClick={() => handleMemoryOperation('mc')}>
                  MC
                </Button>
                
                <Button variant="secondary" onClick={() => handleMemoryOperation('m+')}>
                  M+
                </Button>
                <Button variant="secondary" onClick={() => handleMemoryOperation('m-')}>
                  M−
                </Button>
                <Button variant="outline" onClick={handleClear}>
                  C
                </Button>
                
                <Button variant="secondary" onClick={() => handleScientificOperation('floor')}>
                  Floor
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation('ceil')}>
                  Ceil
                </Button>
                <Button variant="secondary" onClick={() => handleScientificOperation('abs')}>
                  |x|
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              {history.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Calculation History
                    </h3>
                    <Button variant="ghost" size="sm" onClick={clearHistory}>
                      <RotateCcw className="h-4 w-4 mr-1" /> Clear
                    </Button>
                  </div>
                  
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {history.map((calc, idx) => (
                      <div
                        key={idx}
                        className="text-sm p-2 border rounded cursor-pointer hover:bg-gray-50"
                        onClick={() => recallFromHistory(calc)}
                      >
                        {calc}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No calculation history yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScientificCalculator;