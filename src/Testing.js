import React, { Component } from "react";
import { Tab, Form, Grid, Table, Segment, Header } from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

class Testing extends Component {
    defaultState = {
        tickets: [],
        panes: []
    };

    constructor(props) {
        super(props);
        this.state = { ...this.defaultState };
    }

    render() {
        const { panes } = this.state;
        return (
            <div>
                <div style={{float: "left"}}>
                    <label>test</label>
                </div>
                <div style={{float: "right"}}>
                    <label>test</label>
                </div>
            </div>
        );
    }
}

export default Testing;
