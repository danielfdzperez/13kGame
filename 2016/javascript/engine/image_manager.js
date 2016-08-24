function ImageManager(){
    this.length = 0
}

ImageManager.prototype.add = function(src, name, width, height){
    if(arguments.length == 1 && typeof src.constructor.name == "Image"){
        var name = src.name
        if(!this.haveThatImage(name)){
            this[name] = src
            this.length ++
        }
    }else
       if(!this.haveThatImage(name)){
           this[name] = new Image(src, name, width, height)
           this.length ++
       }
}

ImageManager.prototype.get = function(name){
   if(!this.haveThatImage(name))
      throw "ImageManager get error"
   return this[name]
}

ImageManager.prototype.haveThatImage = function(name){
  return name in this
}
