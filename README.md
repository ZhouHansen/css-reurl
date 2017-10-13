# css-reurl

Rewrite all `url(...)` except `data:` URIs of CSS asynchronously

## Usage
```javascript
const fs = require('fs')
const base64Img = require('base64-img')
const cssReurl = require('css-reurl')

// read test.css
fs.readFile('test.css', (err, oldcss) => {
    cssReurl(oldcss, (oldurl, done)=>{
      // convert img url to image-base64
      base64Img.base64(oldurl, (err, newurl)=>{
        // call done(newurl) to generate newcss
        done(newurl)
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

`rewriter(oldurl, done)` oldurl is the url has been found in your oldcss, then rewrite it to newurl, then call `done(newurl)` to generate newcss, for example:
```javascript
cssReurl(someCSS, (oldurl, done) => {
  var newurl = oldurl + "abc"
  done(newurl)
}, done)
```

`done(newcss)` after newcss replace oldcss, this callback trigger.
