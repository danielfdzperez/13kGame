function fireAnimation(ctx, y, x, distance, total_size){
	var size = 10
	var length_x = Math.floor(total_size/size)-1
	var length_y = Math.floor(total_size/size)-1

 //if(fireAnimation.step == 0)
	for(var i = length_y; i > -1; i--)
		for(var j = length_x; j > -1; j--){
		   var x_posibility = Math.abs(j - length_x/2)*(length_x/2)
		   var y_posibility = length_y - i
		   var total_posibility = y_posibility + x_posibility
		   if(Math.floor(Math.random()*total_posibility) == 0)
	          ctx.fillStyle = 'red'
	       else
	       	ctx.fillStyle = 'orange'
           ctx.fillRect(x*total_size + j*size, (y*total_size + i*size) + distance, size, size)
    }

    fireAnimation.step = ++fireAnimation.step % 10
}
fireAnimation.step = 0