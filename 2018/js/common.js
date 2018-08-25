Array.prototype.clear = function(){
    this.splice(0,this.length)
}

Object.defineProperty(Array.prototype, 'clear', {
      enumerable: false
})


function doNothing(){}
var UP = 1
var DOWN = 2
var RIGHT = 4
var LEFT = 3
var NONE = 0

function opositeDirections(dir1,dir2){
    return (dir1 == UP && dir2 == DOWN) || (dir1 == DOWN && dir2 == UP) || (dir1 == RIGHT && dir2 == LEFT) || (dir2 == RIGHT && dir1 == LEFT)
}

function rotation(orientation){
    let angle = 0
    switch(orientation){
	case UP:
	    angle = 0
	    break;
	case DOWN:
	    angle = 180
	    break;
	case RIGHT:
	    angle = 90
	    break;
	case LEFT:
	       angle = 270
	    break;
    }
    return angle
}

//TODO hacer alguna accion cuando el usuario entra en el tile. Coge la caja
//Hacer bonita la caja
function createBox(tile = null){
    var size = 25
    var half_size = 25/2
    function draw(ctx){
	ctx.fillStyle = "green";
	ctx.fillRect(Tile.half_size-half_size, Tile.half_size-half_size, size, size);
    }
    function laserAction(laser){
	for(let i in laser){
	    laser[i].part2.noExist()
	    laser[i].part1.nowExist()
	}
    }
    return new GameObject("box",tile,draw,laserAction)

}

function createMirror(orientation = UP, tile = null){
    //TODO hacer bonito
    function d(ctx){
	//ctx.save()
	//ctx.translate(Tile.half_size,Tile.half_size)
	//ctx.rotate(this.rotation*Math.PI/180)
	//ctx.translate(-Tile.half_size,-Tile.half_size)
	ctx.beginPath()
	ctx.moveTo(0,Tile.size)
	ctx.lineTo(0,0)
	ctx.lineTo(Tile.size,Tile.size)
	ctx.fill()
	//ctx.restore()
    }
    function forbbiden(){
	this.forbidden_directions.clear()
	switch(this.orientation ){
	    case UP:
		this.forbidden_directions.push(UP,RIGHT)
		break;
	    case DOWN:
		this.forbidden_directions.push(DOWN,LEFT)
		break;
	    case RIGHT:
		this.forbidden_directions.push(RIGHT,DOWN)
		break;
	    case LEFT:
		this.forbidden_directions.push(UP,LEFT)
		break;



	}
    }
    function lA(laser){
	for(let l in laser)
	    if(this.forbidden_directions.includes(laser[l].part1.orientation)){
		laser[l].noExist()
	    }else{
		switch(this.orientation){
		    case UP:
			if(laser[l].part1.orientation == LEFT)
			    laser[l].part2.orientation = UP
			else
			    laser[l].part2.orientation = RIGHT
			break;
		    case DOWN:
			if(laser[l].part1.orientation == UP)
			    laser[l].part2.orientation = LEFT
			else
			    laser[l].part2.orientation = DOWN
			break;
		    case RIGHT:
			if(laser[l].part1.orientation == LEFT)
			    laser[l].part2.orientation = DOWN
			else
			    laser[l].part2.orientation = RIGHT
			break;
		    case LEFT:
			if(laser[l].part1.orientation == RIGHT)
			    laser[l].part2.orientation = UP
			else
			    laser[l].part2.orientation = LEFT
			break;
		}
		laser[l].nowExist()
	    }
	//this.tile.configurationBetweenLasers()
	this.tile.reconfigureLasers(false)
    }

    return new GameObject("mirror",tile,d,lA,orientation,false,true,forbbiden)
}

function createLaserGenerator(orientation = UP,laser_type = Laser.type1,tile = null){

    let size = 10
    let half_size = size/2
    //TODO hacer bonito
    function d(ctx){
	ctx.fillStyle = "grey";
	//Walls
	ctx.fillRect(0, Tile.size-size, Tile.size, size);
	ctx.fillRect(0, 0, size, Tile.size);
	ctx.fillRect(Tile.size-size, 0, size, Tile.size);
	//Triangle
	ctx.beginPath()
	ctx.fillStyle = laser_type;
	ctx.moveTo(10,Tile.size-size)
	ctx.lineTo(Tile.half_size,Tile.half_size-5)
	ctx.lineTo(Tile.size-10,Tile.size-size)
	ctx.fill()
    		
    }

    function lA(laser){
	for(l in laser){
	    if((laser[l].part1.exist && laser[l].part1.orientation == this.orientation) || laser[l].part1.orientation != this.orientation)
		laser[l].noExist()
	}
    }

    function conf(){
	this.tile.laser.clear()
	let laser = new Laser(laser_type,this.orientation)
	laser.part1.noExist()
	this.tile.addLaser(laser)
    }

    return new GameObject("generator",tile,d,lA,orientation,false,false,doNothing,conf)

}
