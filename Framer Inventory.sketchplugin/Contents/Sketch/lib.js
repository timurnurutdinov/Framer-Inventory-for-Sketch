@import 'actions/view-inventory.cocoascript'
@import 'actions/statistics-inventory.cocoascript'
@import 'run-actions.cocoascript'
// @import 'actions/action-inventory.cocoascript'

// var presets = {
// 	myRetinaEnabled: 0,
//   myRetinaString: "retina",
// 	myMinimalExport: 1,
// 	myRelativeGroup: 0,
// 	myDetailedNotation: 1,
// 	exportFramerFolder: "",
// 	myDevice: 0,
//
// 	myRetinaValue: 1,
// 	myMobile: 1,
// 	myAutoplay: 0,
//
// 	myUserID:  [[NSUUID UUID] UUIDString] + ""
// }
//
// var pluginDomain = "com.addleimb.framer-inventory.retina"
// var userDefaults = initDefaults(pluginDomain, presets)

// var relativeAccessory = nil
// var densityAccessory = nil
// var deviceAccessory = nil

var measureWindowHeight = ViewInventory.sizeWindowHeight();
var measureWindowWidth = ViewInventory.sizeWindowWidth();

var measureRoundButtonsBottom = measureWindowHeight - 6 * 3

// this is a class to store in threadDictionary
// var toolbar = nil
// var threadDictionary = nil




function ToolbarInventory (panel) {
    this.panel = panel
    this.images = ViewInventory.returnButtonsImages()
    this.contentViewEmpty = ViewInventory.createEmptyPanel()


    var importViews = ViewInventory.createImportPanel()
    this.contentViewImport = importViews[0]
    this.pathLabel = importViews[1]
    this.selectionLabel = importViews[2]
    this.layersButton = importViews[3]
    this.statesButton = importViews[4]
    this.relativeAccessory = importViews[5]
    this.deviceAccessory = importViews[6]


    var sceneView = ViewInventory.createScenePanel()
    this.contentViewScene = sceneView[0]
    this.pathLabelScene = sceneView[1]
    this.selectionLabelScene = sceneView[2]
    this.deviceAccessoryScene = sceneView[3]
    this.sceneButton = sceneView[4]

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


ToolbarInventory.toolbarMode = function() {
      var toolbar = ToolbarInventory.returnInstance()
      if (toolbar != nil) {
          var panel = toolbar.panel
          if (panel.contentView() == toolbar.contentViewScene) { return Status.toolbarModeScene() }
          else if (panel.contentView() == toolbar.contentViewImport) { return Status.toolbarModeImport() }
          else { return Status.toolbarModeEmpty() }
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
    var localValue = ViewInventory.optimiseFramerPath()

    var localLabel = toolbar.pathLabel
    [localLabel setStringValue:localValue]

    var localLabelScene = toolbar.pathLabelScene
    [localLabelScene setStringValue:localValue]
  }
}


ToolbarInventory.updateAccessoryControls = function() {
  var toolbar = ToolbarInventory.returnInstance()
  if (toolbar != nil) {
      var localRelativeDropdown = toolbar.relativeAccessory
      localRelativeDropdown.selectItemAtIndex(userDefaults.myRelativeGroup)

      var localDeviceDropdown = toolbar.deviceAccessory
      localDeviceDropdown.selectItemAtIndex(ScaleInventory.deviceToSelect(userDefaults.myDevice))

      var localDeviceSceneDropdown = toolbar.deviceAccessoryScene
      localDeviceSceneDropdown.selectItemAtIndex(ScaleInventory.deviceToSelect(userDefaults.myDevice))

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
  }
}

ToolbarInventory.updateSceneButtons = function(adoptID) {
    var toolbar = ToolbarInventory.returnInstance()
    if (toolbar != nil) {
        if (adoptID == 5) { ViewInventory.adaptSceneButtons(toolbar.sceneButton, toolbar.images) }
        else if (adoptID == 6) { ViewInventory.adaptSceneButtonsSelected(toolbar.sceneButton, toolbar.images) }
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

        ViewInventory.adaptButtonsNone(toolbar.layersButton, toolbar.statesButton, toolbar.images)
    }
}
