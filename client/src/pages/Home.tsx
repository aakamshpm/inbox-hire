import {
  FiMail,
  FiCheck,
  FiZap,
  FiClock,
  FiCode,
  FiLogIn,
} from "react-icons/fi";
import { RiGeminiFill } from "react-icons/ri";
import { SiSupabase } from "react-icons/si";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Track Job Applications{" "}
            <span className="text-blue-400">Automatically</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            InboxHire reads your email replies and organizes your job
            applications for you. No spreadsheets. No manual tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FiLogIn /> Get Started
            </Link>
            <Link
              to="/login"
              className="border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-400 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* What is InboxHire */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-gray-800/50 rounded-xl border border-gray-700 mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400">
            <FiMail size={24} />
          </div>
          <h2 className="text-2xl font-bold">✨ What is InboxHire?</h2>
        </div>
        <p className="text-gray-300 mb-6">
          InboxHire is a smart, AI-powered job application tracker built with
          Postmark designed for busy developers and job seekers who apply to
          roles via email. Instead of manually tracking every job you apply to,
          InboxHire automates the process by reading email replies from
          companies and logging your applications for you.
        </p>
        <p className="text-gray-300">
          All you need to do is send your job applications using your personal
          or private email, and when the company responds, InboxHire detects the
          reply, parses it using AI, and stores it neatly in your dashboard.
        </p>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-900/20 text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-16">
          🔄 How It Works
        </h2>
        <div className="space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="bg-blue-900/20 text-blue-400 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-700 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-10">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                {step.tech && (
                  <div className="mt-4 flex gap-3">
                    {step.tech === "Postmark" && (
                      <div className="flex items-center gap-2 text-sm bg-gray-700 px-3 py-1 rounded-full">
                        <CiMail className="text-red-400" /> Postmark
                      </div>
                    )}
                    {step.tech === "Gemini AI" && (
                      <div className="flex items-center gap-2 text-sm bg-gray-700 px-3 py-1 rounded-full">
                        <RiGeminiFill className="text-blue-400" /> Gemini AI
                      </div>
                    )}
                    {step.tech === "Supabase" && (
                      <div className="flex items-center gap-2 text-sm bg-gray-700 px-3 py-1 rounded-full">
                        <SiSupabase className="text-green-400" /> Supabase
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Simplify Your Job Search?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Stop wasting time tracking applications manually. Let InboxHire
          automate it for you.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <FiMail />,
    title: "Email-based tracking",
    description:
      "Just send an email; when they reply, we track it with the help of Postmark.",
  },
  {
    icon: <RiGeminiFill />,
    title: "AI-powered parsing",
    description:
      "Uses Gemini to extract job title, company name, status, and notes from replies.",
  },
  {
    icon: <FiCheck />,
    title: "No manual input",
    description:
      "The dashboard auto-populates as companies respond. No more spreadsheets!",
  },
  {
    icon: <FiClock />,
    title: "Application timeline",
    description:
      "See when and where you applied, all in one organized dashboard.",
  },
  {
    icon: <FiZap />,
    title: "Developer-friendly",
    description:
      "Testable with dummy credentials and domain. Built with developers in mind!",
  },
  {
    icon: <FiCode />,
    title: "Modern tech stack",
    description:
      "Powered by Postmark, Gemini AI, and Supabase for reliable performance.",
  },
];

const steps = [
  {
    title: "Send your job application",
    description:
      "User sends a job application via personal or private email (e.g., yourname@inboxhire.dev) to a company.",
  },
  {
    title: "Company replies",
    description:
      "The hiring manager or recruiter responds to your application.",
    tech: "Postmark",
  },
  {
    title: "AI extracts key details",
    description:
      "Gemini AI parses the email to identify job title, company name, status, and important notes.",
    tech: "Gemini AI",
  },
  {
    title: "Dashboard updates automatically",
    description:
      "InboxHire saves the structured data and displays it in your personal dashboard.",
    tech: "Supabase",
  },
];
