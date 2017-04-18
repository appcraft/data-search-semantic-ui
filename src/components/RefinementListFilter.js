import React, {PureComponent} from 'react'
import {Menu, Label } from 'semantic-ui-react'
import connectRefinementList from '../connectors/connectRefinementList'
import MenuList from '../views/MenuList'

class RefinementListFilter extends PureComponent {
  constructor(props){
    super(props)
    
    this.state = {
      showMore: false
    }

    this.toggleShowMore = e => this.setState({ showMore: !this.state.showMore })
  }
  
  render(){
    const { items, apply, title, maxSize=5 } = this.props
    const { showMore } = this.state
    const itemsToDisplay = items.slice(0, showMore ? maxSize*2 : maxSize)
    return (
      <MenuList
        title={title}
        items={itemsToDisplay}
        apply={apply}>
        {(items.length > itemsToDisplay.length || showMore) && (
          <Menu.Item color="blue" active onClick={this.toggleShowMore} style={{textAlign: 'right'}}>
            {showMore ? 'Show less' : 'Show more'}
          </Menu.Item>
        )}
      </MenuList>
    )
  }
}

const connectedRefinementListFilter = connectRefinementList(RefinementListFilter)

export default connectedRefinementListFilter