exports.downloadMultipleFiles = (paths, loc) =>
  #require("../sample/memo.coffee").downloadMultipleFiles(["https://google.com", "http://google.com/index.html"], "./_data")
  fs = require("fs-extra")
  request = require("request")
  fs.mkdirsSync(loc)
  downloadFiles = =>
    for path, i in paths
      yield request(path)
        .pipe(fs.createWriteStream("#{loc}/#{i}#{path.match(/(\.[^/\.]+$)/) and RegExp.$1 or ""}"))
        .on("finish", => gen.next())
  gen = downloadFiles()
  gen.next()
exports.bmpToJpeg = (path, outputPath) =>
  #require("../sample/memo.coffee").bmpToJpeg("C:/Users/ggmg7/Pictures/LOM/1", "C:/Users/ggmg7/Pictures/LOM/1/jpg")
  Jimp = require("jimp")
  fs = require("fs")
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
