const { inlineSource } = require('inline-source')

function InlineSourceHtmlWebpackPlugin (options) {
  this.options = options
}

InlineSourceHtmlWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation, options) => {
    compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
      const html = htmlPluginData.html
      inlineSource(html, this.options).then(newHtml => {
        htmlPluginData.html = newHtml
        callback(null, htmlPluginData)
      }).catch(() => {
        callback(null, html)
      })
    })
  })
}

module.exports = InlineSourceHtmlWebpackPlugin
