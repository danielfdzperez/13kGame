GlitchTile.prototype = new Tile
GlitchTile.prototype.constructor = GlitchTile

//glitched_sprite is an array of sprites that its used when the tile is in glithed status
function GlitchTile(walkable, size, sprite, glitched_sprite){
    Tile.call(this, walkable, size, sprite)
    this.state = "normal" //status can be "normal" or "glitched"
    this.drawing = {}


    //TODO
    this.drawing["normal"] = function(ctx, y, x, distance_to_player){}
    this.drawing["glitched"] = function(ctx, y, x, distance_to_player){}
}

GlitchTile.prototype.draw = function(ctx, y, x, distance_to_player){
    this.drawing[this.state](ctx, y, x, distance_to_player)
}

GlitchTile.prototype.update = function(){
    if(this.state == "normal")
        Math.floor(Math.random()*6)
}
