import React, { useState } from "react";
import { Mail, Phone, MapPin, User } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "General Physician",
    service: "Adult Checkup",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();

    const text = `Hello, I am ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Department: ${form.department}
Service: ${form.service}
Message: ${form.message}`;

    const url = `https://wa.me/918210958679?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200 px-6 py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT - FORM */}
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-green-200">

          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            Contact Our Clinic
          </h1>
          <p className="text-green-700 mb-6">
            Fill the form – we’ll open WhatsApp so you can connect with us instantly.
          </p>

          <form onSubmit={handleWhatsApp} className="space-y-5">

            {/* NAME + EMAIL */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="inputStyle"
                required
              />
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="inputStyle"
                required
              />
            </div>

            {/* PHONE + DEPT */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="inputStyle"
                required
              />
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="inputStyle"
              >
                <option>General Physician</option>
                <option>Cardiology</option>
                <option>Neurology</option>
              </select>
            </div>

            {/* SERVICE */}
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="inputStyle"
            >
              <option>Adult Checkup</option>
              <option>Blood Test</option>
              <option>X-Ray</option>
            </select>

            {/* MESSAGE */}
            <textarea
              name="message"
              rows="4"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="inputStyle resize-none"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-emerald-700 transition"
            >
              Send via WhatsApp
            </button>

          </form>
        </div>

        {/* RIGHT - MAP + DETAILS */}
        <div className="space-y-6">

          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Phone />
              <span>+91 8210958679</span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <Mail />
              <span>medicare@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin />
              <span>Haldia, West Bengal</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://maps.google.com/maps?q=Haldia%20West%20Bengal&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-80 border-0"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </div>

      {/* FOOTER NOTE */}
      <p className="text-center mt-10 text-sm text-green-700">
        Made with ❤️ by <span className="font-semibold">Pratyush</span>
      </p>

      {/* GLOBAL INPUT STYLE */}
      <style>{`
        .inputStyle {
          width: 100%;
          padding: 12px 16px;
          border-radius: 999px;
          border: 1px solid #86efac;
          background: rgba(255,255,255,0.6);
          outline: none;
          transition: 0.3s;
        }

        .inputStyle:focus {
          border-color: #059669;
          box-shadow: 0 0 0 2px rgba(16,185,129,0.2);
        }

        textarea.inputStyle {
          border-radius: 16px;
        }
      `}</style>

    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;