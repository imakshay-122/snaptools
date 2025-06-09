import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Calculator, History, Trash2, ArrowLeft, Percent, RotateCcw, Divide, X as Multiply, Minus, Plus, Equal } from "lucide-react";
import AnimatedElement from "@/components/animated-element";

const EnhancedCalculator = () => {
  // Main calculator state
  const [display, setDisplay] = useState("0");
  const [calculation, setCalculation] = useState({
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false,
    memory: 0,
    history: []
  });
  
  // Additional state for showing calculation history
  const [showHistory, setShowHistory] = useState(false);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      
      // Number keys
      if (/^[0-9]$/.test(key)) {
        handleNumberInput(key);
        return;
      }
      
      // Operators
      switch (key) {
        case '+':
          handleOperatorInput('+');
          break;
        case '-':
          handleOperatorInput('-');
          break;
        case '*':
          handleOperatorInput('×');
          break;
        case '/':
          handleOperatorInput('÷');
          break;
        case 'Enter':
        case '=':
          handleEqualsInput();
          break;
        case '.':
        case ',':
          handleDecimalInput();
          break;
        case 'Backspace':
          handleBackspace();
          break;
        case 'Escape':
          handleClear();
          break;
        case '%':
          handlePercentage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, calculation]);

  // Helper to perform calculations
  const performCalculation = useCallback((firstOperand, secondOperand, operator) => {
    if (firstOperand === null || secondOperand === null) {
      return secondOperand;
    }
    
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
    
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : null;
      default: return b;
    }
  }, []);

  // Format display value for better readability
  const formatDisplayValue = (value) => {
    if (value === null) return "0";
    
    // Handle error cases
    if (value === Infinity || value === -Infinity) return "Error";
    if (value === null) return "Error";
    
    const stringValue = String(value);
    
    // If it's already a decimal number
    if (stringValue.includes('.')) return stringValue;
    
    // Format large integers with commas
    return parseFloat(stringValue).toLocaleString('en-US', {
      maximumFractionDigits: 10
    });
  };

  // Handle numeric input
  const handleNumberInput = (digit) => {
    if (calculation.waitingForSecondOperand) {
      setDisplay(digit);
      setCalculation(prev => ({
        ...prev,
        waitingForSecondOperand: false
      }));
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  // Handle operator input
  const handleOperatorInput = (nextOperator) => {
    const { firstOperand, operator } = calculation;
    const inputValue = parseFloat(display);
    
    // If we already have a first operand and operator
    if (firstOperand !== null && operator && !calculation.waitingForSecondOperand) {
      const result = performCalculation(firstOperand, inputValue, operator);
      
      if (result === null) {
        toast.error("Cannot divide by zero");
        handleClear();
        return;
      }
      
      // Add to history
      const newHistoryItem = `${firstOperand} ${operator} ${inputValue} = ${result}`;
      
      setDisplay(String(result));
      setCalculation(prev => ({
        ...prev,
        firstOperand: result,
        operator: nextOperator,
        waitingForSecondOperand: true,
        history: [...prev.history, newHistoryItem]
      }));
    } else {
      // Set the first operand and operator
      setCalculation(prev => ({
        ...prev,
        firstOperand: inputValue,
        operator: nextOperator,
        waitingForSecondOperand: true
      }));
    }
  };

  // Handle equals button press
  const handleEqualsInput = () => {
    if (calculation.firstOperand === null || calculation.operator === null) {
      return;
    }
    
    const secondOperand = parseFloat(display);
    const result = performCalculation(calculation.firstOperand, secondOperand, calculation.operator);
    
    if (result === null) {
      toast.error("Cannot divide by zero");
      handleClear();
      return;
    }
    
    // Add calculation to history
    const newHistoryItem = `${calculation.firstOperand} ${calculation.operator} ${secondOperand} = ${result}`;
    
    setDisplay(String(result));
    setCalculation(prev => ({
      ...prev,
      firstOperand: null,
      operator: null,
      waitingForSecondOperand: false,
      history: [...prev.history, newHistoryItem]
    }));
    
    toast.success(newHistoryItem);
  };

  // Handle decimal input
  const handleDecimalInput = () => {
    if (calculation.waitingForSecondOperand) {
      setDisplay('0.');
      setCalculation(prev => ({
        ...prev,
        waitingForSecondOperand: false
      }));
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Handle percentage operation
  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    
    if (calculation.operator && calculation.firstOperand !== null) {
      // Use percentage in context of the current operation
      let percentValue;
      
      switch (calculation.operator) {
        case '+':
        case '-':
          // For addition/subtraction, calculate percentage of first operand
          percentValue = (calculation.firstOperand * currentValue) / 100;
          break;
        default:
          // For multiplication/division, just convert to decimal
          percentValue = currentValue / 100;
      }
      
      setDisplay(String(percentValue));
    } else {
      // Simple percentage conversion
      const result = currentValue / 100;
      setDisplay(String(result));
    }
  };

  // Clear all values
  const handleClear = () => {
    setDisplay("0");
    setCalculation(prev => ({
      ...prev,
      firstOperand: null,
      operator: null,
      waitingForSecondOperand: false
    }));
  };

  // Clear all memory and history
  const handleReset = () => {
    setDisplay("0");
    setCalculation({
      firstOperand: null,
      operator: null,
      waitingForSecondOperand: false,
      memory: 0,
      history: []
    });
    toast.info("Calculator reset");
  };

  // Handle backspace
  const handleBackspace = () => {
    if (calculation.waitingForSecondOperand) return;
    
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // Handle memory operations
  const handleMemoryOperation = (operation) => {
    const currentValue = parseFloat(display);
    
    switch (operation) {
      case 'M+':
        setCalculation(prev => ({
          ...prev,
          memory: prev.memory + currentValue
        }));
        toast.info(`Added ${currentValue} to memory`);
        break;
      case 'M-':
        setCalculation(prev => ({
          ...prev,
          memory: prev.memory - currentValue
        }));
        toast.info(`Subtracted ${currentValue} from memory`);
        break;
      case 'MR':
        setDisplay(String(calculation.memory));
        setCalculation(prev => ({
          ...prev,
          waitingForSecondOperand: false
        }));
        break;
      case 'MC':
        setCalculation(prev => ({
          ...prev,
          memory: 0
        }));
        toast.info("Memory cleared");
        break;
    }
  };

  // Toggle sign of current value
  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  // Toggle history display
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // Clear history
  const clearHistory = () => {
    setCalculation(prev => ({
      ...prev,
      history: []
    }));
    toast.info("History cleared");
  };

  return (
    <AnimatedElement>
      <Card className="max-w-md mx-auto overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-4">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <Calculator className="mr-2" size={20} />
              Basic Calculator
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleHistory}
              className="hover:bg-primary-foreground/20"
            >
              <History size={18} />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {showHistory ? (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Calculation History</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={toggleHistory}>
                    <ArrowLeft size={14} className="mr-1" /> Back
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearHistory}>
                    <Trash2 size={14} className="mr-1" /> Clear
                  </Button>
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto border rounded-md p-2">
                {calculation.history.length > 0 ? (
                  <ul className="space-y-1">
                    {calculation.history.map((item, index) => (
                      <li key={index} className="text-sm py-1 border-b last:border-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No calculations yet
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <Input
                  value={formatDisplayValue(display)}
                  readOnly
                  className="text-right text-xl font-medium h-14 bg-background text-foreground border-input"
                />
                <div className="text-xs text-right mt-1 text-muted-foreground">
                  {calculation.operator && (
                    <span>
                      {calculation.firstOperand} {calculation.operator}
                    </span>
                  )}
                  {calculation.memory !== 0 && (
                    <span className="ml-2 bg-secondary px-1 rounded text-secondary-foreground">
                      M: {calculation.memory}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-2">
                <Button variant="outline" size="sm" onClick={() => handleMemoryOperation('MC')}>
                  MC
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleMemoryOperation('MR')}>
                  MR
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleMemoryOperation('M-')}>
                  M-
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleMemoryOperation('M+')}>
                  M+
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                <Button variant="secondary" onClick={handleClear}>
                  C
                </Button>
                <Button variant="secondary" onClick={toggleSign}>
                  +/-
                </Button>
                <Button variant="secondary" onClick={handlePercentage}>
                  <Percent size={18} />
                </Button>
                <Button variant="secondary" onClick={() => handleOperatorInput('÷')}>
                  <Divide size={18} />
                </Button>
                
                {[7, 8, 9].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => handleNumberInput(num.toString())}
                  >
                    {num}
                  </Button>
                ))}
                <Button variant="secondary" onClick={() => handleOperatorInput('×')}>
                  <Multiply size={18} />
                </Button>
                
                {[4, 5, 6].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => handleNumberInput(num.toString())}
                  >
                    {num}
                  </Button>
                ))}
                <Button variant="secondary" onClick={() => handleOperatorInput('-')}>
                  <Minus size={18} />
                </Button>
                
                {[1, 2, 3].map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => handleNumberInput(num.toString())}
                  >
                    {num}
                  </Button>
                ))}
                <Button variant="secondary" onClick={() => handleOperatorInput('+')}>
                  <Plus size={18} />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleReset}
                >
                  <RotateCcw size={18} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleNumberInput('0')}
                >
                  0
                </Button>
                <Button variant="outline" onClick={handleDecimalInput}>
                  .
                </Button>
                <Button variant="default" onClick={handleEqualsInput}>
                  <Equal size={18} />
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full mt-4 text-xs text-muted-foreground"
                onClick={handleBackspace}
              >
                <ArrowLeft size={14} className="mr-1" /> Backspace
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </AnimatedElement>
  );
};

export default EnhancedCalculator;