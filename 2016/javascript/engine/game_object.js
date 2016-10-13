/**
 * sprite : map of sprites
 * sound  : map of sound names
*/ 
function GameObject(world, position, sprite, speed){
    this.world              = world
    this.position           = position
    this.speed              = speed //|| new Vector(0)
    this.id                 = GameObject.id++
    //this.collision_detector = collision_detector || []
    //this.sprite             = sprite || new Map()
    //this.state              = new State(this)
    
}

GameObject.id = 0

/*TODO*/
/*GameObject.prototype.draw = function(ctx){
    ctx.fillStyle = "red";
    ctx.fillRect(this.coord.get('x'),this.coord.get('y'), 20,20);
}*/

GameObject.prototype.playSound = function(name){
    this.world.playSound(this.sound.get(name))
}

/**
 * delta : delta time to update the physics
 * external_force : Is a force in the world like the gravitational force
*/
GameObject.prototype.updatePhysics = function(delta, external){
    //this.position.
}

/*
 * Comprueba que tiles en el mapa está ocupando.
 *
 * x e y     : Son las posiciones futuras del personaje.
 * tile_size : Tamaño de los tiles del mundo.
 * extra     : Para modificar los valores de entrada (Tipo Coord).
 *
 * return obj : Objeto con los elementos {down, up, left, right} con numeros enteros.
 */
GameObject.prototype.getSquarePoints = function(x, y, tile_size, extra){
	var obj = {}
	var extra = extra || 0
	obj["down"]  = Math.floor((y+this.dimensions-1 + extra)/tile_size)
	obj["up"]    = Math.floor((y-this.dimensions - extra)/tile_size)
	obj["left"]  = Math.floor((x-this.dimensions - extra)/tile_size)
	obj["right"] = Math.floor((x+this.dimensions-1 + extra)/tile_size)
	return obj
}

/*GameObject.prototype.updateCollisionDetectorPosition = function(){
    for(var i=0; i<this.collision_detector.length; i++)
	this.collision_detector[i].update_position(this.position.x, this.position.y)
}*/
