module.exports = {
    plugins: [
      // To transform async-await functions for the PROD build
      ['@babel/plugin-transform-runtime', {
        'regenerator': true
      }],
    ],
  }
  