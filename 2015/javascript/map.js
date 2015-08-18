function Map(map, conf, tile, tile_dimensions){
	if(!conf)
		throw "Error map conf"
	this.tiles_type           = tile /*Type of tyles*/
	this.map                  = map /*Array of maps*/
	this.current_map          = this.map[0]
	this.n_current_map        = 0
	this.is_reversed_tiles    = false
	this.is_reversed          = false
	this.reverse_map          = null
	this.conf                 = conf
	this.tile_dimensions      = tile_dimensions
	this.createReverseMap()
}

Map.prototype.changeCurrentMap = function(n){
	if((n < this.map.length) || ((this.n_current_map + 1) < this.map.length)){
	   this.restart()
	   this.current_map = this.map[n >= 0 ? this.n_current_map = n : ++this.n_current_map]
	   this.createReverseMap()
	}
}

Map.prototype.draw = function(ctx){
	for(var i = 0; i < this.current_map.length; i++)
    	for(var j = 0; j < this.current_map[i].length; j++)
    		this.tiles_type[this.current_map[i][j]].draw(ctx, i, j)
    var position = this.getEndPoint()
    color = 'purple' 
    ctx.beginPath()
    ctx.fillStyle  = color
    ctx.arc( position.x, position.y, 10, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()

}

Map.prototype.isWalkable = function(y, x){
	return  this.tiles_type[this.current_map[y][x]].isWalkable()
}

Map.prototype.isLethal = function(y, x){
	return  this.tiles_type[this.current_map[y][x]].isLethal()
}

Map.prototype.reverseTiles = function(){
	if(!this.conf[this.n_current_map].reverse_tiles)
		return
	for(var i in this.tiles_type)
        this.tiles_type[i].is_reversed = !this.tiles_type[i].is_reversed
    this.is_reversed_tiles = !this.is_reversed_tiles
}

Map.prototype.createReverseMap = function(){
	this.reverse_map = MultidimensionalArray(this.current_map.length)
	for(var i = 0; i < this.current_map.length; i++)
    	for(var j = this.current_map[i].length-1; j >= 0; j--)
    		if(this.conf[this.n_current_map].non_reverse_tiles.length > 0)
    		   for(var special = 0; special < this.conf[this.n_current_map].non_reverse_tiles.length; special++)
    		      if(this.current_map[i][j] != this.conf[this.n_current_map].non_reverse_tiles[special])
    		         this.reverse_map[i][this.current_map[i].length - 1 - j] = this.current_map[i][j]
    		      else{
    		      	 this.reverse_map[i][this.current_map[i].length - 1 - j] = this.reverse_map[i][j]
    		   	     this.reverse_map[i][j] = this.current_map[i][j]
    		      }
    		else
    			this.reverse_map[i][this.current_map[i].length - 1 - j] = this.current_map[i][j]
}

Map.prototype.reverseMap = function(){
	if(!this.conf[this.n_current_map].reverse_map)
		return
	var aux = this.current_map
	this.current_map = this.reverse_map
	this.reverse_map = aux
	this.is_reversed = !this.is_reversed
}

Map.prototype.restart = function(){
	if(this.is_reversed)
		this.reverseMap()
	if(this.is_reversed_tiles)
		this.reverseTiles()
}

Map.prototype.getStartPoint = function(){
	return tileToPoint(this.conf[this.n_current_map].start_tile, this.tile_dimensions)
}
Map.prototype.getStartTile = function(){
	return this.conf[this.n_current_map].start_tile
}

Map.prototype.getEndPoint = function(){
	return tileToPoint(this.conf[this.n_current_map].end_tile, this.tile_dimensions)
}

Map.prototype.getEndTile = function(){
	return this.conf[this.n_current_map].end_tile
}