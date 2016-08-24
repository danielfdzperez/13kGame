function Map(map, tile_type, tile_dimensions, game-object, world){
	this.tile_type            = tile_type /*Type of tyles*/
	this.map                  = map
	this.tile_dimensions      = tile_dimensions
        this.game_object          = game_object //game_object array
	this.world                = world
}

Map.prototype.visibleTiles = function(dimension){
        
	var map_dimensions;
        var canvas_dimension;
        switch(dimension){
	    case "height":
                map_dimensions = this.height()
                canvas_dimension = this.world.canvas.height
            break;
            case "width":
                map_dimensions = this.width();
                canvas_dimension = this.world.canvas.width
            break;
        }
	canvas_dimension = Math.floor(canvas_dimension/this.tile_dimensions)
	return  map_dimensions <= canvas_dimension ? map_dimensions : canvas_dimension
}

Map.prototype.halfVisibility = function(dimension){
	return Math.floor(this.visibleTiles(dimension)/2)
}

/*Return height of the map*/
Map.prototype.height = function(){
	return this.map.length
}

/*Return width of the map*/
Map.prototype.width = function(){
	return this.map[0].length
}

/*TODO scroll en x*/
Map.prototype.drawScroll = function(ctx, player_position, distance_to_player, fix_y, fix_x){
    var tile_player_position = pointToTile(player_position, this.tile_dimensions)

    var first_y_tile = Math.max(0,tile_player_position.y - this.halfVisibility("height") - fix_y)
    var last_y_tile = Math.min(this.height(),tile_player_position.y + this.halfVisibility("height") + 1 - fix_y)

    var first_x_tile = Math.max(0,tile_player_position.x - this.halfVisibility("width") - fix_x)
    var last_x_tile = Math.min(this.width(),tile_player_position.x + this.halfVisibility("width") + 1 - fix_x)
    
    for(var i = first_y_tile; i < last_y_tile; i++){
       /*if(i < 0 || i > this.current_map.length-1)
       	 alert(i)	*/
       for(var j = first_x_tile; j < last_x_tile; j++){
          this.tiles_type[this.map[i][j]].draw(ctx, i, j, distance_to_player)
       }
    }
}

Map.prototype.isWalkable = function(y, x){
	return  this.tiles_type[this.map[y][x]].isWalkable()
}
