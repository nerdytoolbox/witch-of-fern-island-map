import { IMAGE_PATH } from "../../util/constants.js";
import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";

const ResourceSettings = () => {
	const { resourceSettings, handleResourceToggle } = useContext(WIFOContext)

	return (
		<div className="resource-setting">
			<img src={IMAGE_PATH + "Herb.png"} alt="Herb" className={`setting-icon resource-icon${resourceSettings.herb ? "-selected" : ""}`}
			     onClick={() => handleResourceToggle("herb")}/>
			<img src={IMAGE_PATH + "Vegetable.png"} alt="Vegetable" className={`setting-icon resource-icon${resourceSettings.vegetable ? "-selected" : ""}`}
			     onClick={() => handleResourceToggle("vegetable")}/>
			<img src={IMAGE_PATH + "Mushroom.png"} alt="Mushroom" className={`setting-icon resource-icon${resourceSettings.mushroom ? "-selected" : ""}`}
			     onClick={() => handleResourceToggle("mushroom")}/>
			<img src={IMAGE_PATH + "Flower.png"} alt="Flower" className={`setting-icon resource-icon${resourceSettings.flower ? "-selected" : ""}`}
			     onClick={() => handleResourceToggle("flower")}/>
			<img src={IMAGE_PATH + "Lumber.png"} alt="Ore&Lumber" className={`setting-icon resource-icon${resourceSettings.oreLumber ? "-selected" : ""}`}
			     onClick={() => handleResourceToggle("oreLumber")}/>
			<img src={IMAGE_PATH + "MagicalChest.png"} alt="Magical Chest" className={`setting-icon resource-icon${resourceSettings.magicalChest ? "-selected" : ""}`}
			     onClick={() => handleResourceToggle("magicalChest")}/>
		</div>
	)
}

export default ResourceSettings