var world
function start(){
  world = new World("canvas", maps, map_conf, all_tiles, 50, 50)
  world.start()
  loop()
}

function loop(){
   world.loop()
   setTimeout(loop, 10)
}