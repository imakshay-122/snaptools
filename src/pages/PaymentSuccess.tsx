import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { generateReceiptImage } from '@/utils/receipt-generator';

export interface PaymentDetails {
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

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentDetails = location.state?.paymentDetails as PaymentDetails;

  if (!paymentDetails) {
    navigate('/donate');
    return null;
  }

  const handleDownload = async () => {
    const receiptImage = await generateReceiptImage(paymentDetails);
    const element = document.createElement('a');
    element.href = receiptImage;
    element.download = `payment-confirmation-${paymentDetails.razorpay_payment_id}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    const receiptImage = await generateReceiptImage(paymentDetails);
    const blob = await (await fetch(receiptImage)).blob();
    const file = new File([blob], `payment-confirmation-${paymentDetails.razorpay_payment_id}.png`, {
      type: blob.type,
      lastModified: Date.now()
    });
    const shareText = paymentDetails.message
      ? `I have donated ${paymentDetails.amount} ${paymentDetails.currency} to SnapTools with message: ${paymentDetails.message}`
      : `I have donated ${paymentDetails.amount} ${paymentDetails.currency} to SnapTools`;
    const shareData = {
      title: 'Payment Confirmation',
      text: shareText,
      files: [file]
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Payment details copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <Card className="max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your generous donation.</p>
          </div>

          <div className="space-y-4 mb-8">
            {paymentDetails.name && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{paymentDetails.name}</span>
              </div>
            )}
            {paymentDetails.email && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{paymentDetails.email}</span>
              </div>
            )}
            {paymentDetails.mobile && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Mobile</span>
                <span className="font-medium">{paymentDetails.mobile}</span>
              </div>
            )}
            {paymentDetails.message && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Message</span>
                <span className="font-medium">{paymentDetails.message}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-medium">{paymentDetails.razorpay_payment_id}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium">
                {paymentDetails.amount} {paymentDetails.currency}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600">{paymentDetails.status}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{paymentDetails.timestamp}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;