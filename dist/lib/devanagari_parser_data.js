
devanagari_tokens = {";o": [44], "((": [7, 12], "z": [40, 12, 47], "5": [46], "chh": [12, 11], "o": [44, 27], "p": [30, 12], " ": [46], "ch": [12, 10], ".z": [40, 12, 47], ";aa": [44, 27], "3": [46], "9": [46], "n": [12, 29], ";h": [12, 18], "d": [12, 14], "s": [12, 40, 35, 34], "u": [37, 44], "2": [46], ":z": [12, 47, 40], "kh": [12, 23, 24], "w": [12], ".r": [12], "'": [26], "7": [46], "*": [46], "(": [31, 46], "j": [12, 21], "aa": [8, 5, 44, 27, 9, 6], "e": [6, 27, 15, 44], "h": [12, 13, 17, 18], ";r": [12], "uu": [44, 27, 9], "g": [12], ")": [31, 46], ";m": [45], ";d": [12], "sh": [36, 12, 40], "1": [46], "dh": [12], "----": [46], ";z": [40, 12, 47], "gh": [12], "0": [46], ";dh": [12], "m": [12, 28], ";rh": [12], "]": [31, 46], "f": [12, 16], "_": [42], "v": [12, 43], "-": [46], "ph": [12], "r": [12, 33], "...": [46], ":": [46], ";": [31, 46], "/": [46], ";g": [12], "\u0000": [46], ":t": [12], "th": [12], "bh": [12], "ai": [27, 44], "4": [46], "zh": [12], "6": [46], "y": [12], ";x": [2, 3, 12], "?": [31, 46], ";e": [44, 37, 39], "[": [31, 46], "))": [44], ";t": [12, 0], "\"": [46], ".ri": [44], "a": [37, 38, 44, 4], "au": [27, 44], "ii": [6, 27, 44, 20], ",": [31, 46], "b": [12], "|": [19], ";th": [12, 1], ";s": [12, 35], ":n": [12], "--": [46], "q": [32, 12], "!": [46], "l": [12, 25], "t": [12, 41], "i": [37, 44], ".s": [12, 35], "8": [46], "\n": [46], "k": [12, 22, 23], "jh": [12], ";n": [45]};
token_match_re_string = "\\-\\-\\-\\-|chh|\\;aa|\\;dh|\\;rh|\\.\\.\\.|\\.ri|\\;th|\\;o|\\(\\(|ch|\\.z|\\;d|\\:z|kh|\\.r|aa|\\;r|uu|\\;m|sh|dh|\\;z|gh|bh|\\;e|ph|\\;g|\\:t|th|ai|zh|\\;x|\\)\\)|\\:n|au|ii|\\;s|\\;t|\\-\\-|\\.s|\\;h|jh|\\;n|z|5|p|\\ |3|9|n|d|s|f|w|\\'|7|\\*|\\(|j|e|_|g|\\)|u|1|m|\\]|2|h|l|v|\\-|o|\\:|\\;|\\/|\\000|r|4|6|y|\\?|8|\\[|\\\"|a|\\,|b|\\||q|\\!|0|t|i|\\\n|k|.";
devanagari_token_regex = new RegExp(token_match_re_string, 'g');
graph_json = {"node":{"0":{"t":null},"1":{"t":"a"},"2":{"t":"(("},"3":{"r":{"p":"","tl":2}},"4":{"t":"e"},"5":{"r":{"p":"\u090f","tl":1}},"6":{"t":"au"},"7":{"r":{"p":"\u0914","tl":1}},"8":{"t":";n"},"9":{"r":{"p":"\u0901","tl":1}},"10":{"t":"n"},"11":{"t":"t"},"12":{"t":"ii"},"13":{"r":{"p":"\u0928\u0924\u0940","tl":3}},"14":{"t":"uu"},"15":{"r":{"p":"\u0942","tl":1}},"16":{"t":";o"},"17":{"r":{"p":"\u094b","tl":1}},"18":{"t":"-"},"19":{"t":"h"},"20":{"t":"aa"},"21":{"t":"-"},"22":{"t":"e"},"23":{"r":{"p":"\u2010\u0939\u093e-\u090f-","tl":5}},"24":{"t":"u"},"25":{"r":{"p":"\u0909","tl":1}},"26":{"t":".z"},"27":{"r":{"p":"\u095b","tl":1}},"28":{"r":{"p":"\u0905","tl":1}},"29":{"t":"(("},"30":{"t":"aa"},"31":{"r":{"p":"\u0941\u0906","tl":3}},"32":{"r":{"p":"\u0913","tl":1}},"33":{"t":";x"},"34":{"t":"v"},"35":{"t":"u"},"36":{"r":{"p":"\u0959\u0941","tl":3}},"37":{"t":"d"},"38":{"r":{"p":"\u0926","tl":1}},"39":{"t":"s"},"40":{"r":{"p":"\u0938","tl":1}},"41":{"t":";d"},"42":{"r":{"p":"\u0921","tl":1}},"43":{"t":":z"},"44":{"r":{"p":"\u095b","tl":1}},"45":{"t":"kh"},"46":{"r":{"p":"\u0916","tl":1}},"47":{"t":"w"},"48":{"r":{"p":"","tl":1}},"49":{"t":"7"},"50":{"r":{"p":"\u096d","tl":1}},"51":{"t":"?"},"52":{"r":{"p":"?","tl":1}},"53":{"t":"))"},"54":{"r":{"p":"","tl":1}},"55":{"t":"("},"56":{"r":{"p":"(","tl":1}},"57":{"t":"k"},"58":{"t":"i"},"59":{"t":"h"},"60":{"r":{"p":"\u0915\u093f","tl":3}},"61":{"t":"aa"},"62":{"r":{"p":"\u093e","tl":1}},"63":{"t":"y"},"64":{"t":"i"},"65":{"t":"h"},"66":{"r":{"p":"\u092f\u0947","tl":3}},"67":{"t":"h"},"68":{"r":{"p":"\u093e","tl":2}},"69":{"t":";e"},"70":{"r":{"p":"\u090f","tl":1}},"71":{"t":")"},"72":{"r":{"p":")","tl":1}},"73":{"t":";m"},"74":{"r":{"p":"\u0901","tl":1}},"75":{"t":"sh"},"76":{"r":{"p":"\u0936","tl":1}},"77":{"t":"dh"},"78":{"r":{"p":"\u0927","tl":1}},"79":{"t":"----"},"80":{"r":{"p":"\u2014","tl":1}},"81":{"r":{"p":"\u0939","tl":2}},"82":{"t":"(("},"83":{"r":{"p":"\u094b","tl":2}},"84":{"t":"ai"},"85":{"r":{"p":"\u0910","tl":1}},"86":{"r":{"p":"\u093e","tl":2}},"87":{"t":";rh"},"88":{"r":{"p":"\u095d","tl":1}},"89":{"t":"f"},"90":{"r":{"p":"\u095e","tl":1}},"91":{"r":{"p":"\u0901","tl":1}},"92":{"r":{"p":"\u2010\u0939\u093e","tl":3}},"93":{"t":"v"},"94":{"r":{"p":"\u0935","tl":1}},"95":{"r":{"p":"\u0902","tl":1}},"96":{"r":{"p":"\u0910","tl":1}},"97":{"r":{"p":"\u0939","tl":2}},"98":{"t":"(("},"99":{"t":"ii"},"100":{"r":{"p":"\u0908","tl":2}},"101":{"t":"ii"},"102":{"r":{"p":"\u0908","tl":1}},"103":{"t":".ri"},"104":{"r":{"p":"\u090b","tl":1}},"105":{"t":"e"},"106":{"r":{"p":"\u0928\u0924\u0947","tl":3}},"107":{"t":"bh"},"108":{"r":{"p":"\u092d","tl":1}},"109":{"t":"a"},"110":{"r":{"p":"\u0905","tl":2}},"111":{"r":{"p":"\u0940","tl":1}},"112":{"t":"o"},"113":{"r":{"p":"\u0913","tl":1}},"114":{"t":";"},"115":{"r":{"p":";","tl":1}},"116":{"t":"th"},"117":{"r":{"p":"\u0925","tl":1}},"118":{"r":{"p":"\u0948","tl":1}},"119":{"t":"zh"},"120":{"r":{"p":"\u091d\u093c","tl":1}},"121":{"r":{"p":"\u092f","tl":1}},"122":{"t":"gh"},"123":{"r":{"p":"\u0918","tl":1}},"124":{"r":{"p":"\u0959","tl":1}},"125":{"t":"ii"},"126":{"r":{"p":"\u092f\u0939\u0940","tl":4}},"127":{"r":{"p":"\u0906","tl":1}},"128":{"t":":n"},"129":{"r":{"p":"\u0928","tl":1}},"130":{"t":"ch"},"131":{"t":"i"},"132":{"t":"h"},"133":{"r":{"p":"\u091a\u0947","tl":3}},"134":{"t":"\""},"135":{"r":{"p":"\"","tl":1}},"136":{"r":{"p":"\u0909","tl":1}},"137":{"r":{"p":"\u094c","tl":1}},"138":{"t":";aa"},"139":{"r":{"p":"\u093e","tl":1}},"140":{"t":","},"141":{"r":{"p":",","tl":1}},"142":{"t":"b"},"143":{"r":{"p":"\u092c","tl":1}},"144":{"t":"|"},"145":{"r":{"p":"","tl":1}},"146":{"t":";s"},"147":{"r":{"p":"\u0938","tl":1}},"148":{"t":"0"},"149":{"r":{"p":"\u0966","tl":1}},"150":{"t":";h"},"151":{"r":{"p":"\u0939","tl":1}},"152":{"t":"i"},"153":{"r":{"p":"\u0907","tl":2}},"154":{"r":{"p":"\u0943","tl":1}},"155":{"t":"jh"},"156":{"r":{"p":"\u091d","tl":1}},"157":{"r":{"p":"\u0913","tl":1}},"158":{"t":"aa"},"159":{"r":{"p":"\u0906","tl":2}},"160":{"t":"u"},"161":{"r":{"p":"\u0909","tl":2}},"162":{"t":"z"},"163":{"r":{"p":"\u095b","tl":1}},"164":{"t":"))"},"165":{"t":"o"},"166":{"t":";n"},"167":{"r":{"p":"\u0941\u0913\u0902","tl":4}},"168":{"t":"5"},"169":{"r":{"p":"\u096b","tl":1}},"170":{"r":{"p":"","tl":1}},"171":{"r":{"p":"\u0947","tl":1}},"172":{"t":"chh"},"173":{"r":{"p":"\u091b","tl":1}},"174":{"t":"p"},"175":{"r":{"p":"\u092a","tl":1}},"176":{"t":" "},"177":{"r":{"p":" ","tl":1}},"178":{"r":{"p":"\u093e","tl":2}},"179":{"r":{"p":"\u091a","tl":1}},"180":{"r":{"p":"\u093e","tl":2}},"181":{"t":"3"},"182":{"r":{"p":"\u0969","tl":1}},"183":{"r":{"p":"\u090a","tl":1}},"184":{"t":"9"},"185":{"r":{"p":"\u096f","tl":1}},"186":{"t":"i"},"187":{"t":"(("},"188":{"t":"t"},"189":{"t":"i"},"190":{"r":{"p":"\u090f\u0924","tl":4}},"191":{"r":{"p":"\u0928","tl":1}},"192":{"t":"a"},"193":{"t":"h"},"194":{"r":{"p":"\u0928","tl":3}},"195":{"r":{"p":"\u0905","tl":2}},"196":{"r":{"p":"\u0928\u093f","tl":1}},"197":{"t":"a"},"198":{"t":"h"},"199":{"r":{"p":"\u092a\u0947","tl":3}},"200":{"r":{"p":"\u0941","tl":1}},"201":{"t":"au"},"202":{"r":{"p":"\u0914","tl":2}},"203":{"r":{"p":"\u0905","tl":1}},"204":{"t":"*"},"205":{"r":{"p":"*","tl":1}},"206":{"r":{"p":"\u090f","tl":1}},"207":{"t":"u"},"208":{"t":"h"},"209":{"r":{"p":"\u0935\u094b","tl":3}},"210":{"t":"j"},"211":{"r":{"p":"\u091c","tl":1}},"212":{"r":{"p":"\u0939","tl":2}},"213":{"t":"_"},"214":{"r":{"p":"","tl":1}},"215":{"t":";r"},"216":{"r":{"p":"\u095c","tl":1}},"217":{"r":{"p":"\u0908","tl":1}},"218":{"t":"g"},"219":{"r":{"p":"\u0917","tl":1}},"220":{"t":"ai"},"221":{"r":{"p":"\u0910","tl":2}},"222":{"r":{"p":"\u0914","tl":1}},"223":{"t":"o"},"224":{"t":"-"},"225":{"r":{"p":"\u2010\u0913\u2010","tl":3}},"226":{"r":{"p":"","tl":1}},"227":{"t":"1"},"228":{"r":{"p":"\u0967","tl":1}},"229":{"t":"aa"},"230":{"r":{"p":"\u0928\u0924\u093e","tl":3}},"231":{"t":";z"},"232":{"r":{"p":"\u095b","tl":1}},"233":{"r":{"p":"\u0906","tl":1}},"234":{"r":{"p":"\u0906","tl":2}},"235":{"t":";dh"},"236":{"r":{"p":"\u0922","tl":1}},"237":{"t":"m"},"238":{"r":{"p":"\u092e","tl":1}},"239":{"r":{"p":"\u0913","tl":1}},"240":{"t":"e"},"241":{"t":";n"},"242":{"r":{"p":"\u0941\u090f\u0901","tl":4}},"243":{"t":"2"},"244":{"r":{"p":"\u0968","tl":1}},"245":{"t":"h"},"246":{"r":{"p":"\u0939","tl":1}},"247":{"t":"l"},"248":{"r":{"p":"\u0932","tl":1}},"249":{"r":{"p":"\u0905","tl":1}},"250":{"r":{"p":"-","tl":1}},"251":{"r":{"p":"\u0906","tl":2}},"252":{"t":"r"},"253":{"r":{"p":"\u0930","tl":1}},"254":{"r":{"p":"\u0902","tl":1}},"255":{"t":"ph"},"256":{"r":{"p":"\u092b","tl":1}},"257":{"t":"..."},"258":{"r":{"p":"...","tl":1}},"259":{"r":{"p":"\u0906","tl":2}},"260":{"r":{"p":"","tl":1}},"261":{"t":";g"},"262":{"r":{"p":"\u095a","tl":1}},"263":{"t":"'"},"264":{"r":{"p":"","tl":1}},"265":{"t":":t"},"266":{"r":{"p":"\u0924","tl":1}},"267":{"r":{"p":"\u094b","tl":1}},"268":{"t":"4"},"269":{"r":{"p":"\u096a","tl":1}},"270":{"r":{"p":"\u0910","tl":1}},"271":{"t":"6"},"272":{"r":{"p":"\u096c","tl":1}},"273":{"r":{"p":"\u0914","tl":1}},"274":{"t":"n"},"275":{"r":{"p":"\u0928\u094d\u0928","tl":2}},"276":{"r":{"p":"\u0907","tl":1}},"277":{"r":{"p":"\u0905","tl":2}},"278":{"r":{"p":"\u0947","tl":1}},"279":{"r":{"p":"\u0907","tl":2}},"280":{"t":"aa"},"281":{"r":{"p":"\u0906","tl":3}},"282":{"r":{"p":"\u0928","tl":1}},"283":{"t":";t"},"284":{"r":{"p":"\u091f","tl":1}},"285":{"r":{"p":"\u090a","tl":1}},"286":{"t":":"},"287":{"r":{"p":":","tl":1}},"288":{"r":{"p":"\u0907","tl":1}},"289":{"r":{"p":"\u0908","tl":2}},"290":{"r":{"p":"","tl":1}},"291":{"t":"a"},"292":{"t":"h"},"293":{"r":{"p":"\u092c","tl":3}},"294":{"t":"ii"},"295":{"r":{"p":"\u0935\u0939\u0940","tl":4}},"296":{"t":";th"},"297":{"r":{"p":"\u0920","tl":1}},"298":{"t":"--"},"299":{"r":{"p":"\u2014","tl":1}},"300":{"t":"q"},"301":{"r":{"p":"\u0958","tl":1}},"302":{"t":"!"},"303":{"r":{"p":"!","tl":1}},"304":{"t":"t"},"305":{"r":{"p":"\u0924","tl":1}},"306":{"r":{"p":"\u0928","tl":1}},"307":{"r":{"p":"\u093f","tl":1}},"308":{"t":".s"},"309":{"r":{"p":"\u0938","tl":1}},"310":{"r":{"p":"\u0902","tl":1}},"311":{"t":"8"},"312":{"r":{"p":"\u096e","tl":1}},"313":{"t":"\n"},"314":{"r":{"p":"\n","tl":1}},"315":{"r":{"p":"\u0915","tl":1}},"316":{"r":{"p":"\u090b","tl":1}},"317":{"r":{"p":"\u0906","tl":1}}},"edge":{"0":[[0,1,{}],[0,4,{}],[0,261,{}],[0,6,{}],[0,257,{}],[0,8,{}],[0,265,{}],[0,10,{}],[0,87,{}],[0,268,{}],[0,14,{}],[0,271,{}],[0,16,{}],[0,18,{}],[0,24,{}],[0,26,{}],[0,283,{}],[0,286,{}],[0,33,{}],[0,37,{}],[0,39,{}],[0,296,{}],[0,41,{}],[0,298,{}],[0,43,{}],[0,300,{}],[0,45,{}],[0,302,{}],[0,47,{}],[0,304,{}],[0,49,{}],[0,51,{}],[0,308,{}],[0,53,{}],[0,311,{}],[0,313,{}],[0,61,{}],[0,63,{}],[0,69,{}],[0,71,{}],[0,73,{}],[0,55,{}],[0,77,{}],[0,79,{}],[0,84,{}],[0,57,{}],[0,89,{}],[0,93,{}],[0,98,{}],[0,101,{}],[0,103,{}],[0,107,{}],[0,112,{}],[0,114,{}],[0,116,{}],[0,119,{}],[0,122,{}],[0,128,{}],[0,130,{}],[0,134,{}],[0,138,{}],[0,140,{}],[0,142,{}],[0,144,{}],[0,146,{}],[0,148,{}],[0,150,{}],[0,155,{}],[0,162,{}],[0,168,{}],[0,172,{}],[0,174,{}],[0,176,{}],[0,181,{}],[0,184,{}],[0,186,{}],[0,75,{}],[0,204,{}],[0,210,{}],[0,213,{}],[0,215,{}],[0,218,{}],[0,263,{}],[0,227,{}],[0,231,{}],[0,235,{}],[0,237,{}],[0,243,{}],[0,245,{}],[0,247,{}],[0,252,{}],[0,255,{}]],"1":[[1,249,{"r":{"tl":1,"mt":["a"],"nl":1,"pc":[44],"p":"\u0905","pl":0}}],[1,203,{"r":{"tl":1,"mt":["a"],"nl":1,"pc":[37],"p":"\u0905","pl":0}}],[1,28,{"r":{"tl":1,"mt":["a"],"nl":1,"pc":[46],"p":"\u0905","pl":0}}],[1,2,{}],[1,67,{}],[1,290,{"r":{"tl":1,"p":"","pl":0,"mt":["a"],"nl":1}}]],"2":[[2,3,{"r":{"tl":2,"mt":["a","(("],"nl":2,"nc":[44],"pc":[12],"p":"","pl":0}}],[2,259,{"r":{"tl":2,"mt":["a","(("],"nl":2,"pc":[46],"p":"\u0906","pl":0}}],[2,86,{"r":{"tl":2,"mt":["a","(("],"nl":2,"pc":[12],"p":"\u093e","pl":0}}],[2,280,{}]],"4":[[4,5,{"r":{"tl":1,"mt":["e"],"nl":1,"pc":[44],"p":"\u090f","pl":0}}],[4,206,{"r":{"tl":1,"mt":["e"],"nl":1,"pc":[46],"p":"\u090f","pl":0}}],[4,171,{"r":{"tl":1,"p":"\u0947","pl":0,"mt":["e"],"nl":1}}]],"6":[[6,7,{"r":{"tl":1,"mt":["au"],"nl":1,"pc":[46],"p":"\u0914","pl":0}}],[6,222,{"r":{"tl":1,"mt":["au"],"nl":1,"pc":[37],"p":"\u0914","pl":0}}],[6,273,{"r":{"tl":1,"mt":["au"],"nl":1,"pc":[44],"p":"\u0914","pl":0}}],[6,137,{"r":{"tl":1,"p":"\u094c","pl":0,"mt":["au"],"nl":1}}]],"8":[[8,9,{"r":{"tl":1,"mt":[";n"],"nl":1,"nc":[46],"pc":[44,15],"p":"\u0901","pl":0}}],[8,91,{"r":{"tl":1,"mt":[";n"],"nl":1,"nc":[46],"pc":[9],"p":"\u0901","pl":0}}],[8,254,{"r":{"tl":1,"mt":[";n"],"nl":1,"nc":[46],"pc":[33,12,9],"p":"\u0902","pl":0}}],[8,310,{"r":{"tl":1,"p":"\u0902","pl":0,"mt":[";n"],"nl":1}}]],"10":[[10,196,{"r":{"tl":1,"mt":["u","n","y","aa"],"nl":3,"nc":[46],"p":"\u0928\u093f","pl":1}}],[10,282,{"r":{"tl":1,"mt":["n"],"nl":1,"nc":[46],"pc":[44],"p":"\u0928","pl":0}}],[10,306,{"r":{"tl":1,"mt":["n"],"nl":1,"nc":[44],"pc":[44],"p":"\u0928","pl":0}}],[10,95,{"r":{"tl":1,"mt":["n"],"nl":1,"nc":[12],"pc":[44],"p":"\u0902","pl":0}}],[10,192,{}],[10,274,{}],[10,191,{"r":{"tl":1,"p":"\u0928","pl":0,"mt":["n"],"nl":1}}],[10,11,{}]],"11":[[11,105,{}],[11,12,{}],[11,229,{}]],"12":[[12,13,{"r":{"tl":3,"p":"\u0928\u0924\u0940","pl":0,"mt":["n","t","ii"],"nl":3}}]],"14":[[14,285,{"r":{"tl":1,"mt":["uu"],"nl":1,"pc":[46],"p":"\u090a","pl":0}}],[14,183,{"r":{"tl":1,"mt":["uu"],"nl":1,"pc":[44],"p":"\u090a","pl":0}}],[14,15,{"r":{"tl":1,"p":"\u0942","pl":0,"mt":["uu"],"nl":1}}],[14,164,{}]],"16":[[16,32,{"r":{"tl":1,"mt":[";o"],"nl":1,"pc":[44],"p":"\u0913","pl":0}}],[16,17,{"r":{"tl":1,"mt":[";o"],"nl":1,"pc":[12],"p":"\u094b","pl":0}}],[16,157,{"r":{"tl":1,"mt":[";o"],"nl":1,"pc":[46],"p":"\u0913","pl":0}}],[16,82,{}]],"18":[[18,250,{"r":{"tl":1,"p":"-","pl":0,"mt":["-"],"nl":1}}],[18,19,{}],[18,223,{}]],"19":[[19,20,{}]],"20":[[20,92,{"r":{"tl":3,"mt":["-","h","aa"],"nl":3,"nc":[46],"p":"\u2010\u0939\u093e","pl":0}}],[20,21,{}]],"21":[[21,22,{}]],"22":[[22,23,{"r":{"tl":5,"mt":["-","h","aa","-","e"],"nl":5,"nc":[46],"p":"\u2010\u0939\u093e-\u090f-","pl":0}}]],"24":[[24,136,{"r":{"tl":1,"mt":["u"],"nl":1,"pc":[46],"p":"\u0909","pl":0}}],[24,25,{"r":{"tl":1,"mt":["u"],"nl":1,"pc":[44],"p":"\u0909","pl":0}}],[24,200,{"r":{"tl":1,"p":"\u0941","pl":0,"mt":["u"],"nl":1}}],[24,29,{}]],"26":[[26,27,{"r":{"tl":1,"p":"\u095b","pl":0,"mt":[".z"],"nl":1}}]],"29":[[29,30,{}]],"30":[[30,31,{"r":{"tl":3,"mt":["u","((","aa"],"nl":3,"pc":[12],"p":"\u0941\u0906","pl":0}}]],"33":[[33,34,{}],[33,124,{"r":{"tl":1,"p":"\u0959","pl":0,"mt":[";x"],"nl":1}}]],"34":[[34,35,{}]],"35":[[35,36,{"r":{"tl":3,"mt":[";x","v","u"],"nl":3,"pc":[46],"p":"\u0959\u0941","pl":0}}]],"37":[[37,38,{"r":{"tl":1,"p":"\u0926","pl":0,"mt":["d"],"nl":1}}]],"39":[[39,40,{"r":{"tl":1,"p":"\u0938","pl":0,"mt":["s"],"nl":1}}]],"41":[[41,42,{"r":{"tl":1,"p":"\u0921","pl":0,"mt":[";d"],"nl":1}}]],"43":[[43,44,{"r":{"tl":1,"p":"\u095b","pl":0,"mt":[":z"],"nl":1}}]],"45":[[45,46,{"r":{"tl":1,"p":"\u0916","pl":0,"mt":["kh"],"nl":1}}]],"47":[[47,48,{"r":{"tl":1,"p":"","pl":0,"mt":["w"],"nl":1}}]],"49":[[49,50,{"r":{"tl":1,"p":"\u096d","pl":0,"mt":["7"],"nl":1}}]],"51":[[51,52,{"r":{"tl":1,"p":"?","pl":0,"mt":["?"],"nl":1}}]],"53":[[53,54,{"r":{"tl":1,"p":"","pl":0,"mt":["))"],"nl":1}}]],"55":[[55,56,{"r":{"tl":1,"p":"(","pl":0,"mt":["("],"nl":1}}]],"57":[[57,58,{}],[57,315,{"r":{"tl":1,"p":"\u0915","pl":0,"mt":["k"],"nl":1}}]],"58":[[58,59,{}]],"59":[[59,60,{"r":{"tl":3,"mt":["k","i","h"],"nl":3,"nc":[46],"p":"\u0915\u093f","pl":0}}]],"61":[[61,233,{"r":{"tl":1,"mt":["aa"],"nl":1,"pc":[37],"p":"\u0906","pl":0}}],[61,317,{"r":{"tl":1,"mt":["aa"],"nl":1,"pc":[44],"p":"\u0906","pl":0}}],[61,127,{"r":{"tl":1,"mt":["aa"],"nl":1,"pc":[46],"p":"\u0906","pl":0}}],[61,62,{"r":{"tl":1,"p":"\u093e","pl":0,"mt":["aa"],"nl":1}}]],"63":[[63,64,{}],[63,121,{"r":{"tl":1,"p":"\u092f","pl":0,"mt":["y"],"nl":1}}]],"64":[[64,65,{}]],"65":[[65,66,{"r":{"tl":3,"mt":["y","i","h"],"nl":3,"nc":[46],"pc":[46],"p":"\u092f\u0947","pl":0}}],[65,125,{}]],"67":[[67,68,{"r":{"tl":2,"mt":["a","h","-","e"],"nl":4,"nc":[46],"pc":[12],"p":"\u093e","pl":0}}],[67,212,{"r":{"tl":2,"mt":["a","h","-","e"],"nl":4,"nc":[46],"pc":[46,12],"p":"\u0939","pl":0}}],[67,81,{"r":{"tl":2,"mt":["a","h"],"nl":2,"nc":[46],"pc":[46,12],"p":"\u0939","pl":0}}],[67,97,{"r":{"tl":2,"mt":["a","h"],"nl":2,"nc":[46],"pc":[46,12,37,12],"p":"\u0939","pl":0}}],[67,180,{"r":{"tl":2,"mt":["a","h"],"nl":2,"nc":[46],"pc":[12],"p":"\u093e","pl":0}}],[67,234,{"r":{"tl":2,"mt":["a","h"],"nl":2,"nc":[46],"pc":[44],"p":"\u0906","pl":0}}],[67,251,{"r":{"tl":2,"mt":["a","h"],"nl":2,"nc":[46],"pc":[37],"p":"\u0906","pl":0}}]],"69":[[69,70,{"r":{"tl":1,"mt":[";e"],"nl":1,"pc":[46],"p":"\u090f","pl":0}}],[69,278,{"r":{"tl":1,"p":"\u0947","pl":0,"mt":[";e"],"nl":1}}]],"71":[[71,72,{"r":{"tl":1,"p":")","pl":0,"mt":[")"],"nl":1}}]],"73":[[73,74,{"r":{"tl":1,"p":"\u0901","pl":0,"mt":[";m"],"nl":1}}]],"75":[[75,76,{"r":{"tl":1,"p":"\u0936","pl":0,"mt":["sh"],"nl":1}}]],"77":[[77,78,{"r":{"tl":1,"p":"\u0927","pl":0,"mt":["dh"],"nl":1}}]],"79":[[79,80,{"r":{"tl":1,"p":"\u2014","pl":0,"mt":["----"],"nl":1}}]],"82":[[82,83,{"r":{"tl":2,"mt":[";o","(("],"nl":2,"pc":[12],"p":"\u094b","pl":0}}]],"84":[[84,96,{"r":{"tl":1,"mt":["ai"],"nl":1,"pc":[44],"p":"\u0910","pl":0}}],[84,85,{"r":{"tl":1,"mt":["ai"],"nl":1,"pc":[37],"p":"\u0910","pl":0}}],[84,270,{"r":{"tl":1,"mt":["ai"],"nl":1,"pc":[46],"p":"\u0910","pl":0}}],[84,118,{"r":{"tl":1,"p":"\u0948","pl":0,"mt":["ai"],"nl":1}}]],"87":[[87,88,{"r":{"tl":1,"p":"\u095d","pl":0,"mt":[";rh"],"nl":1}}]],"89":[[89,90,{"r":{"tl":1,"p":"\u095e","pl":0,"mt":["f"],"nl":1}}]],"93":[[93,94,{"r":{"tl":1,"p":"\u0935","pl":0,"mt":["v"],"nl":1}}],[93,207,{}]],"98":[[98,226,{"r":{"tl":1,"mt":["((","-","e"],"nl":3,"nc":[46],"pc":[12],"p":"","pl":0}}],[98,170,{"r":{"tl":1,"mt":["(("],"nl":1,"nc":[46],"pc":[12],"p":"","pl":0}}],[98,160,{}],[98,99,{}],[98,260,{"r":{"tl":1,"p":"","pl":0,"mt":["(("],"nl":1}}],[98,152,{}],[98,201,{}],[98,220,{}],[98,109,{}],[98,158,{}]],"99":[[99,289,{"r":{"tl":2,"mt":["((","ii"],"nl":2,"pc":[44],"p":"\u0908","pl":0}}],[99,100,{"r":{"tl":2,"mt":["((","ii"],"nl":2,"pc":[46],"p":"\u0908","pl":0}}]],"101":[[101,217,{"r":{"tl":1,"mt":["ii"],"nl":1,"pc":[44],"p":"\u0908","pl":0}}],[101,102,{"r":{"tl":1,"mt":["ii"],"nl":1,"pc":[46],"p":"\u0908","pl":0}}],[101,111,{"r":{"tl":1,"p":"\u0940","pl":0,"mt":["ii"],"nl":1}}]],"103":[[103,104,{"r":{"tl":1,"mt":[".ri"],"nl":1,"pc":[46],"p":"\u090b","pl":0}}],[103,316,{"r":{"tl":1,"mt":[".ri"],"nl":1,"pc":[44],"p":"\u090b","pl":0}}],[103,154,{"r":{"tl":1,"p":"\u0943","pl":0,"mt":[".ri"],"nl":1}}]],"105":[[105,106,{"r":{"tl":3,"p":"\u0928\u0924\u0947","pl":0,"mt":["n","t","e"],"nl":3}}]],"107":[[107,108,{"r":{"tl":1,"p":"\u092d","pl":0,"mt":["bh"],"nl":1}}]],"109":[[109,178,{"r":{"tl":2,"mt":["((","a"],"nl":2,"nc":[46],"pc":[12],"p":"\u093e","pl":0}}],[109,195,{"r":{"tl":2,"mt":["((","a"],"nl":2,"pc":[44],"p":"\u0905","pl":0}}],[109,277,{"r":{"tl":2,"mt":["((","a"],"nl":2,"pc":[12],"p":"\u0905","pl":0}}],[109,110,{"r":{"tl":2,"mt":["((","a"],"nl":2,"pc":[46],"p":"\u0905","pl":0}}]],"112":[[112,113,{"r":{"tl":1,"mt":["o"],"nl":1,"pc":[44],"p":"\u0913","pl":0}}],[112,239,{"r":{"tl":1,"mt":["o"],"nl":1,"pc":[46],"p":"\u0913","pl":0}}],[112,267,{"r":{"tl":1,"p":"\u094b","pl":0,"mt":["o"],"nl":1}}]],"114":[[114,115,{"r":{"tl":1,"p":";","pl":0,"mt":[";"],"nl":1}}]],"116":[[116,117,{"r":{"tl":1,"p":"\u0925","pl":0,"mt":["th"],"nl":1}}]],"119":[[119,120,{"r":{"tl":1,"p":"\u091d\u093c","pl":0,"mt":["zh"],"nl":1}}]],"122":[[122,123,{"r":{"tl":1,"p":"\u0918","pl":0,"mt":["gh"],"nl":1}}]],"125":[[125,126,{"r":{"tl":4,"mt":["y","i","h","ii"],"nl":4,"nc":[46],"pc":[46],"p":"\u092f\u0939\u0940","pl":0}}]],"128":[[128,129,{"r":{"tl":1,"p":"\u0928","pl":0,"mt":[":n"],"nl":1}}]],"130":[[130,131,{}],[130,179,{"r":{"tl":1,"p":"\u091a","pl":0,"mt":["ch"],"nl":1}}]],"131":[[131,132,{}]],"132":[[132,133,{"r":{"tl":3,"mt":["ch","i","h"],"nl":3,"nc":[46],"pc":[12],"p":"\u091a\u0947","pl":0}}]],"134":[[134,135,{"r":{"tl":1,"p":"\"","pl":0,"mt":["\""],"nl":1}}]],"138":[[138,139,{"r":{"tl":1,"p":"\u093e","pl":0,"mt":[";aa"],"nl":1}}]],"140":[[140,141,{"r":{"tl":1,"p":",","pl":0,"mt":[","],"nl":1}}]],"142":[[142,291,{}],[142,143,{"r":{"tl":1,"p":"\u092c","pl":0,"mt":["b"],"nl":1}}]],"144":[[144,145,{"r":{"tl":1,"p":"","pl":0,"mt":["|"],"nl":1}}]],"146":[[146,147,{"r":{"tl":1,"p":"\u0938","pl":0,"mt":[";s"],"nl":1}}]],"148":[[148,149,{"r":{"tl":1,"p":"\u0966","pl":0,"mt":["0"],"nl":1}}]],"150":[[150,151,{"r":{"tl":1,"p":"\u0939","pl":0,"mt":[";h"],"nl":1}}]],"152":[[152,153,{"r":{"tl":2,"mt":["((","i"],"nl":2,"pc":[46],"p":"\u0907","pl":0}}],[152,279,{"r":{"tl":2,"mt":["((","i"],"nl":2,"pc":[44],"p":"\u0907","pl":0}}]],"155":[[155,156,{"r":{"tl":1,"p":"\u091d","pl":0,"mt":["jh"],"nl":1}}]],"158":[[158,159,{"r":{"tl":2,"mt":["((","aa"],"nl":2,"pc":[46],"p":"\u0906","pl":0}}]],"160":[[160,161,{"r":{"tl":2,"mt":["((","u"],"nl":2,"pc":[46],"p":"\u0909","pl":0}}]],"162":[[162,163,{"r":{"tl":1,"p":"\u095b","pl":0,"mt":["z"],"nl":1}}]],"164":[[164,240,{}],[164,165,{}]],"165":[[165,166,{}]],"166":[[166,167,{"r":{"tl":4,"mt":["uu","))","o",";n"],"nl":4,"nc":[46],"pc":[12],"p":"\u0941\u0913\u0902","pl":0}}]],"168":[[168,169,{"r":{"tl":1,"p":"\u096b","pl":0,"mt":["5"],"nl":1}}]],"172":[[172,173,{"r":{"tl":1,"p":"\u091b","pl":0,"mt":["chh"],"nl":1}}]],"174":[[174,197,{}],[174,175,{"r":{"tl":1,"p":"\u092a","pl":0,"mt":["p"],"nl":1}}]],"176":[[176,177,{"r":{"tl":1,"p":" ","pl":0,"mt":[" "],"nl":1}}]],"181":[[181,182,{"r":{"tl":1,"p":"\u0969","pl":0,"mt":["3"],"nl":1}}]],"184":[[184,185,{"r":{"tl":1,"p":"\u096f","pl":0,"mt":["9"],"nl":1}}]],"186":[[186,288,{"r":{"tl":1,"mt":["i"],"nl":1,"pc":[44],"p":"\u0907","pl":0}}],[186,276,{"r":{"tl":1,"mt":["i"],"nl":1,"pc":[46],"p":"\u0907","pl":0}}],[186,307,{"r":{"tl":1,"p":"\u093f","pl":0,"mt":["i"],"nl":1}}],[186,187,{}]],"187":[[187,188,{}]],"188":[[188,189,{}]],"189":[[189,190,{"r":{"tl":4,"mt":["i","((","t","i"],"nl":4,"pc":[46],"p":"\u090f\u0924","pl":0}}]],"192":[[192,193,{}]],"193":[[193,194,{"r":{"tl":3,"mt":["n","a","h"],"nl":3,"nc":[46],"pc":[46],"p":"\u0928","pl":0}}]],"197":[[197,198,{}]],"198":[[198,199,{"r":{"tl":3,"mt":["p","a","h"],"nl":3,"nc":[46],"pc":[46],"p":"\u092a\u0947","pl":0}}]],"201":[[201,202,{"r":{"tl":2,"mt":["((","au"],"nl":2,"pc":[46],"p":"\u0914","pl":0}}]],"204":[[204,205,{"r":{"tl":1,"p":"*","pl":0,"mt":["*"],"nl":1}}]],"207":[[207,208,{}]],"208":[[208,209,{"r":{"tl":3,"mt":["v","u","h"],"nl":3,"nc":[46],"pc":[46],"p":"\u0935\u094b","pl":0}}],[208,294,{}]],"210":[[210,211,{"r":{"tl":1,"p":"\u091c","pl":0,"mt":["j"],"nl":1}}]],"213":[[213,214,{"r":{"tl":1,"p":"","pl":0,"mt":["_"],"nl":1}}]],"215":[[215,216,{"r":{"tl":1,"p":"\u095c","pl":0,"mt":[";r"],"nl":1}}]],"218":[[218,219,{"r":{"tl":1,"p":"\u0917","pl":0,"mt":["g"],"nl":1}}]],"220":[[220,221,{"r":{"tl":2,"mt":["((","ai"],"nl":2,"pc":[46],"p":"\u0910","pl":0}}]],"223":[[223,224,{}]],"224":[[224,225,{"r":{"tl":3,"p":"\u2010\u0913\u2010","pl":0,"mt":["-","o","-"],"nl":3}}]],"227":[[227,228,{"r":{"tl":1,"p":"\u0967","pl":0,"mt":["1"],"nl":1}}]],"229":[[229,230,{"r":{"tl":3,"p":"\u0928\u0924\u093e","pl":0,"mt":["n","t","aa"],"nl":3}}]],"231":[[231,232,{"r":{"tl":1,"p":"\u095b","pl":0,"mt":[";z"],"nl":1}}]],"235":[[235,236,{"r":{"tl":1,"p":"\u0922","pl":0,"mt":[";dh"],"nl":1}}]],"237":[[237,238,{"r":{"tl":1,"p":"\u092e","pl":0,"mt":["m"],"nl":1}}]],"240":[[240,241,{}]],"241":[[241,242,{"r":{"tl":4,"mt":["uu","))","e",";n"],"nl":4,"nc":[46],"pc":[12],"p":"\u0941\u090f\u0901","pl":0}}]],"243":[[243,244,{"r":{"tl":1,"p":"\u0968","pl":0,"mt":["2"],"nl":1}}]],"245":[[245,246,{"r":{"tl":1,"p":"\u0939","pl":0,"mt":["h"],"nl":1}}]],"247":[[247,248,{"r":{"tl":1,"p":"\u0932","pl":0,"mt":["l"],"nl":1}}]],"252":[[252,253,{"r":{"tl":1,"p":"\u0930","pl":0,"mt":["r"],"nl":1}}]],"255":[[255,256,{"r":{"tl":1,"p":"\u092b","pl":0,"mt":["ph"],"nl":1}}]],"257":[[257,258,{"r":{"tl":1,"p":"...","pl":0,"mt":["..."],"nl":1}}]],"261":[[261,262,{"r":{"tl":1,"p":"\u095a","pl":0,"mt":[";g"],"nl":1}}]],"263":[[263,264,{"r":{"tl":1,"p":"","pl":0,"mt":["'"],"nl":1}}]],"265":[[265,266,{"r":{"tl":1,"p":"\u0924","pl":0,"mt":[":t"],"nl":1}}]],"268":[[268,269,{"r":{"tl":1,"p":"\u096a","pl":0,"mt":["4"],"nl":1}}]],"271":[[271,272,{"r":{"tl":1,"p":"\u096c","pl":0,"mt":["6"],"nl":1}}]],"274":[[274,275,{"r":{"tl":2,"mt":["n","n"],"nl":2,"nc":[44],"pc":[44],"p":"\u0928\u094d\u0928","pl":0}}]],"280":[[280,281,{"r":{"tl":3,"mt":["a","((","aa"],"nl":3,"pc":[12],"p":"\u0906","pl":0}}]],"283":[[283,284,{"r":{"tl":1,"p":"\u091f","pl":0,"mt":[";t"],"nl":1}}]],"286":[[286,287,{"r":{"tl":1,"mt":[":"],"nl":1,"nc":[46],"p":":","pl":0}}]],"291":[[291,292,{}]],"292":[[292,293,{"r":{"tl":3,"mt":["b","a","h"],"nl":3,"nc":[46],"pc":[46],"p":"\u092c","pl":0}}]],"294":[[294,295,{"r":{"tl":4,"mt":["v","u","h","ii"],"nl":4,"nc":[46],"pc":[46],"p":"\u0935\u0939\u0940","pl":0}}]],"296":[[296,297,{"r":{"tl":1,"p":"\u0920","pl":0,"mt":[";th"],"nl":1}}]],"298":[[298,299,{"r":{"tl":1,"p":"\u2014","pl":0,"mt":["--"],"nl":1}}]],"300":[[300,301,{"r":{"tl":1,"p":"\u0958","pl":0,"mt":["q"],"nl":1}}]],"302":[[302,303,{"r":{"tl":1,"p":"!","pl":0,"mt":["!"],"nl":1}}]],"304":[[304,305,{"r":{"tl":1,"p":"\u0924","pl":0,"mt":["t"],"nl":1}}]],"308":[[308,309,{"r":{"tl":1,"p":"\u0938","pl":0,"mt":[".s"],"nl":1}}]],"311":[[311,312,{"r":{"tl":1,"p":"\u096e","pl":0,"mt":["8"],"nl":1}}]],"313":[[313,314,{"r":{"tl":1,"p":"\n","pl":0,"mt":["\n"],"nl":1}}]]},"compressed":true};
onmatch_json = [[[[7],[12]],""],[[[37,7],[12]],""],[[[47],[47]],"\u094d"],[[[16],[47]],"\u094d"],[[[21],[26,17]],"\u094d"],[[[28],[18]],"\u094d"],[[[29],[12]],""],[[[30],[29,6]],""],[[[32],[36]],"\u094d"],[[[30],[22]],""],[[[22],[24]],"\u094d"],[[[25],[25]],"\u094d"],[[[33],[33]],"\u094d"],[[[33],[14]],"\u094d"],[[[33],[47]],"\u094d"],[[[2],[28]],"\u094d"],[[[2],[41]],"\u094d"],[[[25],[17]],"\u094d"],[[[43],[43]],"\u094d"],[[[34],[28]],"\u094d"],[[[33],[28]],"\u094d"],[[[35],[43]],"\u094d"],[[[0],[1]],"\u094d"],[[[14],[14]],"\u094d\u094d"],[[[12,44,34],[41,27]],"\u094d"],[[[37,2],[41,46]],"\u094d"],[[[12,27,12],[12,27]],""],[[[12,44,45,12],[12,27]],""],[[[12,37,18],[12]],""],[[[46,12,37,12],[12,27,45]],"\u094d"],[[[46,37,12],[12,37]],""],[[[46,37,12],[12,27,12]],""],[[[46,12,37,40],[12,27]],"\u094d"],[[[12,37,12],[12,27]],""],[[[46,44,12],[12,44]],""],[[[46,12,37,47],[47,37,12]],""],[[[46,12,37,12],[12,37,12]],""],[[[46,27,12],[12,27]],""],[[[22],[23]],"\u094d"],[[[10],[11]],"\u094d"],[[[46,12,27,12],[12,27]],""],[[[46,12,27,12],[12,37,12]],""],[[[46,12,37,40],[12,46]],"\u094d"],[[[46,12,37,12],[12,46]],""],[[[46,37,12],[12,27,46]],""],[[[46,37,12],[12,27,12,46]],""],[[[46,37,12,37,12],[12,37,12]],""],[[[44,29],[12]],""],[[[12],[29,5,46]],""],[[[12],[29,15,46]],""],[[[12],[41,5,46]],""],[[[12],[41,15,46]],""],[[[12],[41,20,46]],""],[[[12],[7,38,46]],""],[[[46,12,37],[12,27]],""],[[[46,12,37,12],[12,27]],""],[[[12],[12]],"\u094d"]];

function decode_json(x){return x};

devanagari_graph = decode_json(graph_json);
devanagari_onmatch = decode_json(onmatch_json);

console.log('parser loaded; len of graph: '+graph_json);
