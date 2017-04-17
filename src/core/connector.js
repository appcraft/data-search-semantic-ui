import React, { Component } from "react"
import PropTypes from 'prop-types'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'UnknownComponent';
}

export default function connectSearch(ComponentToWrap, options) {
  class SearchComponent extends Component {

    constructor(props, context){
      super(props, context)


      const { searchManager } = context

      this.unsubscribe = searchManager.store.subscribe(() => {
        this.setState({
          results: searchManager.getResults()
        })
      })

      this.state = {
        results: searchManager.getResults()
      }
    }

    componentWillUnmount(){
      this.unsubscribe()
    }

    render() {
      const { searchManager } = this.context
      const { results } = this.state

      const generatedProps = options.provideProps(this.props, searchManager, results)
      
      return (
        <ComponentToWrap {...this.props} {...generatedProps} />
      )
    }
  }

  
  SearchComponent.displayName = `${options.displayName}(${getDisplayName(ComponentToWrap)})`

  // on définit ce qu'on veut consommer du `context`
  SearchComponent.contextTypes = {
    searchManager: PropTypes.object.isRequired,
  }

  // on retourne notre wrapper
  return SearchComponent
}