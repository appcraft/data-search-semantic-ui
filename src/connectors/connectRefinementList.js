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
        isRefined: refinedValues.indexOf(item.value) != -1
      }))
      const items = orderBy(values, 'count', 'desc')

      return {
        ...otherProps,
        items,
        refine(value) {
          searchManager.refine(field, value)
        }
      }
    }
  })
} 