# Drag drop from sidebar

In of the projects I'm working on I needed to include a drag and drop feature from a sidebar item to grid using React. Of the components found was used React-grid-layout with Toolbox example.
After studying component and applied to the project I realised I needed extra functionality such as drag an item from the sidebar to the grid.

I found the gridstack.js plugin developed in Jquery and although I don’t like to mix react with Jquery I decided to use it for its resources.

In this tutorial I will explain my experience creating a drag and drop prototype where it is drag item from sidebar to grid and remove items from grid or sidebar.

![](doc/drag-drop-sidebar.gif)

The first step is necessary install the dependencies and set up the webpack.

Dependencies used:

-   gridstack
-   bootstrap
-   jquery
-   jquery-ui

```
npm install gridstack bootstrap jquery jquery-ui
```

After it has got unzip the webpack from react for set up jquery-ui

```
npm run eject
```

Open webpack.config.dev.js file into config folder and you go to line where you find alias and you add the follow instruct:

```
'jquery-ui': 'jquery-ui/ui'
```

![alias](doc/alias-config-webpack.png)
