import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Stethoscope,
  Twitter,
  Youtube,
  Activity
} from "lucide-react";

import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-emerald-50 to-green-100 text-green-900 overflow-hidden">

      {/* Floating Icons */}
      <Stethoscope className="absolute top-10 right-10 opacity-100" size={30}/>
      <Activity className="absolute bottom-10 left-10 opacity-100 " size={40}/>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* COMPANY */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="logo" className="w-12 h-12 rounded-full"/>
              <div>
                <h2 className="text-2xl font-bold text-emerald-700">MediCare</h2>
                <p className="text-sm text-emerald-600">Healthcare Solutions</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-green-800">
              Your trusted partner in healthcare innovation. We provide exceptional medical care using modern technology and compassion.
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={16}/>
                <span className="text-sm">+91 8210958679</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16}/>
                <span className="text-sm">medicare@gmail.com</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-emerald-700">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Doctors", "Services", "Contact", "Appointments"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-emerald-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-emerald-700">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Blood Pressure Check",
                "Blood Sugar Test",
                "Full Blood Count",
                "X-Ray Scan"
              ].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-emerald-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-emerald-700">Follow Us</h3>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <div
                  key={i}
                  className="p-2 rounded-full bg-white shadow-md hover:scale-110 hover:bg-emerald-200 transition cursor-pointer"
                >
                  <Icon size={18}/>
                </div>
              ))}
            </div>

            <p className="text-sm mt-4 text-green-700">
              Stay connected for updates & health tips.
            </p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-green-300 mt-10 pt-6 text-center text-sm text-green-700">
          © 2026 MediCare. All rights reserved.
          <p className="text-xs text-emerald-700">
            Made with ❤️ by <span className="font-semibold text-emerald-800">Pratyush</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;