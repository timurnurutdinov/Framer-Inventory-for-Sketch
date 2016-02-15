# Framer Inventory 2.0 for Sketch
####<a href="https://github.com/timurnurutdinov/Framer-Inventory-for-Sketch/releases">Download for Sketch 3.5+</a>
- Landing page with video: http://timurnurutdinov.github.io/framerinventory/

>Framer Inventory operates within the current Sketch page, handles FramerJS code generation & helps exporting assets manually from automatically generated page.

![Alt text](/../images-second-version/readme/window.png?raw=true “Framer Inventory plugin window”)

## 1. Simulate Keynote
This action mimics Keynote and its Magic Move transition. Artboards are similar to slides in presentation but you can animate layers on them. Preview your ideas just few seconds later you’ve done them in Sketch!

#### How to use
- Create a sequence of artboards in Sketch (aka slides in Keynote)
- Mark necessary layers as “exportable” to include them into a prototype (Note: plugin respects hierarchy and can predict missed states)
- Run **Simulate Keynote** action to get your FramerJS code
- Paste from clipboard into Framer Studio 
- Export assets from automatically generated [Framer Inventory] page (sometimes no assets are needed)

#### Features
- Easy export: necessary assets are ready on [Framer Inventory] page to be exported into _/your-prototype-name/images_
- Normalising: dynamic properties are put into FramerJS states, static - into layer description
- Mobile prototyping: retina support & iPhone detection
- Minimal export: generate clean states (delta between A & B)
- Autoplay: preview your prototype without clicks




## 2. Generate States
Generates code for **selected layers** and supports states. Similar to **Simulate Keynote** but let you write your own additional logic. Works great for high fidelity prototyping.


## 3. Replicate Selected
Generates code for **selected layers** without states. Works as a quick start for high fidelity prototyping without states (modulation, sliders & others)




## 4. Settings
![Alt text](/../images-second-version/readme/settings.png?raw=true “Settings window”)

#### 4.1. Scale variable name
Properties are scaled by this variable to support retina.

#### 4.2. Mobile prototyping
- Detects iPhone 5/6/6 Plus for previewing
- Adds correct values for scale variable for iPhone 5/6/6
- Adds correct export size options on [Framer Inventory] page

#### 4.3. Minimal export for Simulate Keynote
- Cleans states to generate minimal amount of code

#### 4.4. Autoplay
- Replaces onClick handler with an autoplay loop




# Contact
You are welcome to suggest ideas and report bugs (ideally with sketch files included). For better communication I suggest using Github issues but you can ping me on Twitter as well: @tilllur
