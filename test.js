var test = require('tape')
var cssReurl = require('./')

var input_css = `
  div{
    background: url('div-background.png');
    color: '#ccc';
    cursor: url('div-cursor.png');
    content: url('content.png');
  }

  section{
    background: url('section-background.png'), url('second-section-background.png');
    cursor: url('section-cursor.png');
  }
`

var output_css = `
  div{
    background: url('super-div-background.png');
    color: '#ccc';
    cursor: url('super-div-cursor.png');
    content: url('content.png');
  }

  section{
    background: url('super-section-background.png'), url('super-second-section-background.png');
    cursor: url('super-section-cursor.png');
  }
`

test('sync', t => {
  t.plan(1)

  cssReurl(input_css, ['content'], url=>{
    return `super-${url}`
  }, result => {
    t.equal(result, output_css)
  })
})

test('async', t => {
  t.plan(1)

  cssReurl(input_css, ['content'], url=>{
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(`super-${url}`)
      },10)
    })
  }, result => {
    t.equal(result, output_css)
  })
})
