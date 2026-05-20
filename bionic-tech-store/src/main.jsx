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

posthog.init('phc_yyMGm2TfiK47WRfH9CtjbdPxAbe5AaQRCZjypPLpMqBP', {
    api_host: 'https://eu.i.posthog.com',
    ui_host: 'https://eu.posthog.com',
})
const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}