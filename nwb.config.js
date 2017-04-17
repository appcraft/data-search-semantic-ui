module.exports = {
  type: 'react-component',
  build: {
    externals: {
      'react': 'React'
    },
    global: 'DataSearchSemantic',
    jsNext: true,
    umd: true
  }
}
