### sample code
require("../../sample/bmp-to-jpeg.coffee")("C:/Users/ggmg7/Pictures/LOM/1", "C:/Users/ggmg7/Pictures/LOM/1/jpg")
###

Jimp = require("jimp")
fs = require("fs")

gen = null

module.exports = (path, outputPath) =>
  try
    fs.mkdirSync(outputPath)
  gen = changeExt(path, outputPath)
  gen.next()

changeExt = (path, outputPath) =>
  for file in fs.readdirSync(path) when file.match(/\.bmp$/)
    yield Jimp.read("#{path}/#{file}", (err, lenna) =>
      throw err if err
      lenna
        .quality(90)
        .write("#{outputPath}/#{file.replace(/\.bmp$/, ".jpg")}", => gen.next())
    )
