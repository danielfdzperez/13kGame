Image.prototype = new Image()
Image.prototype.constructor = Image

function Image(src, name, width, height){
    this.src = src
    //this.width = width
    //this.height = height
    this.name = name
}

/*TODO onload function*/
