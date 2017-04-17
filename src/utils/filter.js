

function hasWord(item, keys, word){
  if (!keys) keys = Object.keys(item)
  for(var key of keys){
    if (item.hasOwnProperty(key)){
      let value = item[key]
      if (Array.isArray(value)) value = value.join(" ")
      if (typeof value === 'string'){
        const v = value.toLowerCase()
        if (v.indexOf(word) != -1){
          return true
        }
      }
    }
  } 
  return false
}

export default function filter(data, keys, filter){
  if (!filter) return data

  // console.log("filter", data, keys, filter)

  const lowerCaseFilters = filter.toLowerCase().split(" ").filter(s => s && s.length > 0)

  return data.filter(user => {
    for(var filter of lowerCaseFilters){
      if (!hasWord(user, keys, filter)){
        return false
      }
    }
    return true
  })
}