/* image puntero a la imagen completa
 * width y height dimensiones del sprite
 * n_animations es el numero de animaciones
*/
function Sprite(image, width, height, number_of_animations, name, start_sprite_position){
   this.image                = image
   this.width                = width
   this.height               = height
   this.number_of_animations = number_of_animations
   this.current_animation    = 0
   this.name                 = name || "undefined"
   this.start                = start_sprite_position || new Point(0,0) /*object => {x:,y:}*/ 
}

/*Pasa a la siguiente animacion*/
Sprite.prototype.animate = function(){
   this.current_animation = ++this.current_animation % this.number_of_animations
}

/*Cambiar la animacion a una especifica*/
Sprite.prototype.setAnimation = function(n){
   if(n >= this.number_of_animations)
      throw "number of animations exceded."
   this.current_animation = n
}

Sprite.prototype.draw = function(ctx, x, y){
   var source_x = this.start.getX() * this.width + this.current_animation * this.width
   var source_y = this.start.getY() * this.height //+ this.current_animation * this.height
   ctx.drawImage(this.image, source_x, source_y, this.width, this.height, x, y, this.width, this.height)
}
