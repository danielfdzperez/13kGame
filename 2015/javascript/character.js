function Character(position, world){
	this.world      = world
	this.position   = position ||new Point(0,0)
	this.speed      = new Point(0,0)
	this.dimensions = 5
}

Character.prototype.getSquarePoints = function(x, y, tile_size){
	var obj = {}
	obj["down"]  = Math.floor((y+this.dimensions-1)/tile_size)
	obj["up"]    = Math.floor((y-this.dimensions)/tile_size)
	obj["left"]  = Math.floor((x-this.dimensions)/tile_size)
	obj["right"] = Math.floor((x+this.dimensions-1)/tile_size)
	return obj
}