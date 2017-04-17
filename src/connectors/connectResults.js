import connectSearch from '../core/connector'
import { getKeyValues } from '../utils'
import orderBy from 'lodash/orderBy'

export default function connectResults(ComponentToWrap) {
  return connectSearch(ComponentToWrap, {
    displayName: 'Results',
    provideProps(props, searchManager, results) {
      return {
        ...props,
        results
      }
    }
  })
} 