function printHighscores() {
  	// either get scores from localstorage or set to empty array
  	if(localStorage.getItem("scores")){
	  var scoresArray = localStorage.getItem("scores");
	  var scoresArray = JSON.parse(scoresArray);
	}else{
	  var scoresArray = [];
	}

  	// (optional) sort highscores by score property in descending order
  	
  	// for each score
  	for (var i = 0; i < scoresArray.length; i++) {
  		// create li tag for each high score
  		var newScoreLi = document.createElement("li");
  		newScoreLi.innerHTML=scoresArray[i].initials + " - " + scoresArray[i].score;
  		// display on page
  		document.getElementById("highscores").appendChild(newScoreLi);
  	}
}

function clearHighscores() {
  // (and reload)
  localStorage.removeItem('scores');
  document.getElementById("highscores").innerHTML="";
}

// attache clear event to clear score button
document.getElementById("clear").onclick = clearHighscores;

// run printhighscore when page loads
window.load = printHighscores();