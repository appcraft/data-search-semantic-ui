import connectSearch from '../core/connector'
import { getKeyValues } from '../utils'
import orderBy from 'lodash/orderBy'

export default function connectQuery(ComponentToWrap) {
  return connectSearch(ComponentToWrap, {
    displayName: 'Query',
    provideProps(props, searchManager, results) {
      const { fields, ...otherProps } = props
      return {
        ...otherProps,
        query: searchManager.getQuery(),
        onChange(query) {
          searchManager.setQuery(query, fields)
        }
      }
    }
  })
} 