import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
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
                id: 1,
                item: {
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 1,
                    id: "a",
                    name: "Item a"
                }
            },
            {
                id: 2,
                item: {
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 1,
                    id: "b",
                    name: "Item b"
                }
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

        this.optionsGrid = {
            disableOneColumnMode: true,
            height: 1,
            width: 1,
            acceptWidgets: ".grid-stack-item",
            float: true,
            verticalMargin: 20,
            cellHeight: 200,
            alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        };
    }

    setMinHeightGrid() {
        const minHeight =
            this.optionsGrid.height * this.optionsGrid.cellHeight +
            (this.optionsGrid.height - 1) * this.optionsGrid.verticalMargin;
        this.$gridReact1.css({ "min-height": minHeight });
        this.$gridReact2.css({ "min-height": minHeight });
        this.$gridReact3.css({ "min-height": minHeight });
    }

    componentDidMount() {
        // Load element grid
        this.$gridReact1 = $(this.gridReact1);
        this.$gridReact2 = $(this.gridReact2);
        this.$gridReact3 = $(this.gridReact3);

        // Load element sidebar
        this.$sidebarReact = $(this.sidebarReact);

        //build grid
        this.$gridReact1.gridstack(this.optionsGrid);
        this.$gridReact2.gridstack(this.optionsGrid);
        this.$gridReact3.gridstack(this.optionsGrid);
        this.$gridReact1.data("gridstack");
        this.$gridReact2.data("gridstack");
        this.$gridReact3.data("gridstack");

        // Define minHeight grid
        this.setMinHeightGrid();

        this.loadGrid();
        this.loadSidebar();

        this.$gridReact1.on("change", this.onChange.bind(this));
        this.$gridReact1.on("added", this.onAddGridFromSidebar.bind(this));
        this.$gridReact3.on("added", this.onAddGridFromSidebar3.bind(this));
        this.$gridReact1.on(
            "click",
            ".removeItemGrid",
            this.onRemoveItemGrid.bind(this)
        );

        this.$sidebarReact.on(
            "click",
            ".deleteItemSidebar",
            this.onDeleteItemSidebar.bind(this)
        );
        this.$sidebarReact.on("dragstart", this.onDragStartSidebar.bind(this));
    }

    onDragStartSidebar(event, ui) {
        this.$sidebarReact.removeClass("sidebar-scroll");

        // const id = ui.helper[0].id;
        // const elementItem = document.getElementById(id);

        // elementItem.setAttribute(
        //     "data-_gridstack_node",
        //     JSON.stringify({
        //         width: 1,
        //         height: 1
        //     })
        // );
    }

    componentWillUnmount() {
        $(this.gridReact1).off("change", this.onChange.bind(this));
        $(this.gridReact1).off("added", this.onAddGridFromSidebar.bind(this));
        $(this.gridReact1).off(
            "click",
            ".removeItemGrid",
            this.onRemoveItemGrid.bind(this)
        );
        $(this.$sidebarReact).off(
            "click",
            ".deleteItemSidebar",
            this.onDeleteItemSidebar.bind(this)
        );
        // this.$sidebarReact.off("dragstart", this.onDragStartSidebar.bind(this));
    }

    // Load grid items
    loadGrid() {
        let grid,
            item = {},
            itemGrid = {};

        const items = this.state.itemsGrid;

        for (let i = 1; i <= 3; i++) {
            itemGrid = this.getItem(items, i);

            if (itemGrid === null) {
                continue;
            }
            item = itemGrid.item;
            if (itemGrid.id === 1) {
                grid = this.$gridReact1.data("gridstack");
            } else if (itemGrid.id === 2) {
                grid = this.$gridReact2.data("gridstack");
            } else {
                grid = this.$gridReact3.data("gridstack");
            }

            grid.addWidget(
                renderToStaticMarkup(<ItemGrid item={item} />),
                item.x,
                item.y,
                item.width,
                item.height,
                false
            );
        }
    }

    // Load sidebar items
    loadSidebar() {
        // Load state
        const itemsSidebar = this.state.itemsSidebar;

        const items = itemsSidebar.map(item => {
            if (item !== null) {
                return renderToStaticMarkup(<ItemGrid item={item} />);
            }
        });
        // Remove all children of the sidebar
        this.$sidebarReact.children().remove();
        // Load new elements sidebar
        this.$sidebarReact.prepend(items);
        // Re-load sidebar functionalities
        this.dragSidebar();
    }

    // Event drag drop from sidebar to grid
    dragSidebar() {
        var teste = "0";
        this.$sidebarReact.children().draggable({
            revert: "invalid",
            handle: ".grid-stack-item-content",
            scroll: false,
            appendTo: "body"
        });
    }

    // Catch the changes
    // It is necessary it because it can change many box in an unique moving
    onChange(e, items) {
        if (items === undefined) {
            return false;
        }
        //console.log(items);
        // items.forEach(item => {
        //     this.updateItemGrid(item);
        // });
    }

    // updateItemGrid(item) {
    //     const id = item.id === undefined ? item.el[0].id : item.id;

    //     const itemsGrid = this.state.itemsGrid;

    //     const index = itemsGrid
    //         .map(item => {
    //             return item !== null && item !== undefined ? item.id : false;
    //         })
    //         .indexOf(id);
    //     itemsGrid[index].x = item.x;
    //     itemsGrid[index].y = item.y;
    //     itemsGrid[index].width = item.width;
    //     itemsGrid[index].height = item.height;

    //     this.setState({ itemsGrid });

    //     this.saveStorage();
    // }

    // Add item from sidebar to grid
    onAddGridFromSidebar(e, items) {
        const id = items[0].el[0].id;

        this.$sidebarReact.addClass("sidebar-scroll");

        const el = document.getElementById(id);

        if (items[0].y > this.optionsGrid.height - 1) {
            const el = document.getElementById(id);
            this.$gridReact.data("gridstack").removeWidget(el);
            this.loadSidebar();
            return false;
        }

        const itemsSidebar = this.state.itemsSidebar;

        const index = itemsSidebar.map(item => item.id).indexOf(id);
        const itemGrid = { id: 1, item: itemsSidebar[index] };
        itemsSidebar.splice(index, 1);

        this.setState(prevState => ({
            itemsSidebar,
            itemsGrid: [...prevState.itemsGrid, itemGrid]
        }));

        this.loadSidebar();
        this.saveStorage();
    }

    onAddGridFromSidebar3(e, items) {
        const id = items[0].el[0].id;

        console.log(id);
    }

    // Remove item from grid to sidebar
    onRemoveItemGrid(e) {
        console.log("remove");
        const id = e.target.parentElement.parentElement.parentElement.id;

        // Remove item from grid by dom
        const elementItem = document.getElementById(id);
        this.$gridReact1.data("gridstack").removeWidget(elementItem);

        const itemsGrid = this.state.itemsGrid;

        const index = itemsGrid.map(item => item.id).indexOf(1);
        const itemsSidebar = itemsGrid[index].item;
        itemsGrid.splice(index, 1);
        this.setState(prevState => ({
            itemsSidebar: [...prevState.itemsSidebar, itemsSidebar],
            itemsGrid
        }));

        this.loadSidebar();
        this.saveStorage();
    }

    onDeleteItemSidebar(e) {
        const id = e.target.parentElement.parentElement.parentElement.id;
        const itemsSidebar = this.state.itemsSidebar;

        const index = itemsSidebar.map(item => item.id).indexOf(id);
        itemsSidebar.splice(index, 1);

        this.setState({ itemsSidebar });

        this.loadSidebar();
        this.saveStorage();
    }

    onAddSidebar() {
        const id = this.charRandom();
        const item = { id, name: `Drag ${id}` };
        const itemsSidebar = [...this.state.itemsSidebar, item];
        this.setState({ itemsSidebar });

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

    getItem(items, id) {
        const index = items.map(item => item.id).indexOf(id);
        return index > -1 ? items[index] : null;
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
                            className="col-xs-12 col-sm-12 col-md-9 col-lg-10"
                            style={fullImg}
                        >
                            {/* Grid */}
                            <div className="row">
                                <div className="col-md-2 offset-md-4">
                                    <div className="row">
                                        <div
                                            className="col-md-6"
                                            style={{
                                                border: "1px solid black",
                                                padding: 0
                                            }}
                                        >
                                            <div
                                                className="grid-stack grid-stack-1 photo-portrait"
                                                ref={gridReact1 =>
                                                    (this.gridReact1 = gridReact1)
                                                }
                                                id="grid1"
                                            />
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={{
                                                border: "1px solid black",
                                                padding: 0
                                            }}
                                        >
                                            <div
                                                className="grid-stack grid-stack-1 photo-portrait"
                                                id="grid2"
                                                ref={gridReact2 =>
                                                    (this.gridReact2 = gridReact2)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div
                                            className="col-md-12"
                                            style={{
                                                border: "1px solid black"
                                            }}
                                        >
                                            <div
                                                className="grid-stack grid-stack-1 photo-landscape"
                                                id="grid3"
                                                ref={gridReact3 =>
                                                    (this.gridReact3 = gridReact3)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
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
