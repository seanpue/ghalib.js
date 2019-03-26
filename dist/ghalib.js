
base_url = 'http://www.columbia.edu/~asp49/00ghalib/';
document.write('<link rel="stylesheet" type="text/css" href='+base_url+'css/ghalib.js.css?v=?2016-11-03::12:14:20" />');
var js = ["lib/urdu_parser_data.js","lib/devanagari_parser_data.js","lib/diacritics_parser_data.js","lib/ghalib.js","lib/jquery.min.js","lib/jquery.colorbox-min.js","lib/ghalib-loader.js"]
for (var i = 0, l = js.length; i < l; i++) {
    document.write('<script src="' + base_url + js[i] + '?v=?2016-11-03::12:14:20" type="text/javascript"></scr' + 'ipt>');
}

