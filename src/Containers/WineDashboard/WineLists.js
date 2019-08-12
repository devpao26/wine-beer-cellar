import React, { Component } from 'react'
import axios from 'axios';

import {
  Pane, 
  Table,
  Heading,
  toaster
} from 'evergreen-ui';

// Set base url for api calls
let baseURL = 'https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries';

// Used personal account for api test call
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'x-rapidapi-key': 'bdb131c9efmsh5348bcd338df5a6p1d9c47jsn077a963fafba',
  'x-rapidapi-host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
}

export default class WineLists extends Component {
  state = {
    searchQuery: '',
    wines: []
  }
  componentDidMount() {
    try {
      
      axios.get(baseURL).then(res => {
        console.log(res.data)
        this.setState({
          wines: res.data
        })
      })   
    } catch (error) {
      console.error(error)
    }
  }
  // Get Search filters input
  handleSearchWine = value => {
    this.setState({ searchQuery: value });
  };
  // Get search wine keys and create async calls
  handleSearchWineKeys = key => {
    let { searchQuery } = this.state;
    let newArray = [];
    let bodyReq = {
      "query": JSON.stringify(searchQuery)
    }
    if (key.which === 13) {
      console.log('I am entered');
      axios.get('https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search', {
        bodyReq
      }).then(res => {
        const foo = newArray.push(bodyReq)
        const baz = res.data = foo
       console.log(baz, 'sample')
      });
    }
  }

  render() {
    let { wines, searchQuery} = this.state;
    return (
      <Pane maxWidth={800} margin={"auto"}>
      
        <Heading size={600} marginBottom={10} marginTop={10}>Winery Section</Heading>
        <Table>
            <Table.Head>
            <Table.SearchHeaderCell
              id="search-input"
              value={searchQuery}
              onChange={this.handleSearchWine}
              onKeyDown={(e) => { this.handleSearchWineKeys(e) }}
            />
              <Table.TextHeaderCell>
                Brewery Type 
              </Table.TextHeaderCell>
              <Table.TextHeaderCell>
                Address 
              </Table.TextHeaderCell>
              <Table.TextHeaderCell>
                Phone Number
              </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body height={240}>
              {wines.map(wine => (
              <Table.Row key={wine.id} isSelectable onSelect={() => toaster.notify(wine.name, {
                description: `${wine.street}, ${wine.state} ${wine.city} ${wine.postal_code}`
              })}>
                  <Table.TextCell>{wine.name}</Table.TextCell>
                  <Table.TextCell>{wine.brewery_type}</Table.TextCell>
                  <Table.TextCell isNumber>
                    {wine.street}, {wine.state} {wine.city} 
                  </Table.TextCell>
                  <Table.TextCell isNumber>
                    {wine.postal_code}
                </Table.TextCell>
                </Table.Row>
              ))}
            </Table.Body>
        </Table>
        
      </Pane>
    )
  }
}
