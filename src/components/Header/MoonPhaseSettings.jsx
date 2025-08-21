import { IMAGE_PATH } from "../../util/constants.js";
import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";

const MoonPhaseSettings = () => {
	const { selectedMoon, handleMoonToggle } = useContext(WIFOContext);

	return (
		<div className="resource-setting">
			<img src={IMAGE_PATH + "NewMoon.png"} alt="New Moon" className="setting-icon"
			     style={{opacity: selectedMoon === "NewMoon" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("NewMoon")} />
			<img src={IMAGE_PATH + "WaxingCrescent.png"} alt="Waxing Crescent" className="setting-icon"
			     style={{opacity: selectedMoon === "WaxingCrescent" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("WaxingCrescent")} />
			<img src={IMAGE_PATH + "FirstQuarter.png"} alt="First Quarter" className="setting-icon"
			     style={{opacity: selectedMoon === "FirstQuarter" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("FirstQuarter")} />
			<img src={IMAGE_PATH + "WaxingGibbous.png"} alt="Waxing Gibbous" className="setting-icon"
			     style={{opacity: selectedMoon === "WaxingGibbous" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("WaxingGibbous")} />
			<img src={IMAGE_PATH + "FullMoon.png"} alt="Full Moon" className="setting-icon"
			     style={{opacity: selectedMoon === "FullMoon" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("FullMoon")} />
			<img src={IMAGE_PATH + "WaningGibbous.png"} alt="Waning Gibbous" className="setting-icon"
			     style={{opacity: selectedMoon === "WaningGibbous" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("WaningGibbous")} />
			<img src={IMAGE_PATH + "LastQuarter.png"} alt="Last Quarter" className="setting-icon"
			     style={{opacity: selectedMoon === "LastQuarter" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("LastQuarter")} />
			<img src={IMAGE_PATH + "WaningCrescent.png"} alt="Waning Crescent" className="setting-icon"
			     style={{opacity: selectedMoon === "WaningCrescent" || selectedMoon === "none" ? 1 : 0.3}}
			     onClick={() => handleMoonToggle("WaningCrescent")} />
		</div>
	)
}

export default MoonPhaseSettings