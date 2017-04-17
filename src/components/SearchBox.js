import React from 'react'
import connectQuery from '../connectors/connectQuery'
import { Input } from 'semantic-ui-react'

const Searchbox = connectQuery(({query, onChange}) => (
  <Input icon='search' iconPosition="left" 
      placeholder='Search...' 
      value={query}
      onChange={(e) => onChange(e.target.value)} />
))

export default Searchbox