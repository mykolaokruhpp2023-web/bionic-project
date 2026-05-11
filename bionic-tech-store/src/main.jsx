import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'
import * as Sentry from "@sentry/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
posthog.init('phc_yyMGm2TfiK47WRfH9CtjbdPxAbe5AaQRCZjypPLpMqBP', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only'
})
Sentry.init({
    dsn: "https://50fd19c49d6e59a87f514879bb2ba053@o4511371933057024.ingest.de.sentry.io/4511371934564432",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true
});
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);