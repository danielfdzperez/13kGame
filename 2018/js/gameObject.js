function GameObject(name,tile,extra_draw,laser_action = doNothing,orientation = NONE,walkable = false,can_take = true,
    forbidden_directions_conf = doNothing,extra_configuration = doNothing, user_action_out = doNothing,user_action_in = doNothing){
    this.name = name
    this.extraDraw = extra_draw
    this.extraConfiguration = extra_configuration
    this.can_take = can_take
    this.extraLaserAction = laser_action
    this.tile = tile
    this.walkable = walkable
    this.orientation = orientation
    this.userActionIn = user_action_in
    this.userActionOut = user_action_out
    this.rotation = rotation(this.orientation)
    this.forbidden_directions = []
    this.forbiddenDirectionsConf = forbidden_directions_conf
    this.id = GameObject.id ++

    this.forbiddenDirectionsConf()
}

GameObject.id = 0

GameObject.prototype.draw = function(ctx,x,y){
    ctx.save()
    ctx.translate(x,y)

    //ctx.save()
    ctx.translate(Tile.half_size,Tile.half_size)
    ctx.rotate(this.rotation*Math.PI/180)
    ctx.translate(-Tile.half_size,-Tile.half_size)

    this.extraDraw(ctx)
    //ctx.restore()

    ctx.restore()
}

GameObject.prototype.tileConfiguration = function(tile = this.tile){
    this.tile = tile
    this.tile.walkable = this.walkable
    this.extraConfiguration(this)
}

GameObject.prototype.laserAction = function(laser = this.tile.getOnLaseres()){
    if(!Array.isArray(laser))
	laser = [laser]
    this.extraLaserAction(laser)
}
