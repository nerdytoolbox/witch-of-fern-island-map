import { IMAGE_PATH } from "../../util/constants.js";
import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";

const SeasonSettings = () => {
	const { selectedSeason, handleSeasonToggle } = useContext(WIFOContext)

	return (
		<div className="resource-setting">
			<img src={IMAGE_PATH + "Bloom.png"} alt="Bloom" className="setting-icon"
			     style={{opacity: selectedSeason === "Bloom" || selectedSeason === "none" ? 1 : 0.3}}
			     onClick={() => handleSeasonToggle("Bloom")} />
			<img src={IMAGE_PATH + "Storm.png"} alt="Storm" className="setting-icon"
			     style={{opacity: selectedSeason === "Storm" || selectedSeason === "none" ? 1 : 0.3}}
			     onClick={() => handleSeasonToggle("Storm")} />
			<img src={IMAGE_PATH + "Bask.png"} alt="Bask" className="setting-icon"
			     style={{opacity: selectedSeason === "Bask" || selectedSeason === "none" ? 1 : 0.3}}
			     onClick={() => handleSeasonToggle("Bask")} />
			<img src={IMAGE_PATH + "Harvest.png"} alt="Harvest" className="setting-icon"
			     style={{opacity: selectedSeason === "Harvest" || selectedSeason === "none" ? 1 : 0.3}}
			     onClick={() => handleSeasonToggle("Harvest")} />
			<img src={IMAGE_PATH + "Reverie.png"} alt="Reverie" className="setting-icon"
			     style={{opacity: selectedSeason === "Reverie" || selectedSeason === "none" ? 1 : 0.3}}
			     onClick={() => handleSeasonToggle("Reverie")} />
			<img src={IMAGE_PATH + "Frost.png"} alt="Frost" className="setting-icon"
			     style={{opacity: selectedSeason === "Frost" || selectedSeason === "none" ? 1 : 0.3}}
			     onClick={() => handleSeasonToggle("Frost")} />
		</div>
	)
}

export default SeasonSettings