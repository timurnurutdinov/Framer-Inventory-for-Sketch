var pathLabel = nil
var topBottomGuides = nil

var relativeAccessory = nil
var densityAccessory = nil
var deviceAccessory = nil

var measureWindowHeight = 70;
var measureWindowWidth = 440;

var measureRoundButtonsSide = 10
var measureRoundButtons = 6
var measureRoundButtonsBottom = measureWindowHeight - measureRoundButtons * 3

var defaultPathLabel = "Please, select Framer folder"

var UIBar = nil
var threadDictionary = nil
var threadIdentifier = "com.tilllur.framer-inventory"

function ToolbarInventory () {}


ToolbarInventory.updateContext = function() {
    methodStartTime = [NSDate date]
    if (NSDocumentController.sharedDocumentController() != nil && NSDocumentController.sharedDocumentController().currentDocument() != nil) {
      currentDocument = NSDocumentController.sharedDocumentController().currentDocument();
      currentSelection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers();
      scaleInstance = new ScaleInventory()
    }
}


ToolbarInventory.getImage = function(size, name) {
    var isRetinaDisplay = (NSScreen.mainScreen().backingScaleFactor() > 1)? true: false;
    var suffix = (isRetinaDisplay)? "@2x": "";
    var imageURL = NSURL.fileURLWithPath(pluginPath + "/" + "/images" + "/toolbar/" + name + suffix + ".png");
    var image = NSImage.alloc().initWithContentsOfURL(imageURL);
    return image
}

ToolbarInventory.addButton = function(rect, name, callAction) {
    var button = NSButton.alloc().initWithFrame(rect);
    var image = ToolbarInventory.getImage(rect.size, name);

    button.setImage(image);
    button.setBordered(false);
    button.sizeToFit();
    button.setButtonType(NSMomentaryChangeButton);
    button.setCOSJSTargetFunction(callAction);
    button.setAction("callAction:");
    return button;
}

ToolbarInventory.addImage = function(rect, name) {
    var view = NSImageView.alloc().initWithFrame(rect)
    var image = ToolbarInventory.getImage(rect.size, name);
    view.setImage(image);
    return view;
}




ToolbarInventory.getEmptyToolbarViews = function() {
    var saveButton = [[NSButton alloc] initWithFrame:NSMakeRect(140, 2, 160, 32)];
    [saveButton setTitle:"Select Framer Folder"];
    [saveButton setBezelStyle:NSRoundedBezelStyle];
    [saveButton setKeyEquivalent:"\r"];
    [saveButton setCOSJSTargetFunction:function(sender) {
        ToolbarInventory.updateContext();
        FramerInventory.runSelectProjectFolder()
        ToolbarInventory.updatePathLabel()
    }];
    [saveButton setAction:"callAction:"];

    var emptyView = ToolbarInventory.addImage(NSMakeRect(0, 0, measureWindowWidth, measureWindowHeight), "empty")

    return [emptyView, saveButton]
}

ToolbarInventory.getGeneralToolbarViews = function() {

    pathLabel = [[NSTextField alloc] initWithFrame:NSMakeRect(0, 48, measureWindowWidth, 20)];
    [pathLabel setEditable:false];
    [pathLabel setBordered:false];
    [pathLabel setAlignment:NSCenterTextAlignment]
    [pathLabel setFont:ViewInventory.fontCheckControls()];
    [pathLabel setTextColor:[NSColor colorWithRed:0.6 green:0.6 blue:0.6 alpha:1]];
    [pathLabel setDrawsBackground:false];
    [pathLabel setStringValue:defaultPathLabel];

    var addButton = ToolbarInventory.addButton( NSMakeRect(measureWindowWidth - measureRoundButtonsSide - measureRoundButtons * 5, measureRoundButtonsBottom,measureRoundButtons*2,measureRoundButtons*2), "add",
        function(sender){
            ToolbarInventory.updateContext();
            FramerInventory.runSelectProjectFolder()
            ToolbarInventory.updatePathLabel()
    })
    var removeButton = ToolbarInventory.addButton( NSMakeRect(measureWindowWidth - measureRoundButtonsSide - measureRoundButtons * 8, measureRoundButtonsBottom,measureRoundButtons*2,measureRoundButtons*2), "remove",
        function(sender){
            ToolbarInventory.updateContext();
            FramerInventory.runRemoveProjectFolder()
            ToolbarInventory.updatePathLabel()
    })

    // Action Icons
    var measureIcons = 16

    var layersButton = ToolbarInventory.addButton( NSMakeRect(measureIcons*7 - measureIcons/4, measureIcons, measureIcons*2, measureIcons*2), "simulate",
        function(sender){
            ToolbarInventory.updateContext();
            runSimulateKeynote()
    })
    var statesButton = ToolbarInventory.addButton( NSMakeRect(measureIcons*4 - measureIcons/4, measureIcons, measureIcons*2, measureIcons*2), "generate",
        function(sender){
            ToolbarInventory.updateContext();
            runGenerateStates()
    })
    var sceneButton = ToolbarInventory.addButton( NSMakeRect(measureIcons - measureIcons/4, measureIcons, measureIcons*2, measureIcons*2), "replicate",
        function(sender){
            ToolbarInventory.updateContext();
            runReplicateLayers()
    })


    relativeAccessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(340-64-80, 16, 80, 28))
    [[relativeAccessory cell] setBezelStyle:NSTexturedRoundedBezelStyle];
    var densityValues = ["Artboard", "Group"];
    relativeAccessory.addItemsWithTitles(densityValues)
    relativeAccessory.selectItemAtIndex(userDefaults.myRelativeGroup)
    [relativeAccessory setFont:ViewInventory.fontAccessory()];

    relativeAccessory.setCOSJSTargetFunction(function(sender){
        userDefaults.myRelativeGroup = relativeAccessory.indexOfSelectedItem()
        saveDefaults(userDefaults)
    })

    densityAccessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(340-64, 16, 64, 28))
    [[densityAccessory cell] setBezelStyle:NSTexturedRoundedBezelStyle];
    var densityValues = ["Pixels", "Points"];
    densityAccessory.addItemsWithTitles(densityValues)
    densityAccessory.selectItemAtIndex(userDefaults.myRetinaEnabled)
    [densityAccessory setFont:ViewInventory.fontAccessory()];

    densityAccessory.setCOSJSTargetFunction(function(sender){
        userDefaults.myRetinaEnabled = densityAccessory.indexOfSelectedItem()
        saveDefaults(userDefaults)
    })


    deviceAccessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(340, 16, 90, 28))
    [[deviceAccessory cell] setBezelStyle:NSTexturedRoundedBezelStyle];
    var devices = ViewInventory.returnDevices()
    for (var i = 0; i < devices.length; i++) {
        deviceAccessory.addItemsWithTitles(devices[i])
        if (i != devices.length - 1) { [[deviceAccessory menu] addItem:[NSMenuItem separatorItem]] }
    }
    deviceAccessory.selectItemAtIndex(ViewInventory.deviceToSelect(userDefaults.myDevice))
    [deviceAccessory setFont:ViewInventory.fontAccessory()];

    deviceAccessory.setCOSJSTargetFunction(function(sender){
        userDefaults.myDevice = ViewInventory.selectedDeviceIndex(deviceAccessory.indexOfSelectedItem())
        saveDefaults(userDefaults)
    })


    var textsView = ToolbarInventory.addImage(NSMakeRect(0, 0, measureWindowWidth, measureIcons), "texts")

    return [pathLabel, addButton, removeButton, layersButton, statesButton, sceneButton, relativeAccessory, densityAccessory, deviceAccessory, textsView]
}


ToolbarInventory.getCloseToolbarViews = function() {
    var closeButton = ToolbarInventory.addButton(NSMakeRect(measureRoundButtonsSide, measureRoundButtonsBottom, measureRoundButtons*2, measureRoundButtons*2), "close",
        function(sender){
            coscript.setShouldKeepAround(false);
            threadDictionary.removeObjectForKey(threadIdentifier);
            UIBar.close();
        }
    )

    var settingsButton = ToolbarInventory.addButton( NSMakeRect(measureRoundButtonsSide + measureRoundButtons * 3, measureRoundButtonsBottom, measureRoundButtons*2, measureRoundButtons*2), "settings",
        function(sender){
            ToolbarInventory.updateContext();
            runSettings()
    })
    return [closeButton, settingsButton]
}



ToolbarInventory.createGeneralContentView = function() {
    var view = [[NSView alloc] initWithFrame:NSMakeRect(0, 0, measureWindowWidth, measureWindowHeight)];

    var views = ToolbarInventory.getGeneralToolbarViews()
    for (var i = 0; i < views.length; i++) { view.addSubview(views[i]) }

    var closeViews = ToolbarInventory.getCloseToolbarViews()
    for (var i = 0; i < closeViews.length; i++) { view.addSubview(closeViews[i]) }

    return view
}

ToolbarInventory.createEmptyContentView = function() {
    var view = [[NSView alloc] initWithFrame:NSMakeRect(0, 0, measureWindowWidth, measureWindowHeight)];

    var views = ToolbarInventory.getEmptyToolbarViews()
    for (var i = 0; i < views.length; i++) { view.addSubview(views[i]) }

    var closeViews = ToolbarInventory.getCloseToolbarViews()
    for (var i = 0; i < closeViews.length; i++) { view.addSubview(closeViews[i]) }

    return view
}





ToolbarInventory.createUIBar = function() {

    coscript.setShouldKeepAround(true);

    threadDictionary = NSThread.mainThread().threadDictionary()
    UIBar = threadDictionary[threadIdentifier]

    if(!UIBar){

        UIBar = NSPanel.alloc().init();
        UIBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
        UIBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.84, 0.84, 0.84, 1));
        UIBar.setTitleVisibility(NSWindowTitleHidden);
        UIBar.setTitlebarAppearsTransparent(true);
        UIBar.setFrame_display(NSMakeRect(0, 0, measureWindowWidth, measureWindowHeight), false);
        UIBar.setMovableByWindowBackground(true);
        UIBar.setHasShadow(true);
        UIBar.setLevel(NSFloatingWindowLevel);


        if (userDefaults.exportFramerFolder == "") { UIBar.setContentView(ToolbarInventory.createEmptyContentView()) }
        else { UIBar.setContentView(ToolbarInventory.createGeneralContentView()) }


        threadDictionary[threadIdentifier] = UIBar;
        UIBar.center();
        UIBar.makeKeyAndOrderFront(nil);

        ToolbarInventory.updatePathLabel()
    }
}


//
// ToolbarInventory.getForwardArtboards = function() {
//     return [[currentDocument currentPage] artboards];
// }
//
// ToolbarInventory.getBackwardArtboards = function() {
//     return [[[[currentDocument currentPage] artboards] reverseObjectEnumerator] allObjects];
// }
//
// ToolbarInventory.nextLayerState = function(isForwardOrder) {
//   log("-> Next Layer")
//   if ([currentSelection count] == 0) { return }
//   var currentLayer = [currentSelection objectAtIndex: 0]
//   var parentArtboard = TypeInventory.findParentArtboard(currentLayer)
//   var parentName = [parentArtboard name]
//
//   var needNextArtboard = false
//   var nextArtboard = nil
//
//   var baseArtboards = nil
//   if (isForwardOrder) { baseArtboards = ToolbarInventory.getForwardArtboards() }
//   else { baseArtboards = ToolbarInventory.getBackwardArtboards() }
//
//   var artboards = NSMutableArray.new()
//   for (var i = 0; i < [baseArtboards count]; i++) {
//       [artboards addObject:[baseArtboards objectAtIndex: i]]
//   }
//   for (var i = 0; i < [baseArtboards count]; i++) {
//       [artboards addObject:[baseArtboards objectAtIndex: i]]
//   }
//
//   for (var i = 0; i < artboards.count(); i++) {
//      var artboard = [artboards objectAtIndex: i]
//      if (needNextArtboard) {
//         nextArtboard = artboard
//         break
//      }
//
//      if ([[parentArtboard objectID] isEqualToString:[artboard objectID]]) {
//         needNextArtboard = true
//      }
//   }
//
//   var artboardLayers = nil
//   if (nextArtboard) {
//       FramerInventory.deselectLayers()
//       artboardLayers = nextArtboard.children()
//       for (var i = 0; i < artboardLayers.count(); i++) {
//           var currentChild = [artboardLayers objectAtIndex: i]
//           var currentChildName = [currentChild name]
//           if ([currentChildName isEqualToString: [currentLayer name]]) {
//               [currentChild select:true byExpandingSelection:true]
//           }
//       }
//   }
// }


ToolbarInventory.updateAccessoryControls = function() {
    if (relativeAccessory != nil) {
        relativeAccessory.selectItemAtIndex(userDefaults.myRelativeGroup)
    }
    if (densityAccessory != nil) {
        densityAccessory.selectItemAtIndex(userDefaults.myRetinaEnabled)
    }
    if (deviceAccessory != nil) {
        deviceAccessory.selectItemAtIndex(ViewInventory.deviceToSelect(userDefaults.myDevice))
    }
}


ToolbarInventory.updatePathLabel = function() {
    if (UIBar != nil) {
      if (userDefaults.exportFramerFolder == "") {
        UIBar.setContentView(ToolbarInventory.createEmptyContentView())
      }
      else {
        UIBar.setContentView(ToolbarInventory.createGeneralContentView())

        if (pathLabel != nil) {
          var pathComps = userDefaults.exportFramerFolder.split("/");
          var localLabel = pathComps.pop()
          [pathLabel setStringValue:localLabel];
        }

      }
    }
}
