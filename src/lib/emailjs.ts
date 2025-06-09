import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_b5hodtc';
const EMAILJS_TEMPLATE_ID = 'template_1ty7cc6';
const EMAILJS_PUBLIC_KEY = 'TtKwV7W66dYX-xEvB'; // EmailJS public key

export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};

export const sendEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
};