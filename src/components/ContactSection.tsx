import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import emailjs from "emailjs-com";

const SERVICE_ID = "service_rt9zts5";
const TEMPLATE_ID = "your_template_id";
const USER_ID = "your_user_id";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deviceID, setDeviceID] = useState("");
  const { theme } = useTheme();

  // Load unique device ID using FingerprintJS
  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceID(result.visitorId); // Set unique device ID
    };
    loadFingerprint();
  }, []);

  // Limit to 2 messages per day
  const canSendMessage = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const messages = JSON.parse(localStorage.getItem("messages") || "{}");

    if (!messages[deviceID]) messages[deviceID] = {}; // Initialize if not exists
    if (!messages[deviceID][today]) messages[deviceID][today] = 0;

    return messages[deviceID][today] < 2;
  };

  // Update message count in localStorage
  const updateMessageCount = () => {
    const today = new Date().toISOString().split("T")[0];
    const messages = JSON.parse(localStorage.getItem("messages") || "{}");

    messages[deviceID] = messages[deviceID] || {};
    messages[deviceID][today] = (messages[deviceID][today] || 0) + 1;

    localStorage.setItem("messages", JSON.stringify(messages));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canSendMessage()) {
      toast.error("You have reached the daily limit of 2 messages per device.");
      return;
    }

    setIsSubmitting(true);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon.");
        updateMessageCount(); // Increase the count

        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" });
          setIsSubmitted(false);
        }, 3000);
      })
      .catch(() => {
        setIsSubmitting(false);
        toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <section id="contact" className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-b from-black to-slate-900' : 'bg-gradient-to-b from-white to-gray-100'}`}>
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className={`inline-block px-3 py-1 text-xs font-medium tracking-wider ${theme === 'dark' ? 'glass' : 'bg-gray-100 border border-gray-200'} rounded-full mb-4`}>
            GET IN TOUCH
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-gradient' : 'text-gray-800'}`}>
            Contact Us
          </h2>
          <p className={theme === 'dark' ? 'text-white/70 max-w-2xl mx-auto' : 'text-gray-600 max-w-2xl mx-auto'}>
            Ready to discuss your project? Contact us for a consultation and quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <ContactInfo icon={<Mail />} title="Email" content="pixoform@gmail.com" link="mailto:pixoform@gmail.com" />
            <ContactInfo icon={<Phone />} title="Phone" content="+91 7045131964" link="tel:+917045131964" />
            <ContactInfo icon={<MessageSquare />} title="WhatsApp" content="Send a message" link="https://wa.me/917045131964" />
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className={`${theme === 'dark' ? 'glass' : 'bg-white shadow-md'} rounded-2xl p-8`}>
              <FormField label="Your Name" type="text" name="name" value={formData.name} onChange={handleChange} />
              <FormField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />
              <FormField label="Your Message" type="textarea" name="message" value={formData.message} onChange={handleChange} />

              <div>
                <button type="submit" disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 px-6 rounded-xl flex items-center justify-center font-medium transition-all duration-300 ${
                    isSubmitted ? "bg-green-500 hover:bg-green-600 text-white" :
                    theme === 'dark' ? "glass hover:glass-dark" : "bg-gray-900 text-white hover:bg-black"
                  } hover-lift`}
                >
                  {isSubmitting ? (
                    <LoadingSpinner />
                  ) : isSubmitted ? (
                    <>
                      <Check className="h-5 w-5 mr-2" /> Message Sent
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" /> Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, content, link }: any) => (
  <div className="bg-white shadow-md rounded-2xl p-6 hover-lift transition-all duration-300">
    <div className="flex items-start">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-100 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <a href={link} className="text-gray-600 hover:text-gray-900 transition-colors">{content}</a>
      </div>
    </div>
  </div>
);

const FormField = ({ label, type, name, value, onChange }: any) => (
  <div>
    <label className="block text-sm font-medium mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea name={name} value={value} onChange={onChange} rows={5} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-0 transition-all resize-none" />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-0 transition-all" />
    )}
  </div>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  </svg>
);

export default ContactSection;
