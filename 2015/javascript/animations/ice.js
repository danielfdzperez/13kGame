function iceAnimation(ctx, y, x, distance, total_size){

      ctx.fillStyle = "#A5F2F3"
      ctx.fillRect(x*total_size, y*total_size + distance, total_size, total_size)


      var size = 5
      for(var i = 0; i < 5; i++){
          var random_x = Math.random()*total_size
          var random_y = Math.random()*total_size
          ctx.fillStyle = "white"
          ctx.fillRect((x*total_size)+random_x, (y*total_size + distance)+ random_y, size, size)
      }

}

