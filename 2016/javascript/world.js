function World(canvas){
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.map = []
    this.map[0] = [new Tile(true,30,'green'),new Tile(false,30,'red')  ,new Tile(true,30,'green'),new Tile(true,30,'green')]
    this.map[1] = [new Tile(true,30,'green'),new Tile(true,30,'green')  ,new Tile(true,30,'green'),new Tile(false,30,'red')]
    this.map[2] = [new Tile(true,30,'green'),new Tile(true, 30,'green'),new Tile(true,30,'green'),new Tile(true,30,'green')]
    this.map[3] = [new Tile(true,30,'green'),new Tile(false, 30,'red') ,new Tile(true,30,'green'),new Tile(true,30,'green')]
    this.width = 4
    this.height = 4
    
    
}

World.prototype.isWalkable = function(position){
    return this.map[position.y][position.x].isWalkable()
}

/*CHANGE*/
World.prototype.draw = function(){
    for(var i=0; i<this.map.length; i++)
	for(var j=0; j<this.map[0].length; j++)
	    this.map[i][j].draw(this.ctx,i,j,new Point(0,0))
}

World.prototype.drawPath = function(path){
  for( i in path){
      this.ctx.fillStyle = 'blue'//this.color
      this.ctx.fillRect(path[i].position.x*30, path[i].position.y*30, 30, 30)
      this.ctx.strokeStyle = 'black'
      this.ctx.lineWidth  = 0.8
      this.ctx.strokeRect(path[i].position.x*30, path[i].position.y*30, 30, 30)
  }
}
