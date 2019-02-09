# Drag drop from sidebar

I worked on a project that I had to include a drag and drop functionality from a sidebar item to a grid using React. The first  component I found was React-grid-layout with the Toolbox example but after applied to my project I realised it didn't have the functionality I was looking for.

I found the gridstack.js plugin developed in jQuery and although I don’t like mixing react with jQuery I decided to use it to re-use some the drag and drop functionality I needed.

In this tutorial I will share my experience creating a prototype where an item is dragged from the sidebar to a grid and then removed from the grid or sidebar.

![](doc/drag-drop-sidebar.gif)

First, install the dependencies and set up webpack.

Dependencies used:

-   gridstack
-   bootstrap
-   jquery
-   jquery-ui

```
npm install gridstack bootstrap jquery jquery-ui
```

Next, unzip webpack from react for set up jquery-ui

```
npm run eject
```

Open `webpack.config.dev.js` file and find the line where you find alias and you add the follow:

```
'jquery-ui': 'jquery-ui/ui'
```

![alias](doc/alias-config-webpack.png)

Now, let's start writing the code importing the dependencies:

```javascript
import ReactDOMServer from "react-dom/server";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import "gridstack/dist/gridstack";
import "gridstack/dist/gridstack.jQueryUI";
import "gridstack/dist/gridstack.css";
import "gridstack/dist/gridstack-extra.css";
import "./grid.css";
```

ReactDOMServer must be used otherwise gridstack and jQuery will generate errors. We need to convert a React component to jQuery.

In the constructor of the class let's add a pre-list of grid items and sidebar items.

```javascript
constructor() {
  super();

  const itemsGrid = [
    { id: "a", name: "Item a", x: 0, y: 0, width: 2, height: 2 },
    { id: "b", name: "Item b", x: 2, y: 0, width: 2, height: 2 }
  ];

  const itemsSidebar = [
    { id: "c", name: "Item c" },
    { id: "d", name: "Item d" },
    { id: "e", name: "Item e" }
  ];

  this.state = {
    itemsGrid,
    itemsSidebar
  };
}
```

The id is the identification of item for the grid and sidebar, the name is the value that will be displayed. In itemsGrid, x and y are coordinates on the grid and width and height its dimensions.

The layout build must contain the sidebar and grid and both require ref for use in Jquery.

```html
<div className="container-fluid">
    <h1 className="mb-4">Drag drop from sidebar</h1>

    <div className="row">
        <div className="col-md-3 bg-light pt-3">
            <button
                type="button"
                className="btn btn-primary btn-block"
                onClick="{this.onAddSidebar.bind(this)}"
            >
                Add Item
            </button>

            <div className="sidebar" ref={sidebar => (this.sidebar = sidebar)}
            />
        </div>

        <div className="col-md-9">
            <div className="grid-stack grid-stack-12" ref={grid => (this.grid =
            grid)} />
        </div>
    </div>
</div>
```

It's necessary to create a component for items of the grid and sidebar.

```javascript
class ItemGrid extends Component {
    render() {
        return (
            <div id={this.props.item.id} className="grid-stack-item">
                <div className="grid-stack-item-content">
                    <p>
                        <a
                            href="javascript:void(0);"
                            className="removeItemGrid"
                        >
                            Remove Grid
                        </a>
                    </p>
                    <p>{this.props.item.name}</p>
                    <p>
                        <a
                            href="javascript:void(0);"
                            className="deleteItemSidebar"
                        >
                            Delete Sidebar
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}
```

To finalise the layout, create the css file.

```css
.grid-stack {
    background: lightgoldenrodyellow;
}

.grid-stack-item-content {
    color: #2c3e50;
    text-align: center;
    background-color: #18bc9c;
}

.sidebar {
    padding: 25px 0;
    text-align: center;
}

.sidebar .grid-stack-item {
    width: 200px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    z-index: 10;
    background: rgba(0, 255, 0, 0.1);
    cursor: default;
    display: inline-block;
    margin-bottom: 5px;
}

.sidebar .grid-stack-item .grid-stack-item-content {
    background: none;
}

.sidebar .grid-stack-item .grid-stack-item-content {
    height: 100%;
    background: none;
}

.sidebar .grid-stack-item .grid-stack-item-content > p {
    line-height: normal;
}

.sidebar .grid-stack-item .grid-stack-item-content .removeItemGrid,
.grid-stack .grid-stack-item .grid-stack-item-content .deleteItemSidebar {
    display: none;
}
```

The class .removeItemGrid displays the remove link when the item is on the grid and .deleteItemSidebar shows the delete link when the item is on sidebar, both are different actions.

The implementation starts with componentDidMount method:

```javascript
componentDidMount() {
    // Load element grid
    this.$gridReact = $(this.gridReact);
    // Load element sidebar
    this.$sidebarReact = $(this.sidebarReact);

    // Definition of the grid options
    const options = {
        width: 12,
        height: 6,
        acceptWidgets: true,
        float: true
    };

    // Set option in gridstack
    this.$gridReact.gridstack(options);

    // Load grid items
    this.loadGrid();
    // Load sidebar items
    this.loadSidebar();

    this.$gridReact.on("change", this.onChange.bind(this));
    this.$gridReact.on("added", this.onAdded.bind(this));

    this.$gridReact.on(
        "click",
        ".removeItemGrid",
        this.onRemoveItemGrid.bind(this)
    );
    this.$sidebarReact.on(
        "click",
        ".deleteItemSidebar",
        this.onDeleteItemSidebar.bind(this)
    );
}
```

this.$gridReact and this.$sidebarReact are used to get the reference from the DOM element.
Variable is used for the grid parameters.

-   width: number of columns;
-   height: maximum number of rows;
-   acceptWidgets: accept widgets dragged from other grids or from outside;
-   float: enable floating widgets;

For more information [doc](https://github.com/gridstack/gridstack.js/tree/develop/doc#options)

The next line sets up the parameters on the grid.

this.loadGrid() and this.loadSidebar() call the methods to load the items.

It attaches event handlers for the grid. Gridstack has various events, you can check [doc](https://github.com/gridstack/gridstack.js/tree/develop/doc#events) to find out more about them.

For this tutorial I used change and added events. Change is used for adding/removing items or to change the position of existing items. Added is used to add item from sidebar to grid.

After, it has a click event with .removeItemGrid class selector that it is only executed when clicked in a class that have .removeItemGrid. In other words when clicked in .removeItemGrid link, it will remove item from grid.
The same occur with .deleteItemSidebar click sidebar, but deleting from sidebar.

componentWillUnmount method is then used to cleaning up DOM elements.

```javascript
componentWillUnmount() {
    $(this.gridReact).on("change", this.onChange.bind(this));
    $(this.gridReact).on("added", this.onAddGridFromSidebar.bind(this));
    $(this.gridReact).on(
        "click",
        ".removeItemGrid",
        this.onRemoveItemGrid.bind(this)
    );
    $(this.$sidebarReact).on(
        "click",
        ".deleteItemSidebar",
        this.onDeleteItemSidebar.bind(this)
    );
}
```

For loading the items on grid I used the follow code:

```javascript
loadGrid() {
    const grid = this.$gridReact.data("gridstack");
    const items = this.state.itemsGrid;
    items.forEach(item => {
        grid.addWidget(
            ReactDOMServer.renderToStaticMarkup(
                <ItemGrid item={item} />
            ),
            item.x,
            item.y,
            item.width,
            item.height,
            false
        );
    }, grid);
}
```

addWidget is used to create a new item. The addWidget has eight parameters, you can [see](https://github.com/gridstack/gridstack.js/tree/develop/doc#addwidgetel-x-y-width-height-autoposition-minwidth-maxwidth-minheight-maxheight-id). But I will be using only 6 parameters:

-   el - item html
-   x, y, width, height - widget position/dimensions (optional)
-   autoPosition - if true then x, y parameters will be ignored and widget will be placed on the first available position (optional)

The first parameter I'm using is ReactDOMServer.renderToStaticMarkup to receive JSX from component and return clean and escaped html in string, because the render is made for jQuery.

for loading items in sidebar, the following method is used:

```javascript
loadSidebar() {
    // Load state
    const itemsSidebar = this.state.itemsSidebar;
    const items = itemsSidebar.map(item => {
        return ReactDOMServer.renderToStaticMarkup(
            <ItemGrid item={item} />
        );
    });
    // Remove all children of the sidebar
    this.$sidebarReact.children().remove();
    // Load new elements sidebar
    this.$sidebarReact.prepend(items);
    // Re-load sidebar functionalities
    this.dragSidebar();
}
```

The method loads the data from state to jQuery function and it is used the same process of render (ReactDOMServer.renderToStaticMarkup). After, all items are deleted and added again. It is called the method this.dragSidebar that enables draggable functionality from sidebar to grid.

The this.draggable has follow code:

```javascript
dragSidebar() {
    this.$sidebarReact.children().draggable({
        revert: "invalid",
        handle: ".grid-stack-item-content",
        scroll: false,
        appendTo: "body"
    });
}
```

The dragSidebar method has the sidebar drag and drop functionality. It is used this.\$sidebarReact.children() because it is required on all items from the sidebar which can be dragged and dropped. The parameters used are:

-   revert: for item return to sidebar if the item has not been dropped on a droppable.
-   handle: specific element for dragging.
-   scroll: container auto-scrolls while dragging.
-   appendTo: where the draggable helper should be appended to while dragging.

Now, the events will be implemented.

```javascript
onAddGridFromSidebar(e, items) {
    const id = items[0].el[0].id;
    const itemsSidebar = this.state.itemsSidebar;

    const index = itemsSidebar.map(item => item.id).indexOf(id);
    const itemGrid = itemsSidebar[index];
    itemsSidebar.splice(index, 1);

    this.setState(prevState => ({
        itemsSidebar,
        itemsGrid: [...prevState.itemsGrid, itemGrid]
    }));
}
```

The method onAddGridFromSidebar removes the item from sidebar, itemsSidebar state, and add in the itemsGrid state.

```javascript
onChange(e, items) {
    if (items === undefined) {
        return false;
    }
    let id, itemsGrid, index;
    items.forEach(item => {
        id = item.id === undefined ? item.el[0].id : item.id;

        itemsGrid = this.state.itemsGrid;

        index = itemsGrid.map(item => item.id).indexOf(id);
        itemsGrid[index].x = item.x;
        itemsGrid[index].y = item.y;
        itemsGrid[index].width = item.width;
        itemsGrid[index].height = item.height;

        this.setState({ itemsGrid });
    });
}
```

The method onChange catches all modifications in the items changed. It is necessary to use forEach for save the colisions change.

The two last methods from events are onRemoveItemGrid and onDeleteItemSidebar.

onRemoveItemGrid removes the item from the grid and adds in state of the sidebar. In the end, the method executes loadSidebar() to re-load jQuery drag and drop events.

```javascript
onRemoveItemGrid(e) {
    const id = e.target.parentElement.parentElement.parentElement.id;

    // Remove item from grid by dom
    const el = document.getElementById(id);
    this.$gridReact.data("gridstack").removeWidget(el);

    // Remove item from state
    const itemsGrid = this.state.itemsGrid;
    const index = itemsGrid.map(item => item.id).indexOf(id);
    const itemsSidebar = itemsGrid[index];
    itemsGrid.splice(index, 1);

    this.setState(prevState => ({
        itemsSidebar: [...prevState.itemsSidebar, itemsSidebar],
        itemsGrid
    }));

    this.loadSidebar();
}
```

The onDeleteItemSidebar method just removes the item from sidebar.

```javascript
onDeleteItemSidebar(e) {
    const id = e.target.parentElement.parentElement.parentElement.id;
    const itemsSidebar = this.state.itemsSidebar;

    const index = itemsSidebar.map(item => item.id).indexOf(id);
    itemsSidebar.splice(index, 1);

    this.setState({ itemsSidebar });
}
```

This tutorial shows the basic of the drag and drop with sidebar using react. Unfortunately this implementation uses jQuery.

I hope I helped you. The book is on the table.

Thanks
