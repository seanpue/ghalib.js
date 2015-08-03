{exec} = require 'child_process'

option '-b', '--base_url [BASE_URL]', 'set the base url for `ghalib.js`'
task 'build', "building dist directory", (options)->
  options.base_url or= 'http://www.columbia.edu/~asp49/00ghalib/'
  console.log('Using base url of '+options.base_url)
  exec([
    "coffee --compile --bare --output lib/ src/"
    "mkdir -p ./dist"
    "ipython nbconvert generate_parser_data.ipynb --to python"
    "python generate_parser_data.py"
    "cp -pr ./lib ./dist/"
    "cp -pr ./css ./dist/"
    "python generate_ghalib_js.py > dist/ghalib.js"
  ].join(' && '), (err, stdout, stderr) ->
    if err then console.log stderr.trim() else console.log 'done'
  )
