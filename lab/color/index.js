const { send } = require('micro')
const Jimp = require('jimp')
const getParam = require('get-query-param')
const img = require('./img-color')

module.exports = (req, res) => {
  const size = getParam('size', req.url) || 64
  const color = getParam('color', req.url) || '#444'
  res.setHeader('Content-Type', Jimp.MIME_JPEG)

  img(size, color).getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
    if (err) {
      send(res, 500, 'An error occurred')
    } else {
      send(res, 200, buffer)
    }
  })
}
