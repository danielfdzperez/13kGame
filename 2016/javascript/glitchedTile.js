GlitchedTile.prototype = new Tile
GlitchedTile.prototype.constructor = GlitchedTile

//glitched_sprite is an array of sprites that its used when the tile is in glithed status
function GlitchedTile(walkable, size, sprite, glitched_sprite){
    Tile.call(this, walkable, size, sprite)
    this.state = new State(this)
    this.glitched_sprite = glitched_sprite
    this.glitched_sprite_selected= 0 //Selected sprite animation for that time
    this.drawing = {}


    //TODO
    this.drawing["normal"] = function(ctx, y, x, distance_to_player){
        this.sprite.draw(ctx)
    }
    this.drawing["glitched"] = function(ctx, y, x, distance_to_player){}
}

GlitchedTile.prototype.draw = function(ctx, y, x, distance_to_player){
    this.drawing[this.state.getState()](ctx, y, x, distance_to_player)
}

GlitchedTile.prototype.update = function(){
    this.state.update()
}

GlitchedTile.prototype.glithedAction = function(){
    this.walkable = false
    this.glitched_sprite_selected = Math.floor(Math.random() * this.glitched_sprite.length)
}

GlitchedTile.prototype.normalAction = function(){
    this.walkable = true
}
