
/* user input */

/* keyboard */
document.onkeydown = function(event) {

  if (event.keyCode === 38)
      socket.emit('keyPress', { input: 'up', state : true})

  if (event.keyCode === 40)
      socket.emit('keyPress', { input: 'down', state : true})
}

document.onkeyup = function(event) {

  if (event.keyCode === 38)
    socket.emit('keyPress', { input: 'up', state : false})

  if (event.keyCode === 40)
    socket.emit('keyPress', { input: 'down', state : false})
}

// /* touch support */
// canvas.addEventListener("touchstart", function(e){
//     if (e.targetTouches.length == 1) {
//         var touch = e.targetTouches[0];
//         if (touch.pageY < GAME_HEIGHT / 2) {
//             socket.emit('keyPress', { input: 'up', state : true} );
//         }
//         else {
//             socket.emit('keyPress', { input: 'down', state : true} );
//         }
//     }
// }, false);
//
// canvas.addEventListener("touchend", function(e){
//     socket.emit('keyPress', { input: 'up', state : false} );
//     socket.emit('keyPress', { input: 'down', state : false} );
// }, false);
