var HelloSketch_FrameworkPath = HelloSketch_FrameworkPath || COScript.currentCOScript().env().scriptURL.path().stringByDeletingLastPathComponent();

var HelloSketch_Log = HelloSketch_Log || log;

(function() {
 var mocha = Mocha.sharedRuntime();
 var frameworkName = "RegisterInventory";
 var directory = HelloSketch_FrameworkPath;
 if (mocha.valueForKey(frameworkName)) {
// HelloSketch_Log("😎 loadFramework: `" + frameworkName + "` already loaded.");
 return true;
 } else if ([mocha loadFrameworkWithName:frameworkName inDirectory:directory]) {
// HelloSketch_Log("✅ loadFramework: `" + frameworkName + "` success!");
 mocha.setValue_forKey_(true, frameworkName);
 return true;
 } else {
// HelloSketch_Log("❌ loadFramework: `" + frameworkName + "` failed!: " + directory + ". Please define HelloSketch_FrameworkPath if you're trying to @import in a custom plugin");
 return false;
 }
 })();
