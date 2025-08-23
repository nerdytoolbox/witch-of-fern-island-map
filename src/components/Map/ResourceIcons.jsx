import { IMAGE_PATH } from "../../util/constants.js";
import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";

// Show resource icons on the map
const ResourceIcons = () => {
	const {
		resourceData,
		selectedSeason,
		resourceSettings,
		selectedMoon,
		filterText,
		showFlowerBee,
		isBigMap,
		handleOnIconClick,
	} = useContext(WIFOContext)

	// Filter data based on the selected options
	const filteredData = resourceData.filter(resource => {
		const nameMatch = resource.type === "fishPond" || resource.name.toLowerCase().includes(filterText.toLowerCase())
		const seasonSelected = resource.seasons.length === 0 ? true : (selectedSeason !== "none" ? resource.seasons.includes(selectedSeason) : true)
		const moonSelected = resource.moonPhase === "" ? true : (selectedMoon !== "none" ? resource.moonPhase === selectedMoon : true)
		const resourceSelected = resourceSettings[resource.type] || (resourceSettings["fish"] && resource.type === "fishPond")

		return nameMatch && seasonSelected && moonSelected && resourceSelected
	})

	const flowerBeeData = filteredData.filter(resource => resource.flowerBee?.length > 0)

	return (
		<>
			{filteredData.map(resource => {
				const amount = resource.top.length
				const image = IMAGE_PATH + resource.image
				const returnImg = []
				for (let i = 0; i < amount; i++) {
					returnImg.push(<img
						key={resource.name + i}
						src={image}
						alt={resource.name}
						className={isBigMap ? "img-icon-large" : "img-icon"}
						style={{top: resource.top[i] + "%", left: resource.left[i] + "%"}}
						title={resource.name}
						onClick={() => handleOnIconClick(resource.name, resource.type, resource.top[i], resource.left[i], resource.seasons, resource.moonPhase)}
					/>)
				}
				return returnImg
			})}

			{showFlowerBee && flowerBeeData.length > 0 && (
				<div
					className="flower-bee-info"
					style={{
						position: 'absolute',
						top: "1%",
						left: "1%",
						fontSize: isBigMap ? '1.2rem' : '0.6rem',
						pointerEvents: 'none',
						zIndex: 8,
					}}
				>
					<span className="flower-bee-title">Flower Bee (seasons show when seeds can be bought)</span>
					{flowerBeeData.map(seed => (
						<div key={seed.name} className="flower-bee-seed">
							<img src={IMAGE_PATH + seed.moonPhase +  ".png"} alt={seed.moonPhase} style={{ height: isBigMap ? "20px" : "10px"}} />
							{seed.name}
							{seed.flowerBee.map(season => <img key={season} src={IMAGE_PATH + season +  ".png"} alt={season} style={{ height: isBigMap ? "20px" : "10px"}} />)}
						</div>
					))}
				</div>
			)}
		</>

	)
}

export default ResourceIcons