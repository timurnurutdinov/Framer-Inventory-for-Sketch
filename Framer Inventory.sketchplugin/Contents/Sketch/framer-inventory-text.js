var inventorySuccessMessage = "Copied to Clipboard. ⌘CMD+V into Framer Studio"
var inventoryNoLayersSelectedMessage = "Failed. Select one or more layers, groups or slices, please."
var inventoryNoExportablesForKeynote = "Nothing has been exported. Make exportable groups or create slices on this page."


function inventorySuccessMessageNumberedGetter(localNumber) {
	if (localNumber == nil || localNumber == 0) { return inventoryNoExportablesForKeynote }
	else if (localNumber == 1) { return "FramerJS prototype with one layer was copied to Clipboard. ⌘CMD+V into Framer Studio." }
	return "FramerJS prototype with " + localNumber + " layers was copied to Clipboard. ⌘CMD+V into Framer Studio."
}


function inventorySuccessMessageParametricNumberedGetter(localNumber, imagesNumber, shapesNumber) {
	return "Exported " + localNumber + " layers (" + imagesNumber  + " by images). ⌘CMD+V into Framer Studio and export assets if needed."
}