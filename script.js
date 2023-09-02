// Wrap all code that interacts with the DOM in a call to jQuery
$(function () {

//VARIABLES TAGGED TO HTML
  var saveButton = $(".saveBtn");
  var containerLarge = $(".container-lg");
  var currentDay = $("#currentDay");

//FUNCTIONS
//function: add textarea values to local storage upon save button click
function addToLocalStorage(){
  var grabDivId = ($(this).parent().attr("id"));
  var textAreaText = $(this).prev().val();
  var storeTextObjects = {
     text: textAreaText,
     indexHour: grabDivId
   }
  if (localStorage.getItem("scheduling") !== null) {
    var temp = JSON.parse(localStorage.getItem("scheduling"));
    var hasText = false;
    for (var x = 0; x<temp.length; x++){
      if (temp[x].indexHour === grabDivId){
        temp[x].text = textAreaText;
        hasText = true;
      }
    }
      if (hasText === false){
        temp.push(storeTextObjects);
    }
    localStorage.setItem("scheduling", JSON.stringify(temp));
   } else {
      localStorage.setItem("scheduling" , JSON.stringify([storeTextObjects]));
   }
}

//function: display time at top of screen. This is being rerun every seconds with set interval timer
function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  currentDay.text(rightNow);
}

//function: displays storage items on page even on refresh
function displayStorageItems(){
  if (localStorage.getItem("scheduling") !== null){
    var startingTexts = JSON.parse(localStorage.getItem("scheduling"));
    for (var y = 0 ; y<startingTexts.length; y++){
      var concater = "#" + startingTexts[y].indexHour;
      $(concater).children("textarea").text(startingTexts[y].text);
    }
  }
}

//function: change colors as the time changes
function colorSet() {
  for(var x = 9; x<18; x++) {
    j = x-9;
    if(dayjs().hour() < x) {
      console.log(1)
      containerLarge.children().eq(j).addClass('future')
    } else if (dayjs().hour() === x){
      console.log(2)
      containerLarge.children().eq(j).addClass('present')
    } else {
      console.log(3);
      containerLarge.children().eq(j).addClass('past')
    }
  }
}
  
//EVENT LISTENER
saveButton.on("click", addToLocalStorage)
  
//FUNCTION CALLS
    colorSet();
    displayStorageItems();
    displayTime();
    setInterval(displayTime, 1000);
    setInterval(colorSet, 5000);

});
