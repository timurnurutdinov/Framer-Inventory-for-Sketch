@import 'actions/view-inventory.cocoascript'
@import 'actions/statistics-inventory.cocoascript'
@import 'run-actions.cocoascript'

var relativeAccessory = nil
var densityAccessory = nil
var deviceAccessory = nil

var measureWindowHeight = ViewInventory.sizeWindowHeight();
var measureWindowWidth = ViewInventory.sizeWindowWidth();

var measureRoundButtonsBottom = measureWindowHeight - 6 * 3

// this is a class to store in threadDictionary
// var toolbar = nil
// var threadDictionary = nil




function ToolbarInventory (panel) {
    this.panel = panel
    this.images = ViewInventory.returnButtonsImages()
    // content views to help
    var views = ViewInventory.createImportPanel()
    this.contentViewImport = views[0]
    this.pathLabel = views[1]
    this.selectionLabel = views[2]
    this.layersButton = views[3]
    this.statesButton = views[4]
    this.relativeDropdown = views[5]


    this.contentViewEmpty = ViewInventory.createEmptyPanel()

    this.contentViewScene = ViewInventory.createScenePanel()[0]

}




ToolbarInventory.prototype.returnPanel = function() {
    return this.panel
}


ToolbarInventory.setContentView = function() {
    var toolbar = ToolbarInventory.returnInstance()
    if (toolbar != nil) {
      var panel = toolbar.panel
      if (userDefaults.exportFramerFolder == "") {
        var view = toolbar.contentViewEmpty
        [panel setContentView:view]
      }
      else {
        var view = toolbar.contentViewImport
        [panel setContentView:view]
      }
      ToolbarInventory.updatePathLabelStringValue()
    }
}

ToolbarInventory.changeContentView = function() {
    if (userDefaults.exportFramerFolder == "") { return }

    var toolbar = ToolbarInventory.returnInstance()
    if (toolbar != nil) {
      var panel = toolbar.panel
      if (panel.contentView() == toolbar.contentViewScene) {
        var view = toolbar.contentViewImport
        [panel setContentView:view]
      }
      else {
        var view = toolbar.contentViewScene
        [panel setContentView:view]
      }
    }
}

ToolbarInventory.removeInstance = function() {
    var threadIdentifier = "com.tilllur.framer-inventory"
    var threadDictionary = NSThread.mainThread().threadDictionary()
    threadDictionary.removeObjectForKey(threadIdentifier);
}

ToolbarInventory.returnInstance = function() {
    var threadIdentifier = "com.tilllur.framer-inventory"
    var threadDictionary = NSThread.mainThread().threadDictionary()
    return threadDictionary[threadIdentifier]
}

ToolbarInventory.updateClassInstance = function(toolbar) {
    if (toolbar != nil) { log(toolbar.returnPanel()) }
    var threadIdentifier = "com.tilllur.framer-inventory"
    var threadDictionary = NSThread.mainThread().threadDictionary()
    threadDictionary[threadIdentifier] = toolbar
}

ToolbarInventory.setPathLabel = function(label) {
  var toolbar = ToolbarInventory.returnInstance()
  if (toolbar != nil) { toolbar.pathLabel = label }
}

ToolbarInventory.setSelectionLabel = function(label) {
  var toolbar = ToolbarInventory.returnInstance()
  if (toolbar != nil) { toolbar.selectionLabel = label }
}

ToolbarInventory.updateSelectionLabelStringValue = function(value) {
  var toolbar = ToolbarInventory.returnInstance()
  if (toolbar != nil) {
    var localLabel = toolbar.selectionLabel
    [localLabel setStringValue:value]
  }
}

ToolbarInventory.updatePathLabelStringValue = function() {
  var toolbar = ToolbarInventory.returnInstance()
  if (toolbar != nil) {
    var localLabel = toolbar.pathLabel
    var localValue = ViewInventory.optimiseFramerPath()
    [localLabel setStringValue:localValue]
  }
}

ToolbarInventory.updateImportButtons = function(adoptID) {
  var toolbar = ToolbarInventory.returnInstance()
  if (toolbar != nil) {
      if (adoptID == 0) { ViewInventory.adaptButtonsNone(toolbar.layersButton, toolbar.statesButton, toolbar.images) }
      else if (adoptID == 1) { ViewInventory.adaptButtonsBase(toolbar.layersButton, toolbar.statesButton, toolbar.images) }
      else if (adoptID == 3) { ViewInventory.adaptButtonsSeveral(toolbar.layersButton, toolbar.statesButton, toolbar.images) }
      else if (adoptID == 2) { ViewInventory.adaptButtonsSelected(toolbar.layersButton, toolbar.statesButton, toolbar.images) }
      else if (adoptID == 4) { ViewInventory.adaptButtonsSelectedSeveral(toolbar.layersButton, toolbar.statesButton, toolbar.images) }
      else {
        log("WTF?")
      }
      // ViewInventory.adaptButtonsSelected(toolbar.layersButton, toolbar.statesButton, toolbar.images)
      // var layerButton = toolbar.layersButton
      // layerButton.frame = ViewInventory.layersButtonNone()
      // log(layerButton.frame())
      // log(layerButton.frame())

      // var frame = layerButton.frame()
      // frame.size = CGSizeMake(55, 18)
      // layerButton.frame = frame

      // log(layerButton.frame())
  }
}


ToolbarInventory.updateContext = function() {
    methodStartTime = [NSDate date]
    if (NSDocumentController.sharedDocumentController() != nil && NSDocumentController.sharedDocumentController().currentDocument() != nil) {
      currentDocument = NSDocumentController.sharedDocumentController().currentDocument();
      currentSelection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
      scaleInstance = new ScaleInventory()
    }
}









ToolbarInventory.createUIBar = function() {
    // StatisticsInventory.setStatus(Status.toolbarID())
    coscript.setShouldKeepAround(true);
    var toolbar = ToolbarInventory.returnInstance()

    if(!toolbar){

        var UIBar = NSPanel.alloc().init();
        UIBar.setStyleMask(NSTitledWindowMask + NSFullSizeContentViewWindowMask);
        UIBar.setBackgroundColor(NSColor.colorWithRed_green_blue_alpha(0, 0, 0, 1));
        UIBar.setTitleVisibility(NSWindowTitleHidden);
        UIBar.setTitlebarAppearsTransparent(true);
        UIBar.setFrame_display(NSMakeRect(0, 0, measureWindowWidth, measureWindowHeight), false);
        UIBar.setMovableByWindowBackground(true);
        UIBar.setHasShadow(true);
        UIBar.setLevel(NSFloatingWindowLevel);


        toolbar = new ToolbarInventory(UIBar);
        ToolbarInventory.updateClassInstance(toolbar)
        ToolbarInventory.setContentView()


        UIBar.center()
        UIBar.makeKeyAndOrderFront(nil)
    }
}



ToolbarInventory.updateAccessoryControls = function() {
    // if (relativeAccessory != nil) {
    //     relativeAccessory.selectItemAtIndex(userDefaults.myRelativeGroup)
    // }
    // if (densityAccessory != nil) {
    //     densityAccessory.selectItemAtIndex(userDefaults.myRetinaEnabled)
    // }
    // if (deviceAccessory != nil) {
    //     deviceAccessory.selectItemAtIndex(ScaleInventory.deviceToSelect(userDefaults.myDevice))
    // }
}
