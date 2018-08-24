GlitchedGameObject.prototype = new GameObject
GlitchedGameObject.prototype.constructor = GlitchedGameObject

function GlitchedGameObject(world, position, sprite, speed){
    GameObject.call(this, world, position, sprite, speed)
    this.state = new State(this)
    //this.glitched_sprite = glitched_sprite
    this.glitched_sprite_selected= 0 //Selected sprite animation for that time
    this.drawing = {}
}
