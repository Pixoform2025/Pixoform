import React, { useState, useEffect } from "react";
import { Mail, Phone, MessageSquare, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import emailjs from "emailjs-com";

// EmailJS credentials (Replace with your actual IDs)
const SERVICE_ID = "service_rt9zts5";
const TEMPLATE_ID = "template_i7b9fss";
const USER_ID = "AX3irI3rPblzCKZ7i";

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deviceID, setDeviceID] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setDeviceID(result.visitorId);
    };
    loadFingerprint();
  }, []);

  const canSendMessage = () => {
    const today = new Date().toISOString().split("T")[0];
    const messages = JSON.parse(localStorage.getItem("messages") || "{}");

    if (!messages[deviceID]) messages[deviceID] = {};
    if (!messages[deviceID][today]) messages[deviceID][today] = 0;

    return messages[deviceID][today] < 2;
  };

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
        updateMessageCount();

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
            <div className={`${theme === 'dark' ? 'glass' : 'bg-white shadow-md'} rounded-2xl p-6 hover-lift transition-all duration-300`}>
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'glass' : 'bg-gray-100'} mr-4`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <a href="mailto:pixoform@gmail.com" className={`${theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    pixoform@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'glass' : 'bg-white shadow-md'} rounded-2xl p-6 hover-lift transition-all duration-300`}>
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'glass' : 'bg-gray-100'} mr-4`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Phone</h3>
                  <a href="tel:+917045131964" className={`${theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                    +91 7045131964
                  </a>
                </div>
              </div>
            </div>

            <div className={`${theme === 'dark' ? 'glass' : 'bg-white shadow-md'} rounded-2xl p-6 hover-lift transition-all duration-300`}>
              <div className="flex items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme === 'dark' ? 'glass' : 'bg-gray-100'} mr-4`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">WhatsApp</h3>
                  <a 
                    href="https://wa.me/917045131964"
                    className={`${theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    target="_blank" 
                    rel="noreferrer"
                  >
                    Send a message
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className={`${theme === 'dark' ? 'glass' : 'bg-white shadow-md'} rounded-2xl p-8`}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 focus:border-white/30' 
                        : 'bg-gray-50 border border-gray-200 focus:border-gray-300'
                    } focus:outline-none focus:ring-0 transition-all`}
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 focus:border-white/30' 
                        : 'bg-gray-50 border border-gray-200 focus:border-gray-300'
                    } focus:outline-none focus:ring-0 transition-all`}
                    placeholder="@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10 focus:border-white/30' 
                        : 'bg-gray-50 border border-gray-200 focus:border-gray-300'
                    } focus:outline-none focus:ring-0 transition-all resize-none`}
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-4 px-6 rounded-xl flex items-center justify-center font-medium transition-all duration-300 ${
                      isSubmitted
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : theme === 'dark'
                          ? "glass hover:glass-dark"
                          : "bg-gray-900 text-white hover:bg-black"
                    } hover-lift`}
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
