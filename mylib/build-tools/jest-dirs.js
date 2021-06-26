const path = require('path')
const root_dir = path.resolve(__dirname, '../out')
const src_dir = `<rootDir>/..`
const out_dir = `<rootDir>`
const compiled_dir = `<rootDir>/compiled`
const jest_dir = path.resolve(__dirname)

module.exports = {
  root_dir,
  out_dir,
  compiled_dir,
  jest_dir,
  src_dir,
}
