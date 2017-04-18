import React, {PureComponent} from 'react'
import {Menu, Label } from 'semantic-ui-react'

export default class MenuText extends PureComponent {
  constructor(props){
    super(props)
    this.handleItemClick = (e, {name}) => this.props.apply(name)
  }
  
  render(){
    const { items, apply, title, children, ...props } = this.props
    return (
      <Menu text compact {...props}>
        <Menu.Item header>{title}</Menu.Item>
        {items.map(({value, label, count, active}) => (
          <Menu.Item key={value} name={value} active={active} onClick={this.handleItemClick}>
            {count !== undefined && <Label color={isRefined ? 'teal' : undefined}>{count}</Label>}{label}
          </Menu.Item>
        ))}
        {children}
      </Menu>
    )
  }
}