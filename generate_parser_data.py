
# coding: utf-8

# In[1]:

import sys,json
sys.path.append('./graphparser')
import graphparser as gp
from networkx.readwrite import json_graph
urdu_data_file = './graphparser/settings/urdu.yaml'
devanagari_data_file = './graphparser/settings/devanagari.yaml'
diacritics_data_file = './graphparser/settings/diacritics.yaml'


# In[8]:

parser = gp.GraphParser(urdu_data_file)
assert parser.parse("shaan").output==u'\u0634\u0627\u0646'
assert parser.parse('karegaa').output==u'\u06a9\u0631\u06d2\u06af\u0627'
parser.parse(' ay ')


# In[3]:

dev_parser = gp.GraphParser(devanagari_data_file)
print(dev_parser.parse('mudda((aa'))


# In[4]:

def compress_nodes(parser):
#    ''' CSub'''
    dg = parser.DG.copy()

    def classes_int(classes):
        return [parser.token_class_names.index(c) for c in classes]

    

    for n,d in dg.nodes(data=True):
        if 'found' in d:
            d.pop('found') # not needed
        if 'rule' in d:
            r = d['rule']
            d.pop('rule') # already contained on edge, but signals end of road
            d['r'] ={'p':r.production,'tl':r.tokens_length}
        if 'token' in d:
            d['t'] = d['token']
            d.pop('token')
            
    return dg.node

def compress_edges(parser):
    
    def classes_int(classes):
        return [parser.token_class_names.index(c) for c in classes]


    def shorten_parser_rule(pr):
        o={}

        if pr.prev_classes:
            o['pc'] = classes_int(pr.prev_classes)
#        if pr.prev_tokens:
#            o['pt'] = classes_int(pr.prev_tokens)
        o['mt'] = pr.match_tokens 
#        o['t'] = pr.tokens

 #       if pr.next_tokens:
 #           o['nt'] = classes_int(pr.next_tokens)
        o['pl'] = pr.prev_length
        o['nl'] = pr.next_length
        if pr.next_classes:
            o['nc'] = classes_int(pr.next_classes)
        o['tl'] = pr.tokens_length
#        print(pr.tokens_length)
        o['p'] = pr.production

        return o
    dg = parser.DG.copy()

    x = dict(parser.get_sorted_out_edges(dg))

    for node_start, values in x.items():
        for u,v,d in values:
            if 'weight' in d: d.pop('weight')
            if 'rule' in d:
                d['r'] = shorten_parser_rule(d['rule'])
                d.pop('rule')
        
    
    return x

parser = gp.GraphParser(urdu_data_file)
#compress_edges(parser)

     


# In[5]:

def compress_onmatch_rules(parser):
    omr = parser.onmatch_rules
    if omr==None: return omr
    x = list()
    for ((prev_class, next_class), output) in omr:
        x.append( ( ( parser.classes_int(prev_class), parser.classes_int(next_class) ), output) )
    return x

#for x in parser.onmatch_rules

def compress_tokens(parser):
    
    def classes_int(classes):
        return [parser.token_class_names.index(c) for c in classes]
    output ={}
    for token,classes in parser.tokens.items():
        output[token]=classes_int(classes)
    return output


# In[10]:

import itertools

def gen_parser_data(parser_name = 'urdu',
                    parser_data_file = './graphparser/settings/urdu.yaml',
                    output_file = 'lib/urdu_parser_data.js',
                    compress=True):
    parser = gp.GraphParser(parser_data_file)
    assert parser
    token_match_re_string=parser.get_token_match_re_string()
    
    graph = parser.DG

    compress=True
    
    if compress:
        nodes = compress_nodes(parser)
        sorted_edges = compress_edges(parser)
    else:
        nodes = parser.DG.node
        sorted_edges = parser.get_sorted_out_edges(parser.DG)
        

    tokens = parser.tokens
   
    if compress:
        tokens = compress_tokens(parser)
# sorted by weight, reversed
    
    

    onmatch = parser.onmatch_rules
    
    if onmatch!=None and compress:

        onmatch = compress_onmatch_rules(parser)
    
    onmatch_rules_json = json.dumps(onmatch ,separators=(',', ':') ) #skinny_onmatch_rules(parser))
    
     

   
    
    graph_json = json.dumps( {'node': nodes, 'edge': sorted_edges, 'compressed': compress} ,separators=(',', ':') )
    
    js_template = """
{PARSER_NAME}_tokens = {TOKENS};
token_match_re_string = {TOKEN_MATCH_RE_STRING};
{PARSER_NAME}_token_regex = new RegExp(token_match_re_string, 'g');
graph_json = {GRAPH_JSON};
onmatch_json = {ONMATCH_RULES_JSON};

function decode_json(x){{return x}};

{PARSER_NAME}_graph = decode_json(graph_json);
{PARSER_NAME}_onmatch = decode_json(onmatch_json);

console.log('parser loaded; len of graph: '+graph_json);
"""
    
    js_output = js_template.format(PARSER_NAME = parser_name,
           TOKENS = json.dumps( tokens ),
           TOKEN_MATCH_RE_STRING = json.dumps(token_match_re_string),
           GRAPH_JSON = graph_json,
           ONMATCH_RULES_JSON = onmatch_rules_json)
    
    with open(output_file,'w') as f:
        f.write(js_output)
    
    return js_output

gen_parser_data()

gen_parser_data(parser_name = 'devanagari',
                parser_data_file = './graphparser/settings/devanagari.yaml',
                output_file = 'lib/devanagari_parser_data.js',
                compress=True)

gen_parser_data(parser_name = 'diacritics',
                parser_data_file = './graphparser/settings/diacritics.yaml',
                output_file = 'lib/diacritics_parser_data.js',
                compress=True)

#!coffee --compile --bare --output lib/ src/


# In[15]:

#!coffee --compile --bare --output lib/ src/


# In[ ]:



