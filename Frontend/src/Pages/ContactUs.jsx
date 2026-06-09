import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Banners from "./../components/Banners/Banners";
import Input from "../components/Inputs/Input";
import { toast } from "sonner";

const ContactUs = () => {
  const [subject, setSubject] = useState("");

  const subjectOptions = [
    { label: "Order Inquiry", value: "order" },
    { label: "Book Recommendation", value: "recommendation" },
    { label: "Author Partnership", value: "partnership" },
    { label: "Other", value: "other" }
  ];
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Our Store",
      detail: "Connaught Place, New Delhi, 110001",
      description: "Come visit our physical store!"
    },
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Us",
      detail: "nextChapter744@gmail.com",
      description: "We typically reply within 24 hours.",
      action: "mailto:nextChapter744@gmail.com",
      actionText: "Send Email"
    },
    {
      icon: <FaPhoneAlt className="text-3xl" />,
      title: "Call Us",
      detail: "+91 852127434",
      description: "Mon-Sat from 9am to 7pm.",
      action: "tel:+91852127434",
      actionText: "Call Now"
    }
  ];

  return (
    <div className="min-h-screen bg-tan">
      {/* Hero Section */}
      <Banners titleFirst={"Get in"} titleSecond={"Touch"} />

      {/* Main Content Area */}
      <div className="max-w-6xl px-4 py-20 mx-auto">
        <div className="flex flex-col gap-16 lg:flex-row">

          {/* Contact Information (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <h2 className="mb-8 text-3xl font-bold text-coffee">Contact <span className="text-sepia">Information</span></h2>
            <p className="mb-10 text-sepia leading-relaxed">
              Whether you have a question about a specific book, need help with your order, or just want to share your latest literary discovery, our team is always ready to hear from you.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-4 transition-colors duration-300 bg-coffee text-tan shadow-sm rounded-xl border border-tan/10 relative overflow-hidden"
                  key={index}
                >
                  <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
                  <div className="relative z-10 flex items-start gap-4 w-full">
                    <div className="p-3 bg-tan/10 rounded-full text-tan shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold">{info.title}</h4>
                      <p className="font-medium text-tan/90">{info.detail}</p>
                      <p className="text-sm text-tan/60 mt-1 mb-2">{info.description}</p>
                      {info.action && (
                        <a 
                          href={info.action} 
                          className="inline-block mt-1 px-4 py-1.5 bg-tan/10 border border-tan/20 hover:bg-tan/20 text-tan text-xs font-bold rounded-lg transition-colors"
                        >
                          {info.actionText}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <div className="p-8 bg-coffee text-tan md:p-12 shadow-2xl rounded-[3rem] border border-tan/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/bgDesign.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="mb-6 text-2xl font-bold">Send us a Message</h3>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  e.target.reset();
                  setSubject("");
                  toast.success("Message sent successfully!");
                }}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    className="bg-tan/10 hover:bg-tan/20 transition-colors duration-300"
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    className="bg-tan/10 hover:bg-tan/20 transition-colors duration-300"
                  />
                </div>

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email address"
                  className="bg-tan/10 hover:bg-tan/20 transition-colors duration-300"
                />

                <Input
                  as="select"
                  label="Subject"
                  placeholder="How can we help you?"
                  options={subjectOptions}
                  selectedValue={subject}
                  onChange={setSubject}
                  className="bg-tan/10 hover:bg-tan/20 transition-colors duration-300"
                />

                <Input
                  as="textarea"
                  label="Message"
                  placeholder="Write your message here..."
                  className="bg-tan/10 hover:bg-tan/20 transition-colors duration-300 resize-none h-32"
                />

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px #D3BD9D" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center w-full gap-2 px-8 py-4 font-bold text-tan transition-colors duration-300 bg-gradient-to-r from-coffee to-sepia border border-tan/20 rounded-xl text-lg"
                >
                  <FaPaperPlane />
                  Send Message
                </motion.button>
              </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full h-96 relative pb-10"
      >
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 overflow-hidden rounded-3xl shadow-xl h-[90%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.839233663!2d77.0688975!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1714528193495!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;

