import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
// evergreen ui components
import { Pane, Button } from "evergreen-ui";

class HeaderMenu extends Component {
  // Go back one page
  goBackPreviousPage = () => {
    this.props.history.goBack();
  }
  
  render() {
    return (
      <Pane>
        <Button
          marginRight={12}
          iconBefore="arrow-left"
          height={28}
          onClick={() => { this.goBackPreviousPage() }}> 
            Back to Previous Page
        </Button>
        <Link to="/create/">
          <Button iconBefore="add" height={28}>
              Add Wine
          </Button>
          </Link>
      </Pane>
    );
  }
}
export default withRouter(HeaderMenu);
