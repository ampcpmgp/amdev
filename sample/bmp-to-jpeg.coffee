### sample code
require("../../sample/bmp-to-jpeg.coffee")("C:/Users/ggmg7/Pictures/LOM/1", "C:/Users/ggmg7/Pictures/LOM/1/jpg")
###

Jimp = require("jimp")
fs = require("fs")

module.exports = (path, outputPath) =>
  fs.mkdirSync(outputPath)
  for file in fs.readdirSync(path) when file.match(/\.bmp$/)
    changeExt("#{path}/#{file}", "#{outputPath}/#{file.replace(/\.bmp$/, ".jpg")}")

changeExt = (filepath, outputPath) =>
  Jimp.read(filepath, (err, lenna) =>
    throw err if err
    lenna
      .quality(90)
      .write(outputPath)
  )
