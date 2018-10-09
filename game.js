'use strict';
class Game{
  constructor (parent){
  
    this.parentElement = parent;
    this.gameElement = null; 
    this.onGameOverCallback = null;

    this._init();
    this._startLoop();
  }

  _init () {
    
    this.gameElement = buildDom(`
      <main class="game container">
        <header class="game__header">
          <div class="time">
            <span class="label">Time:</span>
            <span class="value"></span>
          </div>
          <div class="score">
            <span class="label">Score:</span>
            <span class="value"></span>
            <span class="value">Litros</span>
          </div>
        </header>
        <div class="game__canvas">
          <canvas class="canvas">
          </canvas>
          <div class="touch-buttons">
            <div class="button-left"></div>
            <div class="button-right"></div>
            </div>
      </div>
        
        <audio src="./music/main-theme.mp3"
          autoplay>
        </audio>
        
      </main>
    `)
    //self.gameTheme.play();
    
    this.parentElement.appendChild(this.gameElement);

    this.canvasParentElement = document.querySelector('.game__canvas');
    this.canvasElement = document.querySelector('.canvas');

    this.timeElement = this.gameElement.querySelector('.time .value');
    //inicializar tiempo
    this.scoreElement = this.gameElement.querySelector('.score .value');


    this.width = this.canvasParentElement.clientWidth;
    this.height = this.canvasParentElement.clientHeight;

    this.canvasElement.setAttribute('width', this.width);
    this.canvasElement.setAttribute('height', this.height);

    this.ctx = this.canvasElement.getContext('2d');

    this.leftButton = document.querySelector('.button-left');
    this.rightButton = document.querySelector('.button-right');

  }

  _startLoop (){
  
    this.score = 0;
    //crear cerveza
    this.bier = [];
    this.water = [];
    this.bretzel = [];
    //inicializar contador, tiempo de juego
    this.counter = 45;

    this.countDown = function (sec) {
      this.counter -= sec;
    }
    // let countDown = (sec) => {
    //   counter -=sec;
    // }

    this.player = new Player(this.canvasElement);
  
  
    this.handleKeyDown = function (event){
      if (event.key === "ArrowLeft"){
        //console.log (event);
        this.player.moveLeft();
        this.player.update();
      //console.log(self.player.movimiento) // = cambiamos la posicion x del jugador hacía la izquierda
      }
      if (event.key === "ArrowRight"){
        //console.log (event);
        this.player.moveRight();
        this.player.update();
        //console.log(self.player.movimiento);
      }
    }

    document.addEventListener('keydown', this.handleKeyDown);
  
    // movil 
  
    this._goLeft = function() {
      this.player.moveLeft();
      this.player.update();
    }

    this.leftButton.addEventListener('touchstart',this._goLeft)

    this._goRight = function() {
      this.player.moveRight();
        this.player.update();
    }

    this.rightButton.addEventListener('touchstart',this._goRight)
    

    this.loop = function () {
      this._clearAll();
      this._updateAll();
      this._renderAll();

      if (this.counter > 0) {
        requestAnimationFrame(this.loop);
      } else {
        this.gameover();
      }
    }
    //cada segundo ejecuta un setInterval que actualiza el contador de tiempo
    requestAnimationFrame(this.loop);
    this.intervalId = setInterval(function() {
      this.countDown(1);
    }, 1000);
  }

  _updateAll (){
    
    this._spawnBier();
    this._spawnWater();
    this._spawnBretzel();

    this.bier.forEach(function(item){
      item.update();
    
    });
    this.water.forEach(function(item){
      item.update();
    
    });
    this.bretzel.forEach(function(item){
      item.update();
    });

    //borrar cerveza cuando se sale del canvas
    this.bier = this.bier.filter(function(item){
      if(item.onTheFloor()){
        //console.log ('borra');
        return false;
      }
      return true;
    });
    this.water = this.water.filter(function(item){
      if(item.waterOnTheFloor()){
        //console.log ('borra');
        return false;
      }
      return true;
    });
    this.bretzel = this.bretzel.filter(function(item){
      if(item.bretzelOnTheFloor()){
        return false;
      }
      return true;
    })

    //self.player.update(); //mueve el jugador automaticamente
    this._checkAllCollision();
    this._updateUI();

    //sumar volumen por colision

  }
  _renderAll () {
  
    //self.bier.render();
    this.bier.forEach(function(item) {
      item.render();
    });
    this.water.forEach(function(item) {
      item.render();
    });
    this.bretzel.forEach(function(item){
      item.render();
    });

    this.player.render();
  }

  _clearAll (){
    
    //self.ctx.clearRect(0,0, self.width, self.height);
    //limpiar cervezaOut
    this.ctx.clearRect(0,0,this.width, this.height);
  }

  _spawnBier () {
    //crear cerveza
    
    if (Math.random() > 0.95){
      let randomX = Math.random() * this.width * 0.9;
      this.bier.push(new Bier(this.canvasElement, randomX, 0));
      //console.log(self.bier);
    }

  }
  _spawnWater (){
  
    if (Math.random()> 0.96){
      let randomWX = Math.random() * this.width * 0.8;
      this.water.push (new Water(this.canvasElement, randomWX, 0));
    }
  }

  _spawnBretzel (){
  
    if (Math.random()>0.995){
      let randomBX = Math.random() * this.width * 0.9;
      this.bretzel.push (new Bretzel(this.canvasElement, randomBX, 0));
    }
  }

  _checkAllCollision (){
  
    //comprobar colisiones y sumar volumen a score
    // si colision: self.player.volJarra += self.bier.volumenBier;
    this.bier.forEach(function(item, idx){
      if (this.player.checkCollision(item)){
          this.bier.splice(idx, 1);
          sethislf.score += item.volumenBier;
      }
    });

    this.water.forEach (function(item, idx){
      if (this.player.checkCollision(item)){
          this.water.splice(idx, 1);
          this.counter -= 10;
          
      }
    });

    this.bretzel.forEach (function(item, idx){
      if (this.player.checkCollision(item)){
          this.bretzel.splice(idx, 1);
          this.counter += 10;
          
      }
    });
  }

  _updateUI () {
  
    this.scoreElement.innerText= this.score;
    this.timeElement.innerText= this.counter;
  }

  onOver (callback) {

    this.onGameOverCallback = callback;
  }

  destroy (){
  
    this.gameElement.remove();
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  gameover () {
    
    clearInterval(this.intervalId);
    this.onGameOverCallback();
  }
}
