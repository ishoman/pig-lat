





// Single Word Function
var wordTranslator = function(input){
  if(isAVowel(input)){
    return input + "way";
  }
  else if(isAConsonant(input)){
    return input + "ay";
  }
  else if (isAVowel(input[0])) {
    return input + "way";
  }
  else if (multipleStarts(input) !== "") {
    return multipleStarts(input);
  }
  else if (isAConsonant(input[0]) || isAY(input[0])) {
    return input.slice(1) + input[0] + "ay";
  }
  else {
    return input;
  }
};


// Helper Functions
var isAVowel = function(letter){
  if((letter.length === 1) && ("aeiou".includes(letter))){
    return true;
  }
  else {
    return false;
  }
}

var isAConsonant = function(letter){
  if((letter.length === 1) && ("bcdfghjklmnpqrstvwxz".includes(letter))){
    return true;
  }
  else {
    return false;
  }
}

var isAY = function(letter){
  if(letter === "y"){
    return true;
  }
  else {
    return false;
  }
}

var multipleStarts = function(word) { //checks multiple letters before first vowel
  var firstVowelIndex;
  for (var index = 0; index < word.length; index ++) {
    if(isAVowel(word[index])){
      firstVowelIndex = index;
    }
  }
  if((firstVowelIndex === 1) && (word[firstVowelIndex-1] !== "q")){
    return "";
  }
  else if(word[firstVowelIndex-1] === "q"){
    //include the u that comes after q
    return word.slice(firstVowelIndex) + word.slice(0,firstVowelIndex) + "ay";
  }
  else{
    //do not include the vowel
    return word.slice(firstVowelIndex-1) + word.slice(0,firstVowelIndex-1) + "ay";
  }
}




//jQuery user interface logic here
$(document).ready(function () {
  $("form#pig-latin").submit(function(event) {
    var input = $("#input").val();
    var output = wordTranslator(input);
    $("#result").text(output);
    $("#result").show();
    event.preventDefault();
  });
});
