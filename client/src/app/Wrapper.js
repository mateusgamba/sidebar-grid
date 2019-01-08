import React, { Component } from "react";
import $ from "jquery";
import dragula from "react-dragula";
import "dragula/dist/dragula.css";
import "bootstrap/dist/css/bootstrap.css";
import dogImage from "./dog.jpg";
import wineImage from "./wine.jpg";

export default class Wrapper extends Component {
    constructor(props) {
        super(props);
        // let gridItems = [
        //     {
        //         id: "item-5",
        //         img: dogImage,
        //         grid: "grid3"
        //     },
        //     {
        //         id: "item-6",
        //         img:
        //             "https://3.bp.blogspot.com/-gA3KvKhA-8w/USVEdAiWi6I/AAAAAAAAA58/btNKJqIkXHc/s320/pieza1.jpg",
        //         grid: "grid39"
        //     }
        // ];

        // const sidebarItems = [
        //     {
        //         id: "item-1",
        //         img: wineImage
        //     },
        //     {
        //         id: "item-2",
        //         img:
        //             "https://1.bp.blogspot.com/-daD5d1V4ct4/USVEdAGqdDI/AAAAAAAAA50/XXo8rBlTGpQ/s320/pieza2.jpg"
        //     },
        //     {
        //         id: "item-3",
        //         img:
        //             "https://1.bp.blogspot.com/-8LurPyhzlD4/USVEdAH-KJI/AAAAAAAAA54/INQRSWmH79k/s320/pieza3.jpg"
        //     },
        //     {
        //         id: "item-4",
        //         img:
        //             "https://4.bp.blogspot.com/-2R3yc2Kggvo/USVEd9UUR5I/AAAAAAAAA6A/YBxpgYG15NI/s320/pieza4.jpg"
        //     }
        // ];

        this.state = {
            sidebarItems: this.props.sidebarItems,
            gridItems: this.props.gridItems,
            teste: []
        };
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

    showAlert(id, e) {
        const item = document.getElementById(id);
        if (item.parentElement.id === "sidebar") {
            return false;
        }
        alert("grid");
    }
    deleteImage() {
        return false;
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
                    img = document.getElementById(c[i].id).children[1].src;

                    novo.push({
                        id: c[i].id,
                        img: img
                    });
                }

                this.setState({ teste: novo });

                this.props.updateList(novo);
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
            const sidebarItems = this.state.sidebarItems;
            const index = sidebarItems.map(item => item.id).indexOf(id);
            const item = sidebarItems[index];

            const itemGrid = {
                id: item.id,
                img: item.img,
                grid: target.id
            };
            sidebarItems.splice(index, 1);

            // var g = document.createElement("span");
            // g.setAttribute("id", id);

            // document.getElementById("sidebar").appendChild(g);

            const gridItems = this.state.gridItems;
            gridItems.push(itemGrid);

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

    render() {
        const { sidebarItems, gridItems } = this.state;
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-4 offset-md-4 text-center flex-box-sizing">
                        <div className="flexcontainer">
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid1"
                                ref={grid1 => (this.grid1 = grid1)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid2"
                                ref={grid2 => (this.grid2 = grid2)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid3"
                                ref={grid3 => (this.grid3 = grid3)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid4"
                                ref={grid4 => (this.grid4 = grid4)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid5"
                                ref={grid5 => (this.grid5 = grid5)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid6"
                                ref={grid6 => (this.grid6 = grid6)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid7"
                                ref={grid7 => (this.grid7 = grid7)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid8"
                                ref={grid8 => (this.grid8 = grid8)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid9"
                                ref={grid9 => (this.grid9 = grid9)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid10"
                                ref={grid10 => (this.grid10 = grid10)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid11"
                                ref={grid11 => (this.grid11 = grid11)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid12"
                                ref={grid12 => (this.grid12 = grid12)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid13"
                                ref={grid13 => (this.grid13 = grid13)}
                                gridItems={gridItems}
                            />
                        </div>

                        <div className="flexcontainer">
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid14"
                                ref={grid14 => (this.grid14 = grid14)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid15"
                                ref={grid15 => (this.grid15 = grid15)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid16"
                                ref={grid16 => (this.grid16 = grid16)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid17"
                                ref={grid17 => (this.grid17 = grid17)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid18"
                                ref={grid18 => (this.grid18 = grid18)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid19"
                                ref={grid19 => (this.grid19 = grid19)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid20"
                                ref={grid20 => (this.grid20 = grid20)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid21"
                                ref={grid21 => (this.grid21 = grid21)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid22"
                                ref={grid22 => (this.grid22 = grid22)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid23"
                                ref={grid23 => (this.grid23 = grid23)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid24"
                                ref={grid24 => (this.grid24 = grid24)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid25"
                                ref={grid25 => (this.grid25 = grid25)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid26"
                                ref={grid26 => (this.grid26 = grid26)}
                                gridItems={gridItems}
                            />
                        </div>

                        <div className="flexcontainer">
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid27"
                                ref={grid27 => (this.grid27 = grid27)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid28"
                                ref={grid28 => (this.grid28 = grid28)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid29"
                                ref={grid29 => (this.grid29 = grid29)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid30"
                                ref={grid30 => (this.grid30 = grid30)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid31"
                                ref={grid31 => (this.grid31 = grid31)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid32"
                                ref={grid32 => (this.grid32 = grid32)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid33"
                                ref={grid33 => (this.grid33 = grid33)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid34"
                                ref={grid34 => (this.grid34 = grid34)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid35"
                                ref={grid35 => (this.grid35 = grid35)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid36"
                                ref={grid36 => (this.grid36 = grid36)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="horizontal"
                                id="grid37"
                                ref={grid37 => (this.grid37 = grid37)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid38"
                                ref={grid38 => (this.grid38 = grid38)}
                                gridItems={gridItems}
                            />
                            <ItemGridForwardingRef
                                orientation="vertical"
                                id="grid39"
                                ref={grid39 => (this.grid39 = grid39)}
                                gridItems={gridItems}
                            />
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
                                <a href="#" onClick={this.addImage.bind(this)}>
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
                                            onClick={this.showAlert.bind(
                                                this,
                                                item.id
                                            )}
                                        >
                                            <button
                                                className="close"
                                                type="button"
                                                onClick={this.deleteImage.bind(
                                                    this,
                                                    item.id
                                                )}
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
        );
    }
}

const ItemGridForwardingRef = React.forwardRef((props, ref) => {
    return <ItemGrid {...props} forwardedRef={ref} />;
});

class ItemGrid extends Component {
    showAlertItem(id, e) {
        const item = document.getElementById(id);
        if (item.parentElement.id === "sidebar") {
            return false;
        }
        alert("grid item");
    }

    render() {
        const { gridItems, orientation, forwardedRef, id } = this.props;

        return (
            <div className={orientation}>
                <div className="photomask" id={id} ref={forwardedRef}>
                    {gridItems.map(item => {
                        if (item.grid === id) {
                            return (
                                <div
                                    id={item.id}
                                    key={item.id}
                                    onClick={this.showAlertItem.bind(
                                        this,
                                        item.id
                                    )}
                                >
                                    <img src={item.img} />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}
