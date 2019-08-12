import React, { Component } from "react";

import { Link } from 'react-router-dom';

// evergreen ui components
import { Pane, Heading } from "evergreen-ui";

export default class HeaderTitle extends Component {
  render() {
    const { title } = this.props;

    return (
      <Pane flex={1} alignItems="center" display="flex">
        <Heading size={600}>
        <Link to={"/"}>{title}</Link>
        </Heading>
      </Pane>
    );
  }
}
