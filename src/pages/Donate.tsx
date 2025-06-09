import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeatureCard from "@/components/feature-card";
import { Heart, CreditCard, Coffee, Gift, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";


declare const Razorpay: any;

const DonationPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const [confirmAnonymous, setConfirmAnonymous] = useState(false);
  const [useRandomMobile, setUseRandomMobile] = useState(false);

  const validEmailDomains = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com",
    "msn.com", "protonmail.com", "zoho.com", "gmx.com", "yandex.com",
    "mail.com", "tutanota.com", "neomail.com", "titan.com", "rediffmail.com",
    "comcast.net", "icloud.com", "me.com", "mac.com", "mail.ru",
    "fastmail.com", "hushmail.com"
  ];

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
    const domain = email.split('@')[1].toLowerCase();
    if (!validEmailDomains.includes(domain)) return "Please use a valid email domain";
    return "";
  };


  
  const initializeRazorpay = (amount: number) => {
    const options = {
      key: "rzp_live_TovZnWYZRmxQm9",
      // key: import.meta.env.RAZORPAY_KEY_ID,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "SnapTools",
      description: message ? `${message}` : "Donation to SnapTools",
      handler: function(response: any) {
        console.log("Payment successful", response);
        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          amount: amount.toString(),
          currency: "INR",
          status: "Successful",
          timestamp: new Date().toLocaleString(),
          name: name,
          email: email,
          mobile: mobile,
          message: message
        };
        navigate('/payment-success', { state: { paymentDetails } });
      },
      prefill: isAnonymous ? {} : {
        name,
        email,
        contact: mobile
      },
      theme: {
        color: "#6366f1"
      },
      modal: {
        confirm_close: true,
        escape: true,
        handleback: true
      },
      retry: {
        enabled: true,
        max_count: 3
      },
      timeout: 300,
      config: {
        display: {
          blocks: {
            utib: {
              name: "Pay using AXIS Bank",
              instruments: [{
                method: "card",
                issuers: ["UTIB"]
              }, {
                method: "netbanking",
                banks: ["UTIB"]
              }]
            }
          },
          sequence: ["block.utib"],
          preferences: {
            show_default_blocks: true
          }
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function (response: any){
      console.error('Payment failed:', response.error);
      toast({
        title: "Payment Failed",
        description: "Please try again or use a different payment method.",
        variant: "destructive"
      });
    });
    rzp.open();
  };

  const generateRandomMobile = () => {
    return '+919999999999';
  };

  const handleDonate = (amount: number) => {
    if (!isAnonymous && (!name || !email || !mobile)) {
      setFormErrors({
        name: name ? "" : "Name is required",
        email: email ? "" : "Email is required",
        mobile: mobile ? "" : "Mobile number is required"
      });
      return;
    }
    
    if (isAnonymous && !confirmAnonymous) {
      setError("Please confirm that you understand this is an anonymous donation without a receipt");
      return;
    }

    let currentMobile = mobile;
    if (isAnonymous && useRandomMobile) {
      currentMobile = generateRandomMobile();
      setMobile(currentMobile);
    }
    try {
      // Update mobile state before initializing payment
      if (isAnonymous && useRandomMobile) {
        currentMobile = generateRandomMobile();
        setMobile(currentMobile);
      }
      
      // Initialize payment with updated mobile number
      const options = {
        key: "rzp_live_TovZnWYZRmxQm9",
        amount: amount * 100,
        currency: "INR",
        name: "SnapTools",
        description: message ? `${message}` : "Donation to SnapTools",
        prefill: isAnonymous ? {
          contact: useRandomMobile ? currentMobile : undefined
        } : {
          name,
          email,
          contact: mobile
        },
        handler: function(response) {
          console.log("Payment successful", response);
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            amount: amount.toString(),
            currency: "INR",
            status: "Successful",
            timestamp: new Date().toLocaleString(),
            name: isAnonymous ? undefined : name,
            email: isAnonymous ? undefined : email,
            mobile: isAnonymous ? (useRandomMobile ? currentMobile : undefined) : mobile,
            message: message
          };
          navigate('/payment-success', { state: { paymentDetails } });
        },
        theme: {
          color: "#6366f1"
        },
        modal: {
          confirm_close: true,
          escape: true,
          handleback: true
        },
        retry: {
          enabled: true,
          max_count: 3
        },
        timeout: 300
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response){
        console.error('Payment failed:', response.error);
        toast({
          title: "Payment Failed",
          description: "Please try again or use a different payment method.",
          variant: "destructive"
        });
      });
      rzp.open();
    } catch (error) {
      setError("Failed to initialize payment. Please try again.");
      console.error("Razorpay initialization error:", error);
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setCustomAmount(value);
      setError("");
      return;
    }
    const amount = parseFloat(value);
    if (isNaN(amount)) {
      setError("Please enter a valid number");
      return;
    }
    if (amount > 1000) {
      setError("Amount cannot exceed ₹1,000");
      return;
    }
    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    setCustomAmount(value);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-20 px-4 flex-grow ">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Support SnapTools</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your donations help us maintain and improve SnapTools, keeping it free and accessible for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={Heart}
          title="Community Support"
          description="Your donation helps maintain our servers and infrastructure."
        />
        <FeatureCard
          icon={Coffee}
          title="Buy Us Coffee"
          description="Support our developers who work hard to bring you new features."
        />
        <FeatureCard
          icon={Gift}
          title="Enable Innovation"
          description="Help us develop new tools and improve existing ones."
        />
      </div>

      <div className="max-w-2xl mx-auto bg-card rounded-lg p-8 shadow-lg">
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={isAnonymous ? "default" : "outline"}
            onClick={() => {
              setIsAnonymous(true);
              setError("");
              setFormErrors({ name: "", email: "", mobile: "" });
            }}
          >
            Anonymous Donation
          </Button>
          <Button
            variant={!isAnonymous ? "default" : "outline"}
            onClick={() => {
              setIsAnonymous(false);
              setError("");
              setConfirmAnonymous(false);
            }}
          >
            Regular Donation
          </Button>
        </div>

        {!isAnonymous && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">Donor Information</h2>
        <div className="space-y-4 mb-8">
          <div>
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormErrors(prev => ({ ...prev, name: e.target.value ? "" : "Name is required" }));
              }}
              placeholder="Your Name"
              className="w-full"
            />
            {formErrors.name && <p className="text-destructive text-sm mt-1">{formErrors.name}</p>}
          </div>
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
              }}
              placeholder="Your Email"
              className="w-full"
            />
            {formErrors.email && <p className="text-destructive text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <Input
              type="tel"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setFormErrors(prev => ({ ...prev, mobile: e.target.value ? "" : "Mobile number is required" }));
              }}
              placeholder="<countrycode>number (e.g. +919999999999)"
              className="w-full"
            />
            {formErrors.mobile && <p className="text-destructive text-sm mt-1">{formErrors.mobile}</p>}
          </div>
          <div>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a special message (optional)"
              className="w-full"
            />
          </div>
        </div>
        </>)}

        {isAnonymous && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Anonymous Donation</h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="anonymous-confirm"
                checked={confirmAnonymous}
                onChange={(e) => {
                  setConfirmAnonymous(e.target.checked);
                  setError("");
                }}
                className="mt-1 w-5 h-5 cursor-pointer"
              />
              <label htmlFor="anonymous-confirm" className="text-sm text-muted-foreground cursor-pointer">
                I understand this is an anonymous donation. And Donation slip will be anonymous too. 
              </label>
            </div>
            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                id="random-mobile"
                checked={useRandomMobile}
                onChange={(e) => setUseRandomMobile(e.target.checked)}
                className="mt-1 w-5 h-5 cursor-pointer"
              />
              <label htmlFor="random-mobile" className="text-sm font-semibold text-yellow-500 dark:text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Use a random mobile number for payment (Recommended for enhanced privacy)
              </label>
            </div>
            {error && <p className="text-destructive text-sm mb-4">{error}</p>}
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6 text-center">Choose Amount</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[5, 10, 25, 50].map((amount) => (
            <Button
              key={amount}
              variant="outline"
              className="h-16 text-lg"
              onClick={() => handleDonate(amount)}
            >
              ₹{amount}
            </Button>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="w-full md:w-auto px-8"
            onClick={() => setShowCustomAmount(true)}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Custom Amount
          </Button>
        </div>

        {showCustomAmount && (
          <div className="mt-6">
            <div className="relative max-w-xs mx-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <Input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="pl-7"
                placeholder="Enter amount"
                step="0.01"
              />
            </div>
            {error && (
              <p className="text-destructive text-sm mt-2 text-center">{error}</p>
            )}
            <Button
              className="mt-4 mx-auto block"
              onClick={() => handleDonate(parseFloat(customAmount))}
              disabled={!!error || !customAmount}
            >
              Proceed to Payment
            </Button>
          </div>
        )}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="lg"
          className="w-full md:w-auto px-8"
          onClick={() => navigate('/contact')}
        >
          Having problems?
        </Button>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationPage;