function LaserPart(orientation = LaserPart.no_direction){
    this.orientation = orientation
    this.exist = true //false
}

LaserPart.up = UP
LaserPart.down = DOWN
LaserPart.right = RIGHT
LaserPart.left = LEFT
LaserPart.no_direction = NONE

LaserPart.prototype.copy = function(laser_part){
    this.orientation = laser_part.orientation
    this.exist = laser_part.exist
}

LaserPart.prototype.get_numeric_orientation = function(){
    var orientation = {"x":0,"y":0}
    switch(this.orientation){
	case LaserPart.up:
	    orientation.y = -1
	break;
	case LaserPart.down:
	    orientation.y = 1
	break;
	case LaserPart.right:
	    orientation.x = 1
	break;
	case LaserPart.left:
	    orientation.x = -1
	break;
    }
    return orientation
}

LaserPart.prototype.draw = function(ctx,color,shadow_color){

    if(!this.exist)
	return

    ctx.save()
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.shadowColor = shadow_color
    ctx.shadowBlur = 10
    ctx.lineWidth = 5
    ctx.moveTo(0, 0);
    ctx.lineTo(Tile.size/2, 0);
    ctx.stroke();
    ctx.restore()


}

LaserPart.prototype.opositeDirections = function(laser_part){
    return opositeDirections(this.orientation,laser_part.orientation)
}

LaserPart.prototype.noExist = function(){
    this.exist = false
}

LaserPart.prototype.nowExist = function(){
    this.exist = true
}

LaserPart.prototype.sameOrientation = function(part){

    if(this.exist == false || part.exist == false)
	return false

    return ((this.orientation == LaserPart.up ||  this.orientation == LaserPart.down) && 
	    (part.orientation == LaserPart.up ||  part.orientation == LaserPart.down)) 
	||
	((this.orientation == LaserPart.right ||  this.orientation == LaserPart.left) && 
	    (part.orientation == LaserPart.right ||  part.orientation == LaserPart.left)) 
}

function Laser(type = null,orientation = LaserPart.no_direction,tile = null){
    this.part1= new LaserPart(orientation)
    this.part2= new LaserPart(orientation)
    this.teleported = false
    this.spread = false
    this.on = true //false
    this.teleport_to = null //This Doesnt have an use
    this.next_laser = null
    this.tile = tile
    this.id = Laser.id ++
    this.type = type
    this.shadow = Laser.selectShadow(type)
}

Laser.selectShadow = function(type){
    let shadow_color = null
    switch(type){
	case Laser.type1:
	    shadow_color = Laser.type1Shadow
	    break;
	case Laser.type2:
	    shadow_color = Laser.type2Shadow
	    break;
    }
    return shadow_color
}

Laser.id = 0
Laser.type1 = "green"
Laser.type1Shadow = "#00ff08"
Laser.type2 = "red"
Laser.type2Shadow = "#ff7800"

Laser.prototype.destroy = function(){
    //Put the laser off, reconfigure the lasers in its tile and destroy the next part of the laser
    this.on = false
    this.tile.reconfigureLasers()
    if(this.next_laser != null)
	this.next_laser.destroy()
    this.next_laser = null
}

Laser.prototype.complete = function(){
    this.part1.nowExist()
    this.part2.nowExist()
}

Laser.prototype.isOff = function(){
    return !this.on    
}

Laser.prototype.isOn = function(){
    return this.on
}

Laser.prototype.equals = function(other_laser){
    return this.id == other_laser.id
}

Laser.prototype.switchOn = function(){
    this.on = true
}
Laser.prototype.switchOff = function(){
    this.on = false
}

Laser.prototype.draw = function(ctx,x,y){

    if(!this.on)
	return

    ctx.save()
    ctx.translate(x,y)

    if(this.part1.exist && this.part2.exist && this.part1.sameOrientation(this.part2)){
	ctx.save()
	ctx.beginPath();
	ctx.strokeStyle = this.type
	ctx.shadowColor = this.shadow
	ctx.shadowBlur = 10
	ctx.lineWidth = 5
	switch(this.part1.orientation){
	    case LaserPart.up:
	    case LaserPart.down:
		ctx.moveTo(Tile.size/2,0);
		ctx.lineTo(Tile.size/2,Tile.size);
		break;
	    case LaserPart.right:
	    case LaserPart.left:
		ctx.moveTo(0,Tile.size/2);
		ctx.lineTo(Tile.size,Tile.size/2);
		break;
	}
	ctx.stroke();
	ctx.restore()
    }
    else{
	ctx.save()
	ctx.translate(Tile.size/2,Tile.size/2)
	let rotation = 0
	if(this.part1.exist){
	    switch(this.part1.orientation){
		case LaserPart.up:
		    rotation = 90
		    break;
		case LaserPart.down:
		    rotation = 270
		    break;
		case LaserPart.right:
		    rotation = 180
		    break;
	    }
	    ctx.save()
	    ctx.rotate(rotation*Math.PI/180)
	    this.part1.draw(ctx,this.type,this.shadow)
	    ctx.restore()
	}

	if(this.part2.exist){
	    ctx.save()
	    rotation = 0
	    switch(this.part2.orientation){
		case LaserPart.up:
		    rotation = 270
		    break;
		case LaserPart.down:
		    rotation = 90
		    break;
		case LaserPart.left:
		    rotation = 180
		    break;
	    }
	    ctx.rotate(rotation*Math.PI/180)
	    this.part2.draw(ctx,this.type,this.shadow)
	    ctx.restore()
	}
	ctx.restore()
    }

    ctx.restore()
}

Laser.prototype.changeOrientation = function(orientation_part1,orientation_part2 = orientation_part1){
    this.part1.orientation = orientation_part1
    this.part2.orientation = orientation_part2
}

Laser.prototype.isComplete = function(){
    return this.part1.exist && this.part2.exist
}

Laser.prototype.straight = function(){
    return this.part2.sameOrientation(this.part1)
}

Laser.prototype.reconfigure = function(laser,teleported = false){
    this.teleported = teleported
    this.spread = true
    this.on = true
    this.type = laser.type
    this.shadow = Laser.selectShadow(laser.type)
    laser.next_laser = this
    this.part1.copy(laser.part1)
    this.part2.copy(laser.part2)
    if(teleported){
	this.part1.exist = false
	this.part2.exist = true
    
	//if(laser.part1.exist)
	//    this.part1.exist = false
    	//else
	//    this.part2.exist = false
	    
    }
}

Laser.prototype.noExist = function(){
    this.part1.noExist()
    this.part2.noExist()

}

Laser.prototype.nowExist = function(){
    this.part1.nowExist()
    this.part2.nowExist()

}

Laser.prototype.configurationBetweenLaseres = function(laser){
    if(this.isOff() || laser.isOff())
	return
    
    let orientation_parts1 = this.part1.sameOrientation(laser.part1)
    let orientation_part2_part1 = this.part2.sameOrientation(laser.part1)
    let orientation_parts2 = this.part2.sameOrientation(laser.part2)
    let orientation_part1_part2 = this.part1.sameOrientation(laser.part2)


    /*
     *  -------
     *     |
     *     |
     */
    if(this.isComplete() && laser.isComplete() && !orientation_parts1)
	laser.part2.exist = false
    

    if(!this.isComplete() && !this.teleported && !laser.teleported && orientation_parts1)
	laser.part2.exist = false

    if(laser.teleported && laser.part2.opositeDirections(this.part1))
	laser.part2.exist = false

    if(this.isComplete() && !laser.teleported && (orientation_parts1 || orientation_part1_part2 || orientation_parts2 || orientation_part2_part1) ){
	laser.part1.exist = false
	laser.part2.exist = false
    }


}

//TODO
Laser.prototype.spreadAction = function(){

}
