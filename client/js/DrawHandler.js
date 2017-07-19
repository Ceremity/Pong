
function drawDivider() {

  ctx.strokeStyle = TEXT_COLOR;
  var lineHeight = 20;

  for (var y = lineHeight / 2; y < HEIGHT; y += lineHeight * 2){

    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, y);
    ctx.lineTo(WIDTH / 2, y + lineHeight);
    ctx.stroke();
  }

}

function drawNames(player1Name, player2Name) {

  ctx.textAlign = "left";
  drawText(player1Name, 10, 25, TEXT_COLOR, 20, 100);
  ctx.textAlign = "right";
  drawText(player2Name, WIDTH - 10, 25, TEXT_COLOR, 20, 100);
}

function drawScores(player1Score, player2Score) {

  ctx.textAlign = "right";
  drawText(player1Score, WIDTH / 2 - 50, 40, TEXT_COLOR, 40, 100);
  ctx.textAlign = "left";
  drawText(player2Score, WIDTH / 2 + 50, 40, TEXT_COLOR, 40, 100);
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

function drawPower(power) {

  drawCircle(power.x, power.y, POWER_SIZE, TEXT_COLOR);

  ctx.textAlign = "center";
  drawText(power.type, power.x, power.y, BACKGROUND_COLOR, 20);
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
