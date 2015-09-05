function Events(){
    this.keys_down = {}
    this.keys_up = {}
    this.last_key = null
    this.key_down = null
    this.key_up   = null
}

Events.prototype.enableInputs = function(){
    var that = this
    addEventListener("keydown", this.key_down = function (e) {
        console.log(e.keyCode)
	    that.keys_down[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_up[e.keyCode] 
	    }, false)

    addEventListener("keyup", this.key_up = function (e) {
	    that.keys_up[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_down[e.keyCode] 
	    }, false)
}

Events.prototype.removeInputs = function(){
    removeEventListener("keydown", this.key_down)
    removeEventListener("keyup", this.key_up)
    this.keys_up = []
    this.keys_down = []
}

Events.prototype.addKeyDown = function(e){
     this.keys_down[e.keyCode] = true 
     this.last_key = e.keyCode
     delete this.keys_up[e.keyCode]
}

Events.prototype.addKeyUp = function(e){
    this.keys_up[e.keyCode] = true 
    this.last_key = e.keyCode
    delete this.keys_down[e.keyCode]
}
