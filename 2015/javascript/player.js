Player.prototype = new Character
Player.prototype.constructor = Player
/*
   position - Point : Is the player position
*/
var keys = {"up": 38, "right": 39, "left": 37, "reverse_map":82, "reverse_tiles":69}
function Player(position, world){
	Character.call(this, position, world)
	this.in_the_air = false
	this.jumping    = false

	this.reverse_map_pressed = false
	this.reverse_tiles_pressed = false
   
    var that = this
    this.action     = {"up": function(){
    	                        if(!that.in_the_air){
		                            that.speed.y = -10
		                            that.in_the_air = true
		                            that.jumping    = true
		                      }},
		                "right": function(){that.speed.x = 5},
		                "left" : function(){that.speed.x = -5},
		                "no_right": function(){
		                	           if(that.speed.x == 5)
		                                  that.speed.x = 0
		                            },
		                "no_left": function(){
		                	           if(that.speed.x == -5)
		                                  that.speed.x = 0
		                            },
		                "reverse_map": function(){
		                	                       if(!that.reverse_map_pressed){
		                	                          that.world.map.reverseMap()
		                	                          that.reverse_map_pressed = true
		                	                       }
		                               },
		                "no_reverse_map": function(){that.reverse_map_pressed = false},
		                "reverse_tiles": function(){
		                	                       if(!that.reverse_tiles_pressed){
		                	                          that.world.map.reverseTiles()
		                	                          that.reverse_tiles_pressed = true
		                	                       }
		                               },
		                "no_reverse_tiles": function(){that.reverse_tiles_pressed = false}

		              }
	this.keys = {"up": keys.up, "right": keys.right, "left": keys.left, "reverse_map":keys.reverse_map, "reverse_tiles": keys.reverse_tiles}
}

Player.prototype.updatePhysics = function(t){
	var x_position = updateMRU(this.position.x, this.speed.x, 1)
    
    var can_move = this.world.checkMovement(this.getSquarePoints(x_position, this.position.y, this.world.width, this.world.height))

    if(this.speed.x > 0){
    	if(can_move["up right"] && can_move["down right"])
	       this.position.x = x_position
	    else
	    	this.position.x = Math.floor((this.position.x+this.dimensions)/50)*50-this.dimensions
    }
	else
		if(can_move["up left"] && can_move["down left"])
	       this.position.x = x_position
	   else
	    	this.position.x = Math.floor((this.position.x-this.dimensions+1)/50)*50 + this.dimensions
   
    /*Comprobar que no esta callendo*/
    can_move = this.world.checkMovement(this.getSquarePoints(this.position.x, this.position.y, this.world.width, this.world.height))
    if(can_move["down right"] && can_move["down left"])
    	   if(!this.in_the_air)
    	   	  this.in_the_air = true
   
    var obj = {'pos':null, 'speed':null}
	if(this.in_the_air){
	   obj = updateMRUV(this.position.y, this.speed.y, 1)
	   this.speed.y = obj.speed
	
    
        can_move = this.world.checkMovement(this.getSquarePoints(this.position.x, obj.pos, this.world.width, this.world.height))
	
        if( !(can_move["down right"] && can_move["down left"]) ){
        	this.position.y = ((Math.floor((this.position.y)/50))+1) *50 - this.dimensions
	    	this.speed.y = 0
	    	this.in_the_air = false
	        
	    }
	    else
	    	if( !(can_move["up right"] && can_move["up left"]) ){
	    		this.position.y = Math.floor(this.position.y/50)*50 + this.dimensions
	    	    this.speed.y = 0
	    	}
	    	else
	    	   this.position.y = obj.pos   		
	}
    
}

Player.prototype.draw = function(ctx){
	ctx.fillStyle = 'black'
    ctx.fillRect(this.position.x-this.dimensions, this.position.y-this.dimensions, this.dimensions*2, this.dimensions*2)
    color = 'white' 
    ctx.beginPath()
    ctx.fillStyle  = color
    ctx.arc(this.position.x, this.position.y, 2, 0, (Math.PI/180)*360, false)
    ctx.fill()
    ctx.closePath()
}

Player.prototype.stop = function(){
	this.speed.x = 0
	this.speed.y = 0

}

Player.prototype.events = function(event){
    if(this.keys.right in event.keys_up)
    	this.action.no_right()
    if(this.keys.left in event.keys_up)
    	this.action.no_left()
    if(this.keys.reverse_map in event.keys_up)
    	this.action.no_reverse_map()
    if(this.keys.reverse_tiles in event.keys_up)
    	this.action.no_reverse_tiles()
    
    if(this.keys.up in event.keys_down)
    	this.action.up()
    if(this.keys.right in event.keys_down)
    	this.action.right()
    if(this.keys.left in event.keys_down)
    	this.action.left()
    if(this.keys.reverse_map in event.keys_down)
    	this.action.reverse_map()
    if(this.keys.reverse_tiles in event.keys_down)
    	this.action.reverse_tiles()
}