import React from "react";

const Guide: React.FC = () => {
  return (
    <div className="w-full mx-auto px-12 py-12 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">
        How to Use InboxHire
      </h1>

      <p className="mb-4">
        InboxHire is a smart job application tracker powered by email parsing.
        It helps you manage and monitor the jobs you've applied for by simply
        tracking your emails — no manual input needed.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Getting Started</h2>
      <ol className="list-decimal ml-6 mb-6 space-y-2">
        <li>
          <strong>Login using the test account:</strong>
          <br />
          <span className="inline-block ml-2 bg-gray-800 px-2 py-1 rounded">
            username: <code>aakmsh</code>, password: <code>1234</code>
          </span>
        </li>
        <li>
          Compose an email from your personal address (e.g., Gmail) to any
          company you're applying to.
        </li>
        <li>
          Add your InboxHire email (<code>aakmsh@aakamshpm.space</code>) in the{" "}
          <strong>CC</strong> field of the email.
        </li>
        <li>
          Once the email is sent, InboxHire will automatically receive and
          process it using Postmark, extracting job title, company name, and
          other details using Gemini.
        </li>
        <li>
          View and manage your job applications right inside the dashboard.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Current Limitations</h2>
      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>
          We're currently using a shared domain: <code>aakamshpm.space</code>.
        </li>
        <li>
          Custom inboxes per user like <code>yourname@inboxhire.dev</code> will
          be available in production.
        </li>
        <li>
          Make sure to CC the InboxHire email during job application — replies
          from companies won't include the CC, so we currently cannot auto-track
          responses unless simulated.
        </li>
        <li>
          No actual email inbox access is given — the system just reads incoming
          emails via Postmark’s inbound parsing.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Demo Video</h2>
      <p className="mb-4">
        Watch the full walkthrough and demo here:{" "}
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          InboxHire Demo
        </a>
      </p>

      <p className="text-sm text-gray-400">
        For hackathon judging, please use the above test credentials and
        simulate job applications using your own email client (e.g., Gmail).
      </p>
    </div>
  );
};

export default Guide;
