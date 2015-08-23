Enemy.prototype = new Character
Enemy.prototype.constructor = Enemy

function Enemy(position, world, speed){
	this.dimension = 10
	var real_position = tileToPoint(position, world.tile_size)
	Character.call(this, position, world)
	this.speed.x = speed
}

Enemy.prototype.updatePhysics = function(t){

    var x_position = updateMRU(this.position.x, this.speed.x, 1)
    
    var can_move = this.world.checkMovement(this.getSquarePoints(x_position, this.position.y, this.world.tile_size))

    if(this.speed.x > 0){
    	if(can_move["up right"] && can_move["down right"])
	       this.position.x = x_position
	    else
	    	this.position.x = Math.floor((this.position.x+this.dimensions)/this.world.tile_size)*this.world.tile_size-this.dimensions
    }
	else
		if(can_move["up left"] && can_move["down left"])
	       this.position.x = x_position
	   else
	    	this.position.x = Math.floor((this.position.x-this.dimensions+1)/this.world.tile_size)*this.world.tile_size + this.dimensions
   
    /*Comprobar que no esta callendo*/
    can_move = this.world.checkMovement(this.getSquarePoints(this.position.x, this.position.y, this.world.tile_size))
    if(can_move["down right"] && can_move["down left"])
    	   this.speed.x *= -1
}

Enemy.prototype.draw = function(ctx){
    ctx.beginPath()
    ctx.fillStyle  = 'red'
    ctx.arc(this.position.x, this.position.y, this.dimension, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()
}

