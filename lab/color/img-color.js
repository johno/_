const Jimp = require('jimp')

module.exports = (size = 64, color = '#444') => {
  const [width, height] = size.toString().split('x')
  const hexColor = Jimp.cssColorToHex(color)
  return new Jimp(width, height || width, hexColor, (err, image) => image)
}
