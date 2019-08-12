import React, {Component} from "react";
import firebase from "../../../database/firebase";

import {
    Label,
    TextInput,
    Textarea,
    TagInput,
    Button,
    toaster,
    Pane
} from "evergreen-ui";

export default class EditWineItem extends Component {

    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection("wines");

        this.state = {
            key: "",
            name: "",
            description: "",
            address: "",
            breweryType: "",
            categories: [],
            isLoading: false
        }
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    saveWine = () => {
        const updateRef = firebase.firestore().collection("wines").doc( this.state.key );
        const { name, description, address, breweryType, categories } = this.state;

        if ( name === '' || description === '' ) {
            toaster.danger("Error!", {
                description: 'Name & Description can not be empty'
            });
            return;
        }

        this.setState({
            isLoading: ! this.state.isLoading
        });

        updateRef.set({
            name,
            description,
            address,
            breweryType,
            categories
        }).then( doc => {
            toaster.success("Success!", {
              description: 'Wine item updated successfully'
            });
            this.setState({
                isLoading: ! this.state.isLoading
            });
            // After request has been successfully initiated, set initial timeout
            setTimeout(() => {
                this.props.history.push('/');
            }, 500);
            
        }).catch( error => {
            console.log('Could not edit wine', error );
        });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        const docRef = this.ref.doc( id );

        docRef.get().then( doc => {
            if ( doc && doc.exists ) {
                const wine = doc.data();
                this.setState({
                    key: doc.id,
                    name: wine.name ? wine.name : '',
                    description: wine.description ? wine.description : '',
                    address: wine.address ? wine.address : '',
                    breweryType: wine.breweryType ? wine.breweryType : '',
                    categories: wine.categories ? wine.categories : []
                });
            } else {
                console.log("No such document!");
            }
        } ).catch( error => {
            console.log( 'Could not get the Doc', error );
        } );
    }

    render() {
        const {name, description, address, breweryType, categories} = this.state;

        return (
            <Pane background="transparent" padding={24} maxWidth={800} margin={"auto"}>
                <Label htmlFor="name" display="block">
                    Wine Label
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
                    value={description}
                    onChange={this.onChange}
                    marginBottom={10}
                />

                <Label htmlFor="address" marginBottom={4} display="block">
                    address
                </Label>
                <TextInput
                    id="address"
                    name="address"
                    placeholder="Enter Wine Address..."
                    value={address}
                    onChange={this.onChange}
                    marginBottom={10}
                />

                <Label htmlFor="type" marginBottom={4} display="block">
                    Type
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
                      this.setState({ categories: [...this.state.categories, value.toString()] });
                    }}
                    onRemove={(_value, index) => {
                      this.setState({
                        categories: this.state.categories.filter((_, i) => i !== index)
                      });
                    }}
                    marginBottom={20}
                />

                <div>
                <Button
                    onClick={this.saveWine}
                    isLoading={this.state.isLoading}
                    iconBefore="download">Save Wine</Button>
                </div>
            </Pane>
        );
    }
}
