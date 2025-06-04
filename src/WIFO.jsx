import { useEffect, useRef, useState } from 'react'

import './WIFO.css'
import { loadResources } from "./util/loadResources";
import { Hub } from "nerdy-lib";

const imagePath = "./wifo/images/"

const WIFO = () => {
  const [filterText, setFilterText] = useState("")
  const [selectedSeason, setSelectedSeason] = useState("none")
  const [resourceSettings, setResourceSettings] = useState({
    herb: true,
    mushroom: true,
    flower: true,
    oreLumber: true,
    magicalChest: true,
  })
  const [selectedMoon, setSelectedMoon] = useState("none")
  const [isBigMap, setIsBigMap] = useState(false)
  const [showDevTools, setShowDevTools] = useState(false)
  const [resourceData, setResourceData] = useState([])

  // Code to track mouse position when clicking
  const [position, setPosition] = useState({ x: null, y: null })
  const imageRef = useRef(null)

  const handleMouseClick = (e) => {
    const rect = imageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    const yPercent = Math.min(100, Math.max(0, (y / rect.height) * 100));

    setPosition({ x: xPercent.toFixed(1), y: yPercent.toFixed(1) });
  }

  // Load all data when loading the page
  useEffect(() => {
    loadResources()
      .then(data => setResourceData(data))
  }, [])

  // Handlers
  const handleMapToggle = () => {
    setIsBigMap(!isBigMap)
  }

  const handleDevToolsToggle = () => {
    setShowDevTools(!showDevTools)
  }

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value)
  }

  const handleSeasonToggle = (season) => {
    if (selectedSeason === season) {
      setSelectedSeason("none")
      return
    }
    setSelectedSeason(season)
  }

  const handleMoonToggle = (moon) => {
    if (selectedMoon === moon) {
      setSelectedMoon("none")
      return
    }
    setSelectedMoon(moon)
  }

  const handleResourceToggle = (resource) => {
    setResourceSettings((prevSettings) => ({
      ...prevSettings,
      [resource]: !prevSettings[resource],
    }))
  }

  // Filter data based on the selected options
  const filteredData = resourceData.filter(resource => {
    const nameMatch = resource.name.toLowerCase().includes(filterText.toLowerCase())
    const seasonSelected = resource.seasons.length === 0 ? true : (selectedSeason !== "none" ? resource.seasons.includes(selectedSeason) : true)
    const moonSelected = resource.moonPhase === "" ? true : (selectedMoon !== "none" ? resource.moonPhase === selectedMoon : true)
    const resourceSelected = resourceSettings[resource.type]

    return nameMatch && seasonSelected && moonSelected && resourceSelected
  })

  const getFooter = () => {
    return (
      <div className="footer">
        <a href="https://github.com/nerdytoolbox/witch-of-fern-island-map/issues/new?template=ISSUE_TEMPLATE.md">Report issues / Feature requests</a>
      </div>
    )
  }

  return (
    <Hub title="Witch of Fern Island - Resource Map">
      <div className="app-container" style={{ justifyContent: isBigMap ? "flex-start" : "center" }}>
        <div className="settings-header">
          <div className="settings-header-top">
            <div className="settings-box">
              <img src={imagePath + "Bloom.png"} alt="Bloom" className="setting-icon"
                   style={{opacity: selectedSeason === "bloom" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("bloom")} />
              <img src={imagePath + "Storm.png"} alt="Storm" className="setting-icon"
                   style={{opacity: selectedSeason === "storm" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("storm")} />
              <img src={imagePath + "Bask.png"} alt="Bask" className="setting-icon"
                   style={{opacity: selectedSeason === "bask" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("bask")} />
              <img src={imagePath + "Harvest.png"} alt="Harvest" className="setting-icon"
                   style={{opacity: selectedSeason === "harvest" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("harvest")} />
              <img src={imagePath + "Reverie.png"} alt="Reverie" className="setting-icon"
                   style={{opacity: selectedSeason === "reverie" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("reverie")} />
              <img src={imagePath + "Frost.png"} alt="Frost" className="setting-icon"
                   style={{opacity: selectedSeason === "frost" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("frost")} />
            </div>
            <div className="settings-box">
              <img src={imagePath + "Herb.png"} alt="Herb" className={`setting-icon resource-icon${resourceSettings.herb ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("herb")}/>
              <img src={imagePath + "Mushroom.png"} alt="Mushroom" className={`setting-icon resource-icon${resourceSettings.mushroom ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("mushroom")}/>
              <img src={imagePath + "Flower.png"} alt="Flower" className={`setting-icon resource-icon${resourceSettings.flower ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("flower")}/>
              <img src={imagePath + "Lumber.png"} alt="Ore&Lumber" className={`setting-icon resource-icon${resourceSettings.oreLumber ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("oreLumber")}/>
              <img src={imagePath + "MagicalChest.png"} alt="Magical Chest" className={`setting-icon resource-icon${resourceSettings.magicalChest ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("magicalChest")}/>
            </div>
            <div className="settings-box">
              <img src={imagePath + "NewMoon.png"} alt="New Moon" className="setting-icon"
                   style={{opacity: selectedMoon === "newMoon" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("newMoon")} />
              <img src={imagePath + "WaxingCrescent.png"} alt="Waxing Crescent" className="setting-icon"
                   style={{opacity: selectedMoon === "waxingCrescent" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("waxingCrescent")} />
              <img src={imagePath + "FirstQuarter.png"} alt="First Quarter" className="setting-icon"
                   style={{opacity: selectedMoon === "firstQuarter" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("firstQuarter")} />
              <img src={imagePath + "WaxingGibbous.png"} alt="Waxing Gibbous" className="setting-icon"
                   style={{opacity: selectedMoon === "waxingGibbous" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("waxingGibbous")} />
              <img src={imagePath + "FullMoon.png"} alt="Full Moon" className="setting-icon"
                   style={{opacity: selectedMoon === "fullMoon" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("fullMoon")} />
              <img src={imagePath + "WaningGibbous.png"} alt="Waning Gibbous" className="setting-icon"
                   style={{opacity: selectedMoon === "waningGibbous" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("waningGibbous")} />
              <img src={imagePath + "LastQuarter.png"} alt="Last Quarter" className="setting-icon"
                   style={{opacity: selectedMoon === "lastQuarter" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("lastQuarter")} />
              <img src={imagePath + "WaningCrescent.png"} alt="Waning Crescent" className="setting-icon"
                   style={{opacity: selectedMoon === "waningCrescent" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("waningCrescent")} />
            </div>
          </div>
          <div className="settings-header-bottom">
            <div className="settings-box">
              <div className="setting-option">
                <input className="search-input" type="search" placeholder="Search..." value={filterText}
                       onChange={handleFilterTextChange}/>
                <div className="hide-on-mobile">
                  <div><input type="checkbox" checked={isBigMap} onClick={handleMapToggle}/> Big Map</div>
                  <div><input type="checkbox" checked={showDevTools} onClick={handleDevToolsToggle}/> Show map position on click</div>
                </div>
              </div>
            </div>
          </div>
          {getFooter()}
        </div>
        <div className={isBigMap ? " image-scroll-container-large" : " image-scroll-container-small"}>
          <img
            src={imagePath + "Full_Island_Light_Map.png"}
            ref={imageRef}
            alt="Big Visual"
            onClick={handleMouseClick}
            className={isBigMap ? "map large" : "map small"}
          />

          {/*Click on map to show position in percentage*/}
          {showDevTools && position.x !== null && position.y !== null && (
            <div
              style={{
                position: 'absolute',
                top: position.y + 1 + "%",
                left: position.x + 1 + "%",
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              top: {position.y}%<br/>
              left: {position.x}%
            </div>
          )}

          {/*Show resource icons*/}
          {filteredData.map(resource => {
            const amount = resource.top.length
            const image = imagePath + resource.image
            const returnImg = []
            for (let i = 0; i < amount; i++) {
              returnImg.push(<img
                src={image}
                alt={resource.name}
                className={isBigMap ? "img-icon-large" : "img-icon"}
                style={{top: resource.top[i] + "%", left: resource.left[i] + "%"}}
                title={resource.name}
              />)
            }
            return returnImg
          })}
        </div>
      </div>
    </Hub>
  );
}

export default WIFO;
