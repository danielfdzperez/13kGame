/*
    walkable => boolean
    size     => size of a tile, its only one because is a square
    sprite   => array of sprites
*/

function Tile(walkable, size, sprite){
    this.walkable    = walkable
    this.sprite      = sprite
    this.size        = size
}

/*
 * Draw the tile
 * Params:
 * ctx => Is the context of canvas
 * y,x => Are the coords
 * distance => Distance to the player to the scroll
 */
Tile.prototype.draw = function(ctx, y, x, distance){
    ctx.fillStyle = this.color
    ctx.fillRect(x*this.size + distance.x, y*this.size + distance.y, this.size, this.size)
    ctx.strokeStyle = 'black'
    ctx.lineWidth  = 0.8
    ctx.strokeRect(x*this.size + distance.x, y*this.size + distance.y, this.size, this.size)
}

/*
 *
 */
Tile.prototype.isWalkable = function(){
    return this.walkable
}
