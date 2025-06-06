# 📬 InboxHire

**InboxHire** is a zero-effort job application tracker powered by Postmark's inbound email parsing and AI. It automatically captures job application emails (and replies) into a structured dashboard, helping job seekers stay organized without spreadsheets or manual effort.

---

## ✨ Features

- AI-based email parsing using Gemini 1.5 Flash
- Postmark Inbound Webhook integration
- Reply detection and status update
- Dashboard to view all job applications
- JWT Auth with secure user registration and login
- Built-in test mode for easy hackathon demo

---

## 🧪 Test the Live App

### 🔗 URL

**Live**: [https://inboxhire.aakamshpm.space](https://inboxhire.aakamshpm.space)

### 👤 Test Credentials

- **Username**: `aakmsh`
- **Password**: `1234`

### 📝 How to Use (Demo Mode)

1. Log in using the above credentials.
2. Compose an email from **your personal Gmail or any email client**.
3. In the **To** field: send it to any recruiter email like `recruiter@company.com`
4. In the **CC** field, add:  
   **aakmsh@aakamshpm.space**
5. Send the email.
6. Go back to your **InboxHire dashboard** and refresh.
7. You’ll see the application details (job title, company, status) auto-filled using AI.

> ℹ️ In this demo mode, all users share the inbox domain `aakamshpm.space`. In a production setup, each user would have a unique inbox like `yourname@inboxhire.dev`.

---

## 🧑‍💻 Local Development Setup

### 🧰 Tech Stack

- **Frontend**: Vite + React + Tailwind + TypeScript
- **Backend**: Express.js (TypeScript) + Supabase (PostgreSQL)
- **Email Parsing**: Postmark Webhook + Gemini 1.5 Pro

---

### ⚙️ Prerequisites

- Node.js >= 18
- PostgreSQL DB (or [Supabase](https://supabase.com))
- Postmark account (inbound domain + server setup)
- Gemini API key (for 1.5 Flash)
- Ngrok (optional, for local webhook testing)

---

### 📦 Clone and Setup

```bash
git clone https://github.com/aakamshpm/inboxhire.git
cd inboxhire
```

## 🔧 Backend Setup

```bash
cd server
npm install
npm run dev
```

## 💡 .env Variables (./server)

```bash
PORT=8000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_key
ACCESS_TOKEN_SECRET=your_access_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret_key
MAIL_DOMAIN=aakamshpm.space
```

#### Use ngrok if running locally and update the webhook URL in Postmark inbound settings.

## 🖥 Frontend Setup

```bash
cd client
npm install
npm run dev
```

## 💡 .env Variables (./client)

```bash
VITE_SERVER_URL=your_backend_url
```

### 🧪 Testing Locally

- Register a new user at /register or use test credentials.
- Send a test email (from Gmail or similar) and CC your inbox email (e.g., yourusername@yourdomain.com)
- Watch as your application appears in the dashboard!

### ⚠️ Limitations (Hackathon Version)

- Only one shared domain (aakamshpm.space) is used for all users
- Replies to job mails may not include the inbox email in CC, limiting automatic status updates

### 📹 Demo Video

- 🎥 Watch on YouTube:
- 🙏 Acknowledgements

  Postmark for the fantastic Inbound Email support

  Supabase for PostgreSQL + auth layer

  Google Gemini for AI-based email parsing

### 📬 Contact

- Made with 💙 by Aakamsh P M

---
