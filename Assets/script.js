var countDown = document.getElementById("countDown");
var prepareBtn = document.querySelector('#firstBtn');
var welcomeText =document.getElementById("welcome");
var introduceBtn = document.getElementById("btnClick");
var questions = document.getElementById("questions");
var nameForm = document.createElement("form");
    document.getElementById("first-div").appendChild(nameForm);


// define variables for the next functions
var choice, choices, optA, optB, optC, optD, correct;
var i = 0;
var correct = 0;
// Create an array to store all questions,options and answers
var myQuestions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<javascript>",
            b: "<js>",
            c: "<scripting>",
            d: "<script>",
        },
        correctAnswer: 'd',
    },{
        question: "Where is the correct place to insert a JavaScript?",
        answers: {
            a: "Both the <head> section and the <body> section are correct",
            b: "The <body>  section",
            c: "The <head> section",
            d: "Both b and c",
        },
        correctAnswer: 'b',
    },{
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: {
            a: "<script href='xxx.js'>",
            b: "<script name='xxx.js'>",
            c: "<script src='xxx.js'>",
            d: "All is correct",
        },
        correctAnswer: 'c',
    },{
        question: "The external JavaScript file must contain the <script> tag",
        answers: {
            a: "True",
            b: "False",
            c: "It doesn't matter",
            d: "I don't know",
        },
        correctAnswer: 'b',
    },{
        question: "How do you write 'Hello World' in an alert box?",
        answers: {
            a: "alertBox('Hello World')",
            b: "alert('Hello Word')",
            c: "msg('Hello World')",
            d: "msgBox('Hello World')",
        },
        correctAnswer: 'b',
    },{
        question: "How do you create a function in javascript?",
        answers: {
            a: "function myFunction()",
            b: "function = myFunction()",
            c: "function:myFunction()",
            d: "callMyFunction()",
        },
        correctAnswer: 'a',
    },{
        question: "How do you call a function named 'myFunction'?",
        answers: {
            a: "myFunction()",
            b: "call function myFunction()",
            c: "call myFunction()",
            d: "I don't know",
        },
        correctAnswer: 'a',
    },{
        question: "How do you write an IF statement in Javascript?",
        answers: {
            a: "if (i==5)",
            b: "if i=5 then",
            c: "if i==5 then",
            d: "if i =5",
        },
        correctAnswer: 'a',
    },{
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: {
            a: "if i=!5 then",
            b: "if (i<>5)",
            c: "if (i !=5)",
            d: "if i<>5",
        },
        correctAnswer: 'c',
    },
]
// Create a global varible for functions
var timer = 60;

// Function to press the button to start the test
function startTest() {
    prepareBtn.remove();
    welcomeText.textContent="";
    introduceBtn.remove();
    
    var showTime = setInterval (function() {
        if (timer <=0 ) {
            //remove the last question when timer reaches 0
            questions.remove();
            // show Gameover and correct answers
            countDown.innerHTML= "";
            welcomeText.innerHTML= "Game Over"+"<br>"+"You have "+correct+" correct answer(s)";
            // clear timer
            clearInterval(showTime);
            // execute function to get input from user
            createForm();
            
        } else {
            countDown.textContent= timer +" seconds remaining";
        }
        timer--;
    }
        
    , 1000);

};
// function to escape special characters in html
function escape_html(str) {
  
    if ((str===null) || (str===''))
          return false;
    else
      str = str.toString();
     
     var map = {
       '&': '&amp;',
       '<': '&lt;',
       '>': '&gt;',
       '"': '&quot;',
       "'": '&#039;'
     };
   
     return str.replace(/[&<>"']/g, function(m) { return map[m]; });
   }

function showQuestions() {
        // Create variables for options A,B,C
        questions.innerHTML= "<h3>"+escape_html(myQuestions[i].question)+"</h3>";
        // store options to variables
        optA = myQuestions[i].answers.a;                    
        optB = myQuestions[i].answers.b;
        optC = myQuestions[i].answers.c;
        optD = myQuestions[i].answers.d;
        // append data of options to questions div    
        questions.innerHTML += "<input type='radio' name='choices' value='a'>"+ escape_html(optA) +"<br>";
        questions.innerHTML += "<input type='radio' name='choices' value='b'>"+ escape_html(optB) +"<br>";
        questions.innerHTML += "<input type='radio' name='choices' value='c'>"+ escape_html(optC) +"<br>";
        questions.innerHTML += "<input type='radio' name='choices' value='d'>"+ escape_html(optD) +"<br><br>";
        questions.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
// function to check answer
function checkAnswer () {
    //Target the list of options
    choices=document.getElementsByName("choices");
    for (var j=0;j<choices.length; j++) {
        if (choices[j].checked) {
            choice=choices[j].value;
        }
    }
    if (choice == myQuestions[i].correctAnswer) {
        correct++;
    }
    // if answer incorrectly then time is subtracted by 10 seconds 
    else {timer-=10};
    // show next question by incrementing i and call the showQuestion function again
    i++;
    showQuestions();
}
// array for name and score
var attempts = [];
//stored Initials to local storage
function storedNames() {localStorage.setItem('attempts',JSON.stringify(attempts))};
//function to save initials
function createForm () {
    nameForm.innerHTML = "Your initials (press enter to store your initials and score for this time): <input type='text' id='name-text'>";
    var clearBtn = document.createElement('BUTTON');
    document.getElementById("second-div").appendChild(clearBtn);
    clearBtn.innerHTML = "Click to Clear History";
    clearBtn.addEventListener('click', clearStorage);
    getLocalStorage();
}
//when name form is submitted 
nameForm.addEventListener('submit', function(event){
        event.preventDefault();
        var nameText = document.querySelector("#name-text");
        var nameInput = nameText.value.trim();
        if (nameInput==='') {
            return;
        } else{
            attempts.push(nameInput + ": " + correct);
            nameText.value ='';
            storedNames();
            renderAttempts();
        }
        
    });

// function to show previous attempts
function renderAttempts () {
    // clear show-attempts
    var attemptList = document.getElementById('show-attempts');
    attemptList.innerHTML="";
    //Update number of attempts
    var attemptCountSpan = document.getElementById("show-attempts-count")
    attemptCountSpan.innerHTML = "You have made "+ attempts.length + " attempt(s) in the past"; 
    //render a new li for each attempt
    for (var i=0; i<attempts.length;i++) {
        var attempt = attempts[i];
        var li = document.createElement("li");
        attemptList.appendChild(li);
        li.textContent = attempt;
        li.setAttribute("data-index",i);
    }
    
}
function getLocalStorage() {
    //get stored attempts from local storage
    var storedattempts = JSON.parse(localStorage.getItem("attempts"));
    
    if (storedattempts !== null) {
        attempts = storedattempts;
    }
    // render attempts to DOM
    renderAttempts();
}
// when clear button is clicked

function clearStorage() {
    localStorage.clear();
}
prepareBtn.addEventListener('click',startTest);
prepareBtn.addEventListener('click',showQuestions);
console.log(myQuestions[i].correctAnswer);





