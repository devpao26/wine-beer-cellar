import React, {Component} from "react";
import firebase from "../../../database/firebase";

import {Link} from 'react-router-dom';

// evergreen ui components
import {
    Table,
    IconButton,
    toaster
} from "evergreen-ui";

export default class WineItem extends Component {

    delete = (e) => {
        let result = window.confirm('Are you sure you want to delete this item?');

        if (result) {
            firebase.firestore().collection('wines').doc( e ).delete().then(() => {
                // Success Response 
            toaster.success("Success!", {
                description: 'Wine has been deleted  successfully',
                duration: 10
            });

            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    }

    render() {
        const {wine} = this.props;

        let categories;
        if (typeof wine.categories !== 'undefined' && wine.categories.length > 0) {
            categories = wine.categories.join(", ");
        }

        return (
            <Table.Row key={wine.key}>
                <Table.TextCell>{wine.name}</Table.TextCell>
                <Table.TextCell>{wine.breweryType}</Table.TextCell>
                <Table.TextCell>{wine.address}</Table.TextCell>
                <Table.TextCell>{categories}</Table.TextCell>
                <Table.TextCell>{wine.description}</Table.TextCell>
                <Table.TextCell>
                    <Link to={`/wine/${wine.key}`}>
                        <IconButton
                            appearance="minimal"
                            height={24}
                            icon="eye-open"
                            iconSize={14}
                            float="left"
                        />
                    </Link>
                    <Link to={`/edit/${wine.key}`}>
                        <IconButton
                            appearance="minimal"
                            height={24}
                            icon="edit"
                            iconSize={14}
                            float="left"
                        />
                    </Link>
                    <IconButton
                        appearance="minimal"
                        height={24}
                        icon="trash"
                        intent="danger"
                        iconSize={14}
                        float="left"
                        onClick={this.delete.bind(this, wine.key)}
                    />
                </Table.TextCell>
            </Table.Row>
        );
    }
}
