{ util, Model, attribute, collection } = require('janus')

class Node extends Model
  @attribute 'children', class extends attribute.CollectionAttribute
    @collectionClass: Nodes

class Nodes extends collection.List
  @modelClass: Node


util.extend(module.exports,
  Node: Node
  Nodes: Nodes
)

