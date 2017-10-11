const {propertyMatcher, urlMatcher} = require('./lib/urlMatcher')
var defaults = require('./lib/excludeProperties')

var reurl = module.exports = (css, excludeProperties, rewriterFn, done)=>{
  if (typeof excludeProperties === 'function') {
    done = rewriterFn
    rewriterFn = excludeProperties
    excludeProperties = []
  }

  defaults = defaults.concat(excludeProperties)

  done(propertyMatcher.replace(css, property=>{
    var propertyName = property.split(':')[0].replace(/^\s+|\s+$/g, '')

    if (defaults.includes(property)){
      return property
    }

    return urlMatcher.replace(property, (urlFunc, justURL)=>{
      return urlFunc.replace(justURL, rewriterFn(justURL))
    })
  }).toString())
}
