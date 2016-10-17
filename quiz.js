'use strict';

/* Global Variables */

var Answered = [];
var tryAgain = 0;
var submittedAll =0;
var validAnswer =0;
var flagQ1Answered = false;
var response = document.createElement("p");
var submit = document.createElement("button");
var Q2Array = ["loop","inline","keyboard","interpreter"
    ,"function","block","character","variable"];
var Q2count = 0;
var q3 = document.getElementsByClassName("question3")[0];
var years = ["1841","1940","1951","1953","1957","1967","1971"];
var q4 = document.getElementsByClassName("question4")[0];
var realscore = 0;
var flagClicked = false;
var clickcount = 0;

/* build the Quiz*/

checkQ1();
buildQ2();
buildQ3();
buildQ4();

/* function to check if the user has submitted all answers in order to show alert*/

function quizOver(){
  if(submittedAll === 4){
    alert("You finished all the questions! Your score is " + realscore + "! Thanks for playing.");
  }
}


  /*handles user input for question 1*/

  function checkQ1(){
    var q1 = document.getElementsByClassName("question");
    var showAll = document.getElementById("seeAll");

    q1[0].onclick = function() {showQ1(q1[0],showAll)};
    q1[1].onclick = function() {showQ1(q1[1],showAll)};
    q1[2].onclick = function() {showQ1(q1[2],showAll)};
    q1[3].onclick = function() {showQ1(q1[3],showAll)};
    /* Show all explanations if showAll button is clicked*/
    showAll.onclick = function(){
      var all = document.getElementsByClassName("ans");
      for(let i=0;i< all.length;  i++){
        all[i].style.display = "block";
      }
    }
  }

  /* Check answers and show explanations given in question one*/
    

  function showQ1(elem,showAll) {

    flagQ1Answered = true;
    
    flagClicked = true;

    var answer= document.getElementsByClassName("ans 1.2");
    

    var ans = elem.className.split(" ");

    if (ans[1] === "1.2"){
      clickcount ++; 
    }else{
      clickcount +=2;
    }

    /* Check with clickcount if an answer has already been selected.
    If it is the right one and the first time, clickcount =1 thus incremenet the score*/

    var all = document.getElementsByClassName("ans");
    for(let i=0;i< all.length; i++){
      if (clickcount===1 || flagClicked === false){        
        incrementScore();
        break;
      }
    }

    /*show corresponding explanation for answer selected and showAll button */
    
     
     var showBlurb = document.getElementsByClassName(ans[1]);
     showAll.style.display = "block";
     showBlurb[1].style.display = "block";

     if(flagQ1Answered){
      submittedAll++;
      quizOver();
     }
  }

  /*function to increment score */

  function incrementScore(){
    realscore +=1;
    let score = document.getElementById("score");
    score.innerHTML = "Score: " + realscore;

  }

  /*make a checkbox */

  function makeCheckBox(name, value, text) {

    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.type = "checkbox";
    radio.name = name;
    radio.value = value;
    radio.setAttribute("id", name);


    label.appendChild(radio);


    label.appendChild(document.createTextNode(text));
    return label;
  }

  /*function to make checkboxes for Q2 and check for their corresponding clicks */

  function buildQ2(){

    var q2 = document.getElementsByClassName("question2")[0];

    for(let i=0;i< Q2Array.length; i++){
      var label = makeCheckBox(Q2Array[i],Q2Array[i],Q2Array[i]);
      label.clicked = false;
      q2.appendChild(label);
    }
    document.getElementById(Q2Array[0]).onclick = function() {add(Q2Array[0])};
    document.getElementById(Q2Array[1]).onclick = function() {add(Q2Array[1])};
    document.getElementById(Q2Array[2]).onclick = function() {add(Q2Array[2])};
    document.getElementById(Q2Array[3]).onclick = function() {add(Q2Array[3])};
    document.getElementById(Q2Array[4]).onclick = function() {add(Q2Array[4])};
    document.getElementById(Q2Array[5]).onclick = function() {add(Q2Array[5])};
    document.getElementById(Q2Array[6]).onclick = function() {add(Q2Array[6])};
    document.getElementById(Q2Array[7]).onclick = function() {add(Q2Array[7])};
      

    q2.appendChild(document.createElement("br"));
    /*append submit button */
    let text = document.createTextNode("submit");
    submit.appendChild(text);
    submit.style.width = "10%";
    q2.appendChild(submit);


    submit.onclick = function(){checkQ2(label)};
  }

   /*function that handles checking and unchecking of checkboxes so checkQ2 can run properly */

  function add(answered){
    var clicked = document.getElementById(answered);
    

    if(clicked.checked === true){
    Answered.push(answered);
    Q2count++;}

    else{
      tryAgain= 0;;
      Q2count--;
      var index = Answered.indexOf(answered);
      Answered.splice(index,1);
    }

  }

 /*function that checks whether the user entered incomplete information, partially correct answers
 or fully correct answers. Disables submit button if user got the question right or wrong */


  function checkQ2(label){



    var q2 = document.getElementsByClassName("question2")[0];
    

    if(Q2count == 1 || Q2count == 0){
      let text = document.createTextNode("Your answer is incomplete.  Please select another word.");
      response.appendChild(text);
      response.appendChild(document.createElement("br"));
      q2.appendChild(response);
      
      tryAgain++;

    }
    if(Q2count >2){
      let text = document.createTextNode("Only two words can be selected. Please try again.");
      response.appendChild(text);
      q2.appendChild(response);
      q2.appendChild(document.createElement("br"));
      tryAgain++;

      
    }
    if(Q2count == 2){
      for(var i=0;i<2;i++){
        
        if ((Answered[0]==="variable" &&
          Answered[1]==="function")||
          (Answered[1]==="variable" &&
          Answered[0]==="function")){ //if variable and function was selected
            var text = document.createTextNode("Yes!  It is hard to believe that words we take for granted in computing were once so new.");
            incrementScore();
            validAnswer++;

        }else if(Answered[0]==="variable"){ //if only variable selected
            //if(i = 0){
            var text = document.createTextNode("Incorrect: You picked 'variable' correctly, but "
            + Answered[1] +" is one of the words that Professors Gotlieb and Hume got credit for.");
            validAnswer++;
            }
            else if(Answered[1]==="variable"){
              var text = document.createTextNode("Incorrect: You picked 'variable' correctly, but "
                + Answered[0] +" is one of the words that Professors Gotlieb and Hume got credit for.");
              validAnswer++;
            
        }else if(Answered[0]==="function"){ //if only variable selected
            //if(i = 0){
            var text = document.createTextNode("Incorrect: You picked 'function' correctly, but "
            + Answered[1] +" is one of the words that Professors Gotlieb and Hume got credit for.");
            validAnswer++;
            }
            else if(Answered[1]==="function"){
              var text = document.createTextNode("Incorrect: You picked 'function' correctly, but "
                + Answered[0] +" is one of the words that Professors Gotlieb and Hume got credit for.");
              validAnswer++;
            }
          else{
            var text = document.createTextNode("Incorrect: Both words you chose are words that"+
             " Professors Gotlieb and Hume were quoted for in the OED.");
            validAnswer++;
          }
        }
        response.appendChild(document.createElement("br"));
        response.appendChild(text);
        q2.appendChild(response);

      }
      if (validAnswer != 0){
        submittedAll++; //increment submittedAll
         submit.disabled = true; //if the user click an validAnswer answer, disable the submit button
         quizOver();
       }
  }


    

     /*function to build lists of Q3 */

    function buildQ3(){


      var Q3dict = { 
        "Daniel Wigdor":  "Associate Research Scientist at Disney Research" + 
        " before joining the faculty",

        "Stephen Cook": "Taught a first-year" +
        " course while an undergraduate student in our department",

       "Geoff Hinton":"Academy Award for Ryan (software"+ 
          " research and development director)",

        "Karan Singh": "Pioneer in machine learning,"+
        " now Distinguished Researcher at Google",

        "Diane Horton": "Scientific Director of the Centre for Computational" +
         " Medicine at Sick Kids Hospital",

        "Raquel Urtasun":"Winner of both the President's"+ 
        " Teaching Award and OCUFA teaching award",

        "David Levin":"Canada Research Chair in Machine "+
        "Learning and Computer Vision, researching self-driving cars",

        "Mike Brudno":"Turing Award winner for"+ 
        " work in computational complexity"}

         
        var num = 0;

         for (var i in Q3dict){

          var teachers = makeRect(i,i,"teacher",null,q3);
          
          
          var j =Q3dict[i];
          var description = makeRect(j,j,"description",num,q3);
          
          q3.appendChild(document.createElement("br"));
          num++;

         }
         document.getElementById(0).onclick = function() {moveq3(0,7)};
         document.getElementById(1).onclick = function() {moveq3(1,7)};
         document.getElementById(2).onclick = function() {moveq3(2,7)};
         document.getElementById(3).onclick = function() {moveq3(3,7)};
         document.getElementById(4).onclick = function() {moveq3(4,7)};
         document.getElementById(5).onclick = function() {moveq3(5,7)};
         document.getElementById(6).onclick = function() {moveq3(6,7)};
         document.getElementById(7).onclick = function() {moveq3(7,7)};
         q3.appendChild(document.createElement("br"));
        /*append submit button */
         var submitq3 = document.createElement("button");
         var texts = document.createTextNode("submit");
         submitq3.appendChild(texts);
         submitq3.style.width = "10%";
         q3.appendChild(submitq3);

         submitq3.onclick = function(){checkQ3(submitq3)};
      
    }

    function checkQ3(submit){

      submittedAll++;
      

      var correct =0;

    

    var MasterList =["Taught a first-year course while an undergraduate student in our department",
    "Turing Award winner for work in computational complexity",
    "Pioneer in machine learning, now Distinguished Researcher at Google",
    "Academy Award for Ryan (software research and development director)", 
    "Winner of both the President's Teaching Award and OCUFA teaching award",
     "Canada Research Chair in Machine Learning and Computer Vision, researching self-driving cars",
     "Associate Research Scientist at Disney Research before joining the faculty",
     "Scientific Director of the Centre for Computational Medicine at Sick Kids Hospital"];

    var inputList=[]
    var elem = document.getElementsByClassName("description");

    for(let i =0; i<MasterList.length ;i++){
      var input = elem[i].value;
      inputList.push(input);
      
    }

    var correctFlag = false;

    /*check what the user got right vs wrong*/

    for(let i =0; i<MasterList.length ;i++){
      if(inputList[i] === MasterList[i]){
        correct++;
      }
      else{
        correctFlag= false;
      }
    }

    if (correct == 8){
      correctFlag = true;
    }
    

    /*increment the score by adding .5 for everything the user got right*/

    for(let i=0; i<correct;i++){
      realscore +=.5;
      let score = document.getElementById("score");
      score.innerHTML = "Score: " + realscore;
    }
    quizOver();

    if(correctFlag === true){
      var responseq3 = document.createElement("p");
      let text = document.createTextNode("Correct! You matched everything correctly!");
      responseq3.appendChild(text);
      q3.appendChild(responseq3);
      submit.disabled = true;
    }
    else{
      var responseq3 = document.createElement("p");
      let text = document.createTextNode("Incorrect! This is the wrong order of claim to fames!"+
        " You got "+ correct+ " matching(s) correct!");
      responseq3.appendChild(text);
      q3.appendChild(responseq3);
      submit.disabled = true;

    }


    

  }

  /* This function switches a description box with the box that is right below it*/



    function moveq3(btn,length) {

    var elem = document.getElementById(btn);
    var currElem = elem.className.split(" ");
    var elemNumAfter = parseInt(currElem[1]) +1;
    if(btn != length){
      var elemAfter = document.getElementsByClassName("description"+" "+elemNumAfter)[0];
      var tempValue = elem.value;

      elem.value = elemAfter.value;


      elemAfter.value = tempValue;
 

    }
    else {
//if the element is the last in the column make it switch with the first rectangle
      var first = document.getElementsByClassName("description 0")[0];
      var temp = elem.value;

      elem.value = first.value;
      first.value = temp;
    }
  }

/*build columns and buttons for Q3 to work*/

    function makeRect(name, value, classs,num,q) {

    var btn = document.createElement("input");
    btn.type = "button";
    btn.name = name;
    btn.value = value;
    btn.setAttribute("id", num);
    btn.setAttribute("class", classs + " " +num)
    q.appendChild(btn);

  }
    

    /*function to build lists of Q4 */

    function buildQ4(){

      

      var Q4Array = ["The First Computer Network",
      "First Microprocessor: Intel 4004",
      "First Popular High-Level Language: FORTRAN(John Backus)", 
      "First Open Source Software: A-2 System"
      ,"First Compiler for Electronic Computer: A-0 System(Grace Hopper)",
      "The First Computer Program(Ada Lovelace)"
      ,"First Object Oriented Programming Language: Simula(Ole-Johan Dahl and Kristen Nygaard)"];

      

      q4.appendChild(document.createElement("br"));
      for (let i in Q4Array){
        var rect = makeRectangles(Q4Array[i],Q4Array[i],Q4Array[i],i,q4);
        
      }
    document.getElementById(Q4Array[0]).onclick = function() {move(Q4Array[0],Q4Array.length-1)};
    document.getElementById(Q4Array[1]).onclick = function() {move(Q4Array[1],Q4Array.length-1)};
    document.getElementById(Q4Array[2]).onclick = function() {move(Q4Array[2],Q4Array.length-1)};
    document.getElementById(Q4Array[3]).onclick = function() {move(Q4Array[3],Q4Array.length-1)};
    document.getElementById(Q4Array[4]).onclick = function() {move(Q4Array[4],Q4Array.length-1)};
    document.getElementById(Q4Array[5]).onclick = function() {move(Q4Array[5],Q4Array.length-1)};
    document.getElementById(Q4Array[6]).onclick = function() {move(Q4Array[6],Q4Array.length-1)};
    



    q4.appendChild(document.createElement("br"));
        /*append submit button */
    var submitq4 = document.createElement("button");
    var texts = document.createTextNode("submit");
    submitq4.appendChild(texts);
    submitq4.style.width = "10%";
    q4.appendChild(submitq4);
    submitq4.onclick = function(){checkQ4(submitq4)};
         
  }

  function checkQ4(submit){
    submittedAll++;
    

    

    var MasterList = {"The First Computer Program(Ada Lovelace)": "1841",
     "The First Computer Network":"1940",
    "First Compiler for Electronic Computer: A-0 System(Grace Hopper)":"1951",
    "First Open Source Software: A-2 System": "1953",
    "First Popular High-Level Language: FORTRAN(John Backus)":"1957", 
    "First Object Oriented Programming Language: Simula(Ole-Johan Dahl and Kristen Nygaard)":"1967",
     "First Microprocessor: Intel 4004":"1971"};
    var inputList=[]
    var inputYear =[];
    var elem = document.getElementsByClassName("btn");


    /*Get the user input and put it in InputList*/
    

    for(var i =0; i< 7 ;i++){
      var input = elem[i].value;
      inputList.push(input);
      var yearBtn = document.getElementsByClassName("yearBtn")[i];
      yearBtn.style.display ="initial";

    }
    /*Get corresponding years for the users matching and put it in inputYear*/

    for(var j=0; j<inputList.length;j++){
      
      var year = MasterList[inputList[j]]
      
      inputYear.push(year);
      
    }

/*change the intial year buttons to match the dates the user inserted it in*/
    for(var j=0; j<years.length;j++){
        var buttons = document.getElementsByClassName("yearBtn");
       buttons[j].value = inputYear[j];
      }
      
      /*Check which matchings the user got correct*/

    var correctFlag = false;
    var correct = 0;

    var MasterListArr = Object.keys(MasterList)//get array of masterlist
    

    for(var i =0; i<MasterListArr.length ;i++){
      if(inputList[i] === MasterListArr[i]){
        correct++;
      }
      else{
        correctFlag= false;
      }
    }

    if(correct === MasterListArr.length){
      correctFlag = true;
    }

    if(correctFlag === true){
      var responseq4 = document.createElement("p");
      let text = document.createTextNode("Correct! You matched everything correctly!");
      responseq4.appendChild(text);
      q4.appendChild(responseq4);
      incrementScore();
      submit.disabled = true;
      quizOver();
    }
    else{
      var responseq4 = document.createElement("p");
      let text = document.createTextNode("Incorrect! This is the wrong order of invention years.");
      responseq4.appendChild(text);
      q4.appendChild(responseq4);
      submit.disabled = true;
      quizOver();

    }




  }

  /*switch the rectangle that the user clicked with the rectangle below it*/

  function move(btn,length) {
    var elem = document.getElementById(btn);
    var currElem = elem.className.split(" ");
    var elemNumAfter = parseInt(currElem[1]) +1;

    if(currElem[1] != length){
      var elemAfter = document.getElementsByClassName("btn "+elemNumAfter)[0];
      var tempValue = elem.value;

      elem.value = elemAfter.value;


      elemAfter.value = tempValue;
 

    }
    else {

      var first = document.getElementsByClassName("btn 0")[0];
      var temp = elem.value;

      elem.value = first.value;
      first.value = temp;
    }
   

}
/*make Rectangles for q4*/



    function makeRectangles(name, value, text,num,q) {

    var btn = document.createElement("input");
    btn.type = "button";
    btn.name = name;
    btn.value = value;
    btn.setAttribute("id", name);
    btn.setAttribute("class","btn" + " " +num)
    q.appendChild(btn);

    var yearBtn = document.createElement("input");
    yearBtn.type ="button";
    yearBtn.name = years[num];
    yearBtn.value = years[num];
    yearBtn.setAttribute("id", "yearBtn");
    yearBtn.setAttribute("class","yearBtn")
    yearBtn.style.display ="none";
    q.appendChild(yearBtn);

    return btn;}


  


  
    


  

  


  