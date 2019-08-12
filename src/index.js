import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import components
import App from "./App";
import EditWine from "./Containers/WineDashboard/EditWine/EditWineItem";
import CreateWine from "./Containers/WineDashboard/CreateWine";
import SingleWine from "./Containers/WineDashboard/SingleWine";
import HeaderNavigation from "./Containers/HeaderNavigation";
import WineLists from './Containers/WineDashboard/WineLists';
import './Assets/app.css';

ReactDOM.render(
  <Router>
    <div className="App">
      <HeaderNavigation />
      <Route exact path="/" component={App} />
      <Route path="/wine/:id" component={SingleWine} />
      <Route path="/edit/:id" component={EditWine} />
      <Route path="/create" component={CreateWine} />
      <WineLists />
    </div>
  </Router>,
  document.getElementById("root")
);
