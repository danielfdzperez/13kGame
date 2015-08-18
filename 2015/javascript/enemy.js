Enemy.prototype = new Character
Enemy.prototype.constructor = Enemy

function Enemy(position, world){
	this.dimension = 10
	var real_position = new Point( (position.x * world.width + world.width/2), (position.y * world.width + world.width/2) )
	Character.call(this, position, world)

}

Enemy.prototype.draw = function(ctx){
    ctx.beginPath()
    ctx.fillStyle  = 'red'
    ctx.arc(this.position.x, this.position.y, this.dimension, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()
}
