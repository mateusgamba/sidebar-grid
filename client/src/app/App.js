import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import "gridstack/dist/gridstack";
import "gridstack/dist/gridstack.jQueryUI";
import "gridstack/dist/gridstack.css";
import "gridstack/dist/gridstack-extra.css";
import "./App.css";
import "./grid.scss";
import dogImage from "./dog.jpg";
import livingImage from "./living-room.jpg";
import "./jquery-global.js";
import "jquery-ui-touch-punch/jquery.ui.touch-punch";

const styleImgDiv = {
    backgroundImage: `url(${dogImage})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    objectFit: "cover"
};

const fullImg = {
    backgroundImage: `url(${livingImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

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
                name: "Item a"
            },
            {
                x: 2,
                y: 0,
                width: 2,
                height: 2,
                id: "b",
                name: "Item b"
            }
        ];

        let itemsSidebar = [
            {
                id: "c",
                name: "Item c"
            },
            {
                id: "d",
                name: "Item d"
            },
            {
                id: "e",
                name: "Item e"
            }
        ];

        const data = this.getStorage();

        if (data !== null) {
            itemsGrid = data.itemsGrid;
            itemsSidebar = data.itemsSidebar;
        }

        this.state = {
            itemsGrid,
            itemsSidebar
        };
    }

    // Load grid items
    loadGrid() {
        this.$gridReact1 = $(this.gridReact).data("gridstack");
        const items = this.state.itemsGrid;
        items.forEach(item => {
            this.$gridReact1.addWidget(
                ReactDOMServer.renderToStaticMarkup(<ItemGrid item={item} />),
                item.x,
                item.y,
                item.width,
                item.height,
                false
            );
        }, this.$gridReact1);
    }

    // Load sidebar items
    loadSidebar() {
        // Load state
        const itemsSidebar = this.state.itemsSidebar;
        const items = itemsSidebar.map(item => {
            return ReactDOMServer.renderToStaticMarkup(
                <ItemGrid item={item} />
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
    }

    // event drag drop from sidebar to grid
    dragSidebar() {
        this.$sidebarReact = $(this.sidebarReact);

        this.$sidebarReact.children().draggable({
            revert: "invalid",
            handle: ".grid-stack-item-content",
            scroll: false,
            appendTo: "body",
            start: () => {
                this.$sidebarReact.removeClass("sidebar-scroll");
            },
            stop: () => {
                this.$sidebarReact.addClass("sidebar-scroll");
            }
        });
    }

    componentDidMount() {
        // Load element grid
        this.$gridReact = $(this.gridReact);
        // Load element sidebar
        this.$sidebarReact = $(this.sidebarReact);

        const gridStack = $("#grid1").gridstack({
            disableOneColumnMode: true,
            height: 6,
            width: 4,
            acceptWidgets: ".grid-stack-item",
            float: true,
            verticalMargin: 20,
            cellHeight: 40,
            alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        });
        let numberOfRows = 6;

        let minHeight = numberOfRows * 40 + (numberOfRows - 1) * 20;
        $("#grid1").css({ "min-height": minHeight });

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
    }

    // catch the change
    // itens necessary change because a update can change many box
    onChange(e, items) {
        if (items === undefined) {
            return false;
        }
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

        this.saveStorage();
    }

    // From sidebar to grid
    onAddGridFromSidebar(e, items) {
        const id = items[0].el[0].id;
        const itemsSidebar = [...this.state.itemsSidebar];

        const index = itemsSidebar.map(item => item.id).indexOf(id);
        const itemGrid = itemsSidebar[index];
        itemsSidebar.splice(index, 1);

        this.setState(prevState => ({
            itemsSidebar,
            itemsGrid: [...prevState.itemsGrid, itemGrid]
        }));
    }

    // From grid to sidebar
    onRemoveItemGrid(e) {
        const id = e.target.parentElement.parentElement.parentElement.id;

        // Remove item from grid by dom
        const el = document.getElementById(id);
        this.$gridReact.data("gridstack").removeWidget(el);

        // Update state
        const itemsGrid = this.state.itemsGrid;

        const index = itemsGrid.map(item => item.id).indexOf(id);
        const itemsSidebar = itemsGrid[index];
        itemsGrid.splice(index, 1);

        this.setState(prevState => ({
            itemsSidebar: [...prevState.itemsSidebar, itemsSidebar],
            itemsGrid
        }));
    }

    onDeleteItemSidebar(e) {
        const id = e.target.parentElement.parentElement.parentElement.id;
        const itemsSidebar = [...this.state.itemsSidebar];

        const index = itemsSidebar.map(item => item.id).indexOf(id);
        itemsSidebar.splice(index, 1);

        this.setState({ itemsSidebar });
    }

    onAddSidebar() {
        const id = this.charRandom();
        const item = { id, name: `Drag ${id}` };
        const itemsSidebar = [...this.state.itemsSidebar, item];
        this.setState({ itemsSidebar });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.itemsSidebar.length !== nextState.itemsSidebar.length ||
            this.state.itemsGrid.length !== nextState.itemsGrid.length
        ) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.loadSidebar();
        this.saveStorage();
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

    saveStorage() {
        const data = {
            itemsSidebar: this.state.itemsSidebar,
            itemsGrid: this.state.itemsGrid
        };
        if (global.localStorage) {
            global.localStorage.setItem("photo-grid", JSON.stringify(data));
        }
    }

    render() {
        return (
            <div id="root">
                <header>
                    <nav className="navbar navbar-expand-md navbar-white bg-white">
                        <a className="navbar-brand abs" href="#">
                            Photo Grid
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapsingNavbar"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div
                            className="navbar-collapse collapse"
                            id="collapsingNavbar"
                        >
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href=""
                                        data-target="#myModal"
                                        data-toggle="modal"
                                    >
                                        Save
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href=""
                                        data-target="#myModal"
                                        data-toggle="modal"
                                    >
                                        Buy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <div className="container-fluid" id="content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2 bg-warning px-0">
                            {/* Sidebar */}

                            <button
                                type="button"
                                className="btn btn-primary btn-block green"
                                onClick={this.onAddSidebar.bind(this)}
                            >
                                Add Photo
                            </button>
                            <div
                                className="sidebar sidebar-scroll"
                                id="sidebar"
                                ref={sidebarReact =>
                                    (this.sidebarReact = sidebarReact)
                                }
                            />
                        </div>

                        <div
                            id="render"
                            className="col-xs-12 col-sm-12 col-md-9 col-lg-10"
                            style={fullImg}
                        >
                            {/* Grid */}
                            <div className="col-md-4 offset-md-4">
                                <div
                                    className="grid-stack grid-stack-4"
                                    data_gridstack_node='{"width":"1"}'
                                    data-_gridstack_node='{"width":"1"}'
                                    id="grid1"
                                    ref={gridReact =>
                                        (this.gridReact = gridReact)
                                    }
                                />
                            </div>
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
                className="grid-stack-item"
                data-_gridstack_node='{"width":1, "height":1}'
                data-gs-id={this.props.item.id}
            >
                <div className="grid-stack-item-content" style={styleImgDiv}>
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
                            Delete
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}
