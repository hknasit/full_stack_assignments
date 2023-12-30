/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

var isAnagramBoolean = true;

const string1 = String(str1);
const string2 = String(str2);

var array1 = [];
var array2 = [];

for (let index = 0; index < string1.length; index++) {
  const element = string1[index];
  array1.push(element.toLocaleLowerCase());
  
}
for (let index = 0; index < string2.length; index++) {
  const element = string2[index];
  array2.push(element.toLocaleLowerCase());
}
array1.sort();
array2.sort();
if(array1.length == array2.length){
  for (let index = 0; index < array1.length; index++) {

    if(array1[index] != array2[index]){
      isAnagramBoolean = false;
    }
    
  }
}else{
  isAnagramBoolean = false;
}


return isAnagramBoolean;

}

isAnagram("harsh Kishor", "Harsh kishor")



module.exports = isAnagram;
