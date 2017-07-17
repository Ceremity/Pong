
function drawDivider() {

  ctx.strokeStyle = GAME_TEXT_COLOR;
  var lineHeight = 20;

  for (var y = lineHeight / 2; y < GAME_HEIGHT; y += lineHeight * 2){

    ctx.beginPath();
    ctx.moveTo(GAME_WIDTH / 2, y);
    ctx.lineTo(GAME_WIDTH / 2, y + lineHeight);
    ctx.stroke();
  }

}

function drawNames(player1Name, player2Name) {

  ctx.textAlign = "left";
  drawText(player1Name, 10, 25, GAME_TEXT_COLOR, 20, 100);
  ctx.textAlign = "right";
  drawText(player2Name, GAME_WIDTH - 10, 25, GAME_TEXT_COLOR, 20, 100);
}

function drawScores(player1Score, player2Score) {

  ctx.textAlign = "right";
  drawText(player1Score, GAME_WIDTH / 2 - 50, 40, GAME_TEXT_COLOR, 40, 100);
  ctx.textAlign = "left";
  drawText(player2Score, GAME_WIDTH / 2 + 50, 40, GAME_TEXT_COLOR, 40, 100);
}

function drawText(text, x, y, textColor, fontSize, maxWidth) {

  ctx.fillStyle = textColor;
  if (fontSize == undefined) {
    fontSize = 12;
  }

  ctx.font = fontSize + "px Arial";
  if (maxWidth == undefined) {
    ctx.fillText(text, x, y);
  } else {
    ctx.fillText(text, x, y, maxWidth);
  }

}

function drawRect(x, y, width, height, color) {

  ctx.fillStyle = color;
  ctx.fillRect(x,y,width,height);
}

function drawCircle(x, y, size, color) {

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x,y,size, 0, Math.PI * 2, true);
  ctx.fill();
}
