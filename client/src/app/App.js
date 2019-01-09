import React, { Component } from "react";
import dragula from "react-dragula";
import "dragula/dist/dragula.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./grid.scss";
import $ from "jquery";
import dogImage from "./dog.jpg";
import wineImage from "./wine.jpg";

import Wrapper from "./Wrapper";

export default class App extends Component {
    constructor() {
        super();

        let gridItems = [
            {
                id: "item-5",
                img: dogImage,
                grid: "grid3"
            },
            {
                id: "item-6",
                img:
                    "https://3.bp.blogspot.com/-gA3KvKhA-8w/USVEdAiWi6I/AAAAAAAAA58/btNKJqIkXHc/s320/pieza1.jpg",
                grid: "grid39"
            }
        ];

        let sidebarItems = [
            {
                id: "item-1",
                img: wineImage
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

        this.savegrid = this.savegrid.bind(this);
        this.onList = this.onList.bind(this);

        const data = this.getStorage();

        if (data !== null) {
            sidebarItems = data.sidebarItems;
            gridItems = data.gridItems;
        }

        this.state = {
            sidebarItems,
            gridItems
        };

        //this.sidebar = React.createRef();
        //this.sidebar = null;
        //this.sidebar = "sidebar";
    }

    componentDidMount() {
        // const options = {
        //     isContainer: function(el) {
        //         return false;
        //     },
        //     moves: function(el, source, handle, sibling) {
        //         return true;
        //     },
        //     accepts: function(el, target, source, sibling) {
        //         return (
        //             target.id != "sidebar" &&
        //             document.getElementById(target.id).childElementCount < 1
        //         );
        //     },
        //     invalid: function(el, handle) {
        //         return false;
        //     },
        //     copy: false,
        //     copySortSource: true,
        //     revertOnSpill: false,
        //     removeOnSpill: false,
        //     mirrorContainer: document.body,
        //     allowDraggingContainers: false,
        //     ignoreInputTextSelection: true
        // };
        // const sidebar = this.sidebar;
        // this.drake = dragula([sidebar], options);
    }

    /*
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
            copy: false,
            copySortSource: true,
            revertOnSpill: false,
            removeOnSpill: false,
            mirrorContainer: document.body,
            allowDraggingContainers: false,
            ignoreInputTextSelection: true
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
        const grid14 = this.grid14;
        const grid15 = this.grid15;
        const grid16 = this.grid16;
        const grid17 = this.grid17;
        const grid18 = this.grid18;
        const grid19 = this.grid19;
        const grid20 = this.grid20;
        const grid21 = this.grid21;
        const grid22 = this.grid22;
        const grid23 = this.grid23;
        const grid24 = this.grid24;
        const grid25 = this.grid25;
        const grid26 = this.grid26;
        const grid27 = this.grid27;
        const grid28 = this.grid28;
        const grid29 = this.grid29;
        const grid30 = this.grid30;
        const grid31 = this.grid31;
        const grid32 = this.grid32;
        const grid33 = this.grid33;
        const grid34 = this.grid34;
        const grid35 = this.grid35;
        const grid36 = this.grid36;
        const grid37 = this.grid37;
        const grid38 = this.grid38;
        const grid39 = this.grid39;

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
                grid13,
                grid14,
                grid15,
                grid16,
                grid17,
                grid18,
                grid19,
                grid20,
                grid21,
                grid22,
                grid23,
                grid24,
                grid25,
                grid26,
                grid27,
                grid28,
                grid29,
                grid30,
                grid31,
                grid32,
                grid33,
                grid34,
                grid35,
                grid36,
                grid37,
                grid38,
                grid39
            ],
            options
        );
        drake.on("drag", function(el, source) {
            $(el)
                .children("button")
                .hide();

            $(el).addClass("thumbnail");
        });

        drake.on(
            "drop",
            function(el, target, source, sibling) {
                //  this._onDrop(el, target, source, sibling);

                var img;
                var c = document.getElementById("sidebar").children;
                var novo = [];
                for (var i = 0; i < c.length; i++) {
                    console.log(c[i].id);
                    img = document.getElementById(c[i].id).children[1].src;
                    console.log(img);
                    novo.push({
                        id: c[i].id,
                        img: img
                    });
                }
                console.log("novo", novo);
                this.setState({ teste: novo });
            }.bind(this)
        );

        drake.on("cancel", function(el, target, source) {
            $(el)
                .children("button")
                .show();
        });
        drake.on("dragend", function(el, target, source) {}.bind(this));

        drake.on("over", function(el, target, source) {
            const classes = target.parentElement.className;
            const itemClass = classes.split(" ");
            let position = "";
            for (let i = 0; i < itemClass.length; i++) {
                if (
                    itemClass[i] === "vertical" ||
                    itemClass[i] === "horizontal"
                ) {
                    position = itemClass[i];
                    break;
                }
            }
            console.log(position);
        });
    }

    _onDrop(el, target, source, sibling) {
        const id = el.id;

        // var container = document.getElementById("sidebar");
        // var te = document.getElementById(id);

        // container.removeChild(te);

        $(el).removeClass();
        $(el)
            .children("button")
            .remove();

        if (target !== "") {
            console.log(id);
            const sidebarItems = this.state.sidebarItems;
            const index = sidebarItems.map(item => item.id).indexOf(id);
            const item = sidebarItems[index];
            console.log("item", item);
            console.log("index", index);
            const itemGrid = {
                id: item.id,
                img: item.img,
                grid: target.id
            };
            sidebarItems.splice(index, 1);
            console.log("sidebarItems", sidebarItems);
            console.log("sibling", sibling);

            // var g = document.createElement("span");
            // g.setAttribute("id", id);

            // document.getElementById("sidebar").appendChild(g);

            const gridItems = this.state.gridItems;
            gridItems.push(itemGrid);
            console.log(gridItems);
            // this.savegrid(gridItems);
            //this.setState({ gridItems });
            //   this.savegrid();
            // setTimeout(
            //     function() {
            //         // var container = document.getElementById("sidebar");
            //         // var te = document.getElementById("item-1");

            //         // container.parentNode.removeChild(te);

            //     }.bind(this),
            //     1500
            // );
        }
    }

    */

    updateList(sidebarItems, gridItem) {
        // const sidebarItems = this.state.sidebarItems;
        // const index = sidebarItems.map(item => item.id).indexOf(id);
        // const item = sidebarItems[index];

        // const itemGrid = {
        //     id: item.id,
        //     img: item.img,
        //     grid: target.id
        // };
        // sidebarItems.splice(index, 1);
        // console.log(lista);
        //this.setState({ sidebarItems: sidebarItems });

        this.setState(prevState => ({
            sidebarItems: prevState.sidebarItems.filter(person => {
                return person.id !== sidebarItems;
            }),
            gridItems: [...prevState.gridItems, gridItem]
        }));

        this.saveStorage();
    }

    updateGrid() {
        // this.setState({ gridItems });

        this.saveStorage();
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return true;
    // }

    // componentWillUpdate(props, state) {
    //     console.log(state);
    //     //this.setState({ sidebarItems: state.teste });
    // }

    savegrid(gridItems) {
        // const sidebarItems = this.state.sidebarItems;
        // console.log(sidebarItems);
        //this.setState({ gridItems });
        // var img;
        // var c = document.getElementById("sidebar").children;
        // var novo = [];
        // for (var i = 0; i < c.length; i++) {
        //     console.log(c[i].id);
        //     img = document.getElementById(c[i].id).children[1].src;
        //     console.log(img);
        //     novo.push({
        //         id: c[i].id,
        //         img: img
        //     });
        // }
        // console.log("novo", novo);
        // // this.setState({ sidebarItems: novo });
    }
    addImage() {
        console.log("entro");
        const id = this.charRandom();
        const item = {
            id,
            img: dogImage
        };

        const list = this.state.sidebarItems;
        list.push(item);

        this.setState({ sidebarItems: list });

        this.saveStorage();
    }

    showAlert(id, e) {
        const item = document.getElementById(id);
        if (item.parentElement.id === "sidebar") {
            return false;
        }
        alert("grid");
    }

    getStorage() {
        return global.localStorage
            ? JSON.parse(global.localStorage.getItem("photo-grid"))
            : {};
    }

    saveStorage() {
        const data = {
            sidebarItems: this.state.sidebarItems,
            gridItems: this.state.gridItems
        };
        if (global.localStorage) {
            global.localStorage.setItem("photo-grid", JSON.stringify(data));
        }
    }

    onList() {
        //        console.log("teste");
        console.log("sidebarItems", this.state.sidebarItems);
        console.log("gridItems", this.state.gridItems);
    }

    charRandom() {
        return Math.random()
            .toString(36)
            .slice(2, 4);
    }

    render() {
        const { sidebarItems, gridItems } = this.state;
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

                                <li className="nav-item">
                                    <button
                                        className="btn"
                                        type="button"
                                        onClick={this.onList}
                                    >
                                        List1
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <div className="container-fluid">
                    <Wrapper
                        sidebarItems={sidebarItems}
                        gridItems={gridItems}
                        updateList={this.updateList.bind(this)}
                        updateGrid={this.updateGrid.bind(this)}
                        addImage={this.addImage.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
// const SidebarForwardingRef = React.forwardRef((props, ref) => {
//     return <Sidebar {...props} forwardedRef={ref} />;
// });

// const GridForwardingRef = React.forwardRef((props, ref) => {
//     return <Grid {...props} forwardedRef={ref} />;
// });
