
import HeaderBanner from '@/app/_components/HeaderBanner';
import { Headset, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import React from 'react';

export default function page() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <HeaderBanner
          title="Contact Us"
          subtitle="We'd love to hear from you. Get in touch with our team."
          icon={<Headset />}
          basePath={{ label: "Contact", href: "/Store/contact" }}
        />
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* ── Left Column ── */}
        <div className="col-span-1 flex flex-col gap-3">

          {/* Phone */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-xl flex-shrink-0">
              <Phone size={22} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Phone</h3>
              <p className="text-sm text-gray-400 mt-0.5">Mon-Fri from 8am to 6pm</p>
              <a href="tel:+18001234567" className="text-green-500 font-semibold text-sm mt-1 block hover:underline">
                +1 (800) 123-4567
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-xl flex-shrink-0">
              <Mail size={22} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-sm text-gray-400 mt-0.5">We'll respond within 24 hours</p>
              <a href="mailto:support@freshcart.com" className="text-green-500 font-semibold text-sm mt-1 block hover:underline">
                support@freshcart.com
              </a>
            </div>
          </div>

          {/* Office */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-xl flex-shrink-0">
              <MapPin size={22} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Office</h3>
              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                123 Commerce Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
            <div className="bg-green-50 p-3 rounded-xl flex-shrink-0">
              <Clock size={22} className="text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Business Hours</h3>
              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                Monday - Friday: 8am - 6pm<br />
                Saturday: 9am - 4pm<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { href: "#", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", stroke: false },
                { href: "#", d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z", stroke: false },
                { href: "#", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a6 6 0 0 1 2-3zM2 9h4v12H2zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z", stroke: false },
                { href: "#", d: "M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h10zm-5 5a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z", stroke: false },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Column: Form ── */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {/* Form Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-50 p-3 rounded-xl">
                <Headset size={22} className="text-green-500" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 text-lg">Send us a Message</h2>
                <p className="text-sm text-gray-400">Fill out the form and we'll get back to you</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition bg-white">
                  <option value="">Select a subject</option>
                  <option value="order">Order Issue</option>
                  <option value="return">Return & Refund</option>
                  <option value="shipping">Shipping</option>
                  <option value="product">Product Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition resize-none"
                />
              </div>

              {/* Submit */}
              <button className="bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 w-fit">
                <Send size={16} />
                Send Message
              </button>
            </div>
          </div>

          {/* Quick Answers */}
          <div className="bg-green-50 rounded-2xl border border-green-100 p-5 flex items-start gap-4">
            <div className="bg-green-100 p-2.5 rounded-xl flex-shrink-0">
              <Headset size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Looking for quick answers?</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
              </p>
              <a href="#" className="text-green-500 text-sm font-medium mt-2 inline-block hover:underline">
                Visit Help Center →
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}