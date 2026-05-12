import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as Sentry from "@sentry/react";
import posthog from 'posthog-js'; // 1. Перевір, чи є цей імпорт

// Ініціалізація Sentry
Sentry.init({
    dsn: "https://50fd19c49d6e59a87f514879bb2ba053@o4511371933057024.ingest.de.sentry.io/4511371934564432",
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
});

// 2. Ініціалізація PostHog (важливо: поза межами будь-яких функцій)
posthog.init('phc_yyMGm2TfiK47WRfH9CtjbdPxAbe5AaQRCZjypPLpMqBP', {
    api_host: 'https://eu.i.posthog.com',
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