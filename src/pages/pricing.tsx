import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingTier = ({
  title,
  price,
  description,
  features,
  buttonText,
  highlighted = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}) => (
  <div
    className={`rounded-2xl p-6 ${
      highlighted
        ? "bg-primary text-primary-foreground shadow-lg border-primary"
        : "bg-card border"
    }`}
  >
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="mt-2 text-sm opacity-90">{description}</p>
    <div className="mt-4 flex items-baseline">
      <span className="text-4xl font-bold">{price}</span>
      {price !== "Free" && <span className="ml-1 text-sm">/month</span>}
    </div>
    <ul className="mt-6 space-y-4">
      {features.map((feature) => (
        <li key={feature} className="flex items-start">
          <Check className="h-5 w-5 shrink-0" />
          <span className="ml-3 text-sm">{feature}</span>
        </li>
      ))}
    </ul>
    <Button
      className={`mt-8 w-full ${highlighted ? "bg-background text-primary hover:bg-background/90" : ""}`}
      variant={highlighted ? "secondary" : "default"}
    >
      {buttonText}
    </Button>
  </div>
);

const Pricing = () => {
  const tiers = [
    {
      title: "Free",
      price: "Free",
      description: "Perfect for trying out our tools",
      features: [
        "Access to basic tools",
        "Limited conversions per day",
        "Standard support",
        "Basic analytics",
      ],
      buttonText: "Get Started",
    },
    {
      title: "Pro",
      price: "$9.99",
      description: "Best for professionals and small teams",
      features: [
        "All free features",
        "Unlimited conversions",
        "Priority support",
        "Advanced analytics",
        "API access",
      ],
      buttonText: "Start Pro Trial",
      highlighted: true,
    },
    {
      title: "Enterprise",
      price: "$29.99",
      description: "For large organizations with custom needs",
      features: [
        "All pro features",
        "Custom integrations",
        "24/7 dedicated support",
        "Advanced security features",
        "Custom branding",
        "Team management",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include access to our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <PricingTier key={tier.title} {...tier} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need something different?</h2>
          <p className="text-muted-foreground mb-6">
            Contact us for custom pricing options tailored to your specific requirements.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;