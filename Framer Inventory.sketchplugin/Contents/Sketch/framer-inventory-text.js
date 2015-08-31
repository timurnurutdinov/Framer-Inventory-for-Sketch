var inventorySuccessMessage = "Copied to Clipboard. ⌘CMD+V into Framer Studio"
var inventoryNoLayersSelectedMessage = "Failed. Select any layers, groups or slices, please."
var inventoryNoExportablesForKeynote = "Nothing has been exported. Make exportable groups or create slices on this page."
var inventoryBadTypesSelectedMessage = "Nothing has been exported. Choose Shapes or Groups, please."



var warningRepeatedArtboards = "WARNING!\rPage contains artboards with the same name.\rExport will not be correct."



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
	else if (imagesNumber == 0) {
		return "Exported " + localNumber + " layers. ⌘CMD+V into Framer Studio."
	}
	return "Exported " + localNumber + " layers. ⌘CMD+V into Framer Studio and update " + imagesNumber + " assets if needed."
}




var isArtboardsNamesRepeated = function(artboardsNames) {
	var namesSet = []
	
	for (var a = 0; a < artboardsNames.length; a++) {
		currentName = artboardsNames[a]
		if (a == 0) {
			namesSet.push(currentName)
			continue
		}
		
		for (var s = 0; s < namesSet.length; s++) {
			if (namesSet[s] == currentName) { return true }
		}
		namesSet.push(currentName)
	}	
	return false
} 