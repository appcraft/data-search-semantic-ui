import React from 'react'
import connectResults from '../connectors/connectResults'

function countFor(count){
  if (count === 0) return "No results"
  else if (count === 1) return "1 result"
  else return count + " results"
}

const ResultCount = connectResults(({results}) => (
  <span>{countFor(results.length)}</span>
))

export default ResultCount