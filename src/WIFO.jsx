import { useEffect, useRef, useState } from 'react'

import './WIFO.scss'
import { loadResources } from "./util/loadResources";
import { Hub, Title, TextInput } from "nerdy-lib";

const imagePath = "./wifo/images/"

const WIFO = () => {
  const [filterText, setFilterText] = useState("")
  const [selectedSeason, setSelectedSeason] = useState("none")
  const [resourceSettings, setResourceSettings] = useState({
    herb: true,
    vegetable: true,
    mushroom: true,
    flower: true,
    oreLumber: true,
    magicalChest: true,
  })
  const [selectedMoon, setSelectedMoon] = useState("none")
  const [isBigMap, setIsBigMap] = useState(false)
  const [showDevTools, setShowDevTools] = useState(false)
  const [resourceData, setResourceData] = useState([])
  const [iconModalInfo, setIconModalInfo] = useState({
    name: "",
    top: null,
    left: null,
    seasons: [],
    moonPhase: null,
  })

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

  const handleOnIconClick = (name, top, left, seasons, moonPhase) => {
    if (iconModalInfo.name === name) {
      setIconModalInfo({
        name: "",
        top: null,
        left: null,
        seasons: [],
        moonPhase: null,
      })
    } else {
      setIconModalInfo({
        name: name,
        top: top,
        left: left,
        seasons: seasons,
        moonPhase: moonPhase,
      })
    }
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
      <div className="tool-footer">
        <a href="https://github.com/nerdytoolbox/witch-of-fern-island-map/issues/new?template=ISSUE_TEMPLATE.md">Report issues / Feature requests</a>
      </div>
    )
  }

  return (
    <Hub>
      <div className="app-container" style={{ justifyContent: isBigMap ? "flex-start" : "center" }}>
        <div className="settings-header">
          <Title icon="witchOfFernIslandThumbnail.png" text="Witch of Fern Island Resource Map" />
          <div className="resource-settings">
            <div className="resource-setting">
              <img src={imagePath + "Bloom.png"} alt="Bloom" className="setting-icon"
                   style={{opacity: selectedSeason === "Bloom" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("Bloom")} />
              <img src={imagePath + "Storm.png"} alt="Storm" className="setting-icon"
                   style={{opacity: selectedSeason === "Storm" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("Storm")} />
              <img src={imagePath + "Bask.png"} alt="Bask" className="setting-icon"
                   style={{opacity: selectedSeason === "Bask" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("Bask")} />
              <img src={imagePath + "Harvest.png"} alt="Harvest" className="setting-icon"
                   style={{opacity: selectedSeason === "Harvest" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("Harvest")} />
              <img src={imagePath + "Reverie.png"} alt="Reverie" className="setting-icon"
                   style={{opacity: selectedSeason === "Reverie" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("Reverie")} />
              <img src={imagePath + "Frost.png"} alt="Frost" className="setting-icon"
                   style={{opacity: selectedSeason === "Frost" || selectedSeason === "none" ? 1 : 0.3}}
                   onClick={() => handleSeasonToggle("Frost")} />
            </div>
            <div className="resource-setting">
              <img src={imagePath + "Herb.png"} alt="Herb" className={`setting-icon resource-icon${resourceSettings.herb ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("herb")}/>
              <img src={imagePath + "Vegetable.png"} alt="Vegetable" className={`setting-icon resource-icon${resourceSettings.vegetable ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("vegetable")}/>
              <img src={imagePath + "Mushroom.png"} alt="Mushroom" className={`setting-icon resource-icon${resourceSettings.mushroom ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("mushroom")}/>
              <img src={imagePath + "Flower.png"} alt="Flower" className={`setting-icon resource-icon${resourceSettings.flower ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("flower")}/>
              <img src={imagePath + "Lumber.png"} alt="Ore&Lumber" className={`setting-icon resource-icon${resourceSettings.oreLumber ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("oreLumber")}/>
              <img src={imagePath + "MagicalChest.png"} alt="Magical Chest" className={`setting-icon resource-icon${resourceSettings.magicalChest ? "-selected" : ""}`}
                   onClick={() => handleResourceToggle("magicalChest")}/>
            </div>
            <div className="resource-setting">
              <img src={imagePath + "NewMoon.png"} alt="New Moon" className="setting-icon"
                   style={{opacity: selectedMoon === "NewMoon" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("NewMoon")} />
              <img src={imagePath + "WaxingCrescent.png"} alt="Waxing Crescent" className="setting-icon"
                   style={{opacity: selectedMoon === "WaxingCrescent" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("WaxingCrescent")} />
              <img src={imagePath + "FirstQuarter.png"} alt="First Quarter" className="setting-icon"
                   style={{opacity: selectedMoon === "FirstQuarter" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("FirstQuarter")} />
              <img src={imagePath + "WaxingGibbous.png"} alt="Waxing Gibbous" className="setting-icon"
                   style={{opacity: selectedMoon === "WaxingGibbous" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("WaxingGibbous")} />
              <img src={imagePath + "FullMoon.png"} alt="Full Moon" className="setting-icon"
                   style={{opacity: selectedMoon === "FullMoon" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("FullMoon")} />
              <img src={imagePath + "WaningGibbous.png"} alt="Waning Gibbous" className="setting-icon"
                   style={{opacity: selectedMoon === "WaningGibbous" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("WaningGibbous")} />
              <img src={imagePath + "LastQuarter.png"} alt="Last Quarter" className="setting-icon"
                   style={{opacity: selectedMoon === "LastQuarter" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("LastQuarter")} />
              <img src={imagePath + "WaningCrescent.png"} alt="Waning Crescent" className="setting-icon"
                   style={{opacity: selectedMoon === "WaningCrescent" || selectedMoon === "none" ? 1 : 0.3}}
                   onClick={() => handleMoonToggle("WaningCrescent")} />
            </div>
          </div>
          <div className="settings-box">
            <TextInput placeholder="Search..." value={filterText} onChange={handleFilterTextChange} />
            <div className="hide-on-mobile">
              <div><input type="checkbox" checked={isBigMap} onChange={handleMapToggle}/> Big Map</div>
              <div><input type="checkbox" checked={showDevTools} onChange={handleDevToolsToggle}/> Show map position on click</div>
            </div>
          </div>
          {getFooter()}
        </div>
        <div className={isBigMap ? " image-scroll-container-large" : " image-scroll-container-small"}>
          <div className={isBigMap ? "map-background large" : "map-background small"}>
            <img
              src={imagePath + "Full_Island_Light_Map.png"}
              ref={imageRef}
              alt="Big Visual"
              onClick={handleMouseClick}
              className={isBigMap ? "map large" : "map small"}
            />
          </div>

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
                key={resource.name + i}
                src={image}
                alt={resource.name}
                className={isBigMap ? "img-icon-large" : "img-icon"}
                style={{top: resource.top[i] + "%", left: resource.left[i] + "%"}}
                title={resource.name}
                onClick={() => handleOnIconClick(resource.name, resource.top[i], resource.left[i], resource.seasons, resource.moonPhase)}
              />)
            }
            return returnImg
          })}

          {!showDevTools && iconModalInfo.name !== "" && (
            <div
              className="modal-icon-wrapper"
              style={{
                position: 'absolute',
                top: iconModalInfo.top + -0.7 + "%",
                left: iconModalInfo.left + 1 + "%",
                fontSize: isBigMap ? '1.2rem' : '0.6rem',
                pointerEvents: 'none',
                zIndex: 20,
              }}
            >
              {iconModalInfo.seasons.map(season => <img key={season} className="modal-icon-img" src={imagePath + season +  ".png"} alt={season} style={{ height: isBigMap ? "20px" : "10px"}} />)}
              {iconModalInfo.name}
              <img src={imagePath + iconModalInfo.moonPhase + ".png"} className="modal-icon-img" alt={iconModalInfo.moonPhase} style={{ height: isBigMap ? "20px" : "10px"}} />
            </div>
          )}
        </div>
      </div>
    </Hub>
  );
}

export default WIFO;
