var homeDirectory = "Framer Inventory"
var cashesDirectory = "/.cashes"
var stateFile = "/state.txt"
var retinaFile = "/retina.txt"
var relativeFile = "/relative.txt"
var autoplayFile = "/autoplay.txt"


var framerInventoryOutput = function(streamString, fileName) {
	var folderName = createTempFolderNamed(homeDirectory)
	writeTextToFile(streamString, folderName + "" + fileName)
}


var rememberState = function() {
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	var readState = readTextFromFile("" + cashesFolderName + stateFile)
	if (readState == null) { return 1 }
	else if (readState == "1") { return 1 }
	else return 0
}

var studyState = function(newState) {
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	writeTextToFile(newState, "" + cashesFolderName + stateFile)
}



var rememberAutoplayState = function() {
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	var readState = readTextFromFile("" + cashesFolderName + autoplayFile)
	if (readState == null) { log("CBAS: read 1"); return 1 }
	else if (readState == "1") { log("CBAS: read 1"); return 1 }
	else { log("CBAS: read 0"); return 0 }
}

var studyAutoplayState = function(newState) {
	log("CBAS: write " + newState)
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	writeTextToFile(newState, "" + cashesFolderName + autoplayFile)
}




var rememberRetina = function() {
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	var readState = readTextFromFile("" + cashesFolderName + retinaFile)
	if (readState == null) { return "retina" }
	else return readState
}

var studyRetina = function(newState) {
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	writeTextToFile(newState, "" + "" + cashesFolderName + retinaFile)
}


var rememberRelative = function() {
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	var readState = readTextFromFile("" + cashesFolderName + relativeFile)
	if (readState == null) { return 0 }
	else if (readState == "1") { return 1 }
	else return 0
}

var studyRelative = function(newRelative) {
	var folderName = createTempFolderNamed(homeDirectory)
	var cashesFolderName = createTempFolderNamed(homeDirectory + cashesDirectory)
	writeTextToFile(newRelative, "" + "" + cashesFolderName + relativeFile)
}




// abstract read/write functions
// Credentials: https://medium.com/sketch-app-sources/sketch-plugin-snippets-for-plugin-developers-e9e1d2ab6827


var getTempFolderPath = function(withName) {
    var fileManager = [NSFileManager defaultManager],
    cachesURL = [[fileManager URLsForDirectory:NSCachesDirectory inDomains:NSUserDomainMask] lastObject],
    withName = (typeof withName !== 'undefined') ? withName : (Date.now() / 1000),
    folderName = [NSString stringWithFormat:"%@", withName];
    return [[cachesURL URLByAppendingPathComponent:folderName] path];
}

var createFolderAtPath = function(pathString) {
    var fileManager = [NSFileManager defaultManager];
    if([fileManager fileExistsAtPath:pathString]) return true;
    return [fileManager createDirectoryAtPath:pathString withIntermediateDirectories:true attributes:nil error:nil];
}

var createTempFolderNamed = function(name) {
    var tempPath = getTempFolderPath(name);
    createFolderAtPath(tempPath);
    return tempPath;
}

var writeTextToFile = function(text, filePath) {
    var t = [NSString stringWithFormat:@"%@", text],
    f = [NSString stringWithFormat:@"%@", filePath];
    return [t writeToFile:f atomically:true encoding:NSUTF8StringEncoding error:nil];
}

var readTextFromFile = function(filePath) {
    var fileManager = [NSFileManager defaultManager];
    if([fileManager fileExistsAtPath:filePath]) {
        return [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    }
    return nil;
}
