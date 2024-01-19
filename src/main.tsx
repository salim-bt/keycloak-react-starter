import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthProvider } from "react-oidc-context";
import App from './App';
import { OidcClientSettings } from 'oidc-client-ts';

const oidcConfig: OidcClientSettings = {
  client_secret: "PmsdRdXjZ0H6Jfef7eGtY39zeU9qjVeu",
  client_id: "hr",
  redirect_uri: "http://localhost:5173",
  authority: "http://localhost:8080/realms/neterp",
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider
        {...oidcConfig}
    >
        <App />
    </AuthProvider>
  </React.StrictMode>,
)
