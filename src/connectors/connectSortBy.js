import connectSearch from '../core/connector'
import { getKeyValues } from '../utils'
import orderBy from 'lodash/orderBy'

export default function connectSortBy(ComponentToWrap) {
  return connectSearch(ComponentToWrap, {
    displayName: 'SortBy',
    provideProps(props, searchManager, results) {
      const { items, defaultValue, ...otherProps } = props
      const order = searchManager.getSortBy() || defaultValue
      const values = items.map(item => ({
        ...item,
        active: order === item.value
      }))

      return {
        ...otherProps,
        items: values,
        apply(value) {
          searchManager.sortBy(value)
        }
      }
    }
  })
} 