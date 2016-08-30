/*
   parameters are function that change the owner atributes
*/

function State(being){
    this.current_state         = "normal"
    this.current_glitched_step = 0
    this.max_glitched_step     = 120
    this.being = being
}

State.error_probability = 9
State.decreaseError = function(){
    if(State.error_probability > 0)
        State.error_probability --
}

State.prototype.update = function(){
    if(this.current_state == "normal"){
        var n = Math.floor(Math.random()*10))
        if(n < State.error_probability)
            this.changeState()
    }
    else{
        if(this.current_glitched_step >= this.max_glitched_step)
            this.changeState()
        else
            this.current_glitched_step ++
    }
}

State.prototype.changeState = function(){
    if(this.current_state == "normal"){
        this.current_state = "glitched"
        this.being.glithedAction()
    }
    else{
        this.current_state = "normal"
        this.current_glitched_step = 0
        this.being.normalAction()
    }    
} 

State.prototype.getState = function(){
    return this.current_state
}
