import React, { Component } from "react";

import { Table } from "evergreen-ui";
import WineItem from './WineItem';

export default class WineTable extends Component {
  render() {
    const winesList = this.props.winesList;

    return (
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Name</Table.TextHeaderCell>
          <Table.TextHeaderCell>Brewery Type</Table.TextHeaderCell>
          <Table.TextHeaderCell>Address</Table.TextHeaderCell>
          <Table.TextHeaderCell>Categories</Table.TextHeaderCell>
          <Table.TextHeaderCell>Description</Table.TextHeaderCell>
          <Table.TextHeaderCell>Action</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {winesList.map(wine => (
            <WineItem key={wine.key} wine={wine}/>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
