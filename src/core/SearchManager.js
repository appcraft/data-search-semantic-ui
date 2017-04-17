import createStore from './store'
import filter from '../utils/filter'

function filterKey(data, key, value){
  console.log("filter", key, value)
  if (!value || value.length === 0) return data
  if (Array.isArray(value)){
    return data.filter(entry => {
      const entryValue = entry[key]
      return value.indexOf(entryValue) != -1
    })
  } else {
    return data.filter(entry => {
      const entryValue = entry[key]
      return value === entryValue
    })
  }
}

function computeResults(data, {query, queryFields, filters}){
  console.log("computeResults", filters)
  let filteredData = data
  for(var key in filters){
    const values = filters[key]
    filteredData = filterKey(filteredData, key, values)
  }
  filteredData = filter(filteredData, queryFields, query)
  console.log("=> ", filteredData)
  return filteredData
}

export default class SearchManager {
  constructor(data){
    this.store = createStore({
      data,
      results: data,
      query: '',
      filters: {}
    })
  }

  getResults(){
    return this.store.getState().results
  }

  getFilter(field){
    return this.store.getState().filters[field] || []
  }

  getQuery(){
    return this.store.getState().query
  }

  setQuery(query, queryFields){
    console.log("query", query, queryFields)
    const state = this.store.getState()
    let filters = state.filters || {}

    this.store.setState({
      ...state,
      query, queryFields,
      results: computeResults(state.data, {
        query, queryFields, filters
      })
    })
  }

  refine(field, value){
    console.log("refine", field, value)
    const state = this.store.getState()
    let filters = state.filters || {}
    let values
    if (field in filters){
      values = [...filters[field]]
      const index = values.indexOf(value)
      if(index !== -1) {
          values.splice(index, 1);
      } else {
          values.push(value);
      }
    } else {
      values = [value]
    }
    console.log("new filter values", values)
    filters = {
      ...filters,
      [field]: values
    }
    this.store.setState({
      ...state,
      filters,
      results: computeResults(state.data, {
        query: state.query, 
        queryFields: state.queryFields, 
        filters
      })
    })
  }
}