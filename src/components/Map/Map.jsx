import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";
import { IMAGE_PATH } from "../../util/constants.js";
import MousePosition from "./MousePosition.jsx";
import ResourceIcons from "./ResourceIcons.jsx";
import ResourceTooltip from "./ResourceTooltip.jsx";

const Map = () => {
	const { isBigMap, imageRef, handleMouseClick } = useContext(WIFOContext);

	return (
		<div className={isBigMap ? " image-scroll-container-large" : " image-scroll-container-small"}>
			<div className={isBigMap ? "map-background large" : "map-background small"}>
				<img
					src={IMAGE_PATH + "Full_Island_Light_Map.png"}
					ref={imageRef}
					alt="Big Visual"
					onClick={handleMouseClick}
					className={isBigMap ? "map large" : "map small"}
				/>
			</div>

			<MousePosition />
			<ResourceIcons />
			<ResourceTooltip />
		</div>
	)
}

export default Map