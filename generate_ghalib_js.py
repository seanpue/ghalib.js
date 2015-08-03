import sys
from string import Template

import datetime

timestamp = datetime.datetime.now().strftime("%Y-%m-%d::%H:%M:%S")

timestamp = "?"+timestamp

if len(sys.argv) > 1:
  base_url = sys.argv[1]
else:
  base_url = 'http://www.columbia.edu/~asp49/00ghalib/'

assert base_url[-1]=='/'

s = Template('''
base_url = '$base_url';
document.write('<link rel="stylesheet" type="text/css" href='+base_url+'css/ghalib.js.css?v=$timestamp" />');
var js = ["lib/urdu_parser_data.js","lib/devanagari_parser_data.js","lib/diacritics_parser_data.js","lib/ghalib.js","lib/jquery.min.js","lib/jquery.colorbox-min.js","lib/ghalib-loader.js"]
for (var i = 0, l = js.length; i < l; i++) {
    document.write('<script src="' + base_url + js[i] + '?v=$timestamp" type="text/javascript"></scr' + 'ipt>');
}
''')

print s.substitute(base_url = 'http://www.columbia.edu/~asp49/00ghalib/', timestamp=timestamp)
