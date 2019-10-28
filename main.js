$(document).ready(function() {
  readyDeck(deck)
  handleGame()
})

function shuffle(deck) {
  let currentIndex = deck.length
  let temporaryValue
  let randomIndex
  const newArray = deck.slice()
  
  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
   
    temporaryValue = newArray[currentIndex]
    newArray[currentIndex] = newArray[randomIndex]
    newArray[randomIndex] = temporaryValue
  }
  return newArray
}

function readyDeck(deck) {
  let buttons = ""
  deck = shuffle(deck.split(""))

  deck.forEach(l => {
    buttons += `<button class="face-down">${l.toUpperCase()}</button>`
  })
  
  $("#buttons").html(buttons)
}
function resetGame() {
  document.location.reload(true)
}

function timer() {
  timerRunning = true

  setInterval(function() {
    var elapsedTime = Date.now() - startTime
    $("#timer").html("Time: " + getTimeStr(elapsedTime))
  }, 100)
}

function handleGame() {
  let arrCards = []

  $("#buttons").on("click", "button", function(e) {
    e.preventDefault()
    if (!timerRunning) {
      timer()
    }

    // Pressed cards, placing them into the array.
    // 2 cards selected so this prevents you from selecting the other cards.
    
    if (!$(this).hasClass("stay")) {
      arrCards.push($(this))
    }
    if (
      arrCards.length <= 2 &&
      !$(this).hasClass("face-up") &&
      !$(this).hasClass("stay")
    ) {
      $(this)
        .not(".stay")
        .toggleClass("face-up")
    }
    if (arrCards.length === 2) {
      turn = turn + 1
      $(".turns").html("Turns: " + turn)
     
      if (arrCards[0].html() != arrCards[1].html()) {
        setTimeout(function() {
          arrCards[0].toggleClass("face-up")
          arrCards[1].toggleClass("face-up")
          arrCards = []
        }, 1200)
        boo.play()
      } else {
        pairs = pairs + 1
        arrCards[0].addClass("stay")
        arrCards[1].addClass("stay")
        win.play()

        
        arrCards = []
        if (pairs === 9) {
          clearInterval(counter)
          timerscore()
          turnsScore(turn)
        }
      }
    }
  })
}

function getTimeStr(milliseconds) {
  var minutes = milliseconds / 60000
  var sec=milliseconds/1000
  var intMinutes = Math.floor(minutes)
  var seconds = Math.floor((minutes - intMinutes) * 60)
  return (
    intMinutes +
    ":" +
    (seconds < 10 ? "0" + seconds.toFixed(0) : seconds.toFixed(0))
  )
}