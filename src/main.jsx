import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WIFO from "./WIFO.jsx";
import { WIFOProvider } from "./storage/WIFOContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WIFOProvider>
      <WIFO />
    </WIFOProvider>
  </StrictMode>,
)
