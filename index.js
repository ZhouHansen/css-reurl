var reurl = module.exports = function (css, excludeProperties, rewriterFn, done){
  if (typeof excludeProperties === 'function') {
    done = rewriterFn
    rewriterFn = excludeProperties
    excludeProperties = []
  }

  // not define a global regexp exec repeadly
  // see https://stackoverflow.com/questions/4724701/regexp-exec-returns-null-sporadically
  var propertyMatcher = /@import[^;]*|[;\s{]?\*?[a-zA-Z\-]+\s*:#?[\s\S]*url\(\s*['"]?[^'"\)\s]+['"]?\s*\)[^;}]*/g
  var urlMatcher = /url\(\s*['"]?(?!data:)([^)'"]+)['"]?\s*\)/g

  excludeProperties = excludeProperties.concat(['behavior','\\*behavior'])

  var excludeUrlMatchers = excludeProperties.map(propertyName => {
    return new RegExp(`${propertyName}\\s*:#?[\\s]*url\\(\\s*['"]?([^'"\\)\\s]+)['"]?\\s*\\)`, 'g')
  })

  css = css.toString()

  var properties = propertyMatcher.exec(css)

  if (properties === null){
    done(css)
    return
  }

  var property = properties[0]

  var propertyName = property.split(':')[0].replace(/^\s+|\s+$/g, '')

  var excludeUrls = []

  excludeUrlMatchers.forEach(excludeUrlMatcher =>{
    var m = excludeUrlMatcher.exec(property)

    if (m !== null){
      excludeUrls.push(m[1])
    }
  })

  if (excludeProperties.includes(propertyName)){
    return property
  }

  var urls = []

  do {
    m = urlMatcher.exec(property)

    if (m !== null&& !excludeUrls.includes(m[1])) {
      urls.push(m[1])
    }
  } while (m)

  if (urls.length === 0){
    done(css)
    return
  }

  Promise.all(urls.map(rewriterFn))
         .then(res => {
           res.forEach(url => {
             var oldUrl = urls[res.indexOf(url)]
             css = css.replace(new RegExp(quote(oldUrl)), url)
           })
           done(css)
         })
}

// avoid invalid characters in your expression
// see https://stackoverflow.com/questions/16168484/javascript-syntax-error-invalid-regular-expression
function quote (str){
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
}
