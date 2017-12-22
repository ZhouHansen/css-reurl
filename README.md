# css-reurl [![stability][0]][1]
 [![npm version][2]][3] [![downloads][4]][5]
 ![travis build][6]

Rewrite all css url property asynchronously.

## usage

```javascript
const fs = require('fs')
const base64Img = require('base64-img')
const cssReurl = require('css-reurl')

fs.readFile('test.css', (err, input_css) => {
    cssReurl(input_css, url => {
      return new Promise((resolve, reject) => {
        base64Img.base64(url, (err, newurl) => {
          if (data === void 0){
            resolve(url)
          }
          resolve(newurl)
        })
      })      
    }, output_css => {
      console.log(output_css)
    })
})
```

## api

### `cssReurl(src, fn, done)`

* `src<string|buffer>` css source

* `fn(url)<function>` return the newurl, or a promise resolves the newurl

* `done(newcss)<function>` rewrote callback with the new source

```javascript
cssReurl(src, url => {
  return url + "abc"
}, done)
```

```javascript
// asynchronously
cssReurl(src, url => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url + "abc")
    }, 1000)
  })
}, done)
```

## license

[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-stable-green.svg
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/css-reurl.svg?style=flat-square
[3]: https://npmjs.org/package/css-reurl
[4]: http://img.shields.io/npm/dm/css-reurl.svg?style=flat-square
[5]: https://npmjs.org/package/css-reurl
[6]: https://travis-ci.org/ZhouHansen/css-reurl.svg?branch=master
