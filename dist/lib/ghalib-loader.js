// Generated by CoffeeScript 1.9.3
var deleteCookie, getCookie, setCookie;

setCookie = function(name, value, days) {
  var date, expires;
  if (days) {
    date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  return document.cookie = name + "=" + value + expires + "; path=/";
};

getCookie = function(name) {
  var c, ca, i, nameEQ;
  nameEQ = name + "=";
  ca = document.cookie.split(";");
  i = 0;
  while (i < ca.length) {
    c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
    i++;
  }
  return null;
};

deleteCookie = function(name) {
  return setCookie(name, "", -1);
};

window.p_hi = new Parser('devanagari', devanagari_tokens, devanagari_token_regex, devanagari_graph, devanagari_onmatch);

window.p_ur = new Parser('urdu', urdu_tokens, urdu_token_regex, urdu_graph, urdu_onmatch);

window.p_trans = new Parser('diacritics', diacritics_tokens, diacritics_token_regex, diacritics_graph, diacritics_onmatch);

$(function() {
  var c, changeScript, getParser, languageBar, languageBarHTML, lastClass, loc, parseText, parser, textClasses, textPreference, urduItemsOriginals;
  parseText = function() {
    $('em.urdu').each((function(_this) {
      return function(index, u) {
        var em, get_text, j, len, n, orig, te;
        orig = urduItemsOriginals[index];
        if (parser === null) {
          return $(u).replaceWith(orig);
        } else {
          em = $(orig).clone(true);
          te = [];
          get_text = function(n) {
            return $(n).contents().each(function(index, n) {
              if (n.nodeType === 3) {
                return te.push(n);
              } else if (n.nodeType === 1) {
                return get_text(n);
              }
            });
          };
          get_text(em);
          for (j = 0, len = te.length; j < len; j++) {
            n = te[j];
            n.textContent = parser.parse(n.textContent);
          }
          return $(u).replaceWith(em);
        }
      };
    })(this));
    $('em.urdu').removeClass(window.lastClass).addClass(textClasses[textPreference]);
    window.lastClass = textClasses[textPreference];
  };
  urduItemsOriginals = $('em.urdu').clone();
  getParser = function() {
    switch (false) {
      case textPreference !== 'urdu':
        return p_ur;
      case textPreference !== 'devanagari':
        return p_hi;
      case textPreference !== 'diacritics':
        return p_trans;
      default:
        return null;
    }
  };
  textClasses = {
    'urdu': 'Nastaliq',
    'devanagari': 'Devanagari',
    'diacritics': 'Diacritics',
    'plain_roman': ''
  };
  lastClass = '';
  c = getCookie('mealac_script');
  languageBarHTML = '';
  if (!c) {
    setCookie('mealac_script', 'diacritics', 1000, '/');
    getCookie('mealac_script');
    if (!c) {
      languageBarHTML = '<p><em>Cookies need to be enabled to store your script preference between pages.</em></p>';
    }
  }
  if (c) {
    textPreference = c;
  } else {
    textPreference = 'diacritics';
  }
  parser = getParser();
  languageBarHTML += '<div id="language_bar" class="languageBar"> -- <a id="urdu_button" class="languageButton" href="#">urdu script<a> -- <a id="devanagari_button" class="languageButton" href="#">devanagari</a> -- <a id="diacritics_button" class="languageButton" href="#">diacritics</a> -- <a id="plain_roman_button" class="languageButton" href="#">plain roman</a> -- <a id="more_info_button"> more information</a> -- </div>';
  languageBar = $(languageBarHTML);
  languageBar.appendTo('body');
  changeScript = function() {
    $('a.languageButton').each((function(_this) {
      return function(index, element) {
        var id;
        id = $(element).attr("id");
        if (id.slice(0, id.length - '_button'.length) === textPreference) {
          $(element).removeAttr('href');
        } else {
          $(element).attr('href', '#');
        }
        parser = getParser();
        parseText();
        return setCookie('mealac_script', textPreference, 1000, '/');
      };
    })(this));
  };
  $('a.languageButton').each((function(_this) {
    return function(index, element) {
      var id;
      id = $(element).attr("id");
      $(element).click(function() {
        textPreference = id.slice(0, id.length - '_button'.length);
        changeScript();
        return void 0;
      });
    };
  })(this));
  loc = $('div.verse:first');
  if (!loc.length) {
    loc = $('div.verse-entry:first');
  }
  if (!loc.length) {
    loc = $('div.boxer:first');
  }
  if (loc.length) {
    $(languageBar).insertBefore(loc);
  }
  changeScript();
  return void 0;
});