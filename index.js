var csstree = require('css-tree')
var safeEval = require('safe-eval')
var assert = require('assert')

module.exports = (src, fn, done) => {
  assert.ok(typeof src === 'string' || Buffer.isBuffer(src) , 'css-reurl: src should be type string or buffer')
  assert.equal(typeof fn, 'function', 'css-reurl: fn should be type function')
  assert.equal(typeof done, 'function', 'css-reurl: done should be type function')

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
