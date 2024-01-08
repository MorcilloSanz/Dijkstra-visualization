function Button(x, y, width, height, label) {
  
  this.x = x;
  this.y = y;
  
  this.width = width;
  this.height = height;
  
  this.label = label;
  
  this.initialized = false;
  
  const defaultBackgroundColor = '#c7dfff';
  const defaultForegroundColor = '#00357C';
  const defaultHoverBackgroundColor = '#ffffff';
  const defaultHoverForegroundColor = '#00357C';
  
  let backgroundColor = defaultBackgroundColor;
  let foregroundColor = defaultForegroundColor;
  
  this.init = function() {
    
    textFont('Courier New');
    
    // Label height
    this.labelHeight = height - 5;
    textSize(this.labelHeight);

    // Label width
    this.labelWidth = textWidth(label);

    while(this.labelWidth > width) {  
      label = label.substring(0, label.length - 1);
      this.labelWidth = textWidth(label);
    }
    
    // Label coords
    this.labelX = (width - this.labelWidth) / 2;
    this.labelY = (height - this.labelHeight) / 2;
    
    this.initialized = true;
  }
  
  this.onClick = function(x, y, fun) {
    if(x > this.x && x < this.x + this.width &&
      y > this.y && y < this.y + this.height) {
      fun();
    }
  }
  
  this.hover = function(x, y) {
    
    if(x > this.x && x < this.x + this.width &&
      y > this.y && y < this.y + this.height) {
      backgroundColor = defaultHoverBackgroundColor;
      foregroundColor = defaultHoverForegroundColor;
    }else{
      backgroundColor = defaultBackgroundColor;
      foregroundColor = defaultForegroundColor;
    }
  }
  
  this.draw = function() {
    if(this.initialized) {
      fill(backgroundColor);
      stroke(foregroundColor);
      rect(this.x, this.y, this.width, this.height);
      fill(foregroundColor);
      noStroke();
      text(label, this.x + this.labelX, this.y + this.labelHeight - this.labelY);
    }
  }
}