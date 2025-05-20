import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WIFO from "./WIFO.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WIFO />
  </StrictMode>,
)
