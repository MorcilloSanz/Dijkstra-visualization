function Node(x, y, radius, value) {
  
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.value = value;
  
  this.selected = false;
  this.annotation = "";
  
  const nodeBackgroundColor = '#c7dfff';
  const selectedNodeBackgroundColor = '#ff6b6e';
  
  this.pressed = function(mx, my) {
    let distance = Math.sqrt(Math.pow(mx - this.x, 2) + Math.pow(my - this.y, 2));
    return distance <= radius;
  }
  
  this.drag = function(mx, my) {
    this.x = mx;
    this.y = my;
  }
  
  this.draw = function() {
    
    if(this.selected)
      fill(selectedNodeBackgroundColor);
    else
      fill(nodeBackgroundColor);
    
    stroke(0);
    circle(this.x, this.y, this.radius);
    fill(0);
    strokeWeight(1);
    
    let valueStr = '' + this.value;
    let valueWidth = textWidth(valueStr);
    text(valueStr, this.x - valueWidth / 2, this.y);
    
    stroke('#777');
    fill('#777');
    text(this.annotation, this.x + this.radius / 2, this.y - radius / 2);
    
    stroke(0);
    fill(0);
  }
}

function Edge(node1, node2, weight) {
  
  this.node1 = node1;
  this.node2 = node2;
  this.weight = weight;
  
  this.draw = function() {
    
    stroke(0);
    
    let v1 = createVector(node1.x, node1.y);
    let v2 = createVector(node2.x - node1.x, node2.y - node1.y);
    
    let weightX = v1.x + 0.5 * v2.x;
    let weightY = v1.y + 0.5 * v2.y;
    
    // Loop
    if(v2.x == 0 && v2.y == 0) {
      noFill();
      circle(node1.x, node1.y - node1.radius / 2 - 2, node1.radius);
      weightY = node1.y - node1.radius - 5; 
    }
    
    fill(0);
    line(node1.x, node1.y, node2.x, node2.y);
    
    v2.normalize();
    strokeWeight(10);
    point(node2.x - node2.radius / 2 * v2.x, node2.y - node2.radius / 2 * v2.y);
    strokeWeight(1);
    
    let weightStr = '' + weight;
    let weightWidth = textWidth(weightStr);
    text(weightStr, weightX - weightWidth / 2, weightY);
  }
}

/**
* G = <N,E,W> graph
* N = {0,1,...,n} nodes of the graph
* E = {<0,1>,<0,2>,<1,2>...,<n,n>} edges of the directed graph
* W = {2,5,...,k} weights of each edge of the graph
*/
function Graph(nodes, edges) {
  
  this.nodes = nodes;
  this.edges = edges;

  this.draw = function() {
    
    for(let i = 0; i < this.edges.length; i ++)
      this.edges[i].draw();
    
    for(let i = 0; i < this.nodes.length; i ++)
      this.nodes[i].draw();
  }
}