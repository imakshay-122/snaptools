import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Users, Heart } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience instant results with our optimized tools and efficient processing algorithms."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data security is our priority. We use encryption and secure processing methods."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of users who trust our tools for their daily tasks and projects."
    },
    {
      icon: ArrowRight,
      title: "Comprehensive Toolset",
      description: "Access a wide range of tools designed to handle various file formats and operations."
    },
    {
      icon: Heart,
      title: "User-Friendly",
      description: "Intuitive interfaces and clear instructions make our tools accessible to everyone."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-12 pt-20">
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">About SnapTools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SnapTools is your one-stop destination for powerful online tools that simplify your digital tasks.
            We're passionate about creating efficient, user-friendly solutions that save you time and effort.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-lg">
                At SnapTools, we believe that powerful tools should be accessible to everyone.
                Our mission is to provide a comprehensive suite of online utilities that help you
                work smarter, not harder.
              </p>
              <p className="text-lg">
                Whether you're a professional developer, designer, or someone who occasionally
                needs to convert files or process images, we've got you covered with our
                extensive collection of tools.
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">What Sets Us Apart</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Browser-based processing for maximum convenience
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Regular updates and new tool additions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Commitment to user privacy and data security
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  Responsive customer support
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our collection of tools and discover how SnapTools can help streamline your workflow.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/tools">
              <Button size="lg" className="gap-2">
                Explore Tools
                <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/documentation">
              <Button variant="outline" size="lg">
                Read Documentation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;