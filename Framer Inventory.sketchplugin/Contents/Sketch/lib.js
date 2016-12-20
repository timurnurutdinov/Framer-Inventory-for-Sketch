localPluginRoot = ""

var CX = {
    init: function(context, command){
        this.context = context;
        this.extend(context);
        this.pluginRoot = this.scriptPath
                .stringByDeletingLastPathComponent()
                .stringByDeletingLastPathComponent()
                .stringByDeletingLastPathComponent();
        // this.pluginSketch = this.pluginRoot + "/Contents/Sketch/library";
        localPluginRoot = this.pluginRoot + "/Contents/Sketch/";

        this.doc = context.document;
        this.docData = this.doc.documentData();
        this.page = this.doc.currentPage();
        this.artboard = this.page.currentArtboard();
        this.current = this.artboard || this.page;
        coscript.setShouldKeepAround(true);

        if(command && command == "controlbar"){
            this.ControlBar();
            return false;
        }
        if(command){
            switch(command){
                case "top-guide":
                    this.topGuide();
                    break;
                case "right-guide":
                    this.rightGuide();
                    break;
                case "bottom-guide":
                    this.bottomGuide();
                    break;
                case "left-guide":
                    this.leftGuide();
                    break;
                case "v-center-guide":
                    this.vCenterGuide();
                    break;
                case "h-center-guide":
                    this.hCenterGuide();
                    break;
                case "top-bottom-guides":
                    this.topBottomGuides();
                    break;
                case "right-left-guides":
                    this.rightLeftGuides();
                    break;
                case "remove-all-guides":
                    this.removeAllGuides();
                    break;
            }
        }

    },
    extend: function( options, target ){
        var target = target || this;
        for ( var key in options ){
            target[key] = options[key];
        }
        return target;
    }
};


CX.extend({
    getRect: function(layer){
        var rect = layer.absoluteRect();
        return {
            x: Math.round(rect.x()),
            y: Math.round(rect.y()),
            width: Math.round(rect.width()),
            height: Math.round(rect.height()),
            maxX: Math.round(rect.x() + rect.width()),
            maxY: Math.round(rect.y() + rect.height()),
        };
    },
    updateContext: function(){
        currentDocument = NSDocumentController.sharedDocumentController().currentDocument();
        this.context.document = NSDocumentController.sharedDocumentController().currentDocument();
        this.context.selection = this.context.document.selectedLayers();
        return this.context;
    },
});

CX.extend({
    getDistance: function(targetRect, containerRect){
        var containerRect = containerRect || this.getRect(this.current);
        return {
            top: (targetRect.y - containerRect.y),
            right: ((targetRect.x - containerRect.x) + targetRect.width),
            bottom: ((targetRect.y - containerRect.y) + targetRect.height),
            left:(targetRect.x - containerRect.x),
            vCenter:((targetRect.x - containerRect.x) + (targetRect.width / 2)),
            hCenter:((targetRect.y - containerRect.y) + (targetRect.height / 2)),
        };
    },
    message: function(message){
        this.doc.showMessage(message);
    }
});


CX.extend({
    selectError: function(){
        var self = this,
            selection = this.selection,
            inArtboard = false;

        if( selection.count() <= 0 ){
            this.message("Select an element.")
            return false;
        }
        if(selection.count() == 2){
            this.message("Can't select mutiple element.")
            return false;
        }
        if(inArtboard || !this.artboard){
            this.message("Element should be inside Artboard")
            return false;
        }
        return true;
    },
    setCount: function(gain){
        var self = this,
            selection = this.selection,
            layer = selection.firstObject();
        var targetRect = this.getRect(layer),
            containerRect = this.getRect(this.artboard),
            eleCount = this.getDistance(targetRect, containerRect);
        return eleCount;
    }
});


CX.extend({
    topGuide: function(){
      runSimulateKeynote(this.context)
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().top);
    },
    rightGuide: function(){
        runGenerateStates(this.context)
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().right);
    },
    bottomGuide: function(){
        log("is replicating?")
        runReplicateLayers(this.context)
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().bottom);
    },
    leftGuide: function(){
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().left);
    },
    vCenterGuide: function(){
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().vCenter);
    },
    hCenterGuide: function(){
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().hCenter);
    },
    topBottomGuides: function(){
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().top);
        // this.artboard.verticalRulerData().addGuideWithValue(this.setCount().bottom);
    },
    rightLeftGuides: function(){
        // var self = this;
        // if(!this.selectError()) return;
        // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().right);
        // this.artboard.horizontalRulerData().addGuideWithValue(this.setCount().left);
    },
    removeAllGuides: function(){
        log("Setting instead RemoveAllGuides")
        runSettings(this.context)

        // var self = this;
        // horizontalGuideCount = this.artboard.horizontalRulerData().numberOfGuides();
        // verticalGuideCount = this.artboard.verticalRulerData().numberOfGuides();
        // while (verticalGuideCount > 0) {
        //     this.artboard.verticalRulerData().removeGuideAtIndex(0);
        //     verticalGuideCount = this.artboard.verticalRulerData().numberOfGuides();
        // }
        // while (horizontalGuideCount > 0) {
        //     this.artboard.horizontalRulerData().removeGuideAtIndex(0);
        //     horizontalGuideCount = this.artboard.horizontalRulerData().numberOfGuides();
        // }
    }
});


CX.extend({
    ControlBar: function(){
        log("CB1")
        var self = this,
            identifier = "com.tilllur.framer-inventory",
            threadDictionary = NSThread.mainThread().threadDictionary(),
            ControlBar = threadDictionary[identifier];
            log("CB2")
        if(!ControlBar){
            log("CB3")
            ControlBar = NSPanel.alloc().init();
            ControlBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
            ControlBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0.15, 0.15, 0.15, 1));
            ControlBar.setTitleVisibility(NSWindowTitleHidden);
            ControlBar.setTitlebarAppearsTransparent(true);
            ControlBar.setFrame_display(NSMakeRect(0, 0, 640, 50), false);
            ControlBar.setMovableByWindowBackground(true);
            ControlBar.setHasShadow(true);
            ControlBar.setLevel(NSFloatingWindowLevel);
            var contentView = ControlBar.contentView(),
                getImage = function(size, name){
                    var isRetinaDisplay = (NSScreen.mainScreen().backingScaleFactor() > 1)? true: false;
                        suffix = (isRetinaDisplay)? "@2x": "";
                        imageURL = NSURL.fileURLWithPath(localPluginRoot + "/images" + "/controlbar/" + name + suffix + ".png"),
                        // imageURL = NSURL.fileURLWithPath(this.pluginRoot + "/Contents/Sketch/images" + "/controlbar/" + name + suffix + ".png"),
                        log(imageURL)
                        image = NSImage.alloc().initWithContentsOfURL(imageURL);
                    return image
                },
                addButton = function(rect, name, callAction){
                    var button = NSButton.alloc().initWithFrame(rect),
                        image = getImage(rect.size, name);

                    button.setImage(image);
                    button.setBordered(false);
                    button.sizeToFit();
                    button.setButtonType(NSMomentaryChangeButton);
                    button.setCOSJSTargetFunction(callAction);
                    button.setAction("callAction:");
                    return button;
                },
                addImage = function(rect, name){
                    var view = NSImageView.alloc().initWithFrame(rect),
                        image = getImage(rect.size, name);
                    view.setImage(image);
                    return view;
                },

                closeButton = addButton( NSMakeRect(20, 10, 30, 30), "close-control",
                    function(sender){
                        coscript.setShouldKeepAround(false);
                        threadDictionary.removeObjectForKey(identifier);
                        ControlBar.close();
                }),
                topGuideB = addButton( NSMakeRect(100, 10, 30, 30), "top-guide",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "top-guide");
                }),
                rightGuideB = addButton( NSMakeRect(150, 10,30,30), "right-guide",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "right-guide");
                }),
                bottomGuideB = addButton( NSMakeRect(200, 10,30,30), "bottom-guide",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "bottom-guide");
                }),
                leftGuideB = addButton( NSMakeRect(250, 10,30,30), "left-guide",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "left-guide");
                }),
                vCenterGuideB = addButton( NSMakeRect(330, 10,30,30), "v-center-guide",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "v-center-guide");
                }),
                hCenterGuideB = addButton( NSMakeRect(380, 10,30,30), "h-center-guide",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "h-center-guide");
                }),
                topBottomGuides = addButton( NSMakeRect(460,10,30,30),"top-bottom-guides",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "top-bottom-guides");
                }),
                rightLeftGuides = addButton ( NSMakeRect(510, 10, 30,30), "right-left-guides",
                    function(sneder){
                        self.updateContext();
                        self.init(self.context, "right-left-guides");
                }),
                removeAllGuidesB = addButton( NSMakeRect(590, 10,30,30), "remove-all-guides",
                    function(sender){
                        self.updateContext();
                        self.init(self.context, "remove-all-guides");
                }),
                separate1 = addImage( NSMakeRect(70, 10, 10, 30), "separate"),
                separate2 = addImage( NSMakeRect(300, 10, 10, 30), "separate"),
                separate3 = addImage( NSMakeRect(430, 10, 10, 30), "separate"),
                separate4 = addImage( NSMakeRect(560, 10, 10, 30), "separate");
            contentView.addSubview(closeButton);
            contentView.addSubview(separate1);
            contentView.addSubview(topGuideB);
            contentView.addSubview(rightGuideB);
            contentView.addSubview(bottomGuideB);
            contentView.addSubview(leftGuideB);
            contentView.addSubview(separate2);
            contentView.addSubview(vCenterGuideB);
            contentView.addSubview(hCenterGuideB);
            contentView.addSubview(separate3);
            contentView.addSubview(topBottomGuides);
            contentView.addSubview(rightLeftGuides);
            contentView.addSubview(separate4);
            contentView.addSubview(removeAllGuidesB);
            threadDictionary[identifier] = ControlBar;
            ControlBar.center();
            ControlBar.makeKeyAndOrderFront(nil);
        }
    }
});
