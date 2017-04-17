
export default function getKeyValues(data, key){
  const valueSet = {}
  const values = []
  for(var entry of data){
    let value = entry[key]
    if (value){
      value = value.trim()
      if (!(value in valueSet)){
        valueSet[value] = {
          label: value,
          value: value,
          count: 1
        }
        values.push(valueSet[value])
      } else {
        valueSet[value].count++
      }
    }
  }
  values.sort()
  return values
}
