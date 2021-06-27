const path = require('path')
const base_dir = path.resolve(__dirname, '../out/compiled/src')

module.exports = (ctx) => {
  const is_scss = ctx.file.extname === '.scss'
  const is_module = !!ctx.file.basename.match(/.*\.m\.s?css$/)
  return {
    map: ctx.options.map,
    syntax: is_scss && 'postcss-scss',
    extensions: 'm.scss',
    plugins: {
      'postcss-modules': {
        generateScopedName: (name, filename) => !is_module
          ? name
          : path_to_class(get_resource_path(base_dir, filename)),
      },
    },
  }
}


function path_to_class(resource) {
  return resource.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
}

function get_resource_path(base, file) {
  const relative = path.relative(base, file)
  const deduped = dedupe_deext_last_path_segment(relative)
  return path.join('chivsitesbase', deduped)
}

function dedupe_deext_last_path_segment(path) {
  const path_segments = path.split('/')
  const name = path_segments.pop().split('.')[0]
  if (name !== path_segments[path_segments.length - 1]) {
    path_segments.push(name)
  }
  return path_segments.join('/')
}
