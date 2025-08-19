"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function HomeComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is it free to use?",
      a: "Yes! Our free plan includes all the essential features for personal task management without any time limit.",
    },
    {
      q: "Can I access my tasks offline?",
      a: "Currently, you need an internet connection to sync your tasks. However, offline mode is on our roadmap.",
    },
    {
      q: "Can I use it on mobile devices?",
      a: "Yes, our app is fully responsive and works seamlessly on mobile, tablet, and desktop browsers.",
    },
    {
      q: "Do I need to collaborate with others?",
      a: "No. This task manager is designed specifically for individuals who want to stay organized without complex team features.",
    },
    {
      q: "Are there any premium features?",
      a: "Yes, advanced features such as custom themes, unlimited task history, and priority reminders are available in our Pro plan.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" bg-gray-50">
      {/* Hero */}
      <section className="relative font-serif bg-gradient-to-br from-gray-100 to-gray-200 py-16 md:py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-6xl text-teal-700 font-extrabold mb-6 animate-fadeIn">
            Organize Your Day, Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-8 ">
            A powerful, personal task manager built for individuals who value
            clarity and productivity.
          </p>
          <div className="space-x-4">
            <a
              href="/signup"
              className="px-8 py-3 rounded-xl bg-white text-cyan-700 font-semibold shadow-lg hover:scale-105 transition animate-pulse"
            >
              Start Free
            </a>
            <a
              href="/login"
              className="px-8 py-3 rounded-xl bg-teal-500 text-white font-semibold shadow-lg hover:bg-teal-600 transition"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Lost in tasks and deadlines?
        </h2>
        <p className="text-gray-600 md:text-lg max-w-3xl mx-auto">
          Stop juggling sticky notes and reminders. Get a personal system that
          helps you stay calm, organized, and productive.
        </p>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Features You’ll Love
          </h2>
          <p className="text-gray-600">
            Built for personal productivity with a simple, modern touch.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Daily Planner",
              desc: "Organize your tasks in minutes with a clean interface.",
            },
            {
              title: "Smart Reminders",
              desc: "Get timely notifications that keep you on track.",
            },
            {
              title: "Progress Tracking",
              desc: "Visual dashboards show your accomplishments.",
            },
            {
              title: "Cross-Device Sync",
              desc: "Access your tasks anywhere, anytime.",
            },
            {
              title: "Secure & Private",
              desc: "Your data is encrypted and always safe.",
            },
            {
              title: "Minimal & Fun",
              desc: "A light, joyful experience to manage tasks.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-3 text-teal-700">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              step: "1",
              title: "Add Tasks",
              desc: "Capture tasks in seconds.",
            },
            {
              step: "2",
              title: "Stay Notified",
              desc: "Get reminders when it matters.",
            },
            {
              step: "3",
              title: "Track Progress",
              desc: "Complete and celebrate wins.",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              <span className="text-2xl md:text-4xl font-bold text-cyan-600">
                {s.step}
              </span>
              <h3 className="text-xl font-semibold mt-4 mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { number: "50K+", label: "Tasks Completed" },
            { number: "20K+", label: "Happy Users" },
            { number: "99.9%", label: "System Uptime" },
          ].map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-md hover:scale-105 transition"
            >
              <h3 className="text-2xl md:text-4xl font-bold">{s.number}</h3>
              <p className="text-cyan-100">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold">What Users Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah, Freelancer",
              text: "Keeps me on track with my freelance projects. Simple yet powerful.",
            },
            {
              name: "Mark, Student",
              text: "Helps me manage assignments and exams stress-free.",
            },
            {
              name: "Anna, Designer",
              text: "Finally, a task app that feels lightweight and beautiful.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-8 border rounded-xl shadow-md bg-gray-50 hover:scale-105 transition"
            >
              <p className="text-gray-700 italic mb-4">“{t.text}”</p>
              <h4 className="font-semibold text-teal-600">{t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-12">
          Affordable Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              plan: "Free",
              price: "$0",
              features: ["Basic Tasks", "Reminders", "Sync Across Devices"],
            },
            {
              plan: "Pro",
              price: "$5/mo",
              features: [
                "Advanced Reminders",
                "Statistics Dashboard",
                "Offline Mode",
              ],
            },
            {
              plan: "Premium",
              price: "$10/mo",
              features: [
                "All Pro Features",
                "Priority Support",
                "Custom Themes",
              ],
            },
          ].map((p, i) => (
            <div
              key={i}
              className="p-8 border rounded-2xl shadow-lg bg-white hover:scale-105 transition"
            >
              <h3 className="text-2xl font-bold mb-2">{p.plan}</h3>
              <p className="text-3xl font-extrabold mb-4">{p.price}</p>
              <ul className="space-y-2 text-gray-600">
                {p.features.map((f, idx) => (
                  <li key={idx}>✓ {f}</li>
                ))}
              </ul>
              <button className="mt-6 px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition">
                Choose {p.plan}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer"
              >
                <span className="text-lg font-medium">{faq.q}</span>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 transition-transform duration-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-500" />
                )}
              </button>

              {/* Answer with animation */}
              <div
                className={`overflow-hidden transition-all duration-1000 ${
                  openIndex === i
                    ? "max-h-40 opacity-100 px-6 pb-6"
                    : "max-h-0 opacity-0 px-6"
                }`}
              >
                <p className="text-gray-600">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">
          Ready to Stay Organized?
        </h2>
        <p className="mb-8 text-lg text-cyan-100">
          Start managing your tasks with confidence and clarity.
        </p>
        <a
          href="/signup"
          className="px-10 py-4 rounded-xl bg-white text-cyan-700 font-semibold shadow-lg hover:scale-105 transition"
        >
          Get Started Free
        </a>
      </section>
    </div>
  );
}
