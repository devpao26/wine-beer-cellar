import React, {Component} from "react";

import firebase from "../../../database/firebase";

// import ui components
import {
    Pane,
    Button,
    Label,
    TextInput,
    Textarea,
    TagInput,
    toaster
} from "evergreen-ui";

export default class CreateWine extends Component {
    constructor() {
        super();

        this.ref = firebase.firestore().collection("wines");
        this.state = {
            name: "",
            description: "",
            address: "",
            breweryType: "",
            categories: []
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    submitForm = (e) => {

        const {name, description, address, breweryType, categories} = this.state;

        if (name === '' || description === '') {
            toaster.danger("Error!", {
                description: 'Name & Description field can not be empty'
            });
            return;
        }

        this.ref.add({
            name,
            description,
            address,
            breweryType,
            categories
        }).then(addedDoc => {
            // Success Response 
            toaster.success("Success!", {
                description: 'Wine has been added successfully',
                duration: 10
            });

            this.setState({
                name: "",
                description: "",
                address: "",
                breweryType: "",
                categories: []
            });
            // After request has been successfully initiated, set initial timeout
            setTimeout(() => {
                this.props.history.push('/');
            }, 500);
        }).catch(error => {
            console.log('Error adding wine', error);
        });
    }

    render() {
        const {name, description, address, breweryType, categories} = this.state;

        return (
            <Pane background="yellowTint" padding={24} maxWidth={800} margin={"auto"}>
                <Label htmlFor="name" display="block">
                    Wine Name
                </Label>
                <TextInput
                    id="name"
                    name="name"
                    placeholder="Enter Wine Name..."
                    value={name}
                    onChange={this.onChange}
                    marginBottom={10}
                />

                <Label htmlFor="description" marginBottom={4} display="block">
                    Description
                </Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter Wine Description..."
                    marginBottom={10}
                    onChange={this.onChange}
                    value={description}
                />

                <Label htmlFor="address" marginBottom={4} display="block">
                    Address
                </Label>
                <TextInput
                    id="address"
                    name="address"
                    placeholder="Enter Wine Address..."
                    value={address}
                    onChange={this.onChange}
                    marginBottom={10}
                />

                <Label htmlFor="breweryType" marginBottom={4} display="block">
                    Brewery Type
                </Label>
                <TextInput
                    id="breweryType"
                    name="breweryType"
                    placeholder="Enter Wine Type..."
                    value={breweryType}
                    onChange={this.onChange}
                    marginBottom={10}
                />

                <Label htmlFor="categories" marginBottom={4} display="block">
                    Categories
                </Label>
                <TagInput
                    id="categories"
                    name="categories"
                    inputProps={{placeholder: "Add Categories..."}}
                    values={categories}
                    onAdd={value => {
                        this.setState({categories: [...this.state.categories, value.toString()]});
                    }}
                    onRemove={(_value, index) => {
                        this.setState({
                            categories: this.state.categories.filter((_, i) => i !== index)
                        });
                    }}
                    marginBottom={20}
                />

                <Button
                    display="block"
                    onClick={this.submitForm}
                >
                    Add Wine
                </Button>
            </Pane>
        );
    }
}
