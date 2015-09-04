// My Utils <3

var scale = "retina"
var axisMode = 0

var ln = function() { return "\n" }

var setScale = function(newScale) {scale = newScale}
var getScale = function() { return scale }

var setAxisMode = function(newValue) { axisMode = newValue }
var getAxisMode = function() { return axisMode }






// Utilities

var removePath = function(longPath) {
	return longPath.replace(/^.*[\\\/]/, '')
}

var clearName = function(longName) {
	var clearedName = removePath(longName).split(' ').join('_')
	return clearedName.toLowerCase()
}

var findParent = function(layer) {
	if (axisMode == 0) { return findParentArtboard(layer) }
	return findParentGroup(layer)
}

var findParentArtboard = function(layer) {
	var lookingForParentArtboard = true
	var localParent = layer
	while (lookingForParentArtboard) {
		localParent = [localParent parentGroup]
		if ([localParent className] == "MSArtboardGroup") {
			lookingForParentArtboard = false
		}
		else if ([localParent className] == "MSPage") {
			lookingForParentArtboard = false
		}
	}
	return localParent
}

var findParentGroup = function(layer) {
	return [layer parentGroup]
}

var convertHex = function(hex, opacity) {
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity+')';
    return result;
}

var isExportableWithoutImage = function(layerToAnalyse) {
	if ([layerToAnalyse className] == "MSSliceLayer") { return false }
	var magicLayers = layerToAnalyse.layers()
	if (magicLayers.count() > 1) { return false }

	var shape = magicLayers.firstObject()
	if(shape && (shape.isKindOfClass(MSRectangleShape) || shape.isKindOfClass(MSOvalShape))) {
		if ([[[shape path] points] count] != 4) { return false }
		return true
	}
	return false
}






// LAYERS

var createRetinaLayer = function(layer, currentPage) {
	var l = layer
	var p = findParent(layer)
	return "" + clearName(layer.name()) + " = new Layer " + getPlace(l, p, currentPage) + ", image: \"images/" + removePath(l.name()) + ".png\"" + getSuperLayer(l) + getRotation(l) + getOpacity(l) + ln()
}

var createRetinaRectangle = function(layer, radius, currentPage) {
	var l = layer
	var p = findParent(layer)
	return "" + clearName(layer.name()) + " = new Layer " + getPlace(l, p, currentPage) + getBackgroundColor(l) + getBorderColor(l) + getBorderWidth(l) + getShadowX(l) + getShadowY(l) + getShadowBlur(l) + getShadowSpread(l) + getShadowColor(l) + getSuperLayer(l) + getCornerRadius(l) + getRotation(l) + getOpacity(l) + ln()
}




// STATES

var createRetinaState = function(layer, currentPage) {
	var l = layer
	var p = findParent(layer)
	if (isExportableWithoutImage(layer)) { 
		return ": " + getPlace(l, p, currentPage) + getBackgroundColor(l) + getBorderColor(l) + getBorderWidth(l) + getShadowX(l) + getShadowY(l) + getShadowBlur(l) + getShadowSpread(l) + getShadowColor(l) + getCornerRadius(l) + getAbsoluteRotation(l) + getAbsoluteOpacity(l) + ln()
	}
	return ": " + getPlace(l, p, currentPage) + getAbsoluteRotation(l) + getAbsoluteOpacity(l) + ln()
}

var createStateTitle = function(layer) {
	return "" + clearName(layer.name()) + ".states.add {" + ln()
}

var createStateTitleEnd = function() {
	return "}" + ln()
}

var createStateSwitchInstant = function(layer, stateName) {
	return "" + clearName(layer.name()) + ".states.switchInstant '" + stateName + "'" + ln() + ln()
}





// KEYNOTE

var createRetinaVariable = function(layer) {
	var testValue = 1
	var p = findParent(layer)
	var parentWidth = [[p frame] width]
	if (parentWidth == 320 || parentWidth == 375) {
		testValue = 2
	}
	else if (parentWidth == 414) {
		testValue = 3
	}
	else if (parentWidth == 640 || parentWidth == 750) {
		testValue = 3
	}
	else {
		testValue = 1
	}
	return "" + scale + " = " + testValue + ln() + ln()
}


var getStateNameVariable = function(generatedNumber, stateName) {
	return "generatedState" + (generatedNumber + 1) + " = \"" + stateName + "\"" + ln()
}


var generateCycler = function() {
	var cycleString = "cycler = Utils.cycle(generatedStates)" + ln()
	cycleString += "generatedButton = new Layer width: Screen.width, height: Screen.height, opacity: 0" + ln() + ln() + ln()
	cycleString += "generatedButton.on Events.Click, ->" + ln() + "\tnextState = cycler()" + ln() + "\tfor item in layers" + ln() + "\t\titem.states.switch nextState" + ln()
	return cycleString
}







// PARAMS: SIZES

var getPlace = function(layer, axisLayer, currentPage) {
	if (isExportableWithoutImage(layer)) { return getPlaceRect(layer, axisLayer) }
	return getPlaceImage(layer, axisLayer, currentPage)
}

var getPlaceImage = function(layer, axisLayer, currentPage) {
	
	var baseLayerFrame = [layer absoluteRect]
	var parentArtboard = axisLayer
	if ([axisLayer className] != "MSArtboardGroup") {
		parentArtboard = findParentArtboard(layer)
	}

	var layer_copy = [layer duplicate]
	[layer_copy setRotation: 0]
	if (![layer_copy isVisible]) {
		[layer_copy setIsVisible:true]
	}
	[layer_copy removeFromParent]
	[currentPage addLayers: [layer_copy]]

	var frame = [layer_copy frame]
	[frame setX: [[layer absoluteRect] x]]
	[frame setY: [[layer absoluteRect] y]]

	var temp = [MSSliceTrimming trimmedRectForSlice:layer_copy];
	var valueX = temp.origin.x
	var valueX = temp.origin.y
	var valueWidth = temp.size.width
	var valueHeight = temp.size.height
	
	var values = [temp.size.width, temp.size.height, temp.origin.x - [[axisLayer absoluteRect] x], temp.origin.y - [[axisLayer absoluteRect] y]]
	var stringValues = []
	for (var v = 0; v < values.length; v++) {
		if (values[v] == 0) {
			stringValues.push("0")
		}
		else {
			stringValues.push("" + values[v] + "*" + scale)
		}
			
	}
	
	var valueString = ""
	for (var v = 0; v < stringValues.length; v++) {
		if (v == 0) {
			valueString += "width: " + stringValues[v]
		}
		else if (v == 1) {
			valueString += ", height: " + stringValues[v]
		}
		else if (v == 2) {
			valueString += ", x: " + stringValues[v]
		}
		else if (v == 3) {
			valueString += ", y: " + stringValues[v]
		}
		else {
			log("Error in place detection")
			break
		}		
	}

	[layer_copy removeFromParent]
	
	return valueString
}

var getPlaceRect = function(layer, axisLayer) {
	return getWidth(layer) + getHeight(layer) + getX(layer, axisLayer) + getY(layer, axisLayer)
}





// OLD SCHOOL FOR EXPORTABLE BY CODE LAYERS

var getY = function(layer, parentLayer) {
	var parentY = [[parentLayer absoluteRect] y]
	var layerY = [[layer absoluteRect] y]
	
	if (parentY - layerY == 0) { return ", y: 0"}
	return ", y: " + -(parentY - layerY) + "*" + scale
}

var getX = function(layer, parentLayer) {
	var parentX = [[parentLayer absoluteRect] x]
	var layerX = [[layer absoluteRect] x]
	
	if (parentX - layerX == 0) { return ", x: 0"}
	return ", x: " + -(parentX - layerX) + "*" + scale
}

var getHeight = function(layer) {
	return ", height: " + [[layer frame] height] + "*" + scale
}

var getWidth = function(layer) {
	return "width: " + [[layer frame] width] + "*" + scale
}



// PARAMS: OPACITY + SUPER

var getOpacity = function(layer) {
	var opacity = 1
	if (![layer isVisible]) { return ", opacity: 0" }
	if ([layer className] != "MSSliceLayer") { opacity = [[[layer style] contextSettings] opacity] }
	if (opacity == 1) {  return "" }
	if (opacity == 0) { return ", opacity: 0" }
	return ", opacity: " + opacity.toFixed(1)
}

var getAbsoluteOpacity = function(layer) {
	var opacity = 1
	if (![layer isVisible]) { return ", opacity: 0" }
	if ([layer className] != "MSSliceLayer") { opacity = [[[layer style] contextSettings] opacity] }
	if (opacity == 1) {  return ", opacity: 1" }
	if (opacity == 0) { return ", opacity: 0" }
	return ", opacity: " + opacity.toFixed(1)
}

var getSuperLayer = function(layer) {
	if (axisMode == 0) { return "" }
	return ", superLayer: " + clearName([[layer parentGroup] name])
}


// PARAMS: COLOR & BORDERS

var getBackgroundColor = function(layer) {
	var fillCollection = [[layer style] fills]
	for (var f = fillCollection.count() - 1; f >= 0; f--) {
		var localFill = [fillCollection objectAtIndex:f]
		if ([localFill isEnabled]) {
			var hexComponent = [[localFill color] hexValue] + ""
			var alphaComponent = [[localFill color] alpha]
			return ", backgroundColor: \"" + convertHex(hexComponent, alphaComponent.toFixed(2)) + "\""
		}
	}
	return ", backgroundColor: \"red\""
}

var getBorderColor = function(layer) {
	var bordersCollection = [[layer style] borders]
	for (var b = bordersCollection.count() - 1; b >= 0; b--) {
		var localColor = [bordersCollection objectAtIndex:b]
		if ([localColor isEnabled]) {
			var hexComponent = [[localColor color] hexValue] + ""
			var alphaComponent = [[localColor color] alpha]
			return ", borderColor: \"" + convertHex(hexComponent, alphaComponent.toFixed(2)) + "\""
		}
	}
	return ""
}

var getBorderWidth = function(layer) {
	var bordersCollection = [[layer style] borders]
	for (var b = bordersCollection.count() - 1; b >= 0; b--) {
		var localColor = [bordersCollection objectAtIndex:b]
		if ([localColor isEnabled]) {
			return ", borderWidth: " + [localColor thickness] + "*" + scale
		}
	}
	return ""
}



// PARAMS: CORNERS

var getCornerRadius = function(layer) {
	var shape = layer.layers().firstObject()
	if(shape && shape.isKindOfClass(MSRectangleShape)) {
		var radiusNumber = shape.cornerRadiusFloat()
		if (radiusNumber == 0) { return "" }
		return ", cornerRadius: " + radiusNumber + "*" + scale
	}
	else if(shape && shape.isKindOfClass(MSOvalShape)) {
		var radiusNumber = [[layer frame] width] * 5
		return ", cornerRadius: " + Math.ceil(radiusNumber) + "*" + scale
	}
	else return ""
	
}




// PARAMS: SHADOW

var getShadowX = function(layer) {
	var shadowsCollection = [[layer style] shadows]
	for (var s = shadowsCollection.count() - 1; s >= 0; s--) {
		var localShadow = [shadowsCollection objectAtIndex:s]
		if ([localShadow isEnabled]) {
			if ([localShadow offsetX] == 0) { return ", shadowX: 0" }
			return ", shadowX: " + [localShadow offsetX] + "*" + scale
		}
	}
	return ""
}

var getShadowY = function(layer) {
	var shadowsCollection = [[layer style] shadows]
	for (var s = shadowsCollection.count() - 1; s >= 0; s--) {
		var localShadow = [shadowsCollection objectAtIndex:s]
		if ([localShadow isEnabled]) {
			if ([localShadow offsetY] == 0) { return ", shadowY: 0" }
			return ", shadowY: " + [localShadow offsetY] + "*" + scale
		}
	}
	return ""
}

var getShadowBlur = function(layer) {
	var shadowsCollection = [[layer style] shadows]
	for (var s = shadowsCollection.count() - 1; s >= 0; s--) {
		var localShadow = [shadowsCollection objectAtIndex:s]
		if ([localShadow isEnabled]) {
			if ([localShadow blurRadius] == 0) { return ", shadowBlur: 0" }
			return ", shadowBlur: " + [localShadow blurRadius] + "*" + scale
		}
	}
	return ""
}

var getShadowSpread = function(layer) {
	var shadowsCollection = [[layer style] shadows]
	for (var s = shadowsCollection.count() - 1; s >= 0; s--) {
		var localShadow = [shadowsCollection objectAtIndex:s]
		if ([localShadow isEnabled]) {
			if ([localShadow spread] == 0) { return ", shadowSpread: 0" }
			return ", shadowSpread: " + [localShadow spread] + "*" + scale
		}
	}
	return ""
}

var getShadowColor = function(layer) {
	var shadowsCollection = [[layer style] shadows]
	for (var s = shadowsCollection.count() - 1; s >= 0; s--) {
		var localShadow = [shadowsCollection objectAtIndex:s]
		if ([localShadow isEnabled]) {
			var hexComponent = [[localShadow color] hexValue] + ""
			var alphaComponent = [[localShadow color] alpha]
			return ", shadowColor: \"" + convertHex(hexComponent, alphaComponent.toFixed(2)) + "\""
		}
	}
	return ""
}


var getRotation = function(layer) {
	if ([layer rotation] == 0) { return "" }
	return ", rotation: " + (-[layer rotation])
}

var getAbsoluteRotation = function(localLayer) {
	return ", rotation: " + (-[localLayer rotation])
}



