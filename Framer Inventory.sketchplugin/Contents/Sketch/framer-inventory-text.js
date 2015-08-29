var inventorySuccessMessage = "Copied to Clipboard. ⌘CMD+V into Framer Studio"
var inventoryNoLayersSelectedMessage = "Failed. Select any layers, groups or slices, please."
var inventoryNoExportablesForKeynote = "Nothing has been exported. Make exportable groups or create slices on this page."
var inventoryBadTypesSelectedMessage = "Nothing has been exported. Choose Shapes or Groups, please."


function inventorySuccessMessageNumberedGetter(localNumber) {
	if (localNumber == nil || localNumber == 0) { return inventoryNoExportablesForKeynote }
	else if (localNumber == 1) { return "FramerJS prototype with one layer was copied to Clipboard. ⌘CMD+V into Framer Studio." }
	return "FramerJS prototype with " + localNumber + " layers was copied to Clipboard. ⌘CMD+V into Framer Studio."
}


function inventorySuccessMessageParametricNumberedGetter(localNumber, imagesNumber, shapesNumber) {
	if (localNumber == nil || localNumber == 0) { return inventoryNoExportablesForKeynote }
	else if (localNumber == 1 && imagesNumber == 1) {
		return "Exported 1 layer. ⌘CMD+V into Framer Studio and update 1 asset if needed."
	}
	else if (localNumber == 1 && shapesNumber == 1) {
		return "Exported 1 layer. ⌘CMD+V into Framer Studio."
	}
	else if (imagesNumber == 1) {
		return "Exported " + localNumber + " layers. ⌘CMD+V into Framer Studio and update 1 asset if needed."
	}
	return "Exported " + localNumber + " layers. ⌘CMD+V into Framer Studio and update " + imagesNumber + " assets if needed."
}