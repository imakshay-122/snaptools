import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-12 pt-20">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when using our tools and services.
            This may include usage data and technical information about your device and browser.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to operate and improve our tools, provide customer
            support, and communicate with you about updates and new features.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information
            to third parties. We may share anonymous usage data for analytics purposes.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">5. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and
            hold certain information. You can instruct your browser to refuse all cookies or to
            indicate when a cookie is being sent.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">6. Changes to Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the effective date.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our
            contact page or the provided contact information.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;