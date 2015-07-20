#mkdirp
mkdirp = require("mkdirp")
mkdirp('./tmp/foo/bar/baz/temp.txt', (err) =>
  console.error(err) if (err)
  console.log('pow!')
)
