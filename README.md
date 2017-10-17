# css-reurl [![stability][0]][1]
 [![npm version][2]][3] [![downloads][4]][5]
 ![travis build][6]

Rewrite all `url(...)` except `data:` URIs of CSS asynchronously

## Install

`npm install css-reurl`

## Test

`npm run test`

## Usage
```javascript
const fs = require('fs')
const base64Img = require('base64-img')
const cssReurl = require('css-reurl')

// read test.css
fs.readFile('test.css', (err, input_css) => {
    cssReurl(input_css, url=>{
      return new Promise((resolve, reject) => {
        base64Img.base64(url, (err, newurl) => {
          if (data === void 0){
            resolve(url)
          }

          resolve(newurl)
        })
      })      
    }, output_css => {
      // after newcss replace oldcss, trigger this callback
      console.log(output_css)
    })
})
```

## API

### `cssReurl(someCSS, excludeProperties, rewriter, done)`

`someCSS` could be either a buffer or a string.

`excludeProperties` put properties which not to rewrite in it. `cssReurl(someCSS, ['background'], rewriter, done)`  will rewrite all urls except url in background property.

`rewriter(url)` just return the newurl, or a promise resolve the newurl

```javascript
cssReurl(someCSS, url => {
  return url + "abc"
}, done)
```

or

```javascript
cssReurl(someCSS, url => {
  return new Promise((resolve, reject) => {
    // asynchronously
    setTimeout(() => {
      resolve(url + "abc")
    }, 1000)
  })
}, done)
```

`done(newcss)` after newcss replace oldcss, trigger this callback.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/css-reurl.svg?style=flat-square
[3]: https://npmjs.org/package/css-reurl
[4]: http://img.shields.io/npm/dm/css-reurl.svg?style=flat-square
[5]: https://npmjs.org/package/css-reurl
[6]: https://travis-ci.org/ZhouHansen/css-reurl.svg?branch=master
