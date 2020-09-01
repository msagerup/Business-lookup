import React from 'react';
import ReactDOM from 'react-dom';
import history from './utils/history';
// Sentry
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
// Immer
import { enableES5 } from 'immer';
// Auth0
import { Auth0Provider as Auth } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



// Suppport for older JavaScript environments.
enableES5();

// Enable Sentry
Sentry.init({
  dsn: "https://59b91f0ea056489da848677a3920e76a@o441984.ingest.sentry.io/5412944",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth
		// Informasjonen ville vanligvis ligge i en egen mappe som ikke deles paa github pga. sikkerhet.
		// Dette ville da f.eks se slik ut :
		// domain = {../secret/config.domain}
		// clientId = {../secret/config.domain}
		// ---- 
		// For presentasjonen lar jeg de ligge her.
    domain='dev-etcvlnyv.eu.auth0.com'
    clientId='ZBan2YvtVTB9YDebAaWikT2J1g7ZsInh'
		redirectUri={window.location.origin}
		onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
