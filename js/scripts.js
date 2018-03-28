//Main function
var sentenceTranslator = function (sentence) {
  sentenceTrimmed = sentence.replace(/  +/g, " ");
  var sentenceArray = sentenceTrimmed.split(" ");
  var resultArray = sentenceArray.map(function(word){
    return punctuationFixer(wordTranslator(word));
  });
  return resultArray.join(" ");
}


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

//Punctuation Helper Function
var punctuationFixer = function(input) {
  var endPunctuation = "";
  for(var index = 0; index <= input.length; index ++){
    if (isEndPunctuation(input[index])){
      endPunctuation = endPunctuation + input[index];
      input = input.replace(input[index]," ");
    }
  }
  input = input.replace(/  */g, "");
  return input + endPunctuation;
}


// Helper Functions
var isEndPunctuation = function(character){
  if ("?!.,".includes(character)){
    return true;
  }
  else {
    return false;
  }
}

var isAVowel = function(letter){
  if(letter.match(/^[aeiou]{1}$/gi)) {
    return true;
  }
  else {
    return false;
  }
}

var isAConsonant = function(letter){
  if(letter.match(/^[b-df-hj-np-tv-z]{1}$/gi)){
    return true;
  }
  else {
    return false;
  }
}

var isAY = function(letter){
  if(letter.match(/^[y]{1}$/gi)){
    return true;
  }
  else {
    return false;
  }
}

var multipleStarts = function(word) { //checks multiple letters before first vowel
  var firstVowelIndex = "";
  var index = 0;
  while (index < word.length && firstVowelIndex === "") {
    if(isAVowel(word[index]) || isAY(word[index])) {
      firstVowelIndex = index;
    }
    index ++;
  }
  if((firstVowelIndex <= 1) && ((word[firstVowelIndex-1] !== "q") ||(word[firstVowelIndex-1] !== "Q"))) {
    return "";
  }
  else if(word[firstVowelIndex-1] === "q" || word[firstVowelIndex-1] === "Q") {
    //include the u that comes after q
    return word.slice(firstVowelIndex+1) + word.slice(0,firstVowelIndex+1) + "ay";
  }
  else{
    //do not include the vowel
    return word.slice(firstVowelIndex) + word.slice(0,firstVowelIndex) + "ay";
  }
}




//jQuery user interface logic here
$(document).ready(function () {
  $("form#pig-latin").submit(function(event) {
    var input = $("#input").val();
    var output = sentenceTranslator(input);
    $("#result").text(output);
    $("#result").show();
    event.preventDefault();
  });
});
