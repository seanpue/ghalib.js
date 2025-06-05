module Graphs exposing
    ( NodeId, NodeType(..), NodeDataType(..), NodeLabel, Node, EdgeDataType(..), Edge, EdgeId, EdgeList, DirectedGraph, initGraph, addEdge, addNode, getNode, getEdge, updateEdgeData
    , childrenOfType
    )

{-| Basic graph types, including a directed graph.

@docs NodeId, NodeType, NodeDataType, NodeLabel, Node, EdgeDataType, Edge, EdgeId, EdgeList, DirectedGraph, initGraph, addEdge, addNode, getNode, getEdge, updateEdgeData

-}

import Array
import Dict exposing (Dict)
import List exposing (tail)



-- Node Definition --


type alias NodeId =
    Int


type NodeType t
    = NodeType t


type NodeDataType n
    = NodeDataType n



-- String


type alias NodeLabel =
    String


type alias Node t n =
    { id : NodeId
    , type_ : NodeType t
    , label : NodeLabel
    , data : NodeDataType n
    }



-- Edge Definition --


type EdgeDataType e
    = EdgeDataType e


type alias Edge d =
    { head : NodeId
    , tail : NodeId
    , data : EdgeDataType d
    }


type alias EdgeId =
    ( Int, Int )


type alias EdgeList =
    List EdgeId



-- Directed Graph Definition --


type alias DirectedGraph t n e =
    { nodes : List (Node t n)
    , edges : Dict EdgeId (Edge e)
    , edgeList : EdgeList -- could also just read keys of edges
    }



-- Graph Functions --


initGraph : List (Node t n) -> Dict EdgeId (Edge e) -> Maybe EdgeList -> DirectedGraph t n e
initGraph nodes edges edgeListMaybe =
    case edgeListMaybe of
        Just edgeList ->
            DirectedGraph nodes edges edgeList

        Nothing ->
            DirectedGraph nodes edges (Dict.keys edges)


addEdge : DirectedGraph t n e -> NodeId -> NodeId -> EdgeDataType e -> ( DirectedGraph t n e, Edge e )
addEdge graph head tail data =
    let
        newEdge =
            Edge head tail data

        newEdgeId : EdgeId
        newEdgeId =
            ( head, tail )

        updatedGraph =
            { graph
                | edges = Dict.insert ( head, tail ) newEdge graph.edges
                , edgeList = graph.edgeList ++ [ newEdgeId ]
            }
    in
    Tuple.pair updatedGraph newEdge


addNode : DirectedGraph t n e -> NodeType t -> NodeLabel -> NodeDataType n -> ( DirectedGraph t n e, Node t n )
addNode graph nodeType label data =
    let
        nodeId =
            List.length graph.nodes

        newNode =
            Node nodeId nodeType label data

        updatedGraph =
            { graph | nodes = List.append graph.nodes [ newNode ] }
    in
    Tuple.pair updatedGraph newNode


getNode : DirectedGraph t n e -> NodeId -> Maybe (Node t n)
getNode graph nodeId =
    Array.fromList graph.nodes |> Array.get nodeId


getEdge : DirectedGraph t n e -> NodeId -> NodeId -> Maybe (Edge e)
getEdge graph head tail =
    Dict.get ( head, tail ) graph.edges


updateEdgeData :
    DirectedGraph t n e
    -> Edge e
    -> EdgeDataType e
    -> DirectedGraph t n e
updateEdgeData graph edge edgeData =
    let
        edgeId : EdgeId
        edgeId =
            ( edge.head, edge.tail )

        updateEdges : Dict EdgeId (Edge e)
        updateEdges =
            Dict.update edgeId (Maybe.andThen (\oe -> Just { oe | data = edgeData })) graph.edges
    in
    { graph | edges = updateEdges }



-- { graph | edges = Dict.update ( edge.head, edge.tail ) (\oldEdge -> Just { oldEdge | data = edgeData }) graph.edges }


getNodeType : DirectedGraph t n e -> NodeId -> Maybe (NodeType t)
getNodeType graph nodeId =
    case getNode graph nodeId of
        Just node ->
            Just (.type_ node)

        _ ->
            Nothing


nothingIfEmpty : List l -> Maybe (List l)
nothingIfEmpty lst =
    if List.length lst == 0 then
        Nothing

    else
        Just lst


children : DirectedGraph t n e -> NodeId -> Maybe (List NodeId)
children graph parentId =
    let
        edgeList =
            graph.edgeList

        kids =
            List.filter
                (\( head, _ ) ->
                    head == parentId
                )
                edgeList
                |> List.map Tuple.second
    in
    kids |> nothingIfEmpty


childrenOfType : DirectedGraph t n e -> NodeId -> NodeType t -> Maybe (List NodeId)
childrenOfType graph parentId nodeType =
    let
        kids : Maybe (List NodeId)
        kids =
            children graph parentId
    in
    kids |> Maybe.andThen (nothingIfEmpty << List.filter (\nodeId -> getNodeType graph nodeId == Just nodeType))
