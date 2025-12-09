# Inboop Frontend

Lead management dashboard for Instagram DM conversations.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend API**: Spring Boot (http://localhost:8080)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
inboop-frontend/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable components
├── lib/               # Utilities and helpers
├── public/            # Static assets
└── package.json
```

## Features

- 📊 **Dashboard**: Overview of leads and statistics
- 💬 **Leads Management**: View and manage Instagram conversations
- 🏢 **Business Accounts**: Manage connected Instagram accounts
- 📦 **Orders**: Convert leads to orders and track status
- 🔐 **Authentication**: Google OAuth integration

## Backend Integration

The frontend communicates with the Spring Boot backend API:

- **Base URL**: `http://localhost:8080/api/v1`
- **Authentication**: Google OAuth2
- **WebSocket**: Real-time notifications (planned)

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## Development

```bash
# Run dev server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

## Deployment

This frontend can be deployed to:
- **Vercel** (recommended for Next.js)
- **AWS Amplify**
- **Netlify**
- **AWS S3 + CloudFront**
