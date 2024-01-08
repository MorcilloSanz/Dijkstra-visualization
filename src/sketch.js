const nodeRadius = 50;

let numNodes = 0;
let dragNodeIndex = -1;
let graph = new Graph([], []);

let pressed = false;

let newNodeButton = new Button(1, 1, 105, 25, "New node");
let newEdgeButton = new Button(107, 1, 105, 25, "New edge");
let dijkstraButton = new Button(213, 1, 105, 25, "Dijkstra");
let resetButton = new Button(319, 1, 105, 25, "Reset");
let clearButton = new Button(425, 1, 105, 25, "Clear");
let delayButton = new Button(531, 1, 105, 25, "Delay");

let A = []; // Available nodes set for dijkstra algorithm
let started = false;

let INF = Number.MAX_SAFE_INTEGER;

let previousTime = 0;
let delay = 500;

function newNode() {
  let node = new Node(width / 2, height / 2, nodeRadius, ++numNodes);
  graph.nodes.push(node);
}

function newEdge() {
  
  pressed = false;
  let input = prompt("New edge: node1,node2,weight", "1,2,5");

  if (input != null && input != "") {

    let splitted = input.split(",");

    let node1 = graph.nodes[parseInt(splitted[0] - 1)];
    let node2 = graph.nodes[parseInt(splitted[1] - 1)];
    let weight = parseInt(splitted[2]);

    let edge = new Edge(node1, node2, weight);
    graph.edges.push(edge);
  } 

}

function startDijkstra() {
  
  started = true;
  
  if(graph.nodes.length >= 1) {
    
    A.push([0, 0, 1]); // node, cost, previous node
    for(let i = 1; i < graph.nodes.length; i ++)
      A.push([i, INF, 1]);
    
    graph.nodes[0].annotation = "(0,1)";
  }
    
}

function dijkstra(delay) {
  
  let currentTime = millis();
  if(abs(currentTime - previousTime) < delay) return;
  else previousTime = currentTime;
  
  if(started && A.length > 1) {
    
    // Select pivot
    let pivot = null;
    let index = 0;
    let cost = INF;
    
    for(let i = 0; i < A.length; i ++) {
      
      let node = A[i];
      let currentCost = node[1];
      
      if(currentCost < cost) {
        index = i;
        pivot = node;
        cost = currentCost;
      }
    }
    
    if(pivot != null) {
      
      // Select pivot
      graph.nodes[pivot[0]].selected = true;
      
      // Remove pivot
      A.splice(index, 1);
      
      let edgeExist = false;
      for(let i = 0; i < graph.edges.length; i ++) {
        
        let edge = graph.edges[i];
        if(edge.node1.value == pivot[0] + 1)
          edgeExist = true;
      }
      
      if(!edgeExist)
        return;
      
      // Update costs
      for(let i = 0; i < A.length; i ++) {
        
        let node = A[i];
        let newCost = node[1];
        let previous = node[2];
        
        let exist = false;
        for(let j = 0; j < graph.edges.length; j ++) {

          let edge = graph.edges[j];

          // Edge between node and pivot exist
          if(edge.node1.value == pivot[0] + 1 && edge.node2.value == node[0] + 1) {

            let c = cost + edge.weight;
            if(c < node[1]) {
              newCost = c;
              previous = pivot[0];
            }
            
            break;
          }
            
        }
        
        node[1] = newCost;
        node[2] = previous;
        
        let costStr = node[1] == INF ? "inf" : "" + node[1];
        graph.nodes[node[0]].annotation = "(" + costStr + "," + (node[2] + 1) + ")";
      }
      
    }
    
  }else if(started && A.length == 1) {
    for(let i = 0; i < graph.nodes.length; i ++)
      graph.nodes[i].selected = false;
  }
  else
    started = false;
}

function reset() {
  
  started = false;
  
  for(let i = 0; i < graph.nodes.length; i ++) {
    graph.nodes[i].selected = false;
    graph.nodes[i].annotation = "";
  }
      
  A = [];
}

function clearAll() {
  
  numNodes = 0;
  graph = new Graph([], []);
  A = [];
  started = false;
}

function changeDelay() {
  
  let input = prompt("Delay in ms", "500");

  if (input != null && input != "")
    delay = parseInt(input);
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  // Init buttons
  newNodeButton.init();
  newEdgeButton.init();
  dijkstraButton.init();
  resetButton.init();
  clearButton.init();
  delayButton.init();
  
  // Init timer
  previousTime = millis();
}

function draw() {
  
  background(250);
  
  // Drag graph nodes
  if(pressed) {
    if(dragNodeIndex > -1)
      graph.nodes[dragNodeIndex].drag(mouseX, mouseY);
  }
  
  // Draw graph
  graph.draw();
  
  // Draw buttons
  newNodeButton.hover(mouseX, mouseY);
  newNodeButton.draw();
  
  newEdgeButton.hover(mouseX, mouseY);
  newEdgeButton.draw();
  
  dijkstraButton.hover(mouseX, mouseY);
  dijkstraButton.draw();
  
  resetButton.hover(mouseX, mouseY);
  resetButton.draw();
  
  clearButton.hover(mouseX, mouseY);
  clearButton.draw();
  
  delayButton.hover(mouseX, mouseY);
  delayButton.draw();
  
  // Draw delay time
  text("Delay: " + delay + " ms", 650, 20);
  
  // Algorithm
  dijkstra(delay);
}

function mousePressed() {
  
  pressed = true;
  
  // Buttons
  newNodeButton.onClick(mouseX, mouseY, newNode);
  newEdgeButton.onClick(mouseX, mouseY, newEdge);
  dijkstraButton.onClick(mouseX, mouseY, startDijkstra);
  resetButton.onClick(mouseX, mouseY, reset);
  clearButton.onClick(mouseX, mouseY, clearAll);
  delayButton.onClick(mouseX, mouseY, changeDelay);
  
  // Graph
  for(let i = 0; i < graph.nodes.length; i ++) {
    if(graph.nodes[i].pressed(mouseX, mouseY))
      dragNodeIndex = i;
  }
}

function mouseReleased() {
  pressed = false;
  dragNodeIndex = -1;
}
