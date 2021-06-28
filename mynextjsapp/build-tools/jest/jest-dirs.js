const path = require('path')
const root_dir = path.resolve(__dirname, '../..')
const src_dir = `<rootDir>/src`
const tst_dir = `<rootDir>/test`
const out_dir = `<rootDir>/.next/out`
const jest_dir = path.resolve(__dirname)

module.exports = {
  root_dir,
  out_dir,
  jest_dir,
  src_dir,
  tst_dir
}
