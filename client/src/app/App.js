import React, { Component } from "react";
import dragula from "react-dragula";
import "dragula/dist/dragula.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./grid.scss";
import $ from "jquery";
import dogImage from "./dog.jpg";

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

        const sidebarItems = [
            {
                id: "item-1",
                img:
                    "https://3.bp.blogspot.com/-gA3KvKhA-8w/USVEdAiWi6I/AAAAAAAAA58/btNKJqIkXHc/s320/pieza1.jpg"
            },
            {
                id: "item-2",
                img:
                    "https://1.bp.blogspot.com/-daD5d1V4ct4/USVEdAGqdDI/AAAAAAAAA50/XXo8rBlTGpQ/s320/pieza2.jpg"
            },
            {
                id: "item-3",
                img:
                    "https://1.bp.blogspot.com/-8LurPyhzlD4/USVEdAH-KJI/AAAAAAAAA54/INQRSWmH79k/s320/pieza3.jpg"
            },
            {
                id: "item-4",
                img:
                    "https://4.bp.blogspot.com/-2R3yc2Kggvo/USVEd9UUR5I/AAAAAAAAA6A/YBxpgYG15NI/s320/pieza4.jpg"
            }
        ];

        this.state = {
            sidebarItems
        };

        const data = this.getStorage();

        if (data !== null) {
            itemsGrid = data.itemsGrid;
            itemsSidebar = data.itemsSidebar;
        }

        this.state = {
            itemsGrid,
            itemsSidebar,
            sidebarItems
        };

        this.showAlert = this.showAlert.bind(this);

        // this.onAddSidebar = this.onAddSidebar.bind(this);
    }

    componentDidMount() {
        let options = {
            isContainer: function(el) {
                return false;
            },
            moves: function(el, source, handle, sibling) {
                return true;
            },
            accepts: function(el, target, source, sibling) {
                return (
                    target.id != "sidebar" &&
                    document.getElementById(target.id).childElementCount < 1
                );
            },
            invalid: function(el, handle) {
                return false;
            },
            copy: false, // elements are moved by default, not copied
            copySortSource: true, // elements in copy-source containers can be reordered
            revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: false, // spilling will `.remove` the element, if this is true
            mirrorContainer: document.body, // set the element that gets mirror elements appended
            allowDraggingContainers: false, // lets users drag containers themselves as a whole, disabled by default
            ignoreInputTextSelection: true // allows users to select input text, see details below
        };

        const sidebar = this.sidebar;
        const grid1 = this.grid1;
        const grid2 = this.grid2;
        const grid3 = this.grid3;
        const grid4 = this.grid4;
        const grid5 = this.grid5;
        const grid6 = this.grid6;
        const grid7 = this.grid7;
        const grid8 = this.grid8;
        const grid9 = this.grid9;
        const grid10 = this.grid10;
        const grid11 = this.grid11;
        const grid12 = this.grid12;
        const grid13 = this.grid13;

        const drake = dragula(
            [
                sidebar,
                grid1,
                grid2,
                grid3,
                grid4,
                grid5,
                grid6,
                grid7,
                grid8,
                grid9,
                grid10,
                grid11,
                grid12,
                grid13
            ],
            options
        );
        drake.on("drag", function(el, source) {
            console.log(el);
            $(el)
                .children("button")
                .remove();

            $(el).addClass("d-inline-block thumbnail m-2 position-relative");
        });

        drake.on("drop", function(el, target, source, sibling) {
            $(el).removeClass();
            $(el)
                .children("button")
                .remove();
        });
        drake.on("out", function(el, target, source, sibling) {
            $(el).removeClass();
            $(el)
                .children("button")
                .remove();
        });

        drake.on("over", function(el, target, source) {});
    }

    addImage(e) {
        const id = this.charRandom();
        const item = {
            id,
            img: dogImage
        };
        this.setState(prevState => ({
            sidebarItems: [...prevState.sidebarItems, item]
        }));
    }

    showAlert() {
        alert(1);
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
        const { sidebarItems } = this.state;
        return (
            <div>
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
                <div className="container-fluid">
                    <div className="row mt-5">
                        <div className="col-md-4 offset-md-4 text-center flex-box-sizing">
                            <div className="flexcontainer">
                                <div className="vertical">
                                    <div
                                        className="photomask"
                                        id="grid1"
                                        ref={grid1 => (this.grid1 = grid1)}
                                    />
                                </div>
                                <div className="vertical">
                                    <div
                                        className="photomask"
                                        id="grid2"
                                        ref={grid2 => (this.grid2 = grid2)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid3"
                                        ref={grid3 => (this.grid3 = grid3)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid4"
                                        ref={grid4 => (this.grid4 = grid4)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid5"
                                        ref={grid5 => (this.grid5 = grid5)}
                                    />
                                </div>
                                <div className="vertical">
                                    <div
                                        className="photomask"
                                        id="grid6"
                                        ref={grid6 => (this.grid6 = grid6)}
                                    />
                                </div>
                                <div className="vertical">
                                    <div
                                        className="photomask"
                                        id="grid7"
                                        ref={grid7 => (this.grid7 = grid7)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid8"
                                        ref={grid8 => (this.grid8 = grid8)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid9"
                                        ref={grid9 => (this.grid9 = grid9)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid10"
                                        ref={grid10 => (this.grid10 = grid10)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid11"
                                        ref={grid11 => (this.grid11 = grid11)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid12"
                                        ref={grid12 => (this.grid12 = grid12)}
                                    />
                                </div>
                                <div className="horizontal">
                                    <div
                                        className="photomask"
                                        id="grid13"
                                        ref={grid13 => (this.grid13 = grid13)}
                                        onClick={this.showAlert.bind(this)}
                                    />
                                </div>
                            </div>

                            <div className="flexcontainer">
                                <div className="horizontal">
                                    <div className="photomask">
                                        <a
                                            href="javascript:void(0)"
                                            onClick={this.showAlert.bind(this)}
                                        >
                                            <img src="https://placeimg.com/120/80/tech" />
                                        </a>
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/animals" />
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/people" />
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/nature" />
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/any" />
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/tech" />
                                    </div>
                                </div>
                                <div className="vertical">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/tech" />
                                    </div>
                                </div>
                                <div className="vertical">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/nature" />
                                    </div>
                                </div>
                                <div className="vertical">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/nature" />
                                    </div>
                                </div>
                                <div className="vertical">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/nature" />
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/nature" />
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/nature" />
                                    </div>
                                </div>
                                <div className="horizontal">
                                    <div className="photomask">
                                        <img src="https://placeimg.com/120/80/nature" />
                                    </div>
                                </div>
                            </div>

                            <div className="flexcontainer">
                                <div className="horizontal" />
                                <div className="horizontal" />
                                <div className="horizontal" />
                                <div className="vertical" />
                                <div className="vertical" />
                                <div className="horizontal" />
                                <div className="horizontal" />
                                <div className="horizontal" />
                                <div className="horizontal" />
                                <div className="horizontal" />
                                <div className="horizontal" />
                                <div className="vertical" />
                                <div className="vertical" />
                            </div>
                        </div>
                    </div>
                    <div
                        className="fixed-bottom bg-transparent mb-4"
                        style={{
                            height: "7rem"
                        }}
                    >
                        <div className="row ml-5 mr-5 bg-white">
                            <div className="col-lg-1 col-md-1 d-none d-sm-none d-md-block align-self-center text-center">
                                <i
                                    className="fa fa-chevron-left fa-lg"
                                    aria-hidden="true"
                                />
                            </div>
                            <div
                                className="col-md-10"
                                style={{
                                    overflowX: "auto",
                                    overflowY: "hidden",
                                    whiteSpace: "nowrap"
                                }}
                            >
                                <div
                                    className="d-inline-block m-2"
                                    style={{
                                        border: "1px solid black",
                                        padding: "25px 28px 29px 28px"
                                    }}
                                >
                                    <a
                                        href="#"
                                        onClick={this.addImage.bind(this)}
                                    >
                                        add
                                    </a>
                                </div>
                                <div
                                    id="sidebar"
                                    ref={sidebar => (this.sidebar = sidebar)}
                                    style={{ display: "inline" }}
                                >
                                    {sidebarItems.map(item => {
                                        return (
                                            <div
                                                id={item.id}
                                                key={item.id}
                                                className="d-inline-block thumbnail m-2 position-relative"
                                                onClick={this.showAlert}
                                            >
                                                <button
                                                    className="close"
                                                    type="button"
                                                >
                                                    ×
                                                </button>
                                                <img src={item.img} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-md-1 d-none d-sm-none d-md-block align-self-center text-center">
                                <i
                                    className="fa fa-chevron-right fa-lg"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
