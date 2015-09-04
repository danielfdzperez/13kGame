var world
function start(){
  world = new World("canvas", maps, map_conf, enemy, all_tiles, tile_size)
  world.start()
  //loop()
}

function loop(){
   world.loop()
   setTimeout(loop, 10)
}
