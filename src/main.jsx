import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { installTwicpics } from "@twicpics/components/react";
import "@twicpics/components/style.css";

// TwicPics Components configuration (see Setup Options)
installTwicpics( {
  // domain is mandatory
  "domain": "https://test-bmw.twic.pics"
} );

import "./assets/styles/scss/index.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
