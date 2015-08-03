{exec} = require 'child_process'

task 'build', "building dist directory", ->
  exec([
    "coffee --compile --bare --output lib/ src/"
    "mkdir -p ./dist"
    "ipython nbconvert generate_parser_data.ipynb --to python"
    "python generate_parser_data.py"
    "cp -pr ./lib ./dist/"
    "cp -pr ./css ./dist/"
  ].join(' && '), (err, stdout, stderr) ->
    if err then console.log stderr.trim() else console.log 'done'
  )
