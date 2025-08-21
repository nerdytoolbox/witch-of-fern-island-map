import SeasonSettings from "./SeasonSettings.jsx";
import ResourceSettings from "./ResourceSettings.jsx";
import MoonPhaseSettings from "./MoonPhaseSettings.jsx";
import { TextInput, Title } from "nerdy-lib";
import { useContext } from "react";
import { WIFOContext } from "../../storage/WIFOContext.jsx";

const Header = () => {
	const {
		isBigMap,
		handleMapToggle,
		filterText,
		handleFilterTextChange,
		showDevTools,
		handleDevToolsToggle
	} = useContext(WIFOContext);

	return (
		<div className="settings-header">
			<Title icon="witchOfFernIslandThumbnail.png" text="Witch of Fern Island Resource Map" />

			<div className="resource-settings">
				<SeasonSettings />
				<ResourceSettings />
				<MoonPhaseSettings />
			</div>

			<div className="other-settings-box">
				<TextInput placeholder="Search..." value={filterText} onChange={handleFilterTextChange} />
				<div className="hide-on-mobile">
					<div><input type="checkbox" checked={isBigMap} onChange={handleMapToggle}/> Big Map</div>
					<div><input type="checkbox" checked={showDevTools} onChange={handleDevToolsToggle}/> Show map position on click</div>
				</div>
			</div>
			<div className="tool-footer"><a href="https://github.com/nerdytoolbox/witch-of-fern-island-map/issues/new?template=ISSUE_TEMPLATE.md">Report issues / Feature requests</a></div>
		</div>
	)
}

export default Header