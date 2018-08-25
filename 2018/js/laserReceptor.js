
LaserReceptor.prototype = new GameObject
LaserReceptor.prototype.constructor = LaserReceptor


function LaserReceptor(activate = doNothing,deactivate = doNothing,laser_type = Laser.type1,orientation = UP,tile = null){
    GameObject.call(this,"LR",tile,this.drawExtra,this.laserActions,orientation,false,false)
    this.laser_type = laser_type
    this.activate = false
    this.activateAction = activate
    this.deactivateAction = deactivate
}

ACTIVATE = true
DEACTIVATE = false

LaserReceptor.prototype.drawExtra = function(ctx){

    ctx.fillStyle = "grey"
    //Walls
    ctx.fillRect(0, Tile.size-10, Tile.size, 10)
    ctx.fillRect(0, 0, 10, Tile.size)
    ctx.fillRect(Tile.size-10, 0, 10, Tile.size)
    //Triangle
    if(this.activate)
	ctx.filter = "brightness(200%)"
    ctx.beginPath()
    ctx.fillStyle = this.laser_type
    ctx.moveTo(Tile.half_size-5,Tile.size-10)
    ctx.lineTo(Tile.half_size+5,Tile.size-10)
    ctx.lineTo(Tile.size-10,Tile.half_size-10)
    ctx.lineTo(10,Tile.half_size-10)
    ctx.fill()


}

LaserReceptor.prototype.laserActions = function(laser){
    let flag = false
    for(let l in laser)
	if(!opositeDirections(laser[l].part1.orientation,this.orientation))
	    laser[l].noExist()
    	else{
	    flag = true
	    this.laserDetection(laser[l])
	}
    if(!flag)
	this.changeState(DEACTIVATE)

}

//Activate is boolean. True is activate False deactivate
LaserReceptor.prototype.changeState = function(activate){
    if(activate){
	this.activate = true
	this.activateAction()
    }else{
	this.activate = false
	this.deactivateAction()
    }
}

LaserReceptor.prototype.laserDetection = function(laser){
    if(laser.type != this.laser_type){
	this.changeState(DEACTIVATE)
	laser.part2.noExist()
    }else
	this.changeState(ACTIVATE)
}
