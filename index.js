const {propertyMatcher, urlMatcher} = require('./lib/urlMatcher')
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

  if (urls === null){
    done(css)
    return
  }

  var urlFunc = urls[0]
  var justUrl = urls[1]

  rewriterFn(justUrl, url=>{
    var result = css.replace(new RegExp(quote(justUrl), 'g'), url)
    done(result)
  })
}

// https://stackoverflow.com/questions/16168484/javascript-syntax-error-invalid-regular-expression
function quote(str){
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
}
