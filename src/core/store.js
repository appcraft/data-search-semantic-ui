// From https://github.com/algolia/react-instantsearch

export default function createStore(initialState){
  let state = initialState
  const listeners = []

  function dispatch(){
    for(var listener of listeners){
      listener()
    }
  }

  return {
    getState() {
      return state
    },

    setState(nextState){
      state = nextState
      console.log("new state", state)
      dispatch()
    },
    subscribe(listener) {
      listeners.push(listener);
      return function unsubcribe() {
        listeners.splice(listeners.indexOf(listener), 1)
      }
    },
  }
}


