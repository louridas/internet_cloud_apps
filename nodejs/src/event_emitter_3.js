const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

class MyEmitterUser {

  constructor() {
    this.myEmitter = new MyEmitter();
    this.myEmitter.on('event', function(a, b) {
      console.log(a, b, this);
    });    
  }
  
  fire() {
    this.myEmitter.emit('event', 'one', 'two');
  }
}

var myEmitterUser = new MyEmitterUser();

myEmitterUser.fire();
