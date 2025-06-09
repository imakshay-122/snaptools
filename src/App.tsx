import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionConfig } from "framer-motion";
import { Analytics } from "@vercel/analytics/react"
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ToolPage from "./pages/ToolPage";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ToolList from "./pages/ToolList";
import ToolCategoryPage from "./pages/ToolCategoryPage";

import About from "./pages/AboutPage";
import Documentation from "./pages/DocumentationPage";
import Pricing from "./pages/pricing";
import Features from "./pages/features";
import Donate from "./pages/Donate"
import PaymentSuccess from "./pages/PaymentSuccess"
import BlogRouter from "./blog/router"

// Create the query client
const queryClient = new QueryClient();

const App = () => (
  <>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionConfig reducedMotion="user">
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/tools" element={<ToolList />} />
                  <Route path="/tools/:categoryId" element={<ToolCategoryPage />} />
                  <Route path="/tools/:categoryId/:toolId" element={<ToolPage />} />
                  <Route path="/tools/:toolId" element={<ToolPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/Privacy" element={<Privacy />} />
                  <Route path="/Terms" element={<Terms />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/blog/*" element={<BlogRouter />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </MotionConfig>
        </ThemeProvider>
      </QueryClientProvider>
      <Analytics />
    </HelmetProvider>
  </>
);

export default App;
