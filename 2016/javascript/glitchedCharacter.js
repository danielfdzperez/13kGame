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

//Destination is a point
//TODO be more efficient
GlitchedGameObject.prototype.findPath = function(destination){

    var that = this
    function Node(parent, position, target){
        this.parent = parent
	target = target || this
        var parent_g, parent_position

        if(parent != null){
            parent_g = this.parent.g
            parent_position = this.parent.position
        }else{
            parent_g = 0
            parent_position = new Point(0,0)
        }

        this.position = position
        this.g        = parent_g + manhattanDistance(this.position, parent_position) //Estimated cost of this particular route so far
        this.h        = manhattanDistance(position, target.position)                 //Distance from here to the target
        this.f        = this.g + this.h //Estimated cost of entire guessed route to the destination

	
    }
    Node.prototype.equals = function(node){
	    return this.position.equals(node.position)
    }

    function manhattanDistance(point, target){	
        // linear movement - no diagonals - just cardinal directions (NSEW)
	return Math.abs(point.x - target.x) + Math.abs(point.y - target.y)
    }

    //Get the walkable tiles are neighbours
    function getNeighbours(node){
	var neighbours = []

	// West
	var w =new Point(node.position.x-1,node.position.y)
	if(w.x > -1 && that.world.isWalkable(w)) {
	    neighbours.push(w) 
	}

	// East
	var e =new Point(node.position.x+1,node.position.y)
	if(e.x < that.world.width && that.world.isWalkable(e)){
	    neighbours.push(e) 
	}

	// South
	var s =new Point(node.position.x,node.position.y+1)
	if(s.y < that.world.height && that.world.isWalkable(s)){
	    neighbours.push(s) 
	}

	// North
	var n =new Point(node.position.x,node.position.y-1)
	if(n.y > -1 && that.world.isWalkable(n)){
	    neighbours.push(n) 
	}
	return neighbours
    }    

    function calculatePath(){
	var close = []//Visited nodes
	var open = []//No visited nodes
	var find = false
	var end   = new Node(null, destination, null)//Destination node
	var start = new Node(null, that.position, end)//Start node
	open.push(start)
	var result = []
	while(!find && open.length != 0){
	    current_node = open.sort(function(node1,node2){return node1.f > node2.f}).splice(0,1)[0]//Get the letter f
	    close.push(current_node)
	    if(current_node.equals(end)){
		do{
		    result.push(current_node)
		    current_node = current_node.parent
		}while(current_node != null) 
		result.reverse()
		find = true
	    }
	    else{//Be more efficient
		neighbours = getNeighbours(current_node)
		for(i in neighbours)
		    open.push(new Node(current_node, neighbours[i], end))
	    }

	}//End while
	return result
    }//End calculatePath
    return calculatePath()
}

GlitchedGameObject.prototype.move = function(){

}
GlitchedGameObject.prototype.update = function(){
    GlitchedGameObject.update.call(this)
}
