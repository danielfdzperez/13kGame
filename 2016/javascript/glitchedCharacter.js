GlitchedCharacter.prototype = new GlitchedGameObject
GlitchedCharacter.prototype.constructor = GlitchedCharacter

function GlitchedCharacter(world, position, sprite, speed, life, damage, defence){
    GlitchedGameObject.call(this, world, position, sprite, speed)
    this.life    = life
    this.damage  = damage
    this.defence = defence
    this.path    = null
    this.moving  = false
}

//Desetination is a pont
GlitchedGameObject.prototype.findPath = function(destination){
    function Node(parent, position, target){
        this.parent = parent
        var parent_g, parent_position

        if(parent != null){
            parent_g = this.parent.g
            parent_position = this.parent.position
        }else{
            parent_g = 0
            parent_position = 0
        }

        this.position = position
        this.g        = parent_g + manhattanDistance(this.position, parent_position) //Estimated cost of this particular route so far
        this.h        = manhattanDistance(position, target.position)                 //Distance from here to the target
        this.f        = this.g + this.h //Estimated cost of entire guessed route to the destination
    }

    function manhattanDistance(point, target){	
        // linear movement - no diagonals - just cardinal directions (NSEW)
	return abs(point.x - target.x) + abs(point.y - target.y)
    }

    //TODO
    function getNeighbours(){
    }    
}
GlitchedGameObject.prototype.move = function(){
}
GlitchedGameObject.prototype.update = function(){
    GlitchedGameObject.update.call(this)
}
