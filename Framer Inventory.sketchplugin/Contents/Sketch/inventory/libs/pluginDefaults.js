

// var kPluginDomain;

var initDefaults = function(pluginDomain, initialValues) {
	// kPluginDomain = pluginDomain

	var defaults = [[NSUserDefaults standardUserDefaults] objectForKey:pluginDomain]
	var defaultValues = {}
  var dVal;

  for (var key in defaults) {
    	defaultValues[key] = defaults[key]
	}

	for (var key in initialValues) {
		dVal = defaultValues[key]
		if (dVal == nil) defaultValues[key] = initialValues[key]
	}

	return defaultValues
}

var saveDefaults = function(pluginDomain, newValues) {
	if (pluginDomain) {
		var defaults = [NSUserDefaults standardUserDefaults]
		[defaults setObject: newValues forKey: pluginDomain];
	}
}
