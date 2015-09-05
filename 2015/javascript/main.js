var menu = null
var world = null
function start(){
  createMenu()
  world = new World("canvas", maps, map_conf, enemy, all_tiles, tile_size, function(){menu.start()})
  menu.start()

  //world.start()


  //loop()
}

function createMenu(){
  menu = new MenuManager("canvas")
  var button_start = new Button("start", 150, 60, function(){menu.stop();world.start();})
  var button_level = new Button("levels", 150, 60, function(){})
  var start_menu_event = function(e){
      if(13 in e.keys_down)//Enter
	  this.button[this.curren_buton].action()
  }
  var start_menu = new Menu([button_start, button_level], "Reverse World", start_menu_event)
  menu.fill([start_menu])
}
