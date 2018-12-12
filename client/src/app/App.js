import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import $ from "jquery";
import "gridstack/dist/gridstack";
import "gridstack/dist/gridstack.jQueryUI";
import "gridstack/dist/gridstack.css";
import "gridstack/dist/gridstack-extra.css";
import ReactDOMServer from "react-dom/server";

export default class App extends Component {
    constructor() {
        super();

        let itemsGrid = [
            {
                x: 0,
                y: 0,
                width: 2,
                height: 2,
                id: "a",
                name: "Drag a"
            },
            {
                x: 2,
                y: 4,
                width: 2,
                height: 2,
                id: "b",
                name: "Drag b"
            }
        ];

        let itemsSidebar = [
            {
                id: "c",
                name: "Drag c"
            },
            {
                id: "d",
                name: "Drag d"
            },
            {
                id: "e",
                name: "Drag e"
            }
        ];

        const data = this.getStorage();

        if (data !== null) {
            itemsGrid = data.itemsGrid;
            itemsSidebar = data.itemsSidebar;
        }

        this.state = {
            itemsGrid: itemsGrid,
            itemsSidebar: itemsSidebar
        };
    }

    // Load grid items
    loadGrid() {
        this.$gridReact = $(this.gridReact);
        const items = this.state.itemsGrid;
        items.forEach(item => {
            const widget = ReactDOMServer.renderToStaticMarkup(
                <ItemGrid
                    item={item}
                    minWidth="2"
                    maxWidth="4"
                    minHeight="2"
                    maxHeight="4"
                />
            );

            this.$gridReact.append(widget);
            const grid = this.$gridReact.data("gridstack");
            grid.makeWidget(document.getElementById(item.id));
        }, this.$gridReact);
        // console.log("loadGrid");
    }

    // Load sidebar items
    loadSidebar() {
        // Load state
        const itemsSidebar = this.state.itemsSidebar;
        const items = itemsSidebar.map(item => {
            return ReactDOMServer.renderToStaticMarkup(
                <ItemGrid
                    item={item}
                    minWidth="2"
                    maxWidth="4"
                    minHeight="2"
                    maxHeight="4"
                />
            );
        });
        // Load element
        this.$sidebarReact = $(this.sidebarReact);
        // Remove all children of the sidebar
        this.$sidebarReact.children().remove();
        // Load new elements sidebar
        this.$sidebarReact.prepend(items);
        // Re-load sidebar functionalities
        this.dragSidebar();
        // console.log("loadSidebar");
    }

    // event drag drop from sidebar to grid
    dragSidebar() {
        this.$sidebarReact = $(this.sidebarReact);
        this.$sidebarReact.children().draggable({
            revert: "invalid",
            handle: ".grid-stack-item-content",
            scroll: false,
            appendTo: "body"
        });
    }

    componentDidMount() {
        // Load element grid
        this.$gridReact = $(this.gridReact);
        // Load element sidebar
        this.$sidebarReact = $(this.sidebarReact);

        const options = {
            width: 12,
            height: 6,
            acceptWidgets: ".grid-stack-item",
            float: true,
            scroll: false,
            animate: true
        };

        const gridStack = this.$gridReact.gridstack(options);

        this.loadGrid();
        this.loadSidebar();

        this.$gridReact.on("change", this.onChange.bind(this));
        this.$gridReact.on("added", this.onAddGridFromSidebar.bind(this));
        this.$gridReact.on(
            "click",
            ".removeItemGrid",
            { gridStack },
            this.onRemoveItemGrid.bind(this)
        );
        this.$sidebarReact.on(
            "click",
            ".deleteItemSidebar",
            this.onDeleteItemSidebar.bind(this)
        );
        // console.log("componentDidMount");
    }

    componentWillUnmount() {
        $(this.gridReact).on("change", this.onChange.bind(this));
        $(this.gridReact).on("added", this.onAddGridFromSidebar.bind(this));
        $(this.gridReact).on(
            "click",
            ".removeItemGrid",
            {},
            this.onRemoveItemGrid.bind(this)
        );
        $(this.$sidebarReact).on(
            "click",
            ".deleteItemSidebar",
            this.onDeleteItemSidebar.bind(this)
        );
        // console.log("componentWillUnmount");
    }

    // catch the change
    onChange(e, items) {
        // console.log("onChange", items);
        // console.log("event", e);

        if (items === undefined) {
            return false;
        }

        // console.log("event", e);
        items.forEach(item => {
            this.updateItemGrid(item);
        });
    }

    updateItemGrid(item) {
        const id = item.id === undefined ? item.el[0].id : item.id;

        const itemsGrid = [...this.state.itemsGrid];

        const index = itemsGrid.map(item => item.id).indexOf(id);
        itemsGrid[index].x = item.x;
        itemsGrid[index].y = item.y;
        itemsGrid[index].width = item.width;
        itemsGrid[index].height = item.height;

        this.setState({ itemsGrid });
        // console.log("itemsGrid", itemsGrid);
        this.saveStorage(this.state, "updateItemGrid");
    }

    // From sidebar to grid
    onAddGridFromSidebar(e, items) {
        // console.log("onAddGridFromSidebar");
        const id = items[0].el[0].id;
        const itemsSidebar = [...this.state.itemsSidebar];

        const index = itemsSidebar.map(item => item.id).indexOf(id);
        const itemGrid = itemsSidebar[index];
        itemsSidebar.splice(index, 1);

        this.setState(prevState => ({
            itemsSidebar,
            itemsGrid: [...prevState.itemsGrid, itemGrid]
        }));

        this.saveStorage(this.state);
    }

    // From grid to sidebar
    onRemoveItemGrid(e) {
        const id = e.target.parentElement.parentElement.parentElement.id;
        const itemsGrid = this.state.itemsGrid;

        const index = itemsGrid.map(item => item.id).indexOf(id);
        const itemsSidebar = itemsGrid[index];
        itemsGrid.splice(index, 1);

        this.setState(prevState => ({
            itemsSidebar: [...prevState.itemsSidebar, itemsSidebar],
            itemsGrid
        }));

        // Remove item from grid by dom
        const el = document.getElementById(id);
        this.$gridReact.data("gridstack").removeWidget(el);

        // Re-load sidebar
        this.loadSidebar();
        this.saveStorage(this.state);
        // console.log("onRemoveItemGrid");
    }

    onDeleteItemSidebar(e) {
        const id = e.target.parentElement.parentElement.parentElement.id;
        const itemsSidebar = this.state.itemsSidebar;

        const index = itemsSidebar.map(item => item.id).indexOf(id);
        itemsSidebar.splice(index, 1);

        this.setState({ itemsSidebar });
        this.loadSidebar();
        this.saveStorage(this.state);
        // console.log("onDeleteItemSidebar");
    }

    addSidebar() {
        const id = this.charRandom();

        const itemsSidebar = { id, name: `Drag ${id}` };

        this.setState(prevState => ({
            itemsSidebar: [...prevState.itemsSidebar, itemsSidebar]
        }));

        this.loadSidebar();

        this.saveStorage(this.state);
        // console.log("addSidebar");
    }

    listSidebar() {
        console.log("Sidebar", this.state.itemsSidebar);
    }

    listGrid() {
        console.log("Grid", this.state.itemsGrid);
    }

    charRandom() {
        return Math.random()
            .toString(36)
            .slice(2, 4);
    }

    getStorage() {
        return global.localStorage
            ? JSON.parse(global.localStorage.getItem("photo-grid"))
            : {};
    }

    saveStorage(value, origin) {
        // console.log("value", value);
        // console.log("origin", origin);
        const data = {
            itemsSidebar: value.itemsSidebar,
            itemsGrid: value.itemsGrid
        };
        if (global.localStorage) {
            global.localStorage.setItem("photo-grid", JSON.stringify(data));
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <h1>Grids demo</h1>

                    <div className="row">
                        <div className="col-md-3">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.addSidebar.bind(this)}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.listSidebar.bind(this)}
                            >
                                List Sidebar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.listGrid.bind(this)}
                            >
                                List Grid
                            </button>

                            {/* Sidebar */}
                            <div
                                className="sidebar"
                                id="sidebar"
                                ref={sidebarReact =>
                                    (this.sidebarReact = sidebarReact)
                                }
                            />
                        </div>

                        <div className="col-md-9">
                            {/* Grid */}
                            <div
                                className="grid-stack grid-stack-12"
                                style={{ minHeight: "250px" }}
                                ref={gridReact => (this.gridReact = gridReact)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

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
                data-gs-min-width={this.props.minWidth}
                data-gs-max-width={this.props.maxWidth}
                data-gs-min-height={this.props.minHeight}
                data-gs-max-height={this.props.maxHeight}
                data-gs-auto-position="0"
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
