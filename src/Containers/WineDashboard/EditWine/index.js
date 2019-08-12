import React, { Component } from 'react';

import EditWineItem from './EditWineItem';

import { Pane } from 'evergreen-ui';

export default class EditWine extends Component {

    render() {
        const { id } = this.props.match.params;
        
        return( 
            <Pane background="yellowTint" padding={24} maxWidth={800} margin={"auto"}>
                <EditWineItem id={id} />
            </Pane>
        )
    }
}