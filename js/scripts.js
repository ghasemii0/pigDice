//business logic
function Player(name,totalScore,roundScore) {
  this.name = name,
  this.totalScore = totalScore,
  this.roundScore = roundScore
}

function Game(turn) {
  this.players = [],
  this.turn = turn
  //this.currentId = 0;
}

Game.prototype.setPlayers = function(player1, player2) {
  this.players.push(player1);
  this.players.push(player2);

}

Game.prototype.rollDice = function(diceRoll){
  diceRoll = Math.floor(6*(Math.random()) + 1);
  return diceRoll;
  console.log(totalScore);
}

Game.prototype.addToRoundScore = function(roundScore,totalRoundScore) {
 totalRoundScore += roundScore;
 return totalRoundScore;
}

Game.prototype.checkRound = function(roundScore, totalRoundScore) {
  if(roundScore != 1) {
    totalRoundScore = this.addToRoundScore(roundScore,totalRoundScore);
  }else {
    totalRoundScore = 0;
    this.setTurn(totalRoundScore);
    alert("you lost, you rolled 1")
  }
  if(totalRoundScore >= 100){
    alert("you won!")
  }
  return totalRoundScore;
}

Game.prototype.setTurn = function(totalRoundScore) {
  if(this.turn % 2 === 0) {
    $("#player1turn").hide();
    $("#player2turn").show();
    this.updateScore(this.players[0], totalRoundScore);
  } else {
    $("#player1turn").show();
    $("#player2turn").hide();
    this.updateScore(this.players[1], totalRoundScore);
  }
  this.turn++;
  return this.turn;
}

Game.prototype.updateScore = function(player, totalRoundScore) {
  player.totalScore += totalRoundScore;
  console.log(player.totalScore);
  return;
}


function playGame(firstPlayer, secondPlayer) {
  var roundScore = 0;
  var totalRoundScore = 0;
  var totalScore = 0;
  var turn = 0;
  var player1 = new Player(firstPlayer, totalScore, roundScore);
  var player2 = new Player(secondPlayer, totalScore, roundScore);
  var newGame = new Game(turn);
  newGame.setPlayers(player1, player2);
  $("#player1Total").text(newGame.players[0].totalScore);
  $("#player2Total").text(newGame.players[1].totalScore);
  $("#rollButton").click(function(){
    roundScore = newGame.rollDice(roundScore);
    totalRoundScore = newGame.checkRound(roundScore, totalRoundScore);
    //console.log(totalRoundScore);
    $("#showRoundTotal").text(totalRoundScore);
  });
  $("#stop").click(function() {
    turn = newGame.setTurn(totalRoundScore);
    $("#player1Total").text(newGame.players[0].totalScore);
    $("#player2Total").text(newGame.players[1].totalScore);
    totalRoundScore = 0;
  });
}


//User Interface
$(document).ready(function(){
  // $("#playerVsComputer").click(function() {
  //   $("#welcomeMenu").hide();
  //   $("#playOrStop").show();
  // });
  $("#playerVsPlayer").click(function() {
    $("#welcomeMenu").hide();
    $("#twoPlayers").show();
  });

  $("#start").click(function() {
    $("#twoPlayers").hide();
    $("#playOrStop").show();
    var firstPlayer = $("input#name1").val();
    var secondPlayer = $("input#name2").val();
    $(".player1name").text(firstPlayer);
    $(".player2name").text(secondPlayer);
    playGame(firstPlayer, secondPlayer);
  });

});
