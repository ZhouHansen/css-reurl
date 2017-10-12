const {propertyMatcher, urlMatcher} = require('./lib/urlMatcher')
const fs = require('fs')
var defaults = require('./lib/excludeProperties')

var reurl = module.exports = function (css, excludeProperties, rewriterFn, done){
  if (typeof excludeProperties === 'function') {
    done = rewriterFn
    rewriterFn = excludeProperties
    excludeProperties = []
  }

  defaults = defaults.concat(excludeProperties)

  css = css.toString()

  var properties = propertyMatcher.exec(css)

  if (properties === null){
    done(css)
    return
  }

  var property = properties[0]

  var propertyName = property.split(':')[0].replace(/^\s+|\s+$/g, '')

  if (defaults.includes(propertyName)){
    return property
  }

  var urls = urlMatcher.exec(property)
  var urlFunc = urls[0]
  var justUrl = urls[1]

  rewriterFn(justUrl, url=>{
    var result = css.replace(new RegExp(justUrl, 'g'), url)
    done(result)
  })
}
