function Point(x, y){
	this.x = x
	this.y = y
}

Point.prototype.equals = function(position){
   return ((this.x == position.x) && (this.y == position.y))
}

function updateMRU(pos, speed, t){
	return ( pos + (speed * t) )
}

function updateMRUV(pos, speed, t){
	var acc = 0.9
	var obj = {}
	obj.speed = speed + acc * t 
	obj.pos = (pos + (speed * t) + ( (1/2) * acc * Math.pow(t, 2)) )
	return obj
}

function FrameRateCounter(fps){
    this.fps = fps || 20
    this.last_time = new Date().getTime()
    this.step = 1
}

FrameRateCounter.prototype.count_frames = function(){

    var date_temp = new Date()
    /*Se calcula el tiempo*/
    var time_difference = date_temp.getTime() - this.last_time
    this.step = (time_difference/1000) * this.fps
    this.last_time = date_temp.getTime()

    //delete date_temp
}

function MultidimensionalArray(y){
    var array = []
    for (var i = 0; i < y; i++)
       array[i] = []
   return array
}

function MapConf(start_tile, end_tile, reverse_tiles, reverse_map, reverse_gravity, non_reverse_tiles){
    conf = {"start_tile": start_tile,
            "end_tile": end_tile,
            "reverse_tiles": reverse_tiles,
            "reverse_map":reverse_map,
            "reverse_gravity": reverse_gravity,
            "non_reverse_tiles": non_reverse_tiles || []}
    return conf
}

function tileToPoint(point, size){
    var point = point
    return new Point( (point.x * size + size/2), (point.y * size + size/2) )
}