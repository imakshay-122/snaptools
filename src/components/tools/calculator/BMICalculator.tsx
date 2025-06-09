import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import AnimatedElement from "@/components/animated-element";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Info, TrendingUp, AlertTriangle, Heart, Scale, Activity } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState(null);
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("metric");
  const [avatar, setAvatar] = useState("normal");
  
  // Animation state
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (bmi !== null) {
      // Animate the progress bar
      setProgressValue(0);
      const targetValue = getBMIProgress();
      const duration = 1000; // 1 second
      const interval = 10; // Update every 10ms
      const step = targetValue / (duration / interval);
      
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= targetValue) {
          setProgressValue(targetValue);
          clearInterval(timer);
        } else {
          setProgressValue(current);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [bmi]);

  useEffect(() => {
    // Update avatar based on BMI category
    if (!bmi) {
      setAvatar("normal");
    } else if (bmi < 18.5) {
      setAvatar("underweight");
    } else if (bmi < 24.9) {
      setAvatar("normal");
    } else if (bmi < 29.9) {
      setAvatar("overweight");
    } else {
      setAvatar("obese");
    }
  }, [bmi]);

  const calculateBMI = () => {
    let heightInMeters;
    let weightInKg;
    
    // Convert height to meters
    if (heightUnit === 'cm') {
      const heightNum = parseFloat(height);
      if (isNaN(heightNum) || heightNum <= 0) {
        toast.error("Please enter a valid height");
        return;
      }
      heightInMeters = heightNum / 100;
    } else {
      const feetNum = parseFloat(feet);
      const inchesNum = parseFloat(inches) || 0;
      if (isNaN(feetNum) || feetNum <= 0) {
        toast.error("Please enter a valid height");
        return;
      }
      heightInMeters = (feetNum * 12 + inchesNum) * 0.0254;
    }
    
    // Convert weight to kg
    if (weightUnit === 'kg') {
      weightInKg = parseFloat(weight);
    } else {
      weightInKg = parseFloat(weight) * 0.453592;
    }
    
    if (isNaN(weightInKg) || weightInKg <= 0) {
      toast.error("Please enter a valid weight");
      return;
    }
    
    // Calculate BMI
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = parseFloat(bmiValue.toFixed(1));
    setBMI(roundedBMI);
    
    // Determine BMI category
    let bmiCategory;
    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmiValue < 24.9) {
      bmiCategory = "Normal weight";
    } else if (bmiValue < 29.9) {
      bmiCategory = "Overweight";
    } else if (bmiValue < 34.9) {
      bmiCategory = "Obesity Class I";
    } else if (bmiValue < 39.9) {
      bmiCategory = "Obesity Class II";
    } else {
      bmiCategory = "Obesity Class III";
    }
    
    setCategory(bmiCategory);
    setShowDetails(true);
    
    // Add to history with timestamp
    const newEntry = {
      date: new Date().toLocaleDateString(),
      bmi: roundedBMI,
      category: bmiCategory,
      weight: weightInKg,
    };
    
    setHistory(prev => {
      // Keep only the last 5 entries
      const updatedHistory = [newEntry, ...prev].slice(0, 5);
      return updatedHistory;
    });
    
    toast.success(`Your BMI has been calculated: ${roundedBMI}`);
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setFeet("");
    setInches("");
    setBMI(null);
    setCategory(null);
    setShowDetails(false);
  };

  const getBMIColor = () => {
    if (!bmi) return "bg-muted";
    
    if (bmi < 18.5) return "bg-blue-500";
    if (bmi < 24.9) return "bg-green-500";
    if (bmi < 29.9) return "bg-yellow-500";
    if (bmi < 34.9) return "bg-orange-500";
    return "bg-red-500";
  };

  const getBMIProgress = () => {
    if (!bmi) return 0;
    
    // Scale the BMI value to a 0-100 percentage for the progress bar
    // We'll use 10 as min BMI and 45 as max BMI for this scale
    const progress = ((bmi - 10) / 35) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getRecommendations = () => {
    if (!bmi) return null;
    
    if (bmi < 18.5) {
      return (
        <Alert className="bg-blue-500/10 dark:bg-blue-500/20 border-blue-200/50 dark:border-blue-700/50 mt-4">
          <AlertTriangle className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          <AlertTitle className="text-blue-700 dark:text-blue-300">Underweight</AlertTitle>
          <AlertDescription className="text-blue-600 dark:text-blue-200">
            <p>Consider consulting with a healthcare provider about healthy weight gain strategies:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Focus on nutrient-dense foods</li>
              <li>Add healthy calorie sources like nuts and avocados</li>
              <li>Consider strength training to build muscle mass</li>
            </ul>
          </AlertDescription>
        </Alert>
      );
    } else if (bmi < 24.9) {
      return (
        <Alert className="bg-green-500/10 dark:bg-green-500/20 border-green-200/50 dark:border-green-700/50 mt-4">
          <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
          <AlertTitle className="text-green-700 dark:text-green-300">Normal Weight</AlertTitle>
          <AlertDescription className="text-green-600 dark:text-green-200">
            <p>You're in a healthy weight range! To maintain:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Continue balanced nutrition and regular physical activity</li>
              <li>Aim for 150 minutes of moderate exercise weekly</li>
              <li>Regular health check-ups to monitor overall wellness</li>
            </ul>
          </AlertDescription>
        </Alert>
      );
    } else if (bmi < 29.9) {
      return (
        <Alert className="bg-yellow-500/10 dark:bg-yellow-500/20 border-yellow-200/50 dark:border-yellow-700/50 mt-4">
          <AlertTriangle className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
          <AlertTitle className="text-yellow-700 dark:text-yellow-300">Overweight</AlertTitle>
          <AlertDescription className="text-yellow-600 dark:text-yellow-200">
            <p>Small lifestyle changes can help improve your health:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Aim for a modest weight loss of 5-10%</li>
              <li>Increase physical activity to 30 minutes daily</li>
              <li>Focus on portion control and whole foods</li>
            </ul>
          </AlertDescription>
        </Alert>
      );
    } else {
      return (
        <Alert className="bg-red-500/10 dark:bg-red-500/20 border-red-200/50 dark:border-red-700/50 mt-4">
          <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-400" />
          <AlertTitle className="text-red-700 dark:text-red-300">Obesity</AlertTitle>
          <AlertDescription className="text-red-600 dark:text-red-200">
            <p>It's recommended to consult with healthcare providers:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Speak with your doctor about healthy weight loss options</li>
              <li>Consider a structured diet and exercise program</li>
              <li>Monitor related health markers like blood pressure</li>
            </ul>
          </AlertDescription>
        </Alert>
      );
    }
  };

  const renderAvatar = () => {
    // Simple avatar visualization based on BMI
    const avatarStyle = {
      width: '100px',
      height: '120px',
      margin: '0 auto',
      borderRadius: '50% 50% 0 0',
      position: 'relative' as const,
      overflow: 'visible',
    };
    
    const headStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#FFDBAC',
      position: 'absolute' as const,
      top: '0',
      left: '30px',
      zIndex: 2,
    };
    
    const bodyStyle = {
      width: '60px',
      height: '80px',
      borderRadius: '30px 30px 0 0',
      backgroundColor: '#FFDBAC',
      position: 'absolute' as const,
      top: '30px',
      left: '20px',
    };
    
    // Modify body width based on BMI category
    let bodyWidth = 60;
    switch(avatar) {
      case 'underweight':
        bodyWidth = 40;
        break;
      case 'normal':
        bodyWidth = 60;
        break;
      case 'overweight':
        bodyWidth = 75;
        break;
      case 'obese':
        bodyWidth = 90;
        break;
      default:
        bodyWidth = 60;
    }
    
    const updatedBodyStyle = {
      ...bodyStyle,
      width: `${bodyWidth}px`,
      left: `${(100 - bodyWidth) / 2}px`
    };
    
    return (
      <div className="flex justify-center mt-4 mb-4" style={{height: '120px'}}>
        <div style={avatarStyle} className="transition-all duration-700 ease-in-out">
          <div style={headStyle}></div>
          <div 
            style={updatedBodyStyle} 
            className="transition-all duration-700 ease-in-out"
          ></div>
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    if (history.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-4">
          No history yet. Calculate your BMI to start tracking.
        </div>
      );
    }
    
    return (
      <div className="space-y-2 mt-2">
        {history.map((entry, index) => {
          const isLatest = index === 0;
          const showTrend = index < history.length - 1;
          let trend = null;
          
          if (showTrend) {
            const diff = entry.bmi - history[index + 1].bmi;
            if (Math.abs(diff) > 0.1) {
              if (diff < 0) {
                trend = <TrendingUp className="h-4 w-4 text-green-500 dark:text-green-400 transform rotate-180" />;
              } else {
                trend = <TrendingUp className="h-4 w-4 text-red-500 dark:text-red-400" />;
              }
            }
          }
          
          let bgColor = "bg-muted/30 hover:bg-muted/50 dark:bg-muted/40 dark:hover:bg-muted/60";
          if (isLatest) bgColor = "bg-accent/30 hover:bg-accent/50 dark:bg-accent/40 dark:hover:bg-accent/60";
          
          return (
            <div key={index} className={`flex justify-between items-center p-2 rounded ${bgColor}`}>
              <div className="flex items-center gap-2">
                {isLatest && <CheckCircle className="h-4 w-4 text-primary dark:text-primary" />}
                <span className="text-foreground">{entry.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-foreground">{entry.bmi} BMI</span>
                {trend}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderInfoCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <Card className="bg-muted/30 border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Health Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            BMI is linked to risk of heart disease, type 2 diabetes, and certain cancers.
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30 border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Beyond BMI
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            BMI doesn't account for muscle mass, bone density, or body fat distribution.
          </CardContent>
        </Card>
        
        <Card className="bg-muted/30 border-muted">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Lifestyle Factors
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Diet quality, physical activity, and sleep all influence health beyond BMI.
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <AnimatedElement>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>BMI Calculator</span>
            <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Interactive
            </div>
          </CardTitle>
          <CardDescription>
            Calculate your Body Mass Index (BMI) to check if your weight is healthy
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab}
            onValueChange={(val) => setActiveTab(val)}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="metric"
                onClick={() => {
                  setHeightUnit("cm");
                  setWeightUnit("kg");
                }}
              >
                Metric (kg/cm)
              </TabsTrigger>
              <TabsTrigger
                value="imperial"
                onClick={() => {
                  setHeightUnit("ft");
                  setWeightUnit("lb");
                }}
              >
                Imperial (lb/ft)
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="metric" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="height-cm" className="flex items-center gap-1">
                    Height (cm)
                    <span className="relative group">
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 invisible group-hover:visible bg-black text-white text-xs p-1 rounded w-40 text-center">
                        Enter your height in centimeters
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="height-cm"
                    placeholder="Enter your height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    className="transition-all duration-200 focus:scale-105 focus:border-primary"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="weight-kg" className="flex items-center gap-1">
                    Weight (kg)
                    <span className="relative group">
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 invisible group-hover:visible bg-black text-white text-xs p-1 rounded w-40 text-center">
                        Enter your weight in kilograms
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="weight-kg"
                    placeholder="Enter your weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    className="transition-all duration-200 focus:scale-105 focus:border-primary"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="imperial" className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label className="flex items-center gap-1">
                    Height
                    <span className="relative group">
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 invisible group-hover:visible bg-black text-white text-xs p-1 rounded w-40 text-center">
                        Enter your height in feet and inches
                      </span>
                    </span>
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="feet" className="sr-only">Feet</Label>
                      <Input
                        id="feet"
                        placeholder="Feet"
                        value={feet}
                        onChange={(e) => setFeet(e.target.value)}
                        type="number"
                        className="transition-all duration-200 focus:scale-105 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inches" className="sr-only">Inches</Label>
                      <Input
                        id="inches"
                        placeholder="Inches"
                        value={inches}
                        onChange={(e) => setInches(e.target.value)}
                        type="number"
                        className="transition-all duration-200 focus:scale-105 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="weight-lb" className="flex items-center gap-1">
                    Weight (lb)
                    <span className="relative group">
                      <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 invisible group-hover:visible bg-black text-white text-xs p-1 rounded w-40 text-center">
                        Enter your weight in pounds
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="weight-lb"
                    placeholder="Enter your weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    className="transition-all duration-200 focus:scale-105 focus:border-primary"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex flex-wrap gap-2 mt-6">
            <Button 
              onClick={calculateBMI}
              className="transition-transform hover:scale-105 active:scale-95"
            >
              Calculate BMI
            </Button>
            <Button 
              variant="outline" 
              onClick={resetCalculator}
              className="transition-transform hover:scale-105 active:scale-95"
            >
              Reset
            </Button>
          </div>
          
          {showDetails && (
            <div className="mt-6 space-y-4">
              {renderAvatar()}
              
              <div className="bg-muted/20 dark:bg-muted/40 p-4 rounded-lg border border-border">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Your BMI: {bmi}</span>
                  <span className="font-medium">{category}</span>
                </div>
                <Progress value={progressValue} className={`h-3 ${getBMIColor()} transition-all duration-500`} />
              
                <div className="grid grid-cols-5 gap-1 text-xs text-center mt-1">
                  <div className="bg-blue-500/80 dark:bg-blue-600/80 text-primary-foreground p-1 rounded-l">Under</div>
                  <div className="bg-green-500/80 dark:bg-green-600/80 text-primary-foreground p-1">Normal</div>
                  <div className="bg-yellow-500/80 dark:bg-yellow-600/80 text-primary-foreground p-1">Over</div>
                  <div className="bg-orange-500/80 dark:bg-orange-600/80 text-primary-foreground p-1">Obese</div>
                  <div className="bg-red-500/80 dark:bg-red-600/80 text-primary-foreground p-1 rounded-r">Severe</div>
                </div>
              </div>
              
              {getRecommendations()}
              
              <Tabs defaultValue="history" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="info">BMI Info</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Your BMI History</h4>
                  {renderHistory()}
                </TabsContent>
                <TabsContent value="info">
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p className="mb-2">BMI Categories:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Underweight: less than 18.5</li>
                      <li>Normal weight: 18.5 - 24.9</li>
                      <li>Overweight: 25 - 29.9</li>
                      <li>Obesity Class I: 30 - 34.9</li>
                      <li>Obesity Class II: 35 - 39.9</li>
                      <li>Obesity Class III: 40 or higher</li>
                    </ul>
                    {renderInfoCards()}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4 text-xs text-muted-foreground">
          <p>BMI is a screening tool and not a diagnostic of body fatness or health.</p>
        </CardFooter>
      </Card>
    </AnimatedElement>
  );
};

export default BMICalculator;