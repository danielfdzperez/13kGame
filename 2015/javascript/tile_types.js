  var tile_size = 50
  var path = new Tile(true  , 'white', tile_size, false)
  var ground = new Tile(false , 'brown', tile_size, false, path)
  var rock = new Tile(false, 'grey', tile_size, false, null)
  var water = new Tile(false, "#A5F2F3", tile_size, false, null,new IceAnimation())
  var fire = new Tile(true, 'red', tile_size, true, water, new FireAnimation())
  water.reverse = fire
  //fire.drawMe = fireAnimation
  //water.drawMe = iceAnimation
  var special = new Tile(false, 'black', tile_size, false)
  var all_tiles = {'g': ground, 'w':water, 'p':path, 'f':fire, 'r':rock, 's':special}
