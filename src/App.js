import React, { Component } from "react";

// evergreen ui components
import { Pane } from "evergreen-ui";

import firebase from "./database/firebase";
import WinesTable from "./Containers/WineDashboard/ShowWine/WineTable.js";
import Loader from "./Components/Loader";

class App extends Component {

  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection("wines");
    this.unsubscribe = null;
    this.state = {
      loading: true,
      winesList: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    console.log('collection data')
    const winesList = [];
    querySnapshot.forEach(doc => {
      const { description, address, name, categories, breweryType } = doc.data();
      winesList.push({
        key: doc.id,
        description,
        address,
        name,
        categories,
        breweryType
      });
    });
    this.setState({
      loading: false,
      winesList
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const { loading, winesList } = this.state;

    let ShowTable;
    if (loading) {
      ShowTable = <Loader />;
    } else {
      ShowTable = <WinesTable winesList={winesList} />;
    }

    return (
      <Pane background="yellowTint" padding={24} maxWidth={800} margin={"auto"}>
        {ShowTable}
      </Pane>
    );
  }

}

export default App;
