import React from "react";

const Guide: React.FC = () => {
  return (
    <div className="w-full mx-auto px-12 py-12 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center">
        How to Use InboxHire
      </h1>

      <p className="mb-4">
        InboxHire is a smart job application tracker powered by inbound email
        parsing. It helps you manage and monitor your job hunt by tracking email
        replies from companies — no spreadsheets or manual entry required.
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
          Send a job application email from your private address to the company
          you're applying to.
        </li>
        <li>
          When the company replies to your application, InboxHire (via Postmark)
          will intercept that reply, extract relevant job details using AI, and
          log it into your dashboard automatically.
        </li>
        <li>
          View your applications and status updates directly from the InboxHire
          dashboard — organized, filtered, and AI-enhanced.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        Alternative (Legacy) Option
      </h2>
      <p className="mb-4">
        You can also include your InboxHire email (
        <code>aakmsh@aakamshpm.space</code>) in the <strong>CC</strong> field
        when applying. This works for initial applications but{" "}
        <strong>won’t help</strong> with tracking replies (since companies
        typically don’t CC you in responses).
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Current Limitations</h2>
      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>
          We're currently using a shared domain: <code>aakamshpm.space</code>.
        </li>
        <li>
          In production, each user will be provided a custom inbox like{" "}
          <code>yourname@inboxhire.dev</code>, which supports end-to-end
          parsing.
        </li>
        <li>
          You must use your private email to send applications and await replies
          to see the full automation in action.
        </li>
        <li>
          Users can edit their inbox email in the profile settings and use their
          own private mail. (Don't use Gmail, as it will block Postmark emails.)
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
        For hackathon testing, please use the test credentials above and
        simulate an application from your Gmail to a fake job. Wait for a fake
        reply (or send it from another address) and see it show up in the
        dashboard.
      </p>
    </div>
  );
};

export default Guide;
