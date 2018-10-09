class Player{
  constructor (canvas){
    this.ctx = canvas.getContext('2d');
    this.size = 100;
    this.x = (this.ctx.canvas.width) / 2 - (this.size)/2;
    this.y = this.ctx.canvas.height - self.size;
    //self.color = blue;
    this.direction = 0; 
    this.movimiento = 0; // -1 se mueve a la izquiera, 1 se mueve a la derecha
    this.volJarra;
    this.img = document.createElement('img');
    this.img.src ='./images/jugador150.png';
  }

  update (){
    
    this.x = this.x + this.movimiento; 
    //self.ctx.fillRect(self.x + self.movimiento, self.y, self.size, self.size+10);
  }
  moveLeft (){
    
    if (this.x + this.movimiento <= 0){
      
      this.movimiento = this.x *-1;
      return true;
    }
    this.movimiento = -30;

  }
  moveRight (){
    
    if ((this.x + this.size + this.movimiento + 30) > this.ctx.canvas.width){
      this.movimiento =  this.ctx.canvas.width - (this.x + this.size);
      return true;
    }
    this.movimiento = 30;
  }

  render (){
    //self.ctx.fillStyle = '#45362F';
    //self.ctx.fillRect(self.x, self.y, self.size, self.size+10);
    this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
  }

  checkCollision (object){
    //console.log(object.y)
    const collTop = this.y < object.y + object.size;
    const collLeft = object.x > this.x;
    const collRight = object.x < this.x + this.size;
    
    if (collTop && collLeft && collRight){
      //&& ((self.x + self.size)>object.x)
      return true; 

    }
      return false;
  }
} //llevar al final

// Player.prototype.collided = function() {
//   var self = this;
//   self.volJarra += 1; //añadir el volumenBier de Bier
// }
// Player.prototype._checkLimitis = function (){
//   var self = this;
//   //impedir avanzar más alla del limite 
//   if (self.x < 0 ){ // || ((self.x + self.size))> cxt.canvas.width
//     //self.movimiento = 0;
//     return true;

//   }
// }