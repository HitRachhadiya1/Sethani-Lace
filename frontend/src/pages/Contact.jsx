import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 800);
  };

  return (
    <div className="my-10">
      {/* Header Section */}
      <div className="text-center py-8">
        <Title text1={"GET IN"} text2={"TOUCH"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8">
          Have questions about our products? We're here to help you find the
          perfect lace design for your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="border border-[#414141] p-6">
          <h2 className="text-xl font-medium text-[#414141] mb-4">
            Send us a message
          </h2>

          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 mb-4 rounded">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#414141]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#414141]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#414141]"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm text-gray-600 mb-1"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#414141]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm text-gray-600 mb-1"
              >
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#414141]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#414141] text-white hover:bg-black transition-colors"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="border border-[#414141] p-6 mb-6">
            <h2 className="text-xl font-medium text-[#414141] mb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[#414141]">Address</h3>
                <p className="text-gray-600">Sethani Lace, Textile District</p>
                <p className="text-gray-600">Surat, Gujrat 300030</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#414141]">Phone</h3>
                <p className="text-gray-600">+91 9876543210</p>
                <p className="text-gray-600">+91 1234567890</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#414141]">Email</h3>
                <p className="text-gray-600">markrachhadiya@gmail.com</p>
                <p className="text-gray-600">nileshrachhadiya@gmail.com</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#414141]">
                  Business Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="border border-[#414141] overflow-hidden">
            <img
              src={assets.contact_img}
              alt="Contact"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-8 border border-[#414141]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68040184148!2d72.70813778889771!3d21.159340328185397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1677489930315!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Location Map"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
