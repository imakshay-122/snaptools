import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Heart } from "lucide-react";

interface PaymentDetails {
  razorpay_payment_id: string;
  amount: string;
  currency: string;
  status: string;
  timestamp: string;
  name?: string;
  email?: string;
  mobile?: string;
  message?: string;
}

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state?.paymentDetails as PaymentDetails;

  if (!paymentDetails) {
    navigate("/donate");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Thank You for Your Support!</h1>
            <p className="text-xl text-muted-foreground">
              Your donation helps us continue our mission.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-6">Donation Details</h2>
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">₹{paymentDetails.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">{paymentDetails.razorpay_payment_id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-green-600">{paymentDetails.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{paymentDetails.timestamp}</span>
              </div>

              {paymentDetails.name && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-4">Donor Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{paymentDetails.name}</span>
                    </div>
                    {paymentDetails.email && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{paymentDetails.email}</span>
                      </div>
                    )}
                    {paymentDetails.mobile && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Mobile:</span>
                        <span>{paymentDetails.mobile}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {paymentDetails.message && (
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-4">Message</h3>
                  <p className="text-muted-foreground">{paymentDetails.message}</p>
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="w-full md:w-auto"
          >
            Return to Home
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;