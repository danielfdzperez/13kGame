
var W = 0
var T = 1
var E = 2
var B = 3

function _Map(configuration,world = null){
    this.tiles = []
    this.world = null
    //this.
    //

    //conf = {"map":[[1,2,3],[4,5,6]],"obj":[{"obj":Number(5),"x":7,"y":8}]}
    this.load = function(conf){
	let map = conf.map
	//Create the tiles
	for(let i in map){
	    this.tiles[i] = []
	    for(let j in map[i])
		switch(map[i][j]){
		    case T:
			this.tiles[i][j] = new Tile(Number(i),Number(j),this)
		       break;
		    case W:
			break;
		    case E:
			break;	
		    case B:
			break;	
		}
	}

    }

    this.run = function(ctx){
	for(let i in this.tiles)
    	    for(let j in this.tiles[i]){
		this.tiles[i][j].draw(ctx)
		this.tiles[i][j].drawLaser(ctx)
		this.tiles[i][j].drawObject(ctx)
	    }

    }
}
