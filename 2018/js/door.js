Door.prototype = new GameObject
Door.prototype.constructor = Door

function Door(tile,orientation = Door.horizontal,state = Door.closed){

    GameObject.call(this,"door",tile,this.drawAnimation,this.laserActions,orientation,false,false)
    this.animation = 0 //Animation count
    this.state = state //Actual state
    this.rotation = orientation //Actual rotation
    let self = this
    function conf(){
	if(self.state == Door.open){
	    self.animation = Door.open_size
	    self.walkable = true
	}
	if(self.state == Door.opening)
	    self.animation = Door.open_size
    }
    conf()
}

//States
Door.closed = 0
Door.opening = 1
Door.open = 2
Door.closing = 3

//Orientation
Door.horizontal = 90
Door.vertical = 0

//Size of a door
Door.size = 10
Door.open_size =Tile.size-10
//Half size
Door.half_size = Door.size/2
Door.alignemet = Tile.half_size - Door.half_size

//hide the draw function and call a self draw function that its depends about the state
Door.prototype.drawAnimation = function(ctx){
    this.drawMe(ctx)
    this.updateAnimation()
}

Door.prototype.updateAnimation = function(){
    if(this.state == Door.opening){
	this.laserAction()
	this.animation ++
	if(this.animation == Door.open_size){
	    this.totalOpen()
	}
    }
    if(this.state == Door.closing){
	this.laserAction()
	this.animation --
	if(this.animation == 0)
	    this.totalClosed()
    }
}

Door.prototype.drawMe = function(ctx){

    ctx.save()
    //ctx.translate(Tile.half_size,Tile.half_size)
    //ctx.rotate(this.rotation*Math.PI/180)
    //ctx.translate(-Tile.half_size,-Tile.half_size)
    ctx.translate(Door.alignemet,0)

    grd = ctx.createLinearGradient(0, 10, 10, 10);

    // Add colors
    grd.addColorStop(0.169, 'rgba(216, 216, 216, 1.000)');
    grd.addColorStop(0.500, 'rgba(127, 126, 126, 1.000)');
    grd.addColorStop(0.820, 'rgba(216, 216, 216, 1.000)');

    // Fill with gradient
    ctx.fillStyle = grd;

    ctx.fillRect(0, 0, Door.size, Tile.size-this.animation);
    ctx.restore()

}

//Change the state to opening
Door.prototype.openAction = function(){
    if(this.state == Door.closing || this.state == Door.closed)
	this.state = Door.opening
}

//Change the state to closing
Door.prototype.closeAction = function(){
    if(this.state == Door.opening || this.state == Door.open)
	this.state = Door.closing
}

//Action of the door with the lasers. At any stage.
Door.prototype.laserActions = function(laser = this.tile.getOnLaseres()){
    if(!Array.isArray(laser))
	laser = [laser]
    //Si esta abriendose y llega a la mitad se reconfiguran los lasers desde aqui. Cuando exceda un poco de la mitad ya no es necesario
    if(this.state == Door.opening && this.animation > Tile.half_size && this.animation < Tile.half_size+3){
	this.tile.reconfigureLasers()	
    }

    if((this.state == Door.closed || this.state == Door.closing) && this.animation <= Tile.half_size)
	for(let i in laser){
	    laser[i].part2.noExist()
	    laser[i].part1.nowExist()
	}
}

//Actions when the state change to cosed
Door.prototype.totalClosed = function(){
    this.state = Door.closed
    this.animation = 0 
    this.walkable = false
    this.tileConfiguration()
    //this.laserAction()
}
//Actions when the state change to open
Door.prototype.totalOpen = function(){
    this.animation = Door.open_size
    this.state = Door.open
    this.walkable = true
    this.tileConfiguration()
    //this.laserAction()
}

