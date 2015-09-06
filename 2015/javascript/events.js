function Events(){
    this.keys_down = {}
    this.keys_up = {}
    this.last_key = null
    this.key_down = null
    this.key_up   = null
    this.key_used = []
}

Events.prototype.enableInputs = function(){
    var that = this
    document.addEventListener("keydown", this.key_down = function (e) {
        console.log(e.keyCode)
	    that.keys_down[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_up[e.keyCode] 
	    }, false)

    addEventListener("keyup", this.key_up = function (e) {
	    that.keys_up[e.keyCode] = true 
	    that.last_key = e.keyCode
	    delete that.keys_down[e.keyCode] 
	    delete that.key_used[e.keyCode]
	    }, false)
}

Events.prototype.isNotUsed = function(x){
    if(x in this.keys_down && !(x in this.key_used)){
	this.key_used[x] = true
	return true
    }
    else
	return false
}

Events.prototype.removeInputs = function(){
    removeEventListener("keydown", this.key_down)
    removeEventListener("keyup", this.key_up)
    this.keys_up   = []
    this.keys_down = []
    this.key_used  = []
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
