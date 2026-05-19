import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as Sentry from "@sentry/react";
import posthog from 'posthog-js';

// Ініціалізація Sentry
Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
});

// Ініціалізація PostHog
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: '/ingest', // Обов'язково саме так
    person_profiles: 'identified_only'
});

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}