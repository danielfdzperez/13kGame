function Menu(buttons, title, events){
    this.button           = buttons
    this.curren_buton     = 0
    this.title            = title
    this.background_color = /*background_color*/null
    this.events           = events
}

Menu.prototype.draw = function(ctx, width, height){
    ctx.fillStyle = "MediumBlue"
    ctx.fillRect(0, 0, width, height)
   
    for(var i in this.button)
       this.button[i].draw(ctx, new Point(100, i*100))
}

MenuManager.prototype = []
function MenuManager(canvas, menu){
    this.menu         = []
    this.event        = new Events()
    this.canvas      = document.getElementById(canvas)
    this.ctx         = this.canvas.getContext('2d')
    this.current_menu = 0
    if(menu)
	this.fill(menu)
    this.timer = null
    this.running = false
}

MenuManager.prototype.start = function(){
    this.event.enableInputs()
    this.running = true
    this.loop()
}

MenuManager.prototype.loop = function(){
    this.draw()
    this.menu[this.current_menu].events(this.event)

    var that = this
    if(this.running)
       this.timer = setTimeout(function(){that.loop()}, 10)
}

MenuManager.prototype.stop = function(){
    this.event.removeInputs()
    clearTimeout(this.timer)
    this.running = false
}

MenuManager.prototype.fill = function(menu){
    this.menu = []
    for(var i in menu)
	this.menu.push(menu[i])
}

MenuManager.prototype.changeMenu = function(n){
    if(n < this.menu.length && n >= 0)
	this.current_menu = n
    if(!n && n != 0)
	this.current_menu = ++this.current_menu % this.menu.length
}

MenuManager.prototype.draw = function(){
    this.menu[this.current_menu].draw(this.ctx, this.canvas.width, this.canvas.height)
}

MenuManager.prototype.events = function(){
}
