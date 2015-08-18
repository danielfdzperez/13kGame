function World(canvas, map, conf_map, type_tiles, width, height){
	this.canvas      = document.getElementById(canvas)
	this.ctx         = this.canvas.getContext('2d')
	this.type_tiles  = type_tiles
	this.width       = width
	this.height      = height
	this.map         = new Map(map, conf_map, type_tiles, this.width)
	this.player      = new Player(new Point(0,0), this)
	this.delta       = new FrameRateCounter(60)
	this.event       = new Events() 
}

World.prototype.start = function(){
	this.event.enableInputs()
	this.newLevel(true)
	//this.loop()
}

World.prototype.newLevel = function(start){
	if(!start)
	   this.map.changeCurrentMap()
	this.player.stop()
	this.restartPlayerPosition()
	//alert("fin del nivel")
}

World.prototype.restartPlayerPosition = function(){
	 var position = this.map.getStartPoint()
	 this.player.position.x = position.x
	 this.player.position.y = position.y
}

World.prototype.restarLevel = function(){
	this.map.restart()
	this.restartPlayerPosition()
}

World.prototype.loop = function(){
	this.delta.count_frames() 
    var delta_time = this.delta.step

	this.update(delta_time)
	this.draw()
}

World.prototype.draw = function(){
	canvas.width = canvas.width
	this.map.draw(this.ctx)
	this.player.draw(this.ctx)
}

World.prototype.update = function(delta_time){
	this.player.events(this.event)
	this.player.updatePhysics(delta_time)
	if(!this.chekPlayerAlive())
		this.restarLevel()
	if(this.checkPlayerInsideWalkableTile())
		this.restarLevel()
	if(this.checkEndLevel())
		this.newLevel(false)
}

World.prototype.checkEndLevel = function(){
	var obj = this.player.getSquarePoints(this.player.position.x, this.player.position.y, this.width, this.height)
	var end_tile = this.map.getEndTile()
	if(obj.up == end_tile.y && obj.right == end_tile.x || obj.up == end_tile.y && obj.left == end_tile.x ||
		obj.down == end_tile.y && obj.right == end_tile.x ||obj.down == end_tile.y && obj.left == end_tile.x)
		return true
	return false
}

World.prototype.checkMovement = function(position){
    var obj = {}
    obj["up right"]   = this.map.isWalkable(position.up,   position.right)  
    obj["up left"]    = this.map.isWalkable(position.up,   position.left)
    obj["down right"] = this.map.isWalkable(position.down, position.right)  
    obj["down left"]  = this.map.isWalkable(position.down, position.left)  
    return obj
}

World.prototype.chekPlayerAlive = function(){
	var position = this.player.getSquarePoints(this.player.position.x, this.player.position.y, this.width, this.height)
	var obj = {}
    obj["up right"]   = this.map.isLethal(position.up,   position.right)  
    obj["up left"]    = this.map.isLethal(position.up,   position.left)
    obj["down right"] = this.map.isLethal(position.down, position.right)  
    obj["down left"]  = this.map.isLethal(position.down, position.left)  
    for(var i in obj)
    	if(obj[i])
    		return false
    return true
}

World.prototype.checkPlayerInsideWalkableTile = function(){
	var obj = this.checkMovement(this.player.getSquarePoints(this.player.position.x, this.player.position.y, this.width, this.height))
	for (var i in obj)
		if(!obj[i])
			return true
	return false
}