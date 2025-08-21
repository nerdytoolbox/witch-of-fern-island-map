import { createContext, useState, useRef } from "react";

export const WIFOContext = createContext(null)

export const WIFOProvider = ({ children }) => {
	const [resourceData, setResourceData] = useState([]);

	const [selectedSeason, setSelectedSeason] = useState("none");
	const [resourceSettings, setResourceSettings] = useState({
		herb: true,
		vegetable: true,
		mushroom: true,
		flower: true,
		oreLumber: true,
		magicalChest: true,
	});
	const [selectedMoon, setSelectedMoon] = useState("none");

	const [filterText, setFilterText] = useState("");
	const [isBigMap, setIsBigMap] = useState(false);
	const [showDevTools, setShowDevTools] = useState(false);

	const [iconModalInfo, setIconModalInfo] = useState({
		name: "",
		top: null,
		left: null,
		seasons: [],
		moonPhase: null,
	});
	const [clickedPosition, setClickedPosition] = useState({ x: null, y: null });
	const imageRef = useRef(null)

	const handleMouseClick = (e) => {
		const rect = imageRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const xPercent = Math.min(100, Math.max(0, (x / rect.width) * 100));
		const yPercent = Math.min(100, Math.max(0, (y / rect.height) * 100));

		setClickedPosition({ x: xPercent.toFixed(1), y: yPercent.toFixed(1) });
	}

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

	return (
		<WIFOContext.Provider value={{
			resourceData, setResourceData,
			selectedSeason, handleSeasonToggle,
			resourceSettings, handleResourceToggle,
			selectedMoon, handleMoonToggle,
			filterText, handleFilterTextChange,
			isBigMap, handleMapToggle,
			showDevTools, handleDevToolsToggle,
			iconModalInfo, setIconModalInfo,
			clickedPosition, setClickedPosition,
			imageRef, handleMouseClick, handleOnIconClick
		}}>
			{children}
		</WIFOContext.Provider>
	)
}