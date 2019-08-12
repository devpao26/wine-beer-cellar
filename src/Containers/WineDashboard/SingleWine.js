import React, {Component} from "react";

import firebase from "../../database/firebase";

import {Pane} from "evergreen-ui";
import Loader from "../../Components/Loader";

import SingleWineItem from "./SingleWineItem";

export default class SingleWine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            key: "",
            wine: {}
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection("wines").doc(this.props.match.params.id);
        ref.get().then(doc => {
            if (doc.exists) {
                this.setState({
                    wine: doc.data(),
                    key: doc.id,
                    loading: false
                });
            } else {
                console.log("No wines found!");
            }
        });
    }

    render() {
        const {key, loading, wine} = this.state;
        
        let renderWine;
        if (loading) {
            renderWine = <Loader/>;
        } else {
            renderWine = <SingleWineItem id={key} wine={wine}/>;
        }

        return (
            <Pane background="yellowTint" padding={24} maxWidth={800} margin={"auto"}>
                {renderWine}
            </Pane>
        );
    }
}
