import React, {PureComponent} from 'react'
import { Table } from 'semantic-ui-react'
import connectResults from '../connectors/connectResults'

const TextCell = ({item, column}) => {
  return <Table.Cell singleLine>{item[column.key]}</Table.Cell>
}

class Row extends PureComponent {
  render(){
    const { columns, item } = this.props
    return (
      <Table.Row>
        {columns.map(col => {
          const Component = col.cell || TextCell
          return <Component key={col.key} item={item} column={col} />
        })}
      </Table.Row>
    )
  }
}

const ResultTable = connectResults(({results, columns}) => {
  if (!columns){
    if (results.length == 0) return null
    
    // No columns, guess them from the results
    columns = Object.keys(results[0]).map(key => ({key, name: key}))
  }
  return (
    <Table celled padded compact>
      <Table.Header>
        <Table.Row>
          {columns.map(col => <Table.HeaderCell key={col.key} singleLine>{col.name}</Table.HeaderCell>)}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {results.map((item, idx) => (<Row key={item.id} item={item} columns={columns} />))}
      </Table.Body>
    </Table>
  )
})

export default ResultTable
