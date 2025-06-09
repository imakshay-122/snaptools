import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-20">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using SnapTools, you agree to be bound by these Terms and Conditions.
            If you disagree with any part of these terms, you may not access the service.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">2. Use License</h2>
          <p>
            Permission is granted to temporarily access and use SnapTools's tools for personal,
            non-commercial transitory viewing only.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">3. Disclaimer</h2>
          <p>
            The tools and services are provided "as is". SnapTools makes no warranties, expressed
            or implied, and hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">4. Limitations</h2>
          <p>
            In no event shall SnapTools be liable for any damages arising out of the use or
            inability to use the tools and services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">5. Privacy</h2>
          <p>
            Your use of SnapTools is also governed by our Privacy Policy. Please review our
            Privacy Policy for information on how we collect, use and share your information.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">6. Changes to Terms</h2>
          <p>
            SnapTools reserves the right, at our sole discretion, to modify or replace these
            Terms at any time. We will provide notice of any changes by posting the new Terms
            on this page.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;