var pathLabel = nil
var defaultPathLabel = "Please, select Framer folder"

function ToolbarInventory () {}

// UIBar.init = function(context, command){
//     this.context = context;
//     this.extend(context);
//     this.pluginRoot = this.scriptPath
//             .stringByDeletingLastPathComponent()
//             .stringByDeletingLastPathComponent()
//             .stringByDeletingLastPathComponent();
//     // this.pluginSketch = this.pluginRoot + "/Contents/Sketch/library";
//     localPluginRoot = this.pluginRoot + "/Contents/Sketch/";
//
//     this.doc = context.document;
//     this.docData = this.doc.documentData();
//     this.page = this.doc.currentPage();
//     this.artboard = this.page.currentArtboard();
//     this.current = this.artboard || this.page;
//     // coscript.setShouldKeepAround(true);
//
//     if(command && command == "uibar"){
//         UIBar.createUIBar();
//         return false;
//     }
//     if(command){
//         switch(command){
//             case "top-guide":
//                 // this.topGuide();
//                 onSimulateKeynoteRun(this.context)
//                 break;
//             case "right-guide":
//                 // this.rightGuide();
//                 onGenerateStatesRun(this.context)
//                 break;
//             case "bottom-guide":
//                 // this.bottomGuide();
//                 onReplicateLayersRun(this.context)
//                 break;
//             case "left-guide":
//                 // this.leftGuide();
//                 var localPath = pluginPath + "/manifest.json"
//                 log("generating path" + localPath)
//                 var manifestText = readTextFromFile(localPath)
//                 log(manifestText)
//                 writeTextToFile(manifestText, pluginPath + "/manifest2.json")
//
//                 break;
//             case "v-center-guide":
//                 // this.vCenterGuide();
//                 onSelectProjectFolderRun(this.context)
//                 break;
//             case "h-center-guide":
//                 // this.hCenterGuide();
//                 onRemoveProjectFolderRun(this.context)
//                 break;
//             case "top-bottom-guides":
//                 // this.topBottomGuides();
//                 break;
//             case "right-left-guides":
//                 // this.rightLeftGuides();
//                 break;
//             case "remove-all-guides":
//                 // this.removeAllGuides();
//                 break;
//         }
//     }
//
// }
//
// UIBar.extend = function(options, target) {
//     var target = target || this;
//     for (var key in options) {
//         target[key] = options[key];
//     }
//     return target;
// }




// var CX = {
//     init: function(context, command){
//         this.context = context;
//         this.extend(context);
//         this.pluginRoot = this.scriptPath
//                 .stringByDeletingLastPathComponent()
//                 .stringByDeletingLastPathComponent()
//                 .stringByDeletingLastPathComponent();
//         // this.pluginSketch = this.pluginRoot + "/Contents/Sketch/library";
//         localPluginRoot = this.pluginRoot + "/Contents/Sketch/";
//
//         this.doc = context.document;
//         this.docData = this.doc.documentData();
//         this.page = this.doc.currentPage();
//         this.artboard = this.page.currentArtboard();
//         this.current = this.artboard || this.page;
//         coscript.setShouldKeepAround(true);
//
//         if(command && command == "uibar"){
//             this.UIBar();
//             return false;
//         }
//         if(command){
//             switch(command){
//                 case "top-guide":
//                     // this.topGuide();
//                     onSimulateKeynoteRun(this.context)
//                     break;
//                 case "right-guide":
//                     // this.rightGuide();
//                     onGenerateStatesRun(this.context)
//                     break;
//                 case "bottom-guide":
//                     // this.bottomGuide();
//                     onReplicateLayersRun(this.context)
//                     break;
//                 case "left-guide":
//                     // this.leftGuide();
//                     var localPath = pluginPath + "/manifest.json"
//                     log("generating path" + localPath)
//                     var manifestText = readTextFromFile(localPath)
//                     log(manifestText)
//                     writeTextToFile(manifestText, pluginPath + "/manifest2.json")
//
//                     break;
//                 case "v-center-guide":
//                     // this.vCenterGuide();
//                     onSelectProjectFolderRun(this.context)
//                     break;
//                 case "h-center-guide":
//                     // this.hCenterGuide();
//                     onRemoveProjectFolderRun(this.context)
//                     break;
//                 case "top-bottom-guides":
//                     // this.topBottomGuides();
//                     break;
//                 case "right-left-guides":
//                     // this.rightLeftGuides();
//                     break;
//                 case "remove-all-guides":
//                     // this.removeAllGuides();
//                     break;
//             }
//         }
//
//     },
//     extend: function( options, target ) {
//         var target = target || this;
//         for ( var key in options ){
//             target[key] = options[key];
//         }
//         return target;
//     }
// };


// CX.extend({
//     // getRect: function(layer){
//     //     var rect = layer.absoluteRect();
//     //     return {
//     //         x: Math.round(rect.x()),
//     //         y: Math.round(rect.y()),
//     //         width: Math.round(rect.width()),
//     //         height: Math.round(rect.height()),
//     //         maxX: Math.round(rect.x() + rect.width()),
//     //         maxY: Math.round(rect.y() + rect.height()),
//     //     };
//     // },
//     updateContext: function(){
//         currentDocument = NSDocumentController.sharedDocumentController().currentDocument();
//         this.context.document = NSDocumentController.sharedDocumentController().currentDocument();
//         // this.context.selection = this.context.document.selectedLayers();
//         return this.context;
//     },
// });
//
// CX.extend({
//     getDistance: function(targetRect, containerRect){
//         var containerRect = containerRect || this.getRect(this.current);
//         return {
//             top: (targetRect.y - containerRect.y),
//             right: ((targetRect.x - containerRect.x) + targetRect.width),
//             bottom: ((targetRect.y - containerRect.y) + targetRect.height),
//             left:(targetRect.x - containerRect.x),
//             vCenter:((targetRect.x - containerRect.x) + (targetRect.width / 2)),
//             hCenter:((targetRect.y - containerRect.y) + (targetRect.height / 2)),
//         };
//     },
//     message: function(message){
//         this.doc.showMessage(message);
//     }
// });


// CX.extend({
//     selectError: function(){
//         var self = this,
//             selection = this.selection,
//             inArtboard = false;
//
//         if( selection.count() <= 0 ){
//             this.message("Select an element.")
//             return false;
//         }
//         if(selection.count() == 2){
//             this.message("Can't select mutiple element.")
//             return false;
//         }
//         if(inArtboard || !this.artboard){
//             this.message("Element should be inside Artboard")
//             return false;
//         }
//         return true;
//     },
//     setCount: function(gain){
//         var self = this,
//             selection = this.selection,
//             layer = selection.firstObject();
//         var targetRect = this.getRect(layer),
//             containerRect = this.getRect(this.artboard),
//             eleCount = this.getDistance(targetRect, containerRect);
//         return eleCount;
//     }
// });


// CX.extend({
//     topGuide: function(){
//       // runSimulateKeynote(this.context)
//       onSimulateKeynoteRun(this.context)
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().top);
//     },
//     rightGuide: function(){
//         onGenerateStatesRun(this.context)
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().right);
//     },
//     bottomGuide: function(){
//         onReplicateLayersRun(this.context)
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().bottom);
//     },
//     leftGuide: function(){
//         var localPath = pluginPath + "/manifest.json"
//         log("generating path" + localPath)
//         var manifestText = readTextFromFile(localPath)
//         log(manifestText)
//         writeTextToFile(manifestText, pluginPath + "/manifest2.json")
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().left);
//     },
//     vCenterGuide: function() {
//         onSelectProjectFolderRun(this.context)
//         // log("URL")
//         // var url = [NSURL URLWithString:"https://bit.ly/2i1Usqq"]
//
//
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().vCenter);
//     },
//     hCenterGuide: function(){
//         onRemoveProjectFolderRun(this.context)
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().hCenter);
//     },
//     topBottomGuides: function(){
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().top);
//         // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().bottom);
//     },
//     rightLeftGuides: function(){
//         // var self = this;
//         // if(!this.selectError()) return;
//         // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().right);
//         // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().left);
//     },
//     removeAllGuides: function(){
//         // log("Setting instead RemoveAllGuides")
//         // runSettings(this.context)
//
//         // StatisticsInventory.sendTestRequest()
//
//         // var url = [NSURL URLWithString:"https://goo.gl/nQYNuf/?ref=framer_inventory"];
//         // var downloadPhotoTask = [[NSURLSession sharedSession] dataTaskWithURL:url completionHandler:nil];
//         // [downloadPhotoTask resume];
//         // StatisticsInventory.sendSimulateRequest()
//         // log("downloadPhotoTask?")
//
//         // var self = this;
//         // horizontalGuideCount = this.artboard.horizontalRulerData().numberOfGuides();
//         // verticalGuideCount = this.artboard.verticalRulerData().numberOfGuides();
//         // while (verticalGuideCount > 0) {
//         //     this.artboard.verticalRulerData().removeGuideAtIndex(0);
//         //     verticalGuideCount = this.artboard.verticalRulerData().numberOfGuides();
//         // }
//         // while (horizontalGuideCount > 0) {
//         //     this.artboard.horizontalRulerData().removeGuideAtIndex(0);
//         //     horizontalGuideCount = this.artboard.horizontalRulerData().numberOfGuides();
//         // }
//     }
// });


// CX.extend({
//     UIBar: function(){
//         log("CB1")
//         var self = this,
//             identifier = "com.tilllur.framer-inventory",
//             threadDictionary = NSThread.mainThread().threadDictionary(),
//             UIBar = threadDictionary[identifier];
//             log("CB2")
//         if(!UIBar){
//             log("CB3")
//             UIBar = NSPanel.alloc().init();
//             UIBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
//             UIBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.15, 0.15, 0.15, 1));
//             UIBar.setTitleVisibility(NSWindowTitleHidden);
//             UIBar.setTitlebarAppearsTransparent(true);
//             UIBar.setFrame_display(NSMakeRect(0, 0, 640, 50), false);
//             UIBar.setMovableByWindowBackground(true);
//             UIBar.setHasShadow(true);
//             UIBar.setLevel(NSFloatingWindowLevel);
//             var contentView = UIBar.contentView(),
//                 getImage = function(size, name){
//                     var isRetinaDisplay = (NSScreen.mainScreen().backingScaleFactor() > 1)? true: false;
//                         suffix = (isRetinaDisplay)? "@2x": "";
//                         imageURL = NSURL.fileURLWithPath(localPluginRoot + "/images" + "/uibar/" + name + suffix + ".png"),
//                         image = NSImage.alloc().initWithContentsOfURL(imageURL);
//                     return image
//                 },
//                 addButton = function(rect, name, callAction){
//                     var button = NSButton.alloc().initWithFrame(rect),
//                         image = getImage(rect.size, name);
//
//                     button.setImage(image);
//                     button.setBordered(false);
//                     button.sizeToFit();
//                     button.setButtonType(NSMomentaryChangeButton);
//                     button.setCOSJSTargetFunction(callAction);
//                     button.setAction("callAction:");
//                     return button;
//                 },
//                 addImage = function(rect, name){
//                     var view = NSImageView.alloc().initWithFrame(rect),
//                         image = getImage(rect.size, name);
//                     view.setImage(image);
//                     return view;
//                 },
//
//                 closeButton = addButton( NSMakeRect(20, 10, 30, 30), "close-control",
//                     function(sender){
//                         coscript.setShouldKeepAround(false);
//                         threadDictionary.removeObjectForKey(identifier);
//                         UIBar.close();
//                 }),
//                 topGuideB = addButton( NSMakeRect(100, 10, 30, 30), "top-guide",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "top-guide");
//                 }),
//                 rightGuideB = addButton( NSMakeRect(150, 10,30,30), "right-guide",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "right-guide");
//                 }),
//                 bottomGuideB = addButton( NSMakeRect(200, 10,30,30), "bottom-guide",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "bottom-guide");
//                 }),
//                 leftGuideB = addButton( NSMakeRect(250, 10,30,30), "left-guide",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "left-guide");
//                 }),
//                 vCenterGuideB = addButton( NSMakeRect(330, 10,30,30), "v-center-guide",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "v-center-guide");
//                 }),
//                 hCenterGuideB = addButton( NSMakeRect(380, 10,30,30), "h-center-guide",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "h-center-guide");
//                 }),
//                 topBottomGuides = addButton( NSMakeRect(460,10,30,30),"top-bottom-guides",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "top-bottom-guides");
//                 }),
//                 rightLeftGuides = addButton ( NSMakeRect(510, 10, 30,30), "right-left-guides",
//                     function(sneder){
//                         self.updateContext();
//                         self.init(self.context, "right-left-guides");
//                 }),
//                 removeAllGuidesB = addButton( NSMakeRect(590, 10,30,30), "remove-all-guides",
//                     function(sender){
//                         self.updateContext();
//                         self.init(self.context, "remove-all-guides");
//                 }),
//                 separate1 = addImage( NSMakeRect(70, 10, 10, 30), "separate"),
//                 separate2 = addImage( NSMakeRect(300, 10, 10, 30), "separate"),
//                 separate3 = addImage( NSMakeRect(430, 10, 10, 30), "separate"),
//                 separate4 = addImage( NSMakeRect(560, 10, 10, 30), "separate");
//
//             contentView.addSubview(closeButton);
//             contentView.addSubview(separate1);
//             contentView.addSubview(topGuideB);
//             contentView.addSubview(rightGuideB);
//             contentView.addSubview(bottomGuideB);
//             contentView.addSubview(leftGuideB);
//             contentView.addSubview(separate2);
//             contentView.addSubview(vCenterGuideB);
//             contentView.addSubview(hCenterGuideB);
//             contentView.addSubview(separate3);
//             contentView.addSubview(topBottomGuides);
//             contentView.addSubview(rightLeftGuides);
//             contentView.addSubview(separate4);
//             contentView.addSubview(removeAllGuidesB);
//             threadDictionary[identifier] = UIBar;
//             UIBar.center();
//             UIBar.makeKeyAndOrderFront(nil);
//         }
//     }
// });


// ToolbarInventory.updateContext = function() {
//     currentDocument = NSDocumentController.sharedDocumentController().currentDocument();
//     this.context.document = NSDocumentController.sharedDocumentController().currentDocument();
//     return this.context;
// }

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
        UIBar = NSPanel.alloc().init();
        UIBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
        UIBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.84, 0.84, 0.84, 1));
        UIBar.setTitleVisibility(NSWindowTitleHidden);
        UIBar.setTitlebarAppearsTransparent(true);
        UIBar.setFrame_display(NSMakeRect(0, 0, 440, 70), false);
        UIBar.setMovableByWindowBackground(true);
        UIBar.setHasShadow(true);
        UIBar.setLevel(NSFloatingWindowLevel);

        var contentView = UIBar.contentView()

        var closeButton = ToolbarInventory.addButton(NSMakeRect(418, 48, 12, 12), "close",
            function(sender){
                coscript.setShouldKeepAround(false);
                threadDictionary.removeObjectForKey(identifier);
                UIBar.close();
            }
        )

        var topGuideB = ToolbarInventory.addButton( NSMakeRect(10, 6, 26, 26), "simulate",
            function(sender){
                ToolbarInventory.updateContext();
                runSimulateKeynote()
        })
        var rightGuideB = ToolbarInventory.addButton( NSMakeRect(68, 6, 26, 26), "generate",
            function(sender){
                ToolbarInventory.updateContext();
                runGenerateStates()
        })
        var bottomGuideB = ToolbarInventory.addButton( NSMakeRect(102, 6, 26,26), "replicate",
            function(sender){
                ToolbarInventory.updateContext();
                runReplicateLayers()
        })
        var leftGuideB = ToolbarInventory.addButton( NSMakeRect(402, 48, 12, 12), "settings",
            function(sender){
                ToolbarInventory.updateContext();
                runSettings()
        })
        var vCenterGuideB = ToolbarInventory.addButton( NSMakeRect(26, 48,12,12), "add",
            function(sender){
                ToolbarInventory.updateContext();
                FramerInventory.runSelectProjectFolder()
                ToolbarInventory.updatePathLabel()
        })
        var hCenterGuideB = ToolbarInventory.addButton( NSMakeRect(10, 48,12,12), "remove",
            function(sender){
                ToolbarInventory.updateContext();
                FramerInventory.runRemoveProjectFolder()
                ToolbarInventory.updatePathLabel()
        })
        var topBottomGuides = ToolbarInventory.addButton( NSMakeRect(228, 6, 56, 26), "relative",
            function(sender){
                ToolbarInventory.updateContext();
                // ToolbarInventory.nextLayerState(true)

        })
        var rightLeftGuides = ToolbarInventory.addButton ( NSMakeRect(292, 6, 26, 26), "density",
            function(sneder){
                ToolbarInventory.updateContext();
                // ToolbarInventory.nextLayerState(false)
        })
        var removeAllGuidesB = ToolbarInventory.addButton( NSMakeRect(326, 6, 104, 26), "device",
            function(sender){
                ToolbarInventory.updateContext();
        })

        // var separate1 = ToolbarInventory.addImage( NSMakeRect(70, 10, 10, 30), "separate")
        // var separate2 = ToolbarInventory.addImage( NSMakeRect(300, 10, 10, 30), "separate")
        // var separate3 = ToolbarInventory.addImage( NSMakeRect(430, 10, 10, 30), "separate")
        // var separate4 = ToolbarInventory.addImage( NSMakeRect(560, 10, 10, 30), "separate")
        var breaker = ToolbarInventory.addImage( NSMakeRect(10, 38, 420, 2), "breaker")

        pathLabel = [[NSTextField alloc] initWithFrame:NSMakeRect(46, 47, 300, 20)];
        [pathLabel setEditable:false];
        [pathLabel setBordered:false];
        // [pathLabel setFont:[NSFont boldSystemFontOfSize:smallFontSize]];
        [pathLabel setFont:[NSFont fontWithName:@"System" size:12]];
        [pathLabel setTextColor:[NSColor colorWithRed:0.6 green:0.6 blue:0.6 alpha:1]];
        [pathLabel setDrawsBackground:false];

        [pathLabel setStringValue:defaultPathLabel];
        [pathLabel sizeToFit];

        // ToolbarInventory.updatePathLabel();

        contentView.addSubview(breaker);

        contentView.addSubview(topGuideB);
        contentView.addSubview(rightGuideB);
        contentView.addSubview(bottomGuideB);

        // contentView.addSubview(separate2);
        contentView.addSubview(vCenterGuideB);
        contentView.addSubview(hCenterGuideB);
        // contentView.addSubview(separate3);
        contentView.addSubview(topBottomGuides);
        contentView.addSubview(rightLeftGuides);
        // contentView.addSubview(separate4);
        contentView.addSubview(removeAllGuidesB);

        contentView.addSubview(pathLabel);
        contentView.addSubview(leftGuideB);
        contentView.addSubview(closeButton);

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
