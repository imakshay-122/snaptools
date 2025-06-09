import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Gauge, Laptop, Cloud, Users } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-2xl border bg-card hover:shadow-md transition-all">
    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process your tasks instantly with our optimized tools and algorithms.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and never stored without your permission.",
    },
    {
      icon: Gauge,
      title: "High Performance",
      description: "Built with the latest technology to handle your most demanding tasks.",
    },
    {
      icon: Laptop,
      title: "Cross-Platform",
      description: "Access your tools from any device with a modern web browser.",
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamlessly connect with popular cloud storage services.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Share and work together with your team in real-time.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Powerful Features for Everyone</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the tools and features that make our platform the perfect choice for your needs.
          </p>
          <Link to="/tools">
            <Button className="inline-flex items-center gap-2">
              Try it Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who trust our platform for their daily tasks.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/tools"> <Button size="lg">Start for Free</Button> </Link>
            <Link to="/pricing"> <Button size="lg" variant="outline">View Pricing  </Button>  </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;