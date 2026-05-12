import React from 'react'
import { createRoot } from 'react-dom/client' // Важливо: саме так, а не просто ReactDOM
import App from './App.jsx'
import './index.css'
import * as Sentry from "@sentry/react";
import posthog from 'posthog-js';

// Ініціалізація Sentry для Кроків 4 та 5 (Performance & Error Tracking)
Sentry.init({
    dsn: "https://50fd19c49d6e59a87f514879bb2ba053@o4511371933057024.ingest.de.sentry.io/4511371934564432",
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

// Знаходимо кореневий елемент
const container = document.getElementById('root');

// Створюємо root і рендеримо App
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

posthog.init('phc_yyMGm2TfiK47WRfH9CtjbdPxAbe5AaQRCZjypPLpMqBP', {
    api_host: 'https://eu.i.posthog.com', // або 'https://app.posthog.com', залежно від твого регіону
    person_profiles: 'identified_only'
});