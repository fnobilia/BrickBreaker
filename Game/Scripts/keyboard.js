// JavaScript Document

/**
 * Created by Silvia Fortunato, Nazzareno Marziale, Francesco Nobilia
 */

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

var Key = {
  _pressed: {},

  A: 65,
  W: 87,
  D: 68,
  S: 83,
  SPACE: 32,
  
  // function to check if the button is pressed
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  
  // function called when the button is pressed
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  
  // function called when the button is freed
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};


