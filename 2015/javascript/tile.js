function Tile(walkable, color, width, height, lethal, reverse){
	this.walkable = walkable
	this.color       = color
	this.width       = width
	this.height      = height
	this.is_reversed = false
	this.is_lethal   = lethal
	this.reverse     = reverse || this
}

Tile.prototype.draw = function(ctx, y, x){
	if(!this.is_reversed)
		this.drawMe(ctx, y, x)
	else
		this.drawReverse(ctx, y, x)
}

Tile.prototype.drawMe = function(ctx, y, x){
      ctx.strokeStyle = 'black'
      ctx.lineWidth  = 1
      ctx.strokeRect(x*this.width, y*this.height, this.width, this.height)

	  ctx.fillStyle = this.color
      ctx.fillRect(x*this.width, y*this.height, this.width, this.height)
}

Tile.prototype.drawReverse = function(ctx, y, x){
	this.reverse.drawMe(ctx,y,x)
}

Tile.prototype.isWalkable = function(){
	if(!this.is_reversed)
		return this.imWalkable()
	else
		return this.isWalkableReverse()
}

Tile.prototype.imWalkable = function(){
	return this.walkable
}

Tile.prototype.isWalkableReverse = function(){
	return this.reverse.imWalkable()
}

Tile.prototype.isLethal = function(){
	if(!this.is_reversed)
		return this.imLethal()
	else
		return this.isLethalReverse()
}

Tile.prototype.imLethal = function(){
	return this.is_lethal
}

Tile.prototype.isLethalReverse = function(){
	return this.reverse.imLethal()
}