# Framer Inventory 2.2 for Sketch
####<a href="https://github.com/timurnurutdinov/Framer-Inventory-for-Sketch/releases/tag/v2.2”>Download for Sketch 3.7+</a>
- Landing page with video: http://timurnurutdinov.github.io/framerinventory/

>Framer Inventory operates within the current Sketch page, handles FramerJS code generation & helps exporting assets manually from automatically generated page. The only tool to analyse the whole scene rather than separate screens.

![Alt text](/../images-second-version/readme/window.png?raw=true “Framer Inventory plugin window”)

## 1. Simulate Keynote
This action mimics Keynote and its Magic Move transition. Artboards are similar to slides in presentation but you can animate layers on them. Preview your ideas just few seconds later you’ve done them in Sketch!

#### How to use
- Create a sequence of artboards in Sketch (aka slides in Keynote)
- Mark necessary layers as “Exportable” to include them into a prototype (Note: plugin respects hierarchy)
- Run **Simulate Keynote** action to get your FramerJS code
- Paste from clipboard into Framer Studio 
- Export assets from automatically generated page (sometimes no assets needed)

#### Features
- Easy export: necessary assets are ready on "Export for Framer Inventory" page to be exported into _/your-prototype-name/images_
- Normalising: dynamic properties are put into FramerJS states, static - into layer description
- Pixels & Points support (New in 2.1)
- iPhone prototyping: mobile optimisations for pixel density and Framer devices
- Minimal export: generate clean states (delta between A & B)
- Autoplay: loop the prototype and preview without any clicks




## 2. Generate States
Generates code for **selected layers** and detects their states. Similar to **Simulate Keynote** but let you write your own logic. Works great for high fidelity prototyping.


## 3. Replicate Selected
Generates code for **selected layers** without states. Works as a quick start for high fidelity prototyping without states (modulation, sliders & others)




## 4. Settings
![Alt text](/../images-second-version/readme/settings.png?raw=true “Settings window”)

#### 4.1. Dimentions
##### A. Pixels
Choose multiplier and scale properties to get retina optimised prototype. Supports Auto Code.
![Alt text](/../images-second-version/readme/modifier.png?raw=true “Settings window”)

##### B. Points
Choose variable name to scale properties in Framer. Choose if you like to measure in points.
![Alt text](/../images-second-version/readme/variable.png?raw=true “Settings window”)


#### 4.2. iPhone prototyping
- Detects iPhone 5/6/6 Plus to show in Framer Studio
- Scales properties for iPhone 5/6/6
- Adds scaled export options on "Export for Framer Inventory" page
![Alt text](/../images-second-version/readme/mobile.png?raw=true “Settings window”)

#### 4.3. Minimal export for Simulate Keynote
- Cleans states to generate minimal amount of code
![Alt text](/../images-second-version/readme/minimal.png?raw=true “Settings window”)

#### 4.4. Autoplay
- Replaces onClick handler with an autoplay loop




# Contact
You are welcome to suggest ideas and report bugs (ideally with sketch files included). For better communication I suggest using Github issues but you can ping me on Twitter as well: @tilllur
