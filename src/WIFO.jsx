import { useContext, useEffect } from 'react'

import './WIFO.scss'
import { loadResources } from "./util/loadResources";
import { Hub } from "nerdy-lib";
import { WIFOContext } from "./storage/WIFOContext.jsx";
import Header from "./components/Header/Header.jsx";
import Map from "./components/Map/Map.jsx";

const WIFO = () => {
  const { setResourceData, isBigMap } = useContext(WIFOContext)

  // Load all data when loading the page
  useEffect(() => {
    loadResources()
      .then(data => setResourceData(data))
  }, [])

  return (
    <Hub>
      <div className="app-container" style={{ justifyContent: isBigMap ? "flex-start" : "center" }}>
        <Header />
        <Map />
      </div>
    </Hub>
  );
}

export default WIFO;
