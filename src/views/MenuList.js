import React, {PureComponent} from 'react'
import {Menu, Label } from 'semantic-ui-react'

export default class MenuList extends PureComponent {
  constructor(props){
    super(props)
    this.handleItemClick = (e, {name}) => this.props.apply(name)
  }
  
  render(){
    const { items, apply, title, text, children } = this.props
    return (
      <Menu.Item>
        <Menu.Header>{title}</Menu.Header>

        <Menu.Menu>
          {items.map(({value, label, count, active}) => (
            <Menu.Item key={value} name={value} active={active} onClick={this.handleItemClick}>
              {count !== undefined && <Label color={active ? 'teal' : undefined}>{count}</Label>}{label}
            </Menu.Item>
          ))}
          {children}
        </Menu.Menu>
      </Menu.Item>
    )
  }
}