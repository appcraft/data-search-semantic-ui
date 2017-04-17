import React, {PureComponent} from 'react'
import {Menu, Label } from 'semantic-ui-react'
import connectRefinementList from '../connectors/connectRefinementList'

class RefinementListFilter extends PureComponent {
  constructor(props){
    super(props)
    
    this.state = {
      showMore: false
    }

    this.toggleShowMore = e => this.setState({ showMore: !this.state.showMore })
    this.handleItemClick = (e, {name}) => this.props.refine(name)
  }
  
  render(){
    const { items, refine, title, maxSize=5 } = this.props
    const { showMore } = this.state
    const itemsToDisplay = items.slice(0, showMore ? maxSize*2 : maxSize)
    return (
      <Menu.Item>
        <Menu.Header>{title}</Menu.Header>

        <Menu.Menu>
          {itemsToDisplay.map(({value, label, count, isRefined}) => (
            <Menu.Item key={value} name={value} active={isRefined} onClick={this.handleItemClick}>
              <Label color={isRefined ? 'teal' : undefined}>{count}</Label>{label}
            </Menu.Item>
          ))}
          {(items.length > itemsToDisplay.length || showMore) && (
            <Menu.Item color="blue" active onClick={this.toggleShowMore} style={{textAlign: 'right'}}>
              {showMore ? 'Show less' : 'Show more'}
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu.Item>
    )
  }
}

const connectedRefinementListFilter = connectRefinementList(RefinementListFilter)

export default connectedRefinementListFilter