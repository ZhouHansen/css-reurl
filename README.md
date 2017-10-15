# css-reurl

Rewrite all `url(...)` except `data:` URIs of CSS asynchronously

## Usage
```javascript
const fs = require('fs')
const base64Img = require('base64-img')
const cssReurl = require('css-reurl')

// read test.css
fs.readFile('test.css', (err, oldcss) => {
    cssReurl(css, url=>{
      return new Promise((resolve, reject) => {

        base64Img.base64(url, (err, data) => {
          var oldUrl = url
          var newUrl = data

          if (data === void 0){
            newUrl = url
          }

          resolve({oldUrl, newUrl})
        })
      })      
    }, newcss => {
      // after newcss replace oldcss, this callback trigger
      console.log(newcss)
    })
})
```

## API

### `cssReurl(someCSS, excludeProperties, rewriter, done)`

`someCSS` could be either buffer or string but not derectly a file.

`excludeProperties` put properties that contain url but you don't want to convert to a array. `cssReurl(someCSS, ['background'], rewriter, done)`  will rewrite all urls except url in background property.

`rewriter(url)` return {oldUrl, newUrl} for example:

```javascript
cssReurl(someCSS, url => {
  var oldUrl = url
  var newUrl = url + "abc"

  return {oldUrl, newUrl}
}, done)
```

`done(newcss)` after newcss replace oldcss, this callback trigger.
