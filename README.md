# Drag drop from sidebar

In one of the projects I'm working on I needed to include a drag and drop feature from a sidebar item to grid using React. Of the components found was used React-grid-layout with Toolbox example.
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

Now, let's start writing the code with the importation of the dependencias:

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

It's necessary to use ReactDOMServer because one of the problems of the gridstack is that use jquery, so we need to convert a component React to Jquery.

In the constructor of class let's add a pre-list of grid items and sidebar items.

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

The id is identification of item from grid and sidebar, the name is um value it will be showing. In itemsGrid variable it have x and y variables it are position on grid and width and height variables it are dimensions.

The layout build must contain sidebar and grid and both need of the ref for use in Jquery.

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

To finish the all layout it is necessary to create the item. The item will be a new component.

```javascript
class ItemGrid extends Component {
    render() {
        return (
            <div
                id={this.props.item.id}
                className="grid-stack-item ui-draggable"
                data-gs-id={this.props.item.id}
                data-gs-x={this.props.item.x}
                data-gs-y={this.props.item.y}
                data-gs-width={this.props.item.width}
                data-gs-height={this.props.item.height}
            >
                <div className="grid-stack-item-content ui-draggable-handle">
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
