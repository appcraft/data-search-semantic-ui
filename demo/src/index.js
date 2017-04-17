import React, {Component, PureComponent} from 'react'
import {render} from 'react-dom'
import PropTypes from 'prop-types'

import 'semantic-ui-css/semantic.css'
import { Container, Table, Menu } from 'semantic-ui-react'

import { 
  RefinementListDropdown, 
  RefinementListFilter,
  ResultCount,
  ResultTable,
  Searchbox,
} from '../../src/components'

import SearchManager from '../../src/core/SearchManager'

import data from '../../mock/person_100.json'

const ImageCell = ({item, column}) => (
  <Table.Cell style={{padding: 0, height: 50, width: 50}}>
    <img src={item[column.key]} style={{maxHeight: 50, display: 'block'}}/>
  </Table.Cell>
)

const columns = [
  {name: 'Id', key: 'id'},
  {name: 'Avatar', key: 'avatar', cell:ImageCell},
  {name: 'First Name', key: 'first_name'},
  {name: 'Last Name', key: 'last_name'},
  {name: 'Email', key: 'email'},
  {name: 'Gender', key: 'gender'},
  {name: 'Country', key: 'country'},
  {name: 'City', key: 'city'},
]

class Search extends Component {

  constructor(props){
    super(props)

    this.searchManager = new SearchManager(data)
  }

  getChildContext(){
    return {
      searchManager: this.searchManager
    }
  }

  render(){
    return (
      <div>
        <Container fluid style={{padding: '56px 8px 16px 224px'}}>
          <ResultTable columns={columns} />
        </Container>
        <Menu vertical fixed="left" style={{paddingTop: 50}}>
          <RefinementListFilter field="gender" title="Gender" />
          <RefinementListFilter field="country" title="Country" />
          <RefinementListDropdown field="company" title="Company" />
          <RefinementListDropdown field="job" title="Job" />
        </Menu>
        <Menu fixed="top">
          <Menu.Item name='home' header onClick={this.handleItemClick} style={{width: 210}}>Data Search - Semantic UI</Menu.Item>
          <Menu.Item>
            <Searchbox fields={["first_name", "last_name", "country", "city", "company", "job"]} />
          </Menu.Item>
          <Menu.Item style={{width: 160}}>
            <ResultCount />
          </Menu.Item>
          <Menu.Menu position='right'>
            <RefinementListDropdown field="job" title="Job" />
          </Menu.Menu>
        </Menu>
      </div>        
    )
  }
}

Search.childContextTypes = {
  searchManager: PropTypes.object.isRequired,
}

let Demo = React.createClass({
  render() {
    return <Container fluid>
      <Search />
    </Container>
  }
})

render(<Demo/>, document.querySelector('#demo'))
