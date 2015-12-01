var homeDirectory = "Framer Inventory"
var testsDirectory = "/tests"
var testsResults = "/tests"


/*
 /Users/TillluR/Library/Containers/com.bohemiancoding.sketch3/Data/Library/Caches/Framer Inventory/
*/


var readFileForAnswer = function(fileName) {
	var folderName = createTempFolderNamed(homeDirectory)
	var tests = createTempFolderNamed(homeDirectory + testsDirectory)
	var text = readTextFromFile("" + tests + "/" + fileName + ".txt")
	if (text == nil) { log("No test found: " + fileName) }
	return text
}

var writeTestingLog = function(outputString) {
	var folderName = createTempFolderNamed(homeDirectory)
	writeTextToFile(outputString, folderName + "/testsResults.txt")
}






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
