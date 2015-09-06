# Framer Inventory for Sketch
- Video: http://timurnurutdinov.github.io/framerinventory/


>Framer Inventory performs actions on a current Sketch page and handles only code generation. You should export assets manually and then iterate with plugin. Actually, exporting assets is not a deal because Sketch already does it great;)

## 1. Simulate Keynote
![Alt text](/../images/readme/simulate.png?raw=true “Simulate Keynote plugin window”)

This Framer Inventory action mimics Keynote and its Magic Move transition. But you **don’t need to write a single line of code** to arrange layers in FramerJS because you’ve done it in Sketch. Think the way artboards are our slides in presentation.

#### How to use
- Create a sequence of artboards (aka slides in Keynote) in Sketch
- Mark necessary layers as “exportable” (helps to determine layers to include in export).
- Run **Simulate Keynote** action to create code for a linear prototype.
- Choose autoplay (change slides automatically or by click) and click Export.
- Wait until work is done (you’ll see a message)
- Paste into Framer Studio because code is already in your clipboard
- Export assets if it’s needed (exact amount is also mentioned in a message).

#### Works with shapes and groups on the current page
Some shapes such as Rectangle or Oval with sumple styling can be replicated with FramerJS code without an image:
![Alt text](/../images/readme/simulate-shapes?raw=true “Simulate Shapes”)
![Alt text](/../images/readme/replicate.png?raw=true “Replicate Selected plugin window”)

Other shapes and groups need assets to work properly in Framer Studio. Export them manually with the help of Sketch and **Select Exportables** (read below). Plugin helps to estimate the amount of required assets:
![Alt text](/../images/readme/simulate-groups?raw=true “Simulate Groups”)

>In order to generate states, artboards should have unique names. At very beginning Framer Inventory checks names and notifies you with a message. It also helps to find dublicates ;)



## 2. Replicate Selected
![Alt text](/../images/readme/replicate.png?raw=true “Replicate Selected plugin window”)
Generates code to place layers in proper place in Framer Studio (like a native Framer Studio import) but:
- Supports @1x Sketch files to generate @2x, @3x or any other code
- Generates code for states (if layer position from artboard A to artboard B has changed, Framer Inventory generates a new state)
- Do not export assets (as I said **Select Exportables** (read below) action will help us here)


#### How to use
- Select necessary layers (unlike Simulate Keynote it works in more accurate way)
- Run **Replicate Selected** action to generate code for FramerJS layers
- Choose position: relative to artboards (by default) or to a parent layer
- Export states: if it’s checked Framer Inventory will generate states as well
- Choose **modifier** name: all properties in generated code are scaled with this variable to support any pixel density screens.
- Press Export and wait until work is done (you’ll see a message)
- Paste into Framer Studio because code is already in your clipboard
- At the top of Framer Studio document add a variable named as **modifier**. (By default it should be “retina = 2” for iPhone 5/6 or “retina = 3” for iPhone 6 Plus)
- Export assets if it’s needed (exact amount is also mentioned in a message).

#### More about modifier
If you want to prototype for iPhone 6 Plus, add variable (named as modifier) at the top of the document
> retina = 3

Code for layers is generated in points but then scaled with this variable.
> exampleLayer = new Layer width: 414 * retina

You can change name of modifier or change it to 1 (if you don’t rely on points in Sketch)
Don’t forget to export properly scaled images, by the way!


## 3.1 Collapse Artboards
Collapse all layers to show artboards only in Layer Inspector. Helpful to check sequence.

## 3.2 Select Exportables
Select all exportable layers on this page.
>The only thing you need is to export images into FramerJS prototype location with Sketch default export.




# Future
You are welcome to suggest ideas or create bug reports. They will shape the future of a Framer Inventory. I'll add some tips & tricks soon.



