var pathLabel = nil
var topBottomGuides = nil

var defaultPathLabel = "Please, select Framer folder"


function ToolbarInventory () {}


ToolbarInventory.updateContext = function() {
    methodStartTime = [NSDate date]
    currentDocument = NSDocumentController.sharedDocumentController().currentDocument();
    currentSelection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers();
    // return this.context;
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


ToolbarInventory.updatePathLabel = function() {
    if (pathLabel != nil) {
      var pathComps = userDefaults.myExportPath.split("/");
      pathComps.pop();
      log("RE ->>>>>>>")
      var localLabel = pathComps.pop()
      [pathLabel setStringValue:localLabel];
    }
}

ToolbarInventory.createUIBar = function() {

    coscript.setShouldKeepAround(true);

    var identifier = "com.tilllur.framer-inventory"
    var threadDictionary = NSThread.mainThread().threadDictionary()
    var UIBar = threadDictionary[identifier]

    if(!UIBar){
        var measureWindowHeight = 70;
        var measureWindowWidth = 440;

        UIBar = NSPanel.alloc().init();
        UIBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
        UIBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.84, 0.84, 0.84, 1));
        UIBar.setTitleVisibility(NSWindowTitleHidden);
        UIBar.setTitlebarAppearsTransparent(true);
        UIBar.setFrame_display(NSMakeRect(0, 0, measureWindowWidth, measureWindowHeight), false);
        UIBar.setMovableByWindowBackground(true);
        UIBar.setHasShadow(true);
        UIBar.setLevel(NSFloatingWindowLevel);
        var contentView = UIBar.contentView()


        var measureRoundButtonsSide = 10
        var measureRoundButtons = 6
        var measureRoundButtonsBottom = measureWindowHeight - measureRoundButtons * 3


        var closeButton = ToolbarInventory.addButton(NSMakeRect(measureRoundButtonsSide, measureRoundButtonsBottom, measureRoundButtons*2, measureRoundButtons*2), "close",
            function(sender){
                coscript.setShouldKeepAround(false);
                threadDictionary.removeObjectForKey(identifier);
                UIBar.close();
            }
        )


        var settingsButton = ToolbarInventory.addButton( NSMakeRect(measureRoundButtonsSide + measureRoundButtons * 3, measureRoundButtonsBottom, measureRoundButtons*2, measureRoundButtons*2), "settings",
            function(sender){
                ToolbarInventory.updateContext();
                runSettings()
        })
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




        // var relativeButtonType = (userDefaults.myRelativeGroup == 0) ? "relative/artboard" : "relative/group"
        // topBottomGuides = ToolbarInventory.addButton( NSMakeRect(226, 6, 58, 26), relativeButtonType,
        //     function(sender){
        //         ToolbarInventory.updateContext();
        //         userDefaults.myRelativeGroup = (userDefaults.myRelativeGroup == 0) ? 1 : 0
        //         saveDefaults(userDefaults)
        //         ToolbarInventory.changeRelativeButton()
        //
        // })
        // var rightLeftGuides = ToolbarInventory.addButton ( NSMakeRect(292, 6, 26, 26), "density",
        //     function(sneder){
        //         ToolbarInventory.updateContext();
        //         // ToolbarInventory.nextLayerState(false)
        // })


        // NSShadowlessSquareBezelStyle
        var accessoryFontSize = 10

        var relativeAccessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(340-64-80, 16, 80, 28))
        [[relativeAccessory cell] setBezelStyle:NSTexturedRoundedBezelStyle];
        // [relativeAccessory setBordered:false];
        // [[relativeAccessory cell] setArrowPosition:NSPopUpNoArrow];
        var densityValues = ["Artboard", "Group"];
        relativeAccessory.addItemsWithTitles(densityValues)
      	relativeAccessory.selectItemAtIndex(userDefaults.myRelativeGroup)
      	[relativeAccessory setFont:[NSFont boldSystemFontOfSize:accessoryFontSize]];

        relativeAccessory.setCOSJSTargetFunction(function(sender){
            userDefaults.myRelativeGroup = relativeAccessory.indexOfSelectedItem()
            saveDefaults(userDefaults)
            log(userDefaults.myRelativeGroup)
      	})

        var densityAccessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(340-64, 16, 64, 28))
        [[densityAccessory cell] setBezelStyle:NSTexturedRoundedBezelStyle];
        // [densityAccessory setBordered:false];
        // [[densityAccessory cell] setArrowPosition:NSPopUpNoArrow];
        var densityValues = ["Pixels", "Points"];
        densityAccessory.addItemsWithTitles(densityValues)
      	densityAccessory.selectItemAtIndex(userDefaults.myRetinaEnabled)
      	[densityAccessory setFont:[NSFont boldSystemFontOfSize:accessoryFontSize]];

        densityAccessory.setCOSJSTargetFunction(function(sender){
      		  userDefaults.myRetinaEnabled = densityAccessory.indexOfSelectedItem()
            saveDefaults(userDefaults)
            log(userDefaults.myRetinaEnabled)
      	})


        var deviceAccessory = NSPopUpButton.alloc().initWithFrame(NSMakeRect(340, 16, 90, 28))
        [[deviceAccessory cell] setBezelStyle:NSTexturedRoundedBezelStyle];
        // [deviceAccessory setBordered:false];
        // [[deviceAccessory cell] setArrowPosition:NSPopUpNoArrow];
        var devices = [["Canvas", "Canvas @2x"], ["iPhone 5S", "iPhone 7", "iPhone 7 Plus"], ["Nexus 5P", "Nexus 6X"]]
        for (var i = 0; i < devices.length; i++) {
            deviceAccessory.addItemsWithTitles(devices[i])
            if (i != devices.length - 1) { [[deviceAccessory menu] addItem:[NSMenuItem separatorItem]] }
        }
      	deviceAccessory.selectItemAtIndex(0)
      	[deviceAccessory setFont:[NSFont boldSystemFontOfSize:accessoryFontSize]];

        deviceAccessory.setCOSJSTargetFunction(function(sender){
      		  log("REALLY")
            log(deviceAccessory.indexOfSelectedItem())
      	})





        // var separate1 = ToolbarInventory.addImage( NSMakeRect(70, 10, 10, 30), "separate")
        // var separate2 = ToolbarInventory.addImage( NSMakeRect(300, 10, 10, 30), "separate")
        // var separate3 = ToolbarInventory.addImage( NSMakeRect(430, 10, 10, 30), "separate")
        // var separate4 = ToolbarInventory.addImage( NSMakeRect(560, 10, 10, 30), "separate")
        // var breaker = ToolbarInventory.addImage( NSMakeRect(10, 38, 420, 2), "breaker")

        var textsView = ToolbarInventory.addImage(NSMakeRect(0, 0, measureWindowWidth, measureIcons), "texts")

        pathLabel = [[NSTextField alloc] initWithFrame:NSMakeRect(0, 48, measureWindowWidth, 20)];
        [pathLabel setEditable:false];
        [pathLabel setBordered:false];
        [pathLabel setAlignment:NSCenterTextAlignment]
        // [pathLabel setFont:[NSFont boldSystemFontOfSize:smallFontSize]];
        [pathLabel setFont:[NSFont fontWithName:@"System" size:12]];
        [pathLabel setTextColor:[NSColor colorWithRed:0.6 green:0.6 blue:0.6 alpha:1]];
        [pathLabel setDrawsBackground:false];

        [pathLabel setStringValue:defaultPathLabel];
        // [pathLabel sizeToFit];

        // ToolbarInventory.updatePathLabel();

        // contentView.addSubview(breaker);
        contentView.addSubview(textsView);
        contentView.addSubview(pathLabel);

        contentView.addSubview(layersButton);
        contentView.addSubview(statesButton);
        contentView.addSubview(sceneButton);

        contentView.addSubview(deviceAccessory);
        contentView.addSubview(densityAccessory);
        contentView.addSubview(relativeAccessory);

        contentView.addSubview(settingsButton);
        contentView.addSubview(closeButton);
        contentView.addSubview(addButton);
        contentView.addSubview(removeButton);

        threadDictionary[identifier] = UIBar;
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





ToolbarInventory.changeRelativeButton = function() {
    if (topBottomGuides != nil) {
      log("SWitch")
      log(topBottomGuides)
      // log(topBottomGuides.rect)
      var relativeButtonName = (userDefaults.myRelativeGroup == 0) ? "relative/artboard" : "relative/group"
      var image = ToolbarInventory.getImage(topBottomGuides.frame.size, relativeButtonName);
      topBottomGuides.setImage(image);
    }
}
