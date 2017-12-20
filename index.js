var csstree = require('css-tree')
var safeEval = require('safe-eval')

module.exports = (src, fn, done) => {

  var ast = csstree.parse(src)
  var urls = []

  csstree.walk(ast, (node) => {
    if (node.type === 'Url') {
      var value = node.value.value

      try {
        value = safeEval(value)
        node.isEval = true
      } catch (e) {
        value = value
      }
      urls.push(value)
    }
  })

  Promise
  .all(urls.map(fn))
  .then(values => {
    csstree.walk(ast, (node) => {
      if (node.type === 'Url') {
        var value = values.shift()
        node.value.value = node.isEval ? "'" + value + "'" : value
      }
    })
    done(csstree.translate(ast))
  })
}
