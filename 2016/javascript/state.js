/*
   parameters are function that change the owner atributes
*/

function State(normal_action, glithed_action){
    this.current_state         = "normal"
    this.current_glitched_step = 0
    this.max_glitched_step     = 120
    this.normal_action = normal_action
    this.glithed_action = glithed_action
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
        this.glithed_action()
    }
    else{
        this.current_state = "normal"
        this.current_glitched_step = 0
        this.normal_action()
    }    
} 
