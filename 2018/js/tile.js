function Tile(x,y,walkable = true,laser = true,draw_me = null){
    this.walkable = walkable
    this.transitable = true
    this.object = null
    this.laser = []
    this.accept_laser = laser
    this.player = false
    this.drawMe = draw_me
    this.pos_x = x*Tile.size
    this.pos_y = y*Tile.size
    this.tile_x = x
    this.tile_y = y
    this.my_walkable = walkable
    this.my_transitable = true

}

Tile.size = 50
Tile.half_size = Tile.size/2

Tile.prototype.reconfigure = function(){
    this.walkable = this.my_walkable
    this.transitable = this.my_transitable
}

Tile.prototype.hasObject = function(){
    return this.object != null
}

Tile.prototype.draw = function(ctx){
    ctx.save()
    ctx.translate(this.pos_x,this.pos_y)
    if(this.drawMe == null){
	 //Create gradient
	 var grd = ctx.createLinearGradient(0,0,50,90)
	 //var grd = ctx.createLinearGradient(x*Tile.size,y*Tile.size,x*Tile.size+50,y*Tile.size+90)
	 grd.addColorStop(0,"#333");
	 grd.addColorStop(1,"#AAA");
	 

	 // Fill with gradient
	 ctx.fillStyle = grd;
	 //ctx.fillRect(x*Tile.size,y*Tile.size,Tile.size,Tile.size);
	 ctx.fillRect(0,0,Tile.size,Tile.size);
	 //ctx.stroke()
	ctx.save()
	ctx.strokeStyle="black"
	ctx.lineWidth = 2;
	 //ctx.strokeRect(x*Tile.size,y*Tile.size,Tile.size,Tile.size)
	 ctx.strokeRect(0,0,Tile.size,Tile.size)
	 //ctx.stroke()
	ctx.restore()

	 ctx.beginPath();
	 ctx.strokeStyle="white"

	 ctx.moveTo(2,1);
	 //ctx.moveTo(x*Tile.size+2,y*Tile.size+1);
	
	 ctx.lineTo(2,Tile.size-1);
	 //ctx.lineTo(x*Tile.size+2, Tile.size*y + Tile.size-1);
	
	 ctx.moveTo(2,2);
	 //ctx.moveTo(x*Tile.size+2, y*Tile.size+2);
	
	 ctx.lineTo(Tile.size-1,2);
	 //ctx.lineTo(Tile.size*x + Tile.size-1, y*Tile.size+2);
	
	 ctx.stroke()
    }else
	drawMe(this,ctx)
    
    ctx.restore()
}

Tile.prototype.setPosition = function(x,y){
    this.pos_x = x*Tile.size
    this.pos_y = y*Tile.size
}

Tile.prototype.drawLaser = function (ctx){
    //ctx.save()
    //ctx.translate(this.pos_x,this.pos_y)
    //if(this.laser.isOn())
    for(let i = this.laser.length-1; i >=0; i--)
    	this.laser[i].draw(ctx,this.pos_x,this.pos_y)
    //ctx.restore()
}

Tile.prototype.drawObject = function(ctx){
    //ctx.save()
    //ctx.translate(this.pos_x,this.pos_y)
    if(this.hasObject())
	this.object.draw(ctx,this.pos_x,this.pos_y)
    //ctx.restore()
}

Tile.prototype.addObject = function(obj){
    //if(this.object != null)
	//throw "ya tiene objeto"
    if(this.hasObject() )
	return
    this.object = obj
    this.object.tileConfiguration(this)
    this.object.laserAction(this.laser)
}

Tile.prototype.removeObject = function(){
    let obj = this.object
    this.object.tile = null
    this.object = null
    this.reconfigureLasers()
    return obj
}

Tile.prototype.numberOfLasersOn = function(){
    var n = 0;

    this.laser.forEach((laser)=>{
    //for (laser in this.laser)
	if(laser.isOn())
	    n ++;
    })
    return n
}

Tile.prototype.getOffLaser = function(){
    if(this.laser.length < 4){
	this.laser.push(new Laser(null,NONE,this))
	return this.laser.slice(-1)[0] 
    }

    //for(l in this.laser)
    
    for(let i in this.laser)
	if(this.laser[i].isOff())
	    return this.laser[i]

    return null
}

Tile.prototype.getOnLaseres = function(){
    return this.laser.filter(laser => laser.isOn());
}

Tile.prototype.addLaser = function(laser_incoming,teleported = false){
    //Si no acepta laser no configura
    if(!this.accept_laser)
	return
    if(this.numberOfLasersOn() >= 4)
	return
    let laser = this.getOffLaser()
    laser.reconfigure(laser_incoming,teleported)

    this.laser.forEach((l)=>{
	if(l != laser)
	    l.configurationBetweenLaseres(laser)
    })

    if(this.hasObject())
	this.object.laserAction(laser)
    laser.spreadAction()
}

Tile.prototype.reconfigureLasers = function(with_obj = true){
    //Get on lasers
    let laser = this.getOnLaseres()
    //Complete all the lasers
    for(let l in laser)
	laser[l].complete()

    this.configurationBetweenLasers(laser)

    if(this.hasObject() && with_obj)
	this.object.laserAction(laser)

    //Spread the lasers if it can do it
    for(let l in laser)
	laser[l].spreadAction()
}

//Compare all the lasers for its configuration
Tile.prototype.configurationBetweenLasers = function(laser = this.getOnLaseres()){
    for(let l = 0; l<laser.length; l++){
	for(let i = l+1; i < laser.length; i++)
	    laser[l].configurationBetweenLaseres(laser[i])
    }
}
