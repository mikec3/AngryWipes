
$(document).ready(function () {
    "use strict";
    
var date = new Date();
    
    
    
   if (document.referrer =="http://www.mysicu.com/games/wipeout/index.html") {
       
var name = prompt("Enter your name for certificate", "Your name here");

$(".name").append(name);
$(".date").append(date);
    
   } else {
    
       document.write("attempting to access this page from unauthorized source: " + document.referrer);
       
   }
    
});