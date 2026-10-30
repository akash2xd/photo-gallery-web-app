# Photo Gallery Web App

A clean, responsive Photo Gallery Web Application built for the Celebrare Frontend React Internship Assignment.

## Features

- **Fetch Photos**: Fetches 30 curated photos on initial load from the Picsum Photos API (`https://picsum.photos/v2/list?limit=30`).
- **Custom Hook (`useFetchPhotos`)**: Encapsulates data fetching, loading state, error handling, and `AbortController` request cleanup.
- **Responsive Grid**:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- **Real-Time Search**: Instant author filtering with `useCallback` and `useMemo` (case-insensitive, no extra API calls).
- **Favourites with `useReducer`**: Persistent favorite photo tracking saved in browser `localStorage`.
- **Accessible & Clean UI**: Styled with Tailwind CSS, accessible ARIA labels, loading spinner, and empty state feedback.

## Tech Stack

- React 19 (Functional components & Hooks)
- Vite 8
- Tailwind CSS v4
- Picsum Photos API
- Browser localStorage

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
npm run build
```
### live demo 
 (`(https://photo-gallery-web-app-henna.vercel.app/)`)
