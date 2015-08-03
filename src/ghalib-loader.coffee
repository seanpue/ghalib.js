setCookie = (name, value, days) ->
  if days
    date = new Date()
    date.setTime date.getTime() + (days * 24 * 60 * 60 * 1000)
    expires = "; expires=" + date.toGMTString()
  else
    expires = ""
  document.cookie = name + "=" + value + expires + "; path=/"

getCookie = (name) ->
  nameEQ = name + "="
  ca = document.cookie.split(";")
  i = 0

  while i < ca.length
    c = ca[i]
    c = c.substring(1, c.length)  while c.charAt(0) is " "
    return c.substring(nameEQ.length, c.length)  if c.indexOf(nameEQ) is 0
    i++
  null

deleteCookie = (name) ->
  setCookie name, "", -1

window.p_hi = new Parser('devanagari',devanagari_tokens, devanagari_token_regex, devanagari_graph, devanagari_onmatch)
window.p_ur = new Parser('urdu',urdu_tokens, urdu_token_regex, urdu_graph, urdu_onmatch)
window.p_trans = new Parser('diacritics',diacritics_tokens, diacritics_token_regex, diacritics_graph, diacritics_onmatch)

$ ->

  parseText = () ->
    #debugger;

    $('em.urdu').each (index,u) =>

      orig = urduItemsOriginals[index]
      if parser==null # plain roman
        $(u).replaceWith(orig)
      else
        em = $(orig).clone(true)
#        debugger;
        te = []
        get_text = (n) =>
          $(n).contents().each (index, n) =>
            if n.nodeType == 3
              te.push(n)
            else if n.nodeType == 1
              get_text(n)#.childNodes)

        get_text(em)

        for n in te
          #urduLines = []
          #lines = n.textContent.split("<br>")
          #for v,k in lines
          n.textContent = parser.parse(n.textContent)
          #n.textContent = urduLines.join("<br>")

        $(u).replaceWith(em)



    $('em.urdu')
      .removeClass window.lastClass
      .addClass textClasses[textPreference]

    window.lastClass = textClasses[textPreference]
    return

#  urduItems = $('em.urdu')
  urduItemsOriginals = $('em.urdu').clone() # all Urdu items

  #debugger;

  getParser = () -> switch
    when textPreference == 'urdu' then p_ur
    when textPreference == 'devanagari' then p_hi
    when textPreference == 'diacritics' then p_trans
    else null


  textClasses = {
    'urdu': 'Nastaliq',
    'devanagari': 'Devanagari',
    'diacritics': 'Diacritics',
    'plain_roman': ''
  }

  lastClass = ''


  c=getCookie('mealac_script')

  languageBarHTML = ''

  if !c
    setCookie('mealac_script', 'diacritics', 1000,'/')
    c = getCookie('mealac_script')
    if !c
      languageBarHTML = '<p><em>Cookies need to be enabled to store your script preference between pages.</em></p>'
  if c
    textPreference = c
  else
    textPreference = 'diacritics'

  parser = getParser()
  #parseText()

  languageBarHTML += '<div id="language_bar" class="languageBar">
                    --
                    <a id="urdu_button" class="languageButton" href="#">urdu script<a>
                    --
                    <a id="devanagari_button" class="languageButton" href="#">devanagari</a>
                    --
                    <a id="diacritics_button" class="languageButton" href="#">diacritics</a>
                    --
                    <a id="plain_roman_button" class="languageButton" href="#">plain roman</a>
                    --
                    <a id="more_info_button" class ="ajax" href="http://www.columbia.edu/~asp49/00ghalib/moreinfo.html"> more information</a>
                    --
                    </div>'


  languageBar = $ languageBarHTML

  # languageBar.attr('id','languageBar')
  languageBar.appendTo('body')

  $(".ajax")
    .colorbox
      .onComplete ()->
        $('#cboxLoadedContent').css('backgroundColor', 'red');



  changeScript = () ->
    $('a.languageButton').each (index,element) =>
      id = $(element).attr("id")
      if id.slice(0,id.length-'_button'.length)==textPreference
        $(element).removeAttr('href')
      else
        $(element).attr('href','#')
      parser = getParser()
      parseText()
      setCookie('mealac_script', textPreference, 1000,'/')
    return

  $('a.languageButton').each (index,element) =>
    id = $(element).attr("id")
    $(element).click ->

      textPreference = id.slice(0,id.length-'_button'.length)
      changeScript()
      undefined
    return


  loc = $('div.verse:first')
  loc = $('div.verse-entry:first') if !(loc.length)
  loc = $('div.boxer:first') if !(loc.length)

  $(languageBar).insertBefore(loc) if loc.length

  changeScript()
  undefined
