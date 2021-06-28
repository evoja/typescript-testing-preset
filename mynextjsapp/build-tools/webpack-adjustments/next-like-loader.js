const sizeOf =  require('image-size')

// https://webpack.js.org/contribute/writing-a-loader/
module.exports = function loader(source) {
  const {width, height} = sizeOf(this.resourcePath)
  const content = source.match(/export default (.*?);?$/)
  return `export default {src: ${content[1]}, width:${width}, height:${height}};`
}
