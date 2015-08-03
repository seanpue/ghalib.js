
Array.prototype.every ?= (f) ->
  (return false if not f x) for x in @
  return true

class Parser

  BLANK = [' ']
  RULE = 'rule'
  TOKEN = 'token'
  PRODUCTION = 'production'
  TOKENS_LENGTH = 'tokens_length'
  PRODUCTION=0
  PREV_CLASSES=1
  PREV_TOKENS=2
  TOKENS=3
  NEXT_TOKENS=4
  NEXT_CLASSES=5
  PREV_LENGTH=6
  NEXT_LENGTH=7
  MATCH_TOKENS=8
  TOKENS_LENGTH=9


  constructor: (@name, @tokens, @token_regex, @graph, @onmatch, @compressed) ->
    @out_edges = @get_edges_sorted_by_next_token()
    @parse_tokens = []
    @token_i = 0

    if @onmatch
      @onmatch_rules_token_matrix = @get_onmatch_rules_token_matrix()
      @onmatch_rules_by_token = @get_onmatch_rules_by_token()

    if @graph.compressed
      RULE = 'r'
      TOKEN = 't'
      PREV_CLASSES = 'pc'
      NEXT_CLASSES = 'nc'
      PREV_LENGTH = 'pl'
      NEXT_LENGTH = 'nl'
      MATCH_TOKENS = 'mt'
      PRODUCTION = 'p'
      TOKENS_LENGTH = 'tl'

  arrayEqual: (ar1, ar2) ->
    JSON.stringify(ar1) is JSON.stringify(ar2)

  tokenize: (string) ->
      string.match(@token_regex)

  get_edges_sorted_by_next_token: () ->
      sorted_out_edges_by_next_tokens=[]
      sorted_out_edges_no_tokens=[]


      for start_node, edges of @graph.edge


        for edge in edges

            start_n = edge[0]
            end_nid = edge[1]
            edge_data = edge[2]
            end_n = @graph.node[end_nid]

            tkn = end_n[TOKEN]
            if tkn
              #tkn = end_n[TOKEN]
              sorted_out_edges_by_next_tokens[start_n] ?= []
              (sorted_out_edges_by_next_tokens[start_n][tkn] ?= []).push edge
            else
              (sorted_out_edges_no_tokens[start_n] ?= []).push edge

      output =
        'no_tokens': sorted_out_edges_no_tokens
        'by_tokens': sorted_out_edges_by_next_tokens

  get_onmatch_rules_by_token: () ->

      t_om = [] #defaultdict(list)
      # debugger;
      for t,t_classes of @tokens
        t_om[t] = []
        for o in @onmatch

            match_rules=o[0]
            prod = o[1]
            curr_class=match_rules[1]
            if curr_class[0] in t_classes
                t_om[t].push o
                # t_om[t].append(o)
      t_om

  get_onmatch_rules_token_matrix: () ->
      # following -> preceding
      # e.g. omr['chh']['ch'] has omr

      ttm = []

      # debugger;
      for t, t_classes of @tokens
        ttm[t]=[]
        for t2, t2_classes of @tokens
          ttm[t][t2] = []

        for o in @onmatch
          match_rules= o[0]
          prod = o[1]
          curr_class = match_rules[1]
          if t_classes.indexOf(curr_class[0])>0
            for t2, t2_class of @tokens
              prev_class = match_rules[0]
              if t2_class.indexOf(prev_class[0])>0
                #if !(ttm[t][t2])
#                  ttm[t][t2] =[]
                ttm[t][t2].push o
      ttm

  match_rule: (rule, level) ->


      #console.log('testing rule', rule)

      match_tokens=rule[MATCH_TOKENS]
      i_start = @token_i - rule[PREV_LENGTH]

      if i_start<0 or i_start+match_tokens.length > @parse_tokens.length
          return false

      if !this.arrayEqual(match_tokens,@parse_tokens[i_start...i_start+match_tokens.length])
          return false

      if rule[PREV_CLASSES]
          prev_classes = rule[PREV_CLASSES].reverse()#[::-1] # reverse these

          x = i_start - prev_classes.length

          if x < -1
            return false
          else if x == -1
            to_match = BLANK.concat @parse_tokens[i_start-prev_classes.length+1...i_start]
          else
            to_match = @parse_tokens[i_start-prev_classes.length...i_start]

          to_match = to_match.reverse()

          for i in [0...prev_classes.length]
            #console.log(i)
            if not(prev_classes[i]) or not( prev_classes[i] in @tokens[to_match[i]] )
              return false

      if rule[NEXT_CLASSES]

          next_classes = rule[NEXT_CLASSES]
          if i_start + match_tokens.length+next_classes.length > 1 + @parse_tokens.length # allow for one space
              return false
          to_match = [@parse_tokens[i_start+match_tokens.length...i_start+match_tokens.length + next_classes.length]...,BLANK...]

          for i in [0..next_classes.length-1]
            if not(prev_classes[i]) or not( next_classes[i] in @tokens[to_match[i]] )
              return false

        return true

  descend_node: (curr_node,level) ->
  #  console.log("Descending node curr_node",curr_node,"level",level,"token_i",@token_i) #matching first, token_i=",@token_i)
    new_edges = []

    if @token_i + level < @parse_tokens.length
        curr_token = @parse_tokens[@token_i+level]
        if @out_edges.by_tokens[curr_node]
          if @out_edges.by_tokens[curr_node][curr_token]
            new_edges = @out_edges.by_tokens[curr_node][curr_token]

    new_edges = new_edges.concat @out_edges.no_tokens[curr_node] if @out_edges.no_tokens[curr_node]?

    for edge in new_edges
        next_node_id = edge[1]
        edge_properties = edge[2]#['rule']# if the edge has a rule

        if edge_properties[RULE]
          if @match_rule(edge_properties[RULE], level) == false
            continue # skip it
        # if at end of the road
        next_node = @graph.node[next_node_id]
        if next_node[RULE] # matched nodes have rule signalling end
          return next_node[RULE]

        if @token_i+level < @parse_tokens.length # do not descend if at end of road
    #           console.log('descending', next_node)
               d = @descend_node(next_node_id, level+1)
             if d
    #            console.log('returning',d)
                return d


  match_first_at: () ->
    @descend_node(0,0)

  test_omr_classes: (omr_classes, classes_to_test) ->
    for i in [0...omr_classes.length]
      found = omr_classes[i] in classes_to_test[i] # is zero an e
      if !(found)
#        console.log("omr_classes"+JSON.stringify(omr_classes[i])+"not in classes_to_test[i]"+JSON.stringify(classes_to_test[i]))
        return false
    return true

  parse: (string,debug) ->
    if debug
      console.log('parsing '+string)
      debugger
    string = string.toLowerCase()
    @token_i = 0
    @parse_tokens = @tokenize(string)
    if @onmatch
      mtkns = [BLANK...,@parse_tokens...,BLANK...]
    output = ''
    matches = []
    while @token_i < @parse_tokens.length
      m = @match_first_at(@token_i)

      if !m
        console.log('bad character '+@parse_tokens[@token_i]+' at pos '+@token_i+' in '+string)
        @token_i += 1
        continue

      matches.push m

      if @onmatch
          t_i = @token_i
          mt_i = t_i+1

          omr= @onmatch_rules_by_token[@parse_tokens[t_i]]

          if omr
              for mr in omr
                  classes = mr[0]
                  p = mr[1]
                  l_c = classes[0]
                  r_c = classes[1]

                  if mt_i < l_c.length || mt_i+r_c.length>mtkns.length
                      continue
                  classes_to_test_l = []
                  classes_to_test_r = []
                  for c in mtkns[mt_i-l_c.length...mt_i]
                    classes_to_test_l.push(@tokens[c])
                  for c in mtkns[mt_i...mt_i+r_c.length]
                    classes_to_test_r.push(@tokens[c])
                  if @test_omr_classes(l_c, classes_to_test_l) and @test_omr_classes(r_c, classes_to_test_r)
                      output = output + p
                      break

      output += m[PRODUCTION]
      @token_i += m[TOKENS_LENGTH]
    output

window.p_hi = new Parser('devanagari',devanagari_tokens, devanagari_token_regex, devanagari_graph, devanagari_onmatch)
window.p_ur = new Parser('urdu',urdu_tokens, urdu_token_regex, urdu_graph, urdu_onmatch)

console.log p_hi,p_ur
console.log p_hi.get_onmatch_rules_by_token
