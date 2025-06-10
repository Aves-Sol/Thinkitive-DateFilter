import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react"
import { Toaster } from 'react-hot-toast'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster   />
  </StrictMode>,
)
