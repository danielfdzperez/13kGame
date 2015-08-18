function Character(position, world){
	this.world      = world
	this.position   = position ||new Point(0,0)
	this.speed      = new Point(0,0)
	this.dimensions = 5
}

Character.prototype.getSquarePoints = function(x, y, width, height){
	var obj = {}
	obj["down"]  = Math.floor((y+this.dimensions-1)/height)
	obj["up"]    = Math.floor((y-this.dimensions)/height)
	obj["left"]  = Math.floor((x-this.dimensions)/width)
	obj["right"] = Math.floor((x+this.dimensions-1)/width)
	return obj
}