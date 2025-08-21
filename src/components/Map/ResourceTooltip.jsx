import { IMAGE_PATH } from "../../util/constants.js";
import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";

const ResourceTooltip = () => {
	const { showDevTools, iconModalInfo, isBigMap } = useContext(WIFOContext);

	return (!showDevTools && iconModalInfo.name !== "" && (
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
			{iconModalInfo.seasons.map(season => <img key={season} className="modal-icon-img" src={IMAGE_PATH + season +  ".png"} alt={season} style={{ height: isBigMap ? "20px" : "10px"}} />)}
			{iconModalInfo.name}
			<img src={IMAGE_PATH + iconModalInfo.moonPhase + ".png"} className="modal-icon-img" alt={iconModalInfo.moonPhase} style={{ height: isBigMap ? "20px" : "10px"}} />
		</div>
	))
}

export default ResourceTooltip