import React, {Component} from "react";

import {Link} from "react-router-dom";

import {
    Heading,
    Paragraph,
    Badge,
    Strong,
    Button,
} from "evergreen-ui";

export default class SingleWineItem extends Component {

    render() {
        const { id, wine} = this.props;

        let categories;
        if (typeof wine.categories !== 'undefined' && wine.categories.length > 0) {
            categories = wine.categories.join(", ");
        }

        return (
            <div>
                <Heading size={500} marginBottom={10}>
                    {wine.name}
                    {wine.breweryType !== undefined ? (
                        <Badge marginLeft={5} color="blue" isSolid>
                            {wine.breweryType}
                        </Badge>
                    ) : ''}
                </Heading>
                <Paragraph size={500}>
                    {wine.address !== undefined ? (
                        <Strong>Address : {wine.address}</Strong>
                    ) : ''}
                </Paragraph>
                <Paragraph size={500} marginBottom={10}>
                    {categories !== undefined ? (
                        <Strong>Categories : {wine.categories}</Strong>
                    ) : ''}
                </Paragraph>
                <Paragraph size={500} marginBottom={10}>
                    {wine.description !== undefined ? (
                        <Strong>Description : {wine.description}</Strong>
                    ) : ''}
                </Paragraph>

                <Paragraph>
                    <Link to={`/edit/${id}`}>
                        <Button marginRight={10} iconBefore="edit">
                            Edit
                        </Button>
                    </Link>
                </Paragraph>
            </div>
        );
    }
}
