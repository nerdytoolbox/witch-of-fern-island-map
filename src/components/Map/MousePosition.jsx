import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";

// Click on map to show position in percentage
const MousePosition = () => {
	const { showDevTools, clickedPosition } = useContext(WIFOContext)

	return (
		showDevTools && clickedPosition.x !== null && clickedPosition.y !== null && (
			<div
				style={{
					position: 'absolute',
					top: clickedPosition.y + 1 + "%",
					left: clickedPosition.x + 1 + "%",
					backgroundColor: 'rgba(0,0,0,0.6)',
					color: 'white',
					pointerEvents: 'none',
					zIndex: 20,
				}}
			>
				top: {clickedPosition.y}%<br/>
				left: {clickedPosition.x}%
			</div>
		)
	)
}

export default MousePosition