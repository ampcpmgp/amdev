### sample code
require("../../sample/bmp-to-jpeg.coffee")("C:/Users/ggmg7/Pictures/LOM/1", "C:/Users/ggmg7/Pictures/LOM/1/jpg")
###

Jimp = require("jimp")
fs = require("fs")


module.exports = (path, outputPath) =>
  changeExt = (path, outputPath) =>
    for file in fs.readdirSync(path) when file.match(/\.bmp$/)
      yield Jimp.read("#{path}/#{file}", (err, lenna) =>
        throw err if err
        lenna
          .quality(90)
          .write("#{outputPath}/#{file.replace(/\.bmp$/, ".jpg")}", => gen.next())
      )
  try
    fs.mkdirSync(outputPath)
  gen = null
  gen = changeExt(path, outputPath)
  gen.next()
