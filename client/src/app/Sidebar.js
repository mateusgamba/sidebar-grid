import React, { Component } from "react";

export default class Sidebar extends Component {
    showAlert(id, e) {
        const item = document.getElementById(id);
        if (item.parentElement.id === "sidebar") {
            return false;
        }
        alert("grid");
    }

    deleteImage(id) {
        alert(id);
    }

    render() {
        const { sidebarItems, forwardedRef } = this.props;
        console.log("sidebar", forwardedRef);
        return (
            <div id="sidebar" ref={forwardedRef} style={{ display: "inline" }}>
                {sidebarItems.map(item => {
                    return (
                        <div
                            id={item.id}
                            key={item.id}
                            className="d-inline-block thumbnail m-2 position-relative"
                            onClick={this.showAlert.bind(this, item.id)}
                        >
                            <button
                                className="close"
                                type="button"
                                onClick={this.deleteImage.bind(this, item.id)}
                            >
                                ×
                            </button>
                            <img src={item.img} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
