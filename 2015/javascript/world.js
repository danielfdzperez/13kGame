function World(canvas, map, conf_map, type_tiles, tile_size){
	this.canvas      = document.getElementById(canvas)
	this.ctx         = this.canvas.getContext('2d')
	this.type_tiles  = type_tiles
	this.tile_size   = tile_size
	this.map         = new Map(map, conf_map, type_tiles, this.tile_size, this)
	this.player      = new Player(new Point(0,0), this)
	//this.enemy       = enemy || []
	this.delta       = new FrameRateCounter(60)
	this.event       = new Events()
}

World.prototype.start = function(){
	this.event.enableInputs()
	this.newLevel(true)
	this.loop()
}

World.prototype.newLevel = function(start){
	if(!start)
	   this.map.changeCurrentMap()
	this.player.stop()
	this.restartPlayerPosition()
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
	var that = this
	setTimeout(function(){that.loop()},10)
}

World.prototype.draw = function(){
	canvas.width = canvas.width

	var tile_player_position = pointToTile(this.player.position, this.tile_size)

	var fix_y = 0
    if(tile_player_position.y < this.map.halfVisibility())
    	fix_y = tile_player_position.y - this.map.halfVisibility()
    else 
    	if(tile_player_position.y >= this.map.length() - this.map.halfVisibility() - 1)
    	    fix_y = tile_player_position.y + 1 + this.map.halfVisibility() - this.map.length()

    var difference_to_player = null
    var dy = fix_y > 0 ? fix_y - 1 : fix_y 
    //if(fix_y > 0 &&  this.map.length() > this.canvas.height/this.tile_size)
    	//dy --
    
    if(fix_y != 0)
       difference_to_player = ((this.map.halfVisibility() - tile_player_position.y) + dy)*50
   	else
   	   difference_to_player = (this.map.halfVisibility() - this.player.position.y/50)*50

	this.map.drawScroll(this.ctx, this.player.position, difference_to_player, fix_y)
	
	this.player.draw(this.ctx, difference_to_player)
}

World.prototype.update = function(delta_time){
	//this.enemy[this.map.n_current_map].updatePhysics(delta_time)
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
	var obj = this.player.getSquarePoints(this.player.position.x, this.player.position.y, this.tile_size)
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
	var position = this.player.getSquarePoints(this.player.position.x, this.player.position.y, this.tile_size)
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
	var obj = this.checkMovement(this.player.getSquarePoints(this.player.position.x, this.player.position.y, this.tile_size))
	for (var i in obj)
		if(!obj[i])
			return true
	return false
}