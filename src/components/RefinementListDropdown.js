import React, {PureComponent} from 'react'
import { filter, getKeyValues } from '../utils'
import orderBy from 'lodash/orderBy'
import {Dropdown, Input, Header, Checkbox } from 'semantic-ui-react'
import connectRefinementList from '../connectors/connectRefinementList'

function noop() {
  console.log("noop")
}

class RefinementListDropdown extends PureComponent {
  constructor(props){
    super(props)
    
    this.state = {
      search: ""
    }

    this.handleSearchChange = e => this.setState({ search: e.target.value })
    this.handleClose = e => this.setState({ search: "" })
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(e, { name }){
    e.stopPropagation()
    this.props.refine(name)
  }
  
  render(){
    const { items, refine, title, maxSize=5 } = this.props
    const { search } = this.state
    const itemsToDisplay = filter(items, ["label"], search).slice(0,maxSize)

    return (
      <Dropdown text={title} 
                item
                onClose={this.handleClose}
                onLabelClick={this.handleLabelClick}
                onChange={this.handleChange}>
        <Dropdown.Menu>
          <Input icon='search' iconPosition='left' 
                 placeholder='Search...' 
                 value={search}
                 onClick={e => e.stopPropagation()}
                 onChange={this.handleSearchChange} />
          <Dropdown.Divider />
          <Header>{itemsToDisplay.length} of {items.length} values</Header>
          {itemsToDisplay.map(({value, label, count, isRefined}) => (
            <Dropdown.Item key={value} name={value} onClick={this.handleItemClick} active={isRefined}>
              {label} ({count})
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const connectedRefinementListDropdown = connectRefinementList(RefinementListDropdown)

export default connectedRefinementListDropdown
