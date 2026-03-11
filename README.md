# TaskFlow

A feature-rich to-do list web app built with Next.js, React, TypeScript, and Firebase.

## Features

- Task management with priorities, due dates, and subtasks
- Kanban board, calendar, and list views
- Folder organization and drag-and-drop sorting
- Focus mode with Pomodoro timer
- Command palette for quick actions
- Dashboard with productivity insights
- Dark / light / system theme
- Firebase auth (Google) and real-time sync

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file with your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4, Framer Motion
- **State**: React Context + useReducer
- **Backend**: Firebase (Firestore + Auth)
- **Drag & Drop**: dnd-kit
- **NLP**: chrono-node (natural language dates)
