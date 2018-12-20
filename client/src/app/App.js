import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import $ from "jquery";
import "./jquery-global.js";

import "gridstack/dist/gridstack";
import "gridstack/dist/gridstack.jQueryUI";
import "gridstack/dist/gridstack.css";
import "gridstack/dist/gridstack-extra.css";
import "./App.css";
import "./grid.scss";
import ReactDOMServer from "react-dom/server";
import dogImage from "./dog.jpg";
import livingImage from "./living-room.jpg";
//require("jquery-ui-touch-punch");

// import "jquery-ui-dist/jquery-ui";
//import "jquery-ui/ui/widgets/mouse";
// window.jQuery = $;
// window.$ = $;
import "jquery-ui-touch-punch/jquery.ui.touch-punch";
//import "jquery.ui.touch/jquery.ui.touch";

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
    backgroundSize: "cover",
    backgroundSize: "100% 100%"
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

        this.onAddSidebar = this.onAddSidebar.bind(this);
    }

    // Load grid items
    loadGrid() {
        this.$gridReact1 = $(this.gridReact).data("gridstack");
        const items = this.state.itemsGrid;
        items.forEach(item => {
            // const widget = ReactDOMServer.renderToStaticMarkup(
            //     <ItemGrid
            //         item={item}
            //         minWidth="1"
            //         maxWidth="4"
            //         minHeight="1"
            //         maxHeight="4"
            //     />
            // );

            // this.$gridReact.append(widget);
            // const grid = this.$gridReact.data("gridstack");
            // grid.makeWidget(document.getElementById(item.id));
            const styleInside =
                "background-image:url(/static/media/dog.35c8b035.jpg);background-size:100% 100%;background-repeat:no-repeat;object-fit:cover";
            this.$gridReact1.addWidget(
                $(
                    `<div id="${
                        item.id
                    }"><div class="grid-stack-item-content" style="${styleInside}"><p><a href="javascript:void(0);" class="removeItemGrid">Remove Grid</a></p><p>${
                        item.name
                    }</p><p><a href="javascript:void(0);" class="deleteItemSidebar">Delete Sidebar</a></p></div></div>`
                ),
                item.x,
                item.y,
                item.width,
                item.height,
                false,
                1,
                4,
                1,
                4,
                item.id
            );
        }, this.$gridReact1);
    }

    // Load sidebar items
    loadSidebar() {
        // Load state
        const itemsSidebar = [...this.state.itemsSidebar];
        const items = itemsSidebar.map(item => {
            return ReactDOMServer.renderToStaticMarkup(
                <ItemGrid
                    item={item}
                    minWidth="1"
                    maxWidth="4"
                    minHeight="1"
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
    }

    // event drag drop from sidebar to grid
    dragSidebar() {
        this.$sidebarReact = $(this.sidebarReact);
        this.$sidebarReact.children().draggable({
            revert: "invalid",
            handle: ".grid-stack-item-content",
            scroll: false,
            appendTo: "body",
            start: a => {
                $("#sidebar").removeClass("sidebar-scroll");
                $("#" + a.target.id).attr("data-gs-width", 1);
                //   console.log("teste");
            },
            stop: a => {
                $("#sidebar").addClass("sidebar-scroll");
                //  $("#" + a.target.id).attr("data-gs-width", 1);
            },
            drag: a => {
                console.log(a.target.id);
                $("#" + a.target.id).attr("data-gs-width", 1);
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
            cellHeight: 60,
            alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        });
        //    $(".grid-stack").addTouch();
        // $(".sidebar").addTouch();
        // $(".grid-stack").css("touch-action", "none");
        let numberOfRows = 6;

        let minHeight = numberOfRows * 60 + (numberOfRows - 1) * 20;
        $("#grid1").css({ "min-height": minHeight });

        this.loadGrid();
        this.loadSidebar();

        this.$gridReact.on("dragstart", function(event, ui) {
            var grid = this;
            var element = event.target;
            console.log("dragstart");
        });

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

        $(".grid-stack").on("dragstart", function(event, ui) {
            var grid = this;
            var element = event.target;
            console.log(element);
        });
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
    onChange(e, items) {
        if (items === undefined) {
            return false;
        }
        console.log("change");
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
        //$("#" + id).attr("data-gs-width", 1);
    }

    // From sidebar to grid
    onAddGridFromSidebar(e, items) {
        console.log("add-grid");
        const id = items[0].el[0].id;
        const itemsSidebar = [...this.state.itemsSidebar];

        const index = itemsSidebar.map(item => item.id).indexOf(id);

        console.log("index", index);
        const itemGrid = itemsSidebar[index];

        console.log("itemGrid", itemGrid);
        itemsSidebar.splice(index, 1);

        this.setState(prevState => ({
            itemsSidebar,
            itemsGrid: [...prevState.itemsGrid, itemGrid]
        }));

        //  $("#" + id).attr("data-gs-width", 1);
    }

    // From grid to sidebar
    onRemoveItemGrid(e) {
        console.log(e);
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
                    <nav className="navbar navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">
                            Drag drop from sidebar
                        </a>
                    </nav>
                </header>

                <div className="container-fluid" id="content">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-3 col-lg-2 bg-warning px-0">
                            {/* Sidebar */}

                            <button
                                type="button"
                                className="btn btn-primary btn-block green"
                                onClick={this.onAddSidebar}
                            >
                                Add Photo
                            </button>
                            {/* <div id="nav"> */}
                            <div
                                className="sidebar sidebar-scroll"
                                id="sidebar"
                                ref={sidebarReact =>
                                    (this.sidebarReact = sidebarReact)
                                }
                            />
                            {/* </div> */}
                        </div>

                        <div
                            id="render"
                            className="col-xs-12 col-sm-12 col-md-9 col-lg-10"
                            style={fullImg}
                        >
                            {/* Grid */}
                            <div
                                className="grid-stack grid-stack-4"
                                id="grid1"
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
                className="grid-stack-item"
                //className="grid-stack-item ui-draggable"
                // data-gs-id={this.props.item.id}
                // data-gs-x={this.props.item.x}
                // data-gs-y={this.props.item.y}
                // data-gs-width="1"

                // data-gs-height={this.props.item.height}
                // data-gs-min-width={this.props.minWidth}
                // data-gs-max-width={this.props.maxWidth}
                // data-gs-min-height={this.props.minHeight}
                // data-gs-max-height={this.props.maxHeight}
                // data-gs-auto-position="0"
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
