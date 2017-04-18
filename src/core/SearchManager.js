import createStore from './store'
import filter from '../utils/filter'
import orderBy from 'lodash/orderBy'

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

function computeResults(data, {query, queryFields, filters, sortBy}){
  console.log("computeResults", filters)
  let filteredData = data
  for(var key in filters){
    const values = filters[key]
    filteredData = filterKey(filteredData, key, values)
  }
  filteredData = filter(filteredData, queryFields, query)
  console.log("=> ", filteredData)

  if (sortBy){
    filteredData = orderBy(filteredData, sortBy)
  }
  return filteredData
}

function toggleFilter(filters={}, key, value){
  let values
  if (key in filters){
    values = [...filters[key]]
    const index = values.indexOf(value)
    if(index !== -1) {
        values.splice(index, 1);
    } else {
        values.push(value);
    }
  } else {
    values = [value]
  }

  return {
    ...filters,
    [key]: values
  }
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

  getSortBy(){
    return this.store.getState().sortBy
  }

  setQuery(query, queryFields){
    console.log("query", query, queryFields)
    const state = this.store.getState()
    let filters = state.filters || {}

    this.store.setState({
      ...state,
      query, queryFields,
      results: computeResults(state.data, {
        query, queryFields, filters, sortBy: state.sortBy
      })
    })
  }

  sortBy(value){
    console.log("sortBy", value)
    const state = this.store.getState()
    const newState = {
      ...state,
      sortBy: value
    }

    this.store.setState({
      ...newState,
      results: computeResults(state.data, newState)
    })
  }

  refine(field, value){
    console.log("refine", field, value)
    const state = this.store.getState()
    const filters = toggleFilter(state.filters, field, value)
    this.store.setState({
      ...state,
      filters,
      results: computeResults(state.data, {
        query: state.query, 
        queryFields: state.queryFields, 
        filters,
        sortBy: state.sortBy,
      })
    })
  }
}