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
  var key= {"enter":13, "up": 38, "down":40}
  menu = new MenuManager("canvas")

  /*Start Menu*/
  var button_start = new Button("start", 150, 60, function(){menu.stop();world.start();})
  var button_level = new Button("levels", 150, 60, function(){menu.changeMenu(1)})
  var start_menu_event = function(e){
      if(e.isNotUsed(key.enter)){//Enter
	  this.button[this.curren_buton].action()
      }
      if(e.isNotUsed(key.up))//Up
	  this.previousButton()
      if(e.isNotUsed(key.down)){//Down
	  this.nexButton()
      }
  }
  var menus = []
  var start_menu = new Menu([button_start, button_level], "Reverse World", start_menu_event, "Center")
  
  /*Level Menu*/
  function button_action(n){
      return function(){console.log("level " + n); menu.stop();world.start(n);}
  }
  var level_button = []
  for(var i = 0; i < maps.length; i++){
      console.log("maps " + i)
      level_button.push(new Button(i.toString(), 100, 80, button_action(i)))
  }
  var level_menu = new Menu(level_button, "Select level", start_menu_event, "List")

  menus.push(start_menu)
  menus.push(level_menu)
  menu.fill(menus)
}
