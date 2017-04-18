import connectSearch from '../core/connector'
import { getKeyValues } from '../utils'
import orderBy from 'lodash/orderBy'

export default function connectRefinementList(ComponentToWrap) {
  return connectSearch(ComponentToWrap, {
    displayName: 'RefinementList',
    provideProps(props, searchManager, results) {
      const { field, ...otherProps } = props
      const refinedValues = searchManager.getFilter(field)
      const values = getKeyValues(results, field).map(item => ({
        ...item,
        active: refinedValues.indexOf(item.value) != -1
      }))
      const items = orderBy(values, ['count', 'label'], ['desc', 'asc'])

      return {
        ...otherProps,
        items,
        apply(value) {
          searchManager.refine(field, value)
        }
      }
    }
  })
} 